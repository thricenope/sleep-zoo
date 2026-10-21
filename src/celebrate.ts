import confetti from 'canvas-confetti'

const DREAM = ['#8A77C9', '#FF9E7D', '#3DDC97', '#FFD86B', '#7EC9FF']

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const burst = (origin = { x: 0.5, y: 0.45 }) => {
  if (reduced()) return
  confetti({
    particleCount: 70,
    spread: 75,
    startVelocity: 38,
    scalar: 0.95,
    ticks: 190,
    origin,
    colors: DREAM,
    shapes: ['circle', 'star'],
    disableForReducedMotion: true,
  })
}

export const bigCelebration = () => {
  if (reduced()) return
  confetti({
    particleCount: 130,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.4 },
    colors: DREAM,
    shapes: ['circle', 'star'],
    disableForReducedMotion: true,
  })
  const end = Date.now() + 650
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      startVelocity: 52,
      origin: { x: 0, y: 0.75 },
      colors: DREAM,
      shapes: ['circle', 'star'],
      disableForReducedMotion: true,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      startVelocity: 52,
      origin: { x: 1, y: 0.75 },
      colors: DREAM,
      shapes: ['circle', 'star'],
      disableForReducedMotion: true,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export const burstAt = (el: HTMLElement | null) => {
  if (!el || reduced()) return
  const rect = el.getBoundingClientRect()
  burst({
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight,
  })
}
