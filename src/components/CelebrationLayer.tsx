import { AnimatePresence, motion } from 'framer-motion'
import { useZoo } from '../store'
import { animalById } from '../logic/animals'
import { currentTerm } from '../logic/solar'
import { burst } from '../celebrate'
import { Animal } from './Animal'

/** 新动物入住弹窗队列 */
export const CelebrationLayer = () => {
  const queue = useZoo((s) => s.pendingCelebrate)
  const dismiss = useZoo((s) => s.dismissOneCelebrate)
  const id = queue.length > 0 ? queue[0] : null
  const skin = id ? animalById(id) : null
  const term = currentTerm()

  return (
    <AnimatePresence>
      {id && skin && (
        <motion.div
          className="cele-mask"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={id}
          role="dialog"
          aria-modal="true"
          aria-label={`新动物入住：${skin.name}`}
        >
          <motion.div
            className="cele-card"
            initial={{ scale: 0.4, y: 80 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="rays" />
            <div className="cele-kind">新 室 友 入 住</div>
            <motion.div
              className="cele-animal"
              initial={{ scale: 0.2, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 11, delay: 0.12 }}
            >
              <Animal species={id} status="great" season={term.season} size={130} />
            </motion.div>
            <div className="cele-title">{skin.name} 来啦！</div>
            <div className="cele-desc">{skin.persona}</div>
            <div className="cele-xp">入住 {Object.keys(useZoo.getState().unlocked).filter((k) => useZoo.getState().unlocked[k as never]).length} / 8 只</div>
            <div>
              <motion.button
                type="button"
                className="cta mint"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  burst({ x: 0.5, y: 0.6 })
                  dismiss()
                }}
              >
                欢迎入住！
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
