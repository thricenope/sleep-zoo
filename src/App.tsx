import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { TonightView } from './components/TonightView'
import { HistoryView } from './components/HistoryView'
import { ZooView } from './components/ZooView'
import { StatsView } from './components/StatsView'
import { TabBar, type TabId } from './components/TabBar'
import { CelebrationLayer } from './components/CelebrationLayer'

export default function App() {
  const [tab, setTab] = useState<TabId>('tonight')

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <header className="topbar">
          <span className="logo-zzz">Z<span>z</span><i>z</i></span>
          <span className="logo-name">晚安动物园</span>
        </header>
        <main aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {tab === 'tonight' && <TonightView />}
              {tab === 'history' && <HistoryView />}
              {tab === 'zoo' && <ZooView />}
              {tab === 'stats' && <StatsView />}
            </motion.div>
          </AnimatePresence>
        </main>
        <TabBar tab={tab} onTab={setTab} />
        <CelebrationLayer />
      </div>
    </MotionConfig>
  )
}
