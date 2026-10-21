import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useZoo } from '../store'
import { evaluate } from '../logic/sleep'
import { monthLabel, monthNights, parseYmd, today } from '../logic/dates'
import { NightSheet } from './NightSheet'
import { Icon } from './Icon'

const WEEK = ['日', '一', '二', '三', '四', '五', '六']

/** 夜历：每格一夜，颜色=质量，数字=时长 */
export const HistoryView = () => {
  const records = useZoo((s) => s.records)
  const now = new Date()
  const [ym, setYm] = useState({ y: now.getFullYear(), m: now.getMonth() })
  const [sel, setSel] = useState<string | null>(null)

  const days = useMemo(() => monthNights(ym.y, ym.m), [ym])
  const t = today()

  const summary = useMemo(() => {
    let recorded = 0
    let good = 0
    for (const d of days) {
      const r = records[d.date]
      if (!d.inMonth || !r?.bed) continue
      recorded += 1
      const v = evaluate(r).verdict
      if (v === 'win' || v === 'perfect') good += 1
    }
    return { recorded, good }
  }, [days, records])

  const shift = (delta: number) => {
    setYm(({ y, m }) => {
      const d = new Date(y, m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  return (
    <div>
      <div className="cal-head">
        <button type="button" className="cal-nav" aria-label="上个月" onClick={() => shift(-1)}>
          <Icon name="left" size={19} />
        </button>
        <div className="title">{monthLabel(ym.y, ym.m)}</div>
        <button type="button" className="cal-nav" aria-label="下个月" onClick={() => shift(1)}>
          <Icon name="right" size={19} />
        </button>
      </div>

      <div className="card">
        <div className="cal-week" aria-hidden="true">
          {WEEK.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${ym.y}-${ym.m}`}
            className="cal-grid"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {days.map((d) => {
              const r = records[d.date]
              const ev = evaluate(r)
              const dayNum = parseYmd(d.date).getDate()
              const dur = ev.durHours
              return (
                <button
                  type="button"
                  key={d.date}
                  className={[
                    'cal-cell',
                    d.inMonth ? '' : 'dim',
                    d.date === t ? 'today' : '',
                    sel === d.date ? 'sel' : '',
                  ].join(' ')}
                  aria-label={`${d.date} ${r?.bed ? ev.score + ' 分' : '未记录'}`}
                  onClick={() => setSel(d.date)}
                >
                  <span className="dnum">{dayNum}</span>
                  {r?.bed ? (
                    <motion.span
                      className={`night-chip v-${ev.verdict}`}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 480, damping: 16 }}
                    >
                      {dur !== null ? dur.toFixed(dur % 1 ? 1 : 0) : '…'}
                    </motion.span>
                  ) : (
                    <span className="cal-empty-dot" />
                  )}
                </button>
              )
            })}
          </motion.div>
        </AnimatePresence>
        <div className="month-sum">
          本月记录 <b>{summary.recorded}</b> 夜 · 达标 <b>{summary.good}</b> 夜
        </div>
      </div>

      <div className="legend">
        <span className="li"><span className="sw v-perfect" /> 完美</span>
        <span className="li"><span className="sw v-win" /> 达标</span>
        <span className="li"><span className="sw v-plain" /> 平淡</span>
        <span className="li"><span className="sw v-fail" /> 熬夜</span>
        <span className="li"><span className="cal-empty-dot" /> 未记录</span>
      </div>
      <p className="empty-tip">点任意日期补录或修改</p>

      <AnimatePresence>
        {sel && <NightSheet date={sel} onClose={() => setSel(null)} />}
      </AnimatePresence>
    </div>
  )
}
