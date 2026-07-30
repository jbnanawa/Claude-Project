import type { SeasonId } from '../lib/garden'
import bloom from '../assets/seasons/bloom.png'
import forest from '../assets/seasons/forest.png'
import garden from '../assets/seasons/garden.png'
import glowWithin from '../assets/seasons/glow-within.png'
import sanctuary from '../assets/seasons/sanctuary.png'
import seed from '../assets/seasons/seed.png'
import sprout from '../assets/seasons/sprout.png'
import water from '../assets/seasons/water.png'

export type GardenMarkId = SeasonId | 'water'

interface SeasonIconProps {
  id: GardenMarkId
  className?: string
  title?: string
}

const SRC: Record<GardenMarkId, string> = {
  seed,
  sprout,
  bloom,
  garden,
  forest,
  sanctuary,
  'glow-within': glowWithin,
  water,
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
      <img
        src={SRC[id]}
        alt=""
        draggable={false}
        className="h-[1em] w-[1em] object-contain opacity-100"
      />
    </span>
  )
}
