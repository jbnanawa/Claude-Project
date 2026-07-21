import { dayKey } from './date'
import type { JournalEntry } from '../types'

export type SeasonId =
  | 'seed'
  | 'sprout'
  | 'bloom'
  | 'garden'
  | 'forest'
  | 'sanctuary'
  | 'glow-within'

export interface GardenStage {
  at: number
  id: SeasonId
  label: string
  message: string
}

export const GARDEN_STAGES: GardenStage[] = [
  {
    at: 1,
    id: 'seed',
    label: 'Seed',
    message: "You've planted the first seed of your future.",
  },
  {
    at: 3,
    id: 'sprout',
    label: 'Sprout',
    message: 'Your consistency is taking root.',
  },
  {
    at: 7,
    id: 'bloom',
    label: 'Bloom',
    message: 'Your inner light is beginning to shine.',
  },
  {
    at: 14,
    id: 'garden',
    label: 'Garden',
    message: "You've cultivated a life worth nurturing.",
  },
  {
    at: 30,
    id: 'forest',
    label: 'Forest',
    message: 'Your growth now inspires those around you.',
  },
  {
    at: 60,
    id: 'sanctuary',
    label: 'Sanctuary',
    message: "You've created a place of peace within.",
  },
  {
    at: 100,
    id: 'glow-within',
    label: 'Glow Within',
    message: 'Your dreams and daily actions are now beautifully aligned.',
  },
]

/** Unique watered days, oldest first. */
export function plantedDays(entries: JournalEntry[]): string[] {
  const watered = new Set<string>()
  for (const entry of entries) {
    watered.add(dayKey(new Date(entry.createdAt)))
  }
  return [...watered].sort((a, b) => a.localeCompare(b))
}

export function stageIndexForDays(totalDays: number): number {
  return GARDEN_STAGES.reduce(
    (current, item, index) => (totalDays >= item.at ? index : current),
    -1,
  )
}

export function stageForDays(totalDays: number): GardenStage | null {
  const index = stageIndexForDays(totalDays)
  return index >= 0 ? GARDEN_STAGES[index] : null
}

/** Season unlocked by the check-in day count through `day` (inclusive). */
export function stageForDay(
  planted: string[],
  day: string,
): GardenStage | null {
  const count = planted.filter((key) => key <= day).length
  return stageForDays(count)
}

/** Current overall season from all entries. */
export function currentStage(entries: JournalEntry[]): GardenStage | null {
  return stageForDays(plantedDays(entries).length)
}
