import type { MonthlyIntentions } from '../types'

export const INTENTIONS_KEY = 'glow-within-intentions'
export const WEEKS_PER_PRIORITY = 4
export const MAX_PRIORITIES = 3

export function currentMonthKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function emptyIntentions(): MonthlyIntentions {
  return {
    month: currentMonthKey(),
    focus: '',
    priorities: Array.from({ length: MAX_PRIORITIES }, () => ''),
    prioritiesDone: Array.from({ length: MAX_PRIORITIES }, () => false),
    priorityWeeks: Array.from({ length: MAX_PRIORITIES }, () => 0),
    notes: '',
  }
}

/** Ensure there are exactly MAX_PRIORITIES slots for the ritual UI. */
export function withPrioritySlots(
  intentions: MonthlyIntentions,
): MonthlyIntentions {
  const priorities = [...intentions.priorities]
  const weeks = [...(intentions.priorityWeeks ?? [])]
  const done = [...(intentions.prioritiesDone ?? [])]

  while (priorities.length < MAX_PRIORITIES) {
    priorities.push('')
    weeks.push(0)
    done.push(false)
  }

  return {
    ...intentions,
    priorities: priorities.slice(0, MAX_PRIORITIES),
    priorityWeeks: weeks
      .slice(0, MAX_PRIORITIES)
      .map((count) =>
        Math.max(0, Math.min(WEEKS_PER_PRIORITY, Math.round(count || 0))),
      ),
    prioritiesDone: done.slice(0, MAX_PRIORITIES),
  }
}

/** Normalizes parallel priority arrays for data saved before newer fields. */
export function withDone(intentions: MonthlyIntentions): MonthlyIntentions {
  const slotted = withPrioritySlots(intentions)
  const weeks = slotted.priorities.map((_, index) => {
    const stored = slotted.priorityWeeks?.[index]
    if (typeof stored === 'number' && Number.isFinite(stored)) {
      return Math.max(0, Math.min(WEEKS_PER_PRIORITY, Math.round(stored)))
    }
    // Older data: a completed priority counts as a full month of weeks.
    return slotted.prioritiesDone?.[index] === true ? WEEKS_PER_PRIORITY : 0
  })

  return {
    ...slotted,
    priorityWeeks: weeks,
    prioritiesDone: weeks.map((count) => count >= WEEKS_PER_PRIORITY),
  }
}

/** Short status for a priority's progress (4 steps = 100%). */
export const PROGRESS_LABELS = [
  'Not started',
  'Started',
  'Growing',
  'Almost there',
  'Complete',
] as const

export function weekLabel(weeks: number): string {
  const step = Math.max(0, Math.min(WEEKS_PER_PRIORITY, Math.round(weeks)))
  return PROGRESS_LABELS[step]
}

/** Percent points added by one progress step. */
export const PROGRESS_STEP_PERCENT = 100 / WEEKS_PER_PRIORITY

export function isMonthlyIntentions(
  value: unknown,
): value is MonthlyIntentions {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.month === 'string' &&
    typeof record.focus === 'string' &&
    typeof record.notes === 'string' &&
    Array.isArray(record.priorities) &&
    record.priorities.every((item) => typeof item === 'string') &&
    (record.prioritiesDone === undefined ||
      (Array.isArray(record.prioritiesDone) &&
        record.prioritiesDone.every((item) => typeof item === 'boolean'))) &&
    (record.priorityWeeks === undefined ||
      (Array.isArray(record.priorityWeeks) &&
        record.priorityWeeks.every(
          (item) => typeof item === 'number' && Number.isFinite(item),
        )))
  )
}
