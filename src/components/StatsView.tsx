import { useMemo, useRef, useState } from 'react'
import { useZoo } from '../store'
import { computeStats, evaluate, recentNights } from '../logic/sleep'
import { monthNights, today } from '../logic/dates'
import { Icon } from './Icon'

export const StatsView = () => {
  const records = useZoo((s) => s.records)
  const importData = useZoo((s) => s.importData)
  const resetAll = useZoo((s) => s.resetAll)
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')

  const stats = useMemo(() => computeStats(records), [records])
  const bars = useMemo(() => recentNights(records, 14), [records])
  const now = new Date()
  const strip = useMemo(
    () => monthNights(now.getFullYear(), now.getMonth()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [records],
  )

  const doExport = () => {
    const blob = new Blob([JSON.stringify({ app: 'sleep-zoo', version: 1, records }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sleep-zoo-${today()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('已导出备份')
    setTimeout(() => setMsg(''), 2500)
  }

  const doImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importData(JSON.parse(String(reader.result)))
        setMsg('导入成功！动物们已就位')
      } catch (e) {
        setMsg(e instanceof Error ? `导入失败：${e.message}` : '导入失败：文件格式不对')
      }
      setTimeout(() => setMsg(''), 3000)
    }
    reader.readAsText(file)
  }

  if (stats.totalNights === 0) {
    return (
      <div className="card term-card">
        <p className="term-tip">动物园还空着——今晚按一下「去睡觉」，这里就会开始长出你的睡眠故事。</p>
      </div>
    )
  }

  return (
    <div>
      <div className="big-nums">
        <div className="big-num hero">
          <Icon name="zzz" size={40} style={{ color: 'var(--grape)' }} />
          <div>
            <div className="n">{stats.dayNumber}</div>
            <div className="l">入住第 <b>{stats.dayNumber}</b> 天 · 自 {stats.firstDate} 开始</div>
          </div>
        </div>
        <div className="big-num">
          <div className="n" style={{ color: 'var(--mint-deep)' }}>{stats.goodNights}</div>
          <div className="l">达标夜</div>
        </div>
        <div className="big-num">
          <div className="n">{Math.round(stats.rate * 100)}<span style={{ fontSize: 14 }}>%</span></div>
          <div className="l">达标率</div>
        </div>
        <div className="big-num">
          <div className="n" style={{ color: 'var(--grape-deep)' }}>{stats.curStreak}</div>
          <div className="l">当前连击</div>
        </div>
        <div className="big-num">
          <div className="n">{stats.maxStreak}</div>
          <div className="l">最长连击</div>
        </div>
        <div className="big-num">
          <div className="n" style={{ color: 'var(--berry-deep)' }}>{stats.avgBed ?? '—'}</div>
          <div className="l">平均入睡</div>
        </div>
        <div className="big-num">
          <div className="n">{stats.avgDur !== null ? stats.avgDur.toFixed(1) : '—'}</div>
          <div className="l">平均时长</div>
        </div>
        <div className="big-num">
          <div className="n" style={{ color: '#E0567A' }}>{stats.perfectNights}</div>
          <div className="l">完美夜</div>
        </div>
        <div className="big-num">
          <div className="n">{stats.wreckNights}</div>
          <div className="l">熬夜夜</div>
        </div>
      </div>

      <div className="sec-head">
        <h2>近 14 夜时长</h2>
        <span className="note">浅带 = 7–9h 黄金区</span>
      </div>
      <div className="card">
        <div className="bars">
          {bars.map((b) => {
            const h = Math.max(3, ((b.dur ?? 0) / 11) * 100)
            const cls = b.dur === null ? 'zero' : b.dur >= 7 && b.dur <= 9 ? 'pos' : b.dur > 10 ? 'over' : 'mid'
            return (
              <div key={b.date} className={`bar-col${b.date === today() ? ' today-bar' : ''}`}>
                <div className={`bar ${cls}`} style={{ height: `${h}%` }} title={`${b.date} ${b.dur !== null ? b.dur.toFixed(1) + 'h' : '未记录'}`} />
              </div>
            )
          })}
          <span className="band-7" aria-hidden="true" />
        </div>
        <div className="bar-labels">
          {bars.map((b) => (
            <span key={b.date}>{Number(b.date.slice(8))}</span>
          ))}
        </div>
      </div>

      <div className="sec-head">
        <h2>本月夜历</h2>
        <span className="note">每格一夜</span>
      </div>
      <div className="card">
        <div className="month-strip">
          {strip.map((d) => {
            const r = records[d.date]
            const ev = evaluate(r)
            const cls = !r?.bed ? '' : `v-${ev.verdict === 'pending' ? '' : ev.verdict}`
            return (
              <span
                key={d.date}
                className={`ms-cell ${cls === 'v-' ? '' : cls}${d.date === today() ? ' today' : ''}`}
                title={`${d.date} ${r?.bed ? ev.score + ' 分' : '未记录'}`}
              />
            )
          })}
        </div>
        <div className="legend" style={{ marginTop: 10 }}>
          <span className="li"><span className="sw v-perfect" /> 完美</span>
          <span className="li"><span className="sw v-win" /> 达标</span>
          <span className="li"><span className="sw v-fail" /> 熬夜</span>
          <span className="li"><span className="ms-cell" style={{ width: 12, height: 12 }} /> 未记录</span>
        </div>
      </div>

      <div className="sec-head">
        <h2>我的数据</h2>
        <span className="note">都存在这台设备上</span>
      </div>
      <div className="card">
        <div className="data-btns">
          <button type="button" className="cta mint" style={{ background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--line-strong)', boxShadow: '0 4px 0 rgba(90,70,140,.08)' }} onClick={doExport}>
            <Icon name="download" size={18} /> 导出备份
          </button>
          <button type="button" className="cta mint" style={{ background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--line-strong)', boxShadow: '0 4px 0 rgba(90,70,140,.08)' }} onClick={() => fileRef.current?.click()}>
            <Icon name="upload" size={18} /> 导入恢复
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) doImport(f)
            e.target.value = ''
          }}
        />
        {msg && <p className="empty-tip" style={{ color: 'var(--mint-deep)' }}>{msg}</p>}
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button
            className="ghost-link"
            onClick={() => {
              if (window.confirm('清空全部记录和动物？不可恢复（建议先导出备份）') && window.confirm('真的全部清空吗？')) {
                resetAll()
              }
            }}
          >
            <Icon name="trash" size={14} /> 清空所有数据
          </button>
        </div>
      </div>
    </div>
  )
}
