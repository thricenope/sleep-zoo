import { useState } from 'react'
import { motion } from 'framer-motion'
import type { NightRecord } from '../types'
import { useZoo } from '../store'
import { dateCn } from '../logic/dates'
import { Icon } from './Icon'

/** 手动填/补录一夜：入睡 + 起床时间 */
export const NightSheet = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const saved = useZoo((s) => s.records[date])
  const setNight = useZoo((s) => s.setNight)
  const clearNight = useZoo((s) => s.clearNight)
  const [bed, setBed] = useState(saved?.bed ?? '')
  const [wake, setWake] = useState(saved?.wake ?? '')

  return (
    <motion.div
      className="sheet-mask"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${dateCn(date)}补录`}
    >
      <motion.div
        className="sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-grab" />
        <div className="sheet-head">
          <h3>{dateCn(date)} 这一夜</h3>
          <button type="button" className="icon-btn" aria-label="关闭" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="time-rows">
          <label className="time-row">
            <span className="tr-label"><Icon name="moon" size={18} style={{ color: 'var(--grape)' }} /> 几点睡的</span>
            <input type="time" value={bed} onChange={(e) => setBed(e.target.value)} />
          </label>
          <label className="time-row">
            <span className="tr-label"><Icon name="sun" size={18} style={{ color: 'var(--tange-deep)' }} /> 几点起的</span>
            <input type="time" value={wake} onChange={(e) => setWake(e.target.value)} />
          </label>
        </div>
        <p className="time-note">只填入睡时间也可以——动物们会陪你等天亮。</p>

        <button
          type="button"
          className="cta mint"
          disabled={!bed && !wake}
          onClick={() => {
            setNight(date, {
              bed: bed || null,
              wake: wake || null,
            } as Partial<NightRecord>)
            onClose()
          }}
        >
          <Icon name="check" size={20} />
          记下这一夜
        </button>

        {saved && (
          <div style={{ textAlign: 'center' }}>
            <button
              className="ghost-link"
              onClick={() => {
                if (window.confirm('删除这一夜的记录吗？')) {
                  clearNight(date)
                  onClose()
                }
              }}
            >
              <Icon name="trash" size={14} /> 删除记录
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
