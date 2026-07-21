import type { MonthlyIntentions } from '../types'

export const INTENTIONS_KEY = 'glow-within-intentions'
export const WEEKS_PER_PRIORITY = 4

export function currentMonthKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function emptyIntentions(): MonthlyIntentions {
  return {
    month: currentMonthKey(),
    focus: '',
    priorities: [''],
    prioritiesDone: [false],
    priorityWeeks: [0],
    notes: '',
  }
}

/** Normalizes parallel priority arrays for data saved before newer fields. */
export function withDone(intentions: MonthlyIntentions): MonthlyIntentions {
  const weeks = intentions.priorities.map((_, index) => {
    const stored = intentions.priorityWeeks?.[index]
    if (typeof stored === 'number' && Number.isFinite(stored)) {
      return Math.max(0, Math.min(WEEKS_PER_PRIORITY, Math.round(stored)))
    }
    // Older data: a completed priority counts as a full month of weeks.
    return intentions.prioritiesDone?.[index] === true ? WEEKS_PER_PRIORITY : 0
  })

  return {
    ...intentions,
    priorityWeeks: weeks,
    prioritiesDone: weeks.map((count) => count >= WEEKS_PER_PRIORITY),
  }
}

/** Short status for a priority's weekly progress. */
export function weekLabel(weeks: number): string {
  if (weeks >= WEEKS_PER_PRIORITY) return 'Completed'
  if (weeks <= 0) return 'Not started'
  return `Week ${weeks}`
}

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
