import type { NightRecord, ScorePart, SleepEval, SleepVerdict, ZooStats } from '../types'
import { addDays, bedAbs, durationHours, minToHm, today } from './dates'

export const VERDICT_META: Record<SleepVerdict, { title: string; sub: string; cls: string }> = {
  pending: { title: '今晚还没上床', sub: '动物们眼巴巴等你呢', cls: 'v-pending' },
  perfect: { title: '完美睡眠夜！', sub: '教科书级作息，动物们集体鼓掌！', cls: 'v-perfect' },
  win: { title: '达标睡眠夜', sub: '睡得不错，动物很满意！', cls: 'v-win' },
  plain: { title: '平淡睡眠夜', sub: '能睡但不惊艳，明天冲个完美？', cls: 'v-plain' },
  fail: { title: '熬夜警报夜', sub: '动物们已经替你困了……明晚早睡赢回来！', cls: 'v-fail' },
}

/** 透明评分：入睡时间 + 时长 */
export const evaluate = (r: NightRecord | undefined | null): SleepEval => {
  if (!r || !r.bed) return { score: 0, parts: [], verdict: 'pending', durHours: null }

  const parts: ScorePart[] = []
  let score = 0
  const bed = bedAbs(r.bed)
  let bedPts: number
  if (bed <= 22 * 60 + 30) bedPts = 3
  else if (bed <= 23 * 60 + 30) bedPts = 2
  else if (bed <= 24 * 60 + 30) bedPts = 1
  else if (bed <= 27 * 60) bedPts = -2
  else bedPts = -4
  parts.push({ label: `入睡 ${r.bed}`, pts: bedPts })
  score += bedPts

  let durHours: number | null = null
  if (r.wake) {
    durHours = durationHours(r.bed, r.wake)
    const h = durHours
    let durPts: number
    if (h >= 7 && h <= 9) durPts = 3
    else if ((h >= 6.5 && h < 7) || (h > 9 && h <= 10)) durPts = 1
    else if (h > 10) durPts = -2
    else if (h >= 5.5) durPts = -2
    else durPts = -4
    parts.push({
      label: `时长 ${h.toFixed(h % 1 === 0 ? 0 : 1)} 小时${h > 10 ? '（冬眠警告）' : ''}`,
      pts: durPts,
    })
    score += durPts
  }

  const verdict: SleepVerdict = score >= 5 ? 'perfect' : score >= 2 ? 'win' : score >= 0 ? 'plain' : 'fail'
  return { score, parts, verdict, durHours }
}

export const isGoodNight = (r: NightRecord | undefined | null): boolean => {
  const v = evaluate(r).verdict
  return v === 'win' || v === 'perfect'
}

export const computeStats = (records: Record<string, NightRecord>): ZooStats => {
  const dates = Object.keys(records).sort()
  let totalNights = 0
  let goodNights = 0
  let perfectNights = 0
  let wreckNights = 0
  let bedSum = 0
  let bedN = 0
  let durSum = 0
  let durN = 0
  const goodSet = new Set<string>()

  for (const d of dates) {
    const r = records[d]
    if (!r.bed) continue
    totalNights += 1
    const ev = evaluate(r)
    bedSum += bedAbs(r.bed)
    bedN += 1
    if (ev.durHours !== null) {
      durSum += ev.durHours
      durN += 1
    }
    if (ev.verdict === 'perfect') perfectNights += 1
    if (ev.verdict === 'fail') wreckNights += 1
    if (isGoodNight(r)) {
      goodNights += 1
      goodSet.add(d)
    }
  }

  // 连击：按夜（入睡日）连续
  let maxStreak = 0
  let run = 0
  let prev: string | null = null
  for (const d of dates) {
    if (goodSet.has(d)) {
      run = prev && addDays(prev, 1) === d ? run + 1 : 1
      maxStreak = Math.max(maxStreak, run)
    } else {
      run = 0
    }
    prev = d
  }

  const t = today()
  let curStreak = 0
  // 今晚达标直接算；否则从昨晚回望（今晚还没睡不丢连击）
  let cursor = goodSet.has(t) ? t : addDays(t, -1)
  while (goodSet.has(cursor)) {
    curStreak += 1
    cursor = addDays(cursor, -1)
  }

  const firstDate = dates.find((d) => records[d].bed) ?? null
  const dayNumber = firstDate ? (() => {
    let n = 1
    let c = firstDate
    while (c < t) {
      c = addDays(c, 1)
      n += 1
    }
    return n
  })() : 0

  return {
    totalNights,
    goodNights,
    perfectNights,
    wreckNights,
    rate: totalNights ? goodNights / totalNights : 0,
    curStreak,
    maxStreak: Math.max(maxStreak, curStreak),
    avgBed: bedN ? minToHm(bedSum / bedN) : null,
    avgDur: durN ? durSum / durN : null,
    firstDate,
    dayNumber,
  }
}

/** 最近 n 夜（含今晚归属夜）的评估列表 */
export const recentNights = (records: Record<string, NightRecord>, n: number) => {
  const t = today()
  const out: { date: string; score: number; verdict: SleepVerdict; dur: number | null }[] = []
  for (let i = n - 1; i >= 0; i--) {
    const d = addDays(t, -i)
    const ev = evaluate(records[d])
    out.push({ date: d, score: ev.score, verdict: ev.verdict, dur: ev.durHours })
  }
  return out
}
