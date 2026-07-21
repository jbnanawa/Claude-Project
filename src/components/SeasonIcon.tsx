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

/** Line-art garden mark — Seed → Glow Within (+ Water). Transparent PNGs. */
export function SeasonIcon({
  id,
  className = 'h-5 w-5',
  title,
}: SeasonIconProps) {
  return (
    <img
      src={SRC[id]}
      alt=""
      title={title}
      aria-hidden={title ? undefined : true}
      className={`shrink-0 object-contain ${className}`}
      draggable={false}
    />
  )
}
