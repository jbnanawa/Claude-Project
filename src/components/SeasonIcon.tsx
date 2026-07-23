import type { SeasonId } from '../lib/garden'

export type GardenMarkId = SeasonId | 'water'

interface SeasonIconProps {
  id: GardenMarkId
  className?: string
  title?: string
}

const EMOJI: Record<GardenMarkId, string> = {
  seed: '🌱',
  sprout: '🌿',
  bloom: '🌸',
  garden: '🌷',
  forest: '🌳',
  sanctuary: '✨',
  'glow-within': '🌌',
  water: '💧',
}

/** Garden mark — Seed → Glow Within (+ Water). */
export function SeasonIcon({
  id,
  className = 'text-base',
  title,
}: SeasonIconProps) {
  return (
    <span
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      title={title}
      className={`inline-flex shrink-0 items-center justify-center leading-none ${className}`}
    >
      {EMOJI[id]}
    </span>
  )
}
