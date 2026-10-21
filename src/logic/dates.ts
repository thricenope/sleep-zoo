export const ymd = (d: Date): string => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const today = (): string => ymd(new Date())

export const parseYmd = (s: string): Date => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const addDays = (s: string, n: number): string => {
  const d = parseYmd(s)
  d.setDate(d.getDate() + n)
  return ymd(d)
}

const WEEK_CN = ['日', '一', '二', '三', '四', '五', '六']
export const weekCn = (s: string): string => WEEK_CN[parseYmd(s).getDay()]

export const daysBetween = (a: string, b: string): number =>
  Math.round((parseYmd(b).getTime() - parseYmd(a).getTime()) / 86400000)

export const dateCn = (s: string): string =>
  `${parseYmd(s).getMonth() + 1} 月 ${parseYmd(s).getDate()} 日 · 周${weekCn(s)}`

/** 某月夜历矩阵（每格 = 一夜的入睡日），周日起 */
export const monthNights = (year: number, month: number) => {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((first.getDay() + daysInMonth) / 7) * 7
  const days: { date: string; inMonth: boolean }[] = []
  for (let i = 0; i < totalCells; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push({ date: ymd(d), inMonth: d.getMonth() === month })
  }
  return days
}

export const monthLabel = (year: number, month: number): string =>
  `${year} 年 ${month + 1} 月`

export const hmToMin = (t: string): number => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export const minToHm = (min: number): string => {
  const norm = ((Math.round(min) % 1440) + 1440) % 1440
  const h = Math.floor(norm / 60)
  const m = norm % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** 现在时间 'HH:MM' */
export const nowHm = (): string => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

/** 中午 12 点前按「昨晚」算：今晚的夜归属性日 */
export const tonightDate = (now = new Date()): string => {
  const d = new Date(now)
  if (d.getHours() < 12) d.setDate(d.getDate() - 1)
  return ymd(d)
}

/** 跨夜时长（小时）：起床早于入睡则自动 +24h 折到次晨 */
export const durationHours = (bed: string, wake: string): number => {
  const b = hmToMin(bed)
  const w = hmToMin(wake)
  let cand = w - b
  if (cand < 0) cand += 1440
  return Math.min(cand, 1440) / 60
}

/** 入睡评分坐标：凌晨 0-6 点的入睡视为前一晚延续（>24h） */
export const bedAbs = (t: string): number => {
  const v = hmToMin(t)
  return v < 360 ? v + 1440 : v
}
