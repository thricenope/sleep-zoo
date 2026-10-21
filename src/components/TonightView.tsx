import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { NightRecord } from '../types'
import { openNight, useZoo } from '../store'
import { evaluate, recentNights, VERDICT_META } from '../logic/sleep'
import { addDays, durationHours, nowHm, tonightDate } from '../logic/dates'
import { currentTerm } from '../logic/solar'
import { animalById } from '../logic/animals'
import type { ZooStatus } from './Animal'
import { Animal } from './Animal'
import { burstAt, bigCelebration } from '../celebrate'
import { NightSheet } from './NightSheet'
import { Icon } from './Icon'

const SLEEP_LINES: Record<ZooStatus, string[]> = {
  sleeping: ['呼……Zzz……（它梦到了 infinite 根胡萝卜）', '呼——别刷手机了，快躺下！', '被窝引力已启动，就等你了。'],
  great: ['睡得漂亮！本神宣布今天是元气满格日！', '这觉睡的，毛都在发光！', '昨晚修仙了吗？没有！所以才这么神清气爽！'],
  good: ['不错不错，本伙伴很满意～', '睡得还行，奖励你一个摸摸头。', '稳稳的一夜，继续保持！'],
  yawn: ['哈——昨晚也就那样吧，一般般。', '睡是睡了，怎么还有点困呢？', '一般般啦，今晚争取睡出彩虹屁！'],
  tired: ['黑眼圈都会说话了……咖啡先给你挂上。', '你熬的每个夜，都写在它的黑眼圈里。', '本伙伴现在需要一杯冰美式，谢了。'],
  ghost: ['灵魂已经飘走了，身体是借来的。', '这睡的啥呀！魂都散了啦！', '完了，它已经开始灵魂出窍了。'],
  lazy: ['睡这么久，树懒都想叫你起床了！', '赖床大王驾到——被子都快长在你身上了！', '再睡下去，本伙伴要造反了！'],
  idle: ['今天还没记录哦，晚上记得来按「去睡觉」！', '晚上见！记得早点来按灯！', '本神先打个盹，你晚点来。'],
}

const pick = (arr: string[], seed: string) =>
  arr[Math.abs([...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0)) % arr.length]

/** 由记录推导动物状态 */
export function stageStatus(records: Record<string, NightRecord>): { status: ZooStatus; seed: string } {
  const t = tonightDate()
  const open = openNight(records)
  if (open) return { status: 'sleeping', seed: open.date }

  for (const d of [t, addDays(t, -1)]) {
    const r = records[d]
    if (r?.bed && r.wake) {
      const ev = evaluate(r)
      if (ev.durHours !== null && ev.durHours > 10) return { status: 'lazy', seed: d }
      if (ev.verdict === 'perfect') return { status: 'great', seed: d }
      if (ev.verdict === 'win') return { status: 'good', seed: d }
      if (ev.verdict === 'plain') return { status: 'yawn', seed: d }
      const bedH = Number(r.bed.slice(0, 2))
      const folded = bedH < 6 ? bedH + 24 : bedH
      return { status: folded >= 27 ? 'ghost' : 'tired', seed: d }
    }
  }
  return { status: 'idle', seed: t }
}

const durText = (h: number) => `${Math.floor(h)} 小时 ${Math.round((h % 1) * 60)} 分`

export const TonightView = () => {
  const records = useZoo((s) => s.records)
  const setBed = useZoo((s) => s.setBed)
  const setWake = useZoo((s) => s.setWake)
  const animal = useZoo((s) => s.animal)

  const [sheet, setSheet] = useState<string | null>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  const t = tonightDate()
  const open = openNight(records)
  // 最近一个「完整夜」（今晚优先，其次昨晚）
  const doneRec = useMemo(() => {
    for (const d of [t, addDays(t, -1)]) {
      const r = records[d]
      if (r?.bed && r.wake) return r
    }
    return null
  }, [records, t])
  const ev = useMemo(() => evaluate(doneRec), [doneRec])
  const meta = VERDICT_META[ev.verdict]
  const term = currentTerm()
  const skin = animalById(animal)

  const { status, seed } = useMemo(() => stageStatus(records), [records])

  // 睡觉中：已睡时长
  let elapsedH: number | null = null
  if (open) elapsedH = durationHours(open.bed!, nowHm())

  const doBed = () => {
    setBed(t, nowHm())
    burstAt(ctaRef.current)
  }
  const doWake = () => {
    const target = open!.date
    setWake(target, nowHm())
    const after = evaluate({ ...open!, wake: nowHm() })
    if (after.verdict === 'win' || after.verdict === 'perfect') bigCelebration()
    else burstAt(ctaRef.current)
  }

  return (
    <div>
      <div className="term-banner">
        <span className="term-chip">今日 · {term.name}</span>
        <span className="term-next">距「{term.nextName}」还有 {term.daysToNext} 天</span>
      </div>
      <div className="card term-card">
        <p className="term-tip">{term.tip}</p>
      </div>

      <div className="card stage-card">
        <div className="stage-scene">
          <div className="stage-stars" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>
          <div className="stage-moon" aria-hidden="true"><Icon name="moon" size={22} /></div>
          <div className="stage-animal">
            <Animal species={animal} status={status} season={term.season} size={168} />
          </div>
        </div>
        <div className="bubble">
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="hi">{pick(SLEEP_LINES[status], seed + animal)}</div>
              <div className="sub">
                登场：{skin.name} · {skin.persona}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {open ? (
        <>
          <div className="card progress-card">
            <div className="pc-head">
              <span className="pc-title">本夜睡眠进行中…</span>
              <span className="pc-val">{elapsedH !== null ? durText(elapsedH) : ''}</span>
            </div>
            <div className="night-track">
              <div className="night-fill" style={{ width: `${Math.min(100, ((elapsedH ?? 0) / 8) * 100)}%` }} />
              <span className="night-moon" style={{ left: `${Math.min(96, Math.max(4, ((elapsedH ?? 0) / 8) * 100))}%` }}>
                <Icon name="moon" size={16} />
              </span>
            </div>
            <div className="pc-scale"><span>0h</span><span>目标 8h</span></div>
          </div>
          <motion.button ref={ctaRef} type="button" className="cta sun" whileTap={{ scale: 0.97 }} onClick={doWake}>
            <Icon name="sun" size={21} /> 起床啦！
          </motion.button>
          <div style={{ textAlign: 'center' }}>
            <button className="ghost-link" onClick={() => setSheet(open.date)}>
              <Icon name="pencil" size={14} /> 改时间
            </button>
          </div>
        </>
      ) : (
        <>
          {ev.verdict !== 'pending' && (
            <div className={`card verdict-card ${meta.cls}`}>
              <div className="vc-row">
                <span className={`vpill ${meta.cls}`}>{meta.title}</span>
                <span className={`score-num ${ev.score > 0 ? 'pos' : ev.score < 0 ? 'neg' : 'zero'}`}>
                  {ev.score > 0 ? `+${ev.score}` : ev.score}
                </span>
              </div>
              <div className="parts">
                {ev.parts.map((p, i) => (
                  <div className="p" key={i}>
                    <span>{p.label}</span>
                    <b className={p.pts > 0 ? 'plus' : p.pts < 0 ? 'minus' : 'zero'}>{p.pts > 0 ? `+${p.pts}` : p.pts}</b>
                  </div>
                ))}
                <div className="p"><span style={{ color: 'var(--ink-3)' }}>入睡早 +时长达标 = ≥5 分完美夜</span></div>
              </div>
            </div>
          )}
          {ev.durHours !== null && (
            <div className="card progress-card">
              <div className="pc-head">
                <span className="pc-title">昨夜时长</span>
                <span className="pc-val">{durText(ev.durHours)}</span>
              </div>
              <div className="night-track">
                <div className={`night-fill ${ev.durHours > 10 ? 'over' : ''}`} style={{ width: `${Math.min(100, (ev.durHours / 10) * 100)}%` }} />
                <span className="tick-8" />
              </div>
              <div className="pc-scale"><span>0h</span><span>8h 达标线</span><span>10h</span></div>
            </div>
          )}
          <motion.button ref={ctaRef} type="button" className="cta" whileTap={{ scale: 0.97 }} onClick={doBed}>
            <Icon name="moon" size={21} /> 去睡觉
          </motion.button>
          <div style={{ textAlign: 'center' }}>
            <button className="ghost-link" onClick={() => setSheet(t)}>
              <Icon name="pencil" size={14} /> 手动填昨晚 / 改时间
            </button>
          </div>
        </>
      )}

      <div className="sec-head"><h2>最近 7 夜</h2><span className="note">颜色 = 质量</span></div>
      <div className="card">
        <div className="week-strip">
          {recentNights(records, 7).map((n) => (
            <div key={n.date} className="ws-col">
              <span className={`ws-dot v-${n.verdict === 'pending' ? 'pending' : n.verdict}`} title={`${n.date} ${n.dur !== null ? n.dur.toFixed(1) + 'h' : '未记录'}`} />
              <span className="ws-lb">{n.dur !== null ? `${n.dur.toFixed(n.dur % 1 ? 1 : 0)}h` : '·'}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {sheet && <NightSheet date={sheet} onClose={() => setSheet(null)} />}
      </AnimatePresence>
    </div>
  )
}
