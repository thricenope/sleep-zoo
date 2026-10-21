import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnimalId } from './logic/animals'
import { ANIMALS } from './logic/animals'
import type { NightRecord } from './types'
import { computeStats } from './logic/sleep'
import { today } from './logic/dates'

interface ZooState {
  records: Record<string, NightRecord>
  animal: AnimalId // 当前登场伙伴
  unlocked: Record<AnimalId, string> // 解锁日
  celebrated: Record<string, true>
  pendingCelebrate: AnimalId[]

  setBed: (date: string, time: string) => void
  setWake: (date: string, time: string) => void
  setNight: (date: string, rec: Partial<NightRecord>) => void
  clearNight: (date: string) => void
  selectAnimal: (id: AnimalId) => void
  dismissOneCelebrate: () => void
  importData: (data: { records?: Record<string, NightRecord> }) => void
  resetAll: () => void
}

const emptyUnlock = (): Record<AnimalId, string> =>
  Object.fromEntries(ANIMALS.map((a) => [a.id, ''])) as Record<AnimalId, string>

export const useZoo = create<ZooState>()(
  persist(
    (set, get) => {
      // 通用写入口：写完重算解锁，新解锁进庆祝队列
      const commit = (records: Record<string, NightRecord>) => {
        const state = get()
        const stats = computeStats(records)
        const unlocked = { ...emptyUnlock(), ...state.unlocked }
        const pendingCelebrate = [...state.pendingCelebrate]
        let changed = false
        for (const a of ANIMALS) {
          if (a.unlockAt > 0 && !unlocked[a.id] && stats.maxStreak >= a.unlockAt) {
            unlocked[a.id] = today()
            pendingCelebrate.push(a.id)
            changed = true
          }
        }
        set({ records, unlocked: changed ? unlocked : state.unlocked, pendingCelebrate })
      }

      return {
        records: {},
        animal: 'hamster',
        unlocked: emptyUnlock(),
        celebrated: {},
        pendingCelebrate: [],

        setBed: (date, time) => {
          const r = get().records[date] ?? { date, bed: null, wake: null }
          commit({ ...get().records, [date]: { ...r, bed: time } })
        },

        setWake: (date, time) => {
          const r = get().records[date] ?? { date, bed: null, wake: null }
          commit({ ...get().records, [date]: { ...r, wake: time } })
        },

        setNight: (date, rec) => {
          const r = get().records[date] ?? { date, bed: null, wake: null }
          const next = { ...r, ...rec }
          // 空记录清掉
          if (!next.bed && !next.wake) {
            const records = { ...get().records }
            delete records[date]
            commit(records)
            return
          }
          commit({ ...get().records, [date]: next })
        },

        clearNight: (date) => {
          const records = { ...get().records }
          delete records[date]
          set({ records })
        },

        selectAnimal: (id) => set({ animal: id }),

        dismissOneCelebrate: () => {
          const [, ...rest] = get().pendingCelebrate
          set({ pendingCelebrate: rest })
        },

        importData: (data) => {
          if (!data || typeof data !== 'object' || !data.records) throw new Error('格式不对')
          const records: Record<string, NightRecord> = {}
          for (const [date, r] of Object.entries(data.records)) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue
            records[date] = {
              date,
              bed: typeof r.bed === 'string' ? r.bed : null,
              wake: typeof r.wake === 'string' ? r.wake : null,
            }
          }
          const stats = computeStats(records)
          const unlocked = emptyUnlock()
          for (const a of ANIMALS) {
            if (a.unlockAt === 0 || stats.maxStreak >= a.unlockAt) unlocked[a.id] = today()
          }
          set({ records, unlocked, pendingCelebrate: [] })
        },

        resetAll: () =>
          set({ records: {}, unlocked: emptyUnlock(), celebrated: {}, pendingCelebrate: [], animal: 'hamster' }),
      }
    },
    { name: 'sleep-zoo-v1' },
  ),
)

/** 找最近一晚「已睡未醒」的夜（往后找 2 天） */
export const openNight = (records: Record<string, NightRecord>): NightRecord | null => {
  const d = new Date()
  for (let i = 0; i <= 2; i++) {
    const dt = new Date(d)
    dt.setDate(d.getDate() - i)
    const y = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
    const r = records[y]
    if (r && r.bed && !r.wake) return r
  }
  return null
}
