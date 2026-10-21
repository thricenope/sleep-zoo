import { motion } from 'framer-motion'
import type { AnimalId } from '../logic/animals'
import type { Season } from '../logic/solar'

export type ZooStatus =
  | 'sleeping' // 盖被打呼 Zzz
  | 'great' // 星星眼举手
  | 'good' // 满意
  | 'yawn' // 大打哈欠
  | 'tired' // 黑眼圈+咖啡吊瓶
  | 'ghost' // 灵魂出窍
  | 'lazy' // 赖床王冠
  | 'idle' // 待机

interface Palette {
  body: string
  dark: string
  outline: string
  belly: string
  inner: string
}

const P: Record<AnimalId, Palette> = {
  hamster: { body: '#FFD9A8', dark: '#F2BE86', outline: '#B8865F', belly: '#FFF1DC', inner: '#FFC9A8' },
  shiba: { body: '#F5B971', dark: '#E09B4F', outline: '#A96F2F', belly: '#FFF3E0', inner: '#FFDCC0' },
  rabbit: { body: '#FFF6F2', dark: '#EBD6CE', outline: '#C99AA8', belly: '#FFFFFF', inner: '#FFC9D8' },
  cat: { body: '#C9C2E8', dark: '#A79DD1', outline: '#6B5FA8', belly: '#EFEBFF', inner: '#FFC9D8' },
  fox: { body: '#FF9E7D', dark: '#E87B5A', outline: '#B04A2E', belly: '#FFF3E8', inner: '#7E4A3A' },
  sloth: { body: '#C9B8A3', dark: '#AD987E', outline: '#7E6A52', belly: '#E2D5C2', inner: '#B89F88' },
  owl: { body: '#A9A4CC', dark: '#877FB0', outline: '#5D5486', belly: '#E8E4FA', inner: '#6B6394' },
  bear: { body: '#C89878', dark: '#A87858', outline: '#6E4A32', belly: '#EAD3BC', inner: '#D9AE8E' },
}

const INK = '#4A3355'

/** Q版夸张动物：物种 × 状态 × 节气配饰 */
export const Animal = ({
  species,
  status,
  season,
  size = 150,
}: {
  species: AnimalId
  status: ZooStatus
  season: Season
  size?: number
}) => {
  const c = P[species] ?? P.hamster

  const ears = () => {
    switch (species) {
      case 'shiba':
      case 'cat':
        return (
          <g>
            <path d="M38 46 L44 16 L66 36 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M122 46 L116 16 L94 36 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M46 38 L49 24 L60 34 z" fill={c.inner} />
            <path d="M114 38 L111 24 L100 34 z" fill={c.inner} />
          </g>
        )
      case 'fox':
        return (
          <g>
            <path d="M32 52 L40 8 L70 38 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M128 52 L120 8 L90 38 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M38 34 L40 16 L54 30 z" fill={c.inner} />
            <path d="M122 34 L120 16 L106 30 z" fill={c.inner} />
          </g>
        )
      case 'rabbit':
        return (
          <g>
            <ellipse cx="52" cy="16" rx="13" ry="30" transform="rotate(-10 52 16)" fill={c.body} stroke={c.outline} strokeWidth="3" />
            <ellipse cx="52" cy="18" rx="6" ry="18" transform="rotate(-10 52 18)" fill={c.inner} />
            <ellipse cx="108" cy="14" rx="13" ry="30" transform="rotate(12 108 14)" fill={c.body} stroke={c.outline} strokeWidth="3" />
            <ellipse cx="108" cy="16" rx="6" ry="18" transform="rotate(12 108 16)" fill={c.inner} />
          </g>
        )
      case 'owl':
        return (
          <g>
            <path d="M42 40 L48 14 L64 34 z" fill={c.dark} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M118 40 L112 14 L96 34 z" fill={c.dark} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
          </g>
        )
      case 'sloth':
        return (
          <g fill={c.dark} stroke={c.outline} strokeWidth="2.5">
            <circle cx="48" cy="34" r="11" />
            <circle cx="112" cy="34" r="11" />
          </g>
        )
      case 'bear':
        return (
          <g>
            <circle cx="42" cy="30" r="15" fill={c.body} stroke={c.outline} strokeWidth="3" />
            <circle cx="118" cy="30" r="15" fill={c.body} stroke={c.outline} strokeWidth="3" />
            <circle cx="42" cy="30" r="7" fill={c.inner} />
            <circle cx="118" cy="30" r="7" fill={c.inner} />
          </g>
        )
      default: // hamster
        return (
          <g fill={c.body} stroke={c.outline} strokeWidth="3">
            <circle cx="48" cy="34" r="13" />
            <circle cx="112" cy="34" r="13" />
          </g>
        )
    }
  }

  const body = () => (
    <g>
      <path d="M80 26 C116 26 134 52 134 92 C134 128 114 146 80 146 C46 146 26 128 26 92 C26 52 44 26 80 26 z" fill={c.body} stroke={c.outline} strokeWidth="3.2" />
      {species === 'owl' ? (
        <ellipse cx="80" cy="102" rx="34" ry="30" fill={c.belly} />
      ) : (
        <ellipse cx="80" cy="112" rx="30" ry="24" fill={c.belly} opacity="0.9" />
      )}
      {species === 'hamster' && (
        <g fill={c.inner} opacity="0.85">
          <circle cx="42" cy="86" r="10" />
          <circle cx="118" cy="86" r="10" />
        </g>
      )}
      {species === 'sloth' && (
        <g fill={c.dark} opacity="0.75">
          <ellipse cx="58" cy="76" rx="12" ry="14" transform="rotate(14 58 76)" />
          <ellipse cx="102" cy="76" rx="12" ry="14" transform="rotate(-14 102 76)" />
        </g>
      )}
      {species === 'owl' && (
        <g>
          <circle cx="60" cy="76" r="17" fill="#fff" stroke={c.outline} strokeWidth="2" />
          <circle cx="100" cy="76" r="17" fill="#fff" stroke={c.outline} strokeWidth="2" />
        </g>
      )}
    </g>
  )

  const eyes = () => {
    switch (status) {
      case 'sleeping':
        return (
          <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
            <path d="M50 76 q8 7 16 0" />
            <path d="M94 76 q8 7 16 0" />
          </g>
        )
      case 'great':
        return (
          <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
            <path d="M50 78 l5 -7 5 7 5 -7 5 7" transform="translate(-8 0)" />
            <path d="M94 78 l5 -7 5 7 5 -7 5 7" transform="translate(-8 0)" />
          </g>
        )
      case 'good':
      case 'lazy':
        return (
          <g stroke={INK} strokeWidth="3.6" strokeLinecap="round" fill="none">
            <path d="M52 74 q7 -8 15 0" />
            <path d="M93 74 q7 -8 15 0" />
          </g>
        )
      case 'tired':
        return (
          <g stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none">
            <path d="M50 70 h16" />
            <path d="M50 76 q8 4 16 0" />
            <path d="M94 70 h16" />
            <path d="M94 76 q8 4 16 0" />
            {/* 黑眼圈 */}
            <path d="M52 84 q8 4 14 1" stroke={c.outline} strokeWidth="2.4" opacity="0.8" />
            <path d="M94 85 q8 3 14 -1" stroke={c.outline} strokeWidth="2.4" opacity="0.8" />
          </g>
        )
      case 'ghost':
        return (
          <g>
            <ellipse cx="58" cy="76" rx="3.4" ry="5" fill={INK} />
            <ellipse cx="102" cy="76" rx="3.4" ry="5" fill={INK} />
          </g>
        )
      case 'yawn':
        return (
          <g fill={INK}>
            <circle cx="58" cy="72" r="4.6" />
            <circle cx="102" cy="72" r="4.6" />
          </g>
        )
      default:
        return (
          <g fill={INK}>
            <circle cx="58" cy="74" r="5" />
            <circle cx="102" cy="74" r="5" />
            <circle cx="60" cy="72" r="1.7" fill="#fff" />
            <circle cx="104" cy="72" r="1.7" fill="#fff" />
          </g>
        )
    }
  }

  const mouth = () => {
    if (species === 'owl') {
      return <path d="M80 88 L86 96 L74 96 z" fill="#FFB454" stroke={c.outline} strokeWidth="2" strokeLinejoin="round" />
    }
    switch (status) {
      case 'sleeping':
        return <ellipse cx="80" cy="92" rx="5" ry="6.5" fill={INK} />
      case 'great':
        return <path d="M68 92 q12 14 24 0 q-12 6 -24 0 z" fill={INK} />
      case 'good':
      case 'lazy':
        return <path d="M70 92 q10 9 20 0" stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      case 'tired':
        return <path d="M72 96 q8 -5 16 0" stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      case 'yawn':
        return (
          <g>
            <ellipse cx="80" cy="98" rx="14" ry="17" fill={INK} />
            <ellipse cx="80" cy="106" rx="8" ry="6" fill="#E87B9D" />
          </g>
        )
      case 'ghost':
        return <path d="M70 94 q5 4 10 0 q5 4 10 0" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      default:
        return species === 'rabbit' ? (
          <g>
            <path d="M76 90 h8 v0" stroke={INK} strokeWidth="2" />
            <rect x="74" y="91" width="6" height="8" rx="2" fill="#fff" stroke={c.outline} strokeWidth="1.4" />
            <rect x="81" y="91" width="6" height="8" rx="2" fill="#fff" stroke={c.outline} strokeWidth="1.4" />
          </g>
        ) : species === 'cat' ? (
          <g stroke={INK} strokeWidth="2.8" strokeLinecap="round" fill="none">
            <path d="M74 90 q3 4 6 0 q3 4 6 0" />
          </g>
        ) : (
          <path d="M73 91 q7 6 14 0" stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        )
    }
  }

  const arms = () => {
    if (status === 'great') {
      return (
        <g fill={c.dark} stroke={c.outline} strokeWidth="2.6">
          <ellipse cx="24" cy="66" rx="9" ry="14" transform="rotate(40 24 66)" />
          <ellipse cx="136" cy="66" rx="9" ry="14" transform="rotate(-40 136 66)" />
        </g>
      )
    }
    if (status === 'tired') {
      // 一只爪举着咖啡
      return (
        <g>
          <g fill={c.dark} stroke={c.outline} strokeWidth="2.6">
            <ellipse cx="26" cy="106" rx="9" ry="8" />
          </g>
          <g fill={c.dark} stroke={c.outline} strokeWidth="2.6">
            <ellipse cx="134" cy="92" rx="9" ry="11" transform="rotate(-24 134 92)" />
          </g>
          <g>
            <rect x="126" y="70" width="18" height="20" rx="4" fill="#fff" stroke={c.outline} strokeWidth="2.6" />
            <path d="M144 75 q7 1 5 7 q-6 1 -5 -7" fill="#fff" stroke={c.outline} strokeWidth="2.2" />
            <path d="M131 64 q2 -4 0 -7 M138 64 q2 -4 0 -7" stroke="#B8AACC" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>
        </g>
      )
    }
    if (status === 'yawn') {
      return (
        <g fill={c.dark} stroke={c.outline} strokeWidth="2.6">
          <ellipse cx="26" cy="104" rx="9" ry="8" />
          <ellipse cx="126" cy="82" rx="11" ry="9" transform="rotate(18 126 82)" />
        </g>
      )
    }
    if (status === 'sleeping') {
      return null // 被被子盖住
    }
    return (
      <g fill={c.dark} stroke={c.outline} strokeWidth="2.6">
        <ellipse cx="27" cy="106" rx="9" ry="8" />
        <ellipse cx="133" cy="106" rx="9" ry="8" />
      </g>
    )
  }

  const blanket = () =>
    status === 'sleeping' ? (
      <g>
        <path
          d="M22 128 Q50 112 80 126 Q110 140 138 124 L138 152 Q110 162 80 156 Q50 150 22 158 z"
          fill="#8FA0E8"
          stroke="#6B7BC9"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M34 138 q6 5 12 1 M58 144 q6 5 12 1 M92 146 q6 5 12 1 M116 138 q6 5 12 1"
          stroke="#B8C2F2" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
    ) : null

  const accessory = () => {
    switch (season) {
      case 'spring':
        return (
          <g>
            <g transform="translate(126 30)">
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="0" cy="-9" rx="4.5" ry="7" transform={`rotate(${a})`} fill="#FFB7CC" stroke="#E87B9D" strokeWidth="1.6" />
              ))}
              <circle r="4" fill="#FFD86B" stroke="#E0A32E" strokeWidth="1.6" />
            </g>
          </g>
        )
      case 'summer':
        return (
          <g>
            <ellipse cx="80" cy="26" rx="44" ry="12" fill="#F2D8A0" stroke="#B8865F" strokeWidth="2.6" />
            <path d="M52 26 Q52 4 80 4 Q108 4 108 26 z" fill="#FFC98A" stroke="#B8865F" strokeWidth="2.6" />
            <path d="M64 14 Q80 8 96 14" stroke="#E0A32E" strokeWidth="2" fill="none" />
          </g>
        )
      case 'autumn':
        return (
          <g>
            <rect x="48" y="128" width="64" height="16" rx="8" fill="#E8794A" stroke="#A94A26" strokeWidth="2.6" />
            <rect x="98" y="136" width="16" height="26" rx="7" fill="#E8794A" stroke="#A94A26" strokeWidth="2.6" />
            <path d="M56 134 h48" stroke="#FFB48A" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )
      case 'winter':
        return (
          <g>
            <path d="M44 34 Q44 6 80 6 Q116 6 116 34 z" fill="#7EC9FF" stroke="#4A8AC9" strokeWidth="2.8" />
            <rect x="40" y="30" width="80" height="12" rx="6" fill="#5FA8E8" stroke="#4A8AC9" strokeWidth="2.8" />
            <circle cx="80" cy="2" r="7" fill="#FFF3D6" stroke="#E0C98A" strokeWidth="2" />
            <path d="M56 18 q8 -5 16 -1 M72 14 q8 -4 16 0" stroke="#A8D8FF" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )
    }
  }

  const extras = () => {
    const bits: React.ReactNode[] = []
    if (species === 'cat') {
      bits.push(
        <g key="wh" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
          <path d="M26 88 L44 91" />
          <path d="M28 99 L44 97" />
          <path d="M134 88 L116 91" />
          <path d="M132 99 L116 97" />
        </g>,
      )
    }
    if (species === 'shiba' && (status === 'good' || status === 'great' || status === 'lazy')) {
      bits.push(
        <path key="tongue" d="M76 98 q4 10 8 0 q-4 3 -8 0 z" fill="#E87B9D" stroke={c.outline} strokeWidth="1.6" />,
      )
    }
    if (status === 'ghost') {
      bits.push(
        <g key="soul">
          <motion.g
            animate={{ y: [-3, -8, -3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="128" cy="26" rx="10" ry="12" fill="#FFFFFF" stroke="#B8C2E8" strokeWidth="2" opacity="0.95" />
            <path d="M120 34 q3 3 5 0 q2 3 4 0 q2 3 4 0" fill="#fff" stroke="#B8C2E8" strokeWidth="1.6" />
            <path d="M124 25 q2 2 4 0 M130 25 q2 2 4 0" stroke={INK} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </motion.g>
          <path d="M112 34 Q120 48 108 58" stroke="#B8C2E8" strokeWidth="2" strokeDasharray="4 4" fill="none" strokeLinecap="round" />
        </g>,
      )
    }
    if (status === 'lazy') {
      bits.push(
        <g key="crown" transform="translate(56 -6)">
          <path d="M0 20 L4 6 L14 15 L24 2 L34 15 L44 6 L48 20 z" fill="#FFD86B" stroke="#D0A32E" strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="24" cy="1" r="3.4" fill="#FF9E7D" stroke="#D0A32E" strokeWidth="1.6" />
        </g>,
      )
    }
    if (status === 'great') {
      bits.push(
        <g key="spark" fill="#FFD86B" stroke="#E0A32E" strokeWidth="1.4">
          <path d="M16 34 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
          <path d="M142 52 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 z" />
        </g>,
      )
    }
    if (status === 'sleeping') {
      bits.push(
        <g key="zzz" fill="#8A77C9" fontFamily="Baloo 2, sans-serif" fontWeight="800">
          <motion.text x="118" y="52" fontSize="20" animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>Z</motion.text>
          <motion.text x="136" y="36" fontSize="15" animate={{ opacity: [1, 0.2, 1], y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}>z</motion.text>
          <motion.text x="146" y="24" fontSize="11" animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}>z</motion.text>
        </g>,
      )
    }
    return bits
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      aria-hidden="true"
      animate={{ y: status === 'sleeping' ? [0, 2.5, 0] : [0, -3, 0], rotate: status === 'ghost' ? -5 : 0 }}
      transition={{ duration: status === 'sleeping' ? 3.2 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {ears()}
      {body()}
      {species !== 'owl' && (
        <>
          <ellipse cx="52" cy="92" rx="8" ry="5" fill="#FF8FA3" opacity="0.7" />
          <ellipse cx="108" cy="92" rx="8" ry="5" fill="#FF8FA3" opacity="0.7" />
        </>
      )}
      {eyes()}
      {mouth()}
      {arms()}
      {blanket()}
      {accessory()}
      {extras()}
    </motion.svg>
  )
}
