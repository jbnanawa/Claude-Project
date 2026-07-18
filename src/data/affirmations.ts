export const AFFIRMATIONS = [
  'I am becoming the woman I quietly dreamed of becoming.',
  'Softness is my strength, and I move through the day with ease.',
  'I attract what aligns with my peace and highest self.',
  'My goals grow gently, and I trust my own timing.',
  'I glow from within, and that light guides every choice I make.',
  'I release what no longer serves me and make room for beauty.',
  'I am worthy of rest, joy, and the life I am creating.',
  'Every small step I take is shaping a luminous future.',
  'I speak kindly to myself and celebrate how far I have come.',
  'Abundance finds me when I stay open, grounded, and true.',
  'I am connected to clarity, courage, and calm.',
  'My vision is vivid, and I take inspired action toward it.',
  'I honor my energy and protect what makes me feel alive.',
  'Love, creativity, and possibility flow freely through me.',
  'I trust that what is meant for me is already making its way.',
]

export function getDailyAffirmation(date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86_400_000)
  return AFFIRMATIONS[dayOfYear % AFFIRMATIONS.length]
}
