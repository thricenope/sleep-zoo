import type { CSSProperties } from 'react'

export type IconName =
  // 睡眠
  | 'bed' | 'alarm' | 'clock' | 'zzz' | 'paw'
  // 界面
  | 'flame' | 'star' | 'trophy' | 'lock' | 'left' | 'right' | 'close' | 'check'
  | 'pencil' | 'download' | 'upload' | 'calendar' | 'chart' | 'sparkle' | 'trash' | 'crown'
  | 'moon' | 'sun'

const P: Record<IconName, string[]> = {
  bed: ['M3 18 v-9 a2 2 0 0 1 2 -2 h5 a4 4 0 0 1 4 4 v7', 'M14 18 v-5 a3 3 0 0 1 3 -3 h1 a3 3 0 0 1 3 3 v5', 'M3 18 h18', 'M6.5 12 a1.7 1.7 0 1 0 .01 0'],
  alarm: ['M12 13.5 v-4.5', 'M12 13.5 l3 1.8', 'M12 13.5 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0', 'M5.5 3.5 L3 5.8', 'M18.5 3.5 L21 5.8'],
  clock: ['M12 12 m-8.5 0 a8.5 8.5 0 1 0 17 0 a8.5 8.5 0 1 0 -17 0', 'M12 7 v5 l3.4 2.2'],
  zzz: ['M4 8.5 h5 l-5 5.5 h5', 'M11.5 5.5 h4.5 l-4.5 5 h4.5', 'M17.5 12.5 h4 l-4 4.5 h4'],
  paw: ['M7.4 6 a2 2 0 1 0 .01 0', 'M12 4.4 a2 2 0 1 0 .01 0', 'M16.6 6 a2 2 0 1 0 .01 0', 'M12 11 c-4 0 -6.6 2.4 -6.6 5.2 c0 1.9 1.5 2.9 3.2 2.9 c1.2 0 2.3 -.6 3.4 -.6 c1.1 0 2.2 .6 3.4 .6 c1.7 0 3.2 -1 3.2 -2.9 c0 -2.8 -2.6 -5.2 -6.6 -5.2 z'],
  flame: ['M12 2.5 c.8 3.2 4.5 5 4.5 9.3 a4.5 4.5 0 0 1 -9 0 c0 -1.9 .9 -3.3 1.9 -4.9 c.4 1.3 1.1 2.1 2.1 2.6 c-.6 -2.3 -.2 -4.8 .5 -7 z'],
  star: ['M12 3 l2.7 5.7 6.1 .8 -4.5 4.3 1.2 6 -5.5 -3 -5.5 3 1.2 -6 L3.2 9.5 l6.1 -.8 z'],
  trophy: ['M7 4 h10 v4.5 a5 5 0 0 1 -10 0 z', 'M7 5 H4.5 a3 3 0 0 0 3.2 3.8', 'M17 5 h2.5 a3 3 0 0 1 -3.2 3.8', 'M12 13.5 v3', 'M8.5 20 h7', 'M10 16.5 h4 l.8 3.5 h-5.6 z'],
  lock: ['M6.5 11 h11 v8.5 h-11 z', 'M9 11 V8 a3 3 0 0 1 6 0 v3', 'M12 14.5 v1.5'],
  left: ['M14.5 5.5 L8 12 l6.5 6.5'],
  right: ['M9.5 5.5 L16 12 l-6.5 6.5'],
  close: ['M6 6 L18 18', 'M18 6 L6 18'],
  check: ['M5 12.5 l4.5 4.5 L19 7'],
  pencil: ['M4.5 19.5 l1 -4 L16 5 l3 3 L8.5 18.5 l-4 1 z', 'M14 7 l3 3'],
  download: ['M12 4 v10.5', 'M8 11 l4 4 4 -4', 'M4.5 17 v1.5 a2 2 0 0 0 2 2 h11 a2 2 0 0 0 2 -2 V17'],
  upload: ['M12 14.5 V4', 'M8 8 l4 -4 4 4', 'M4.5 17 v1.5 a2 2 0 0 0 2 2 h11 a2 2 0 0 0 2 -2 V17'],
  calendar: ['M4.5 6.5 h15 v14 h-15 z', 'M4.5 11 h15', 'M8.5 4 v4', 'M15.5 4 v4', 'M8.5 14.5 v.01', 'M12 14.5 v.01', 'M15.5 14.5 v.01', 'M8.5 17.5 v.01', 'M12 17.5 v.01'],
  chart: ['M4 20 h16.5', 'M7 20 v-6.5', 'M12 20 V7', 'M17 20 v-9.5'],
  sparkle: ['M12 3 l1.9 5.6 L19.5 10.5 l-5.6 1.9 L12 18 l-1.9 -5.6 L4.5 10.5 l5.6 -1.9 z', 'M18.5 16 l.8 2.2 2.2 .8 -2.2 .8 -.8 2.2 -.8 -2.2 -2.2 -.8 2.2 -.8 z'],
  trash: ['M4.5 7 h15', 'M9.5 7 V5 a1.5 1.5 0 0 1 1.5 -1.5 h2 A1.5 1.5 0 0 1 14.5 5 v2', 'M6.5 7 l1 13 h9 l1 -13', 'M10 11 v5', 'M14 11 v5'],
  crown: ['M4.5 17 L3 7.5 l5.2 3.8 L12 4 l3.8 7.3 L21 7.5 L19.5 17 z', 'M4.5 20 h15'],
  moon: ['M21 12.8 A9 9 0 1 1 11.2 3 a7 7 0 0 0 9.8 9.8 z', 'M17 8 l.4 1 1 .4 -1 .4 -.4 1 -.4 -1 -1 -.4 1 -.4 z', 'M5 5 l.4 1 1 .4 -1 .4 -.4 1 -.4 -1 -1 -.4 1 -.4 z'],
  sun: ['M12 8 a4 4 0 1 0 0 8 a4 4 0 1 0 0 -8', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
}

export interface IconProps {
  name: IconName
  size?: number
  style?: CSSProperties
  className?: string
}

export const Icon = ({ name, size = 22, style, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.1}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
    aria-hidden="true"
  >
    {P[name].map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
)
