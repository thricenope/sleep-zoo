/**
 * 二十四节气（21 世纪通用通式近似：D = floor(y×0.2422 + C) - floor(y/4)）。
 * 少数年份与天文台值可能差一天，对一个卖萌的睡眠 App 足够准。
 */
const C = [
  5.4055, 20.12, 3.87, 18.73, 5.63, 20.646, 4.81, 20.1, 5.52, 21.04, 5.678, 21.37,
  7.108, 22.83, 7.5, 23.13, 7.646, 23.042, 8.318, 23.438, 7.438, 22.36, 7.18, 21.94,
]
export const TERM_NAMES = [
  '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑',
  '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至',
]
const TERM_MONTH = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]

/** 已知的通式例外修正 */
const EXCEPT: Record<string, number> = {
  '2-2026': 1, // 2026 立春 +1
}

export function termDay(year: number, i: number): number {
  const janfeb = TERM_MONTH[i] <= 2
  const y = janfeb ? (year - 1) % 100 : year % 100
  let d = Math.floor(y * 0.2422 + C[i]) - Math.floor(y / 4)
  const ex = EXCEPT[`${i}-${year}`]
  if (ex) d += ex
  return d
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export const seasonOf = (i: number): Season =>
  i >= 2 && i <= 7 ? 'spring' : i >= 8 && i <= 13 ? 'summer' : i >= 14 && i <= 19 ? 'autumn' : 'winter'

export const SEASON_CN: Record<Season, string> = {
  spring: '春', summer: '夏', autumn: '秋', winter: '冬',
}

/** 节气搞笑睡眠文案（夸张Q版） */
export const TERM_TIPS: Record<string, string> = {
  小寒: '小寒冻成狗，被窝是本命。晚上钻被动作要快，姿势要帅！',
  大寒: '一年最冷，动物们的被窝自带引力。你只负责早点钻进去！',
  立春: '立春！万物复苏，连冬眠的都翻了个身。你也要早点睡，春天长个儿不长膘！',
  雨水: '雨水到，下雨天和睡觉最配——但前提是你先上床！',
  惊蛰: '惊蛰惊蛰，雷都把你喊醒了！冬眠的都起床了，你晚上还修什么仙？',
  春分: '昼夜平分，白天不懂夜的黑，但动物们懂：早睡才能昼夜平衡！',
  清明: '清明时节雨纷纷，路上行人想打盹——夜里睡饱，白天才不困！',
  谷雨: '谷雨播种正当时，今晚早睡就是在给好皮肤播种！',
  立夏: '立夏！天热了，午睡可以有，但夜里的觉不能省！',
  小满: '小满小满，睡个八分饱的觉，人生刚刚好！',
  芒种: '芒种忙种，再忙也别忙到熬夜，头发会跟你抗议的！',
  夏至: '夏至白昼最长！天黑得晚不是你熬夜的理由，蝉都替你着急！',
  小暑: '小暑一到大汗蒸，睡前冲个凉，凉快入梦乡！',
  大暑: '大暑热到融化！空调被子西瓜……等等，先上床！',
  立秋: '立秋贴秋膘？睡够觉才贴得科学，动物们开始储备睡眠了！',
  处暑: '处暑出暑，秋老虎退散！早晚凉快，正是早睡黄金档！',
  白露: '白露身不露！晚上盖好被子，动物们已经换上厚睡衣啦。',
  秋分: '秋分又平分昼夜！天黑变早了，正好——早睡不亏！',
  寒露: '寒露脚不露，睡前泡泡脚，一觉到天亮！',
  霜降: '霜降霜降，被子加厚一档！今晚的被窝会感谢你早点来。',
  立冬: '立冬！冬眠界开学了，熊都上床了，你好意思熬夜吗？',
  小雪: '小雪到，动物们集体装睡准备冬眠。早睡是入冬礼仪！',
  大雪: '大雪纷飞，夜变长啦——这是让你睡饱的官方通知！',
  冬至: '冬至夜最长！一年里最理直气壮的睡觉日，给我好好睡！',
}

export interface TermInfo {
  name: string
  index: number
  season: Season
  tip: string
  nextName: string
  daysToNext: number
}

export function currentTerm(now = new Date()): TermInfo {
  const y = now.getFullYear()
  const cursor = now.getTime()
  const list: { t: number; i: number }[] = []
  for (const year of [y - 1, y, y + 1]) {
    for (let i = 0; i < 24; i++) {
      list.push({ t: new Date(year, TERM_MONTH[i] - 1, termDay(year, i)).getTime(), i })
    }
  }
  list.sort((a, b) => a.t - b.t)
  let cur = list[0]
  let next = list[1]
  for (let k = 0; k < list.length - 1; k++) {
    if (list[k].t <= cursor && cursor < list[k + 1].t) {
      cur = list[k]
      next = list[k + 1]
      break
    }
  }
  const name = TERM_NAMES[cur.i]
  return {
    name,
    index: cur.i,
    season: seasonOf(cur.i),
    tip: TERM_TIPS[name],
    nextName: TERM_NAMES[next.i],
    daysToNext: Math.max(0, Math.ceil((next.t - cursor) / 86400000)),
  }
}
