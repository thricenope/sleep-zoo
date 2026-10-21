import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useZoo } from '../store'
import { computeStats } from '../logic/sleep'
import { ANIMALS } from '../logic/animals'
import { currentTerm } from '../logic/solar'
import type { ZooStatus } from './Animal'
import { Animal } from './Animal'
import { burstAt } from '../celebrate'
import { Icon } from './Icon'

/** 动物园：连击解锁室友，点一下让谁登场 */
export const ZooView = () => {
  const animal = useZoo((s) => s.animal)
  const selectAnimal = useZoo((s) => s.selectAnimal)
  const unlocked = useZoo((s) => s.unlocked)
  const records = useZoo((s) => s.records)
  const stats = useMemo(() => computeStats(records), [records])
  const term = currentTerm()

  return (
    <div>
      <div className="card" style={{ background: 'linear-gradient(150deg,#fff,#F6F2FF)', borderColor: '#E2D8FF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="zzz" size={36} style={{ color: 'var(--grape)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.25 }}>
              连击 <span style={{ color: 'var(--grape-deep)', fontFamily: 'var(--font-num)', fontSize: 27 }}>{stats.curStreak}</span> 夜
              · 已入住 {Object.values(unlocked).filter(Boolean).length}/{ANIMALS.length} 只
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2 }}>
              连续达标夜数越多，动物园越热闹
            </div>
          </div>
        </div>
      </div>

      <div className="zoo-grid">
        {ANIMALS.map((a, i) => {
          const owned = !!unlocked[a.id] || a.unlockAt === 0
          const on = animal === a.id
          const progress = Math.min(1, stats.maxStreak / a.unlockAt)
          const status: ZooStatus = on ? 'good' : 'idle'
          return (
            <motion.button
              key={a.id}
              type="button"
              className={`zoo-card${on ? ' on' : ''}${owned ? '' : ' locked'}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
              whileTap={owned ? { scale: 0.95 } : undefined}
              onClick={(e) => {
                if (!owned) return
                selectAnimal(a.id)
                burstAt(e.currentTarget)
              }}
              aria-label={owned ? `让${a.name}登场` : `${a.name}：连击${a.unlockAt}夜解锁`}
            >
              <span className="zoo-avatar">
                <Animal species={a.id} status={owned ? status : 'idle'} season={term.season} size={86} />
                {on && <span className="zoo-on-tag">登场中</span>}
                {!owned && (
                  <span className="zoo-lock">
                    <Icon name="lock" size={18} />
                    <b>{a.unlockAt} 夜</b>
                  </span>
                )}
              </span>
              <span className="zoo-name">{a.name}</span>
              <span className="zoo-persona">{owned ? a.persona : '还没入住哦'}</span>
              {!owned && (
                <span className="zoo-prog">
                  <i style={{ width: `${progress * 100}%` }} />
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      <p className="empty-tip">达标夜 = 入睡或时长至少及格的夜 · 连击中断不清空入住资格</p>
    </div>
  )
}
