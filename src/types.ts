export interface NightRecord {
  date: string // 夜（以入睡日为准）YYYY-MM-DD
  bed: string | null // 入睡 'HH:MM'（当晚）
  wake: string | null // 起床 'HH:MM'（次日晨）
}

export type SleepVerdict = 'pending' | 'perfect' | 'win' | 'plain' | 'fail'

export interface ScorePart {
  label: string
  pts: number
}

export interface SleepEval {
  score: number
  parts: ScorePart[]
  verdict: SleepVerdict
  durHours: number | null
}

export interface ZooStats {
  totalNights: number
  goodNights: number
  perfectNights: number
  wreckNights: number
  rate: number
  curStreak: number
  maxStreak: number
  avgBed: string | null // 'HH:MM'
  avgDur: number | null // 小时
  firstDate: string | null
  dayNumber: number
}
