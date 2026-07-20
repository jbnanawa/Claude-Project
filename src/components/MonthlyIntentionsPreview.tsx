import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  INTENTIONS_KEY,
  WEEKS_PER_PRIORITY,
  currentMonthKey,
  emptyIntentions,
  isMonthlyIntentions,
  plantForWeeks,
  withDone,
} from '../lib/intentions'
import type { MonthlyIntentions, View } from '../types'

interface MonthlyIntentionsPreviewProps {
  onNavigate: (view: View) => void
}

export function MonthlyIntentionsPreview({
  onNavigate,
}: MonthlyIntentionsPreviewProps) {
  const [stored, setStored] = useLocalStorage<MonthlyIntentions>(
    INTENTIONS_KEY,
    emptyIntentions(),
    isMonthlyIntentions,
  )

  const monthKey = currentMonthKey()
  const intentions = withDone(
    stored.month === monthKey ? stored : emptyIntentions(),
  )
  const weeks = intentions.priorityWeeks ?? []
  const priorities = intentions.priorities
    .map((text, index) => ({
      text,
      index,
      weeks: weeks[index] ?? 0,
      done: (weeks[index] ?? 0) >= WEEKS_PER_PRIORITY,
    }))
    .filter((item) => item.text.trim())
  const bloomedCount = priorities.filter((item) => item.done).length
  const hasContent =
    intentions.focus.trim() || priorities.length > 0 || intentions.notes.trim()

  const monthLabel = new Date().toLocaleDateString(undefined, {
    month: 'long',
  })

  function addWeek(index: number) {
    const current = intentions.priorityWeeks?.[index] ?? 0
    if (current >= WEEKS_PER_PRIORITY) return
    const nextWeeks = intentions.priorities.map(
      (_, i) => intentions.priorityWeeks?.[i] ?? 0,
    )
    nextWeeks[index] = current + 1
    setStored(
      withDone({
        ...intentions,
        month: monthKey,
        priorityWeeks: nextWeeks,
      }),
    )
  }

  return (
    <section
      className="glass-card rounded-2xl p-5 animate-fade-up sm:p-6"
      style={{ animationDelay: '150ms' }}
      aria-label="Monthly intentions"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl tracking-wide text-sage-600 sm:text-2xl">
          {monthLabel} intentions
        </h2>
        <button
          type="button"
          onClick={() => onNavigate('goals')}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-1 text-sm font-medium text-blush-600 transition hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
        >
          {hasContent ? 'Edit' : 'Set them'}
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
          </svg>
        </button>
      </div>

      {!hasContent ? (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          You haven't set your intentions for {monthLabel} yet — pop over to
          the Goals page and give your month a little direction.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {intentions.focus.trim() ? (
            <div className="rounded-2xl border border-blush-200 bg-blush-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-600">
                This month's focus
              </p>
              <p className="mt-2 font-display text-lg leading-snug text-ink sm:text-xl">
                {intentions.focus}
              </p>
            </div>
          ) : null}

          {priorities.length > 0 ? (
            <div className="divide-y divide-blush-200/80">
              {priorities.map((priority, index) => {
                const plant = plantForWeeks(priority.weeks)
                return (
                  <div key={index} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush-100 text-xs font-semibold text-blush-600"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <p
                        className={`min-w-0 flex-1 text-sm text-ink sm:text-base ${
                          priority.done ? 'line-through opacity-60' : ''
                        }`}
                      >
                        {priority.text}
                      </p>
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center text-base"
                        aria-hidden="true"
                      >
                        {plant || (
                          <span className="h-1.5 w-1.5 rounded-full bg-blush-200" />
                        )}
                      </span>
                    </div>
                    <div className="mt-2.5 ml-10 flex items-center gap-3">
                      <div
                        className="flex w-1/2 max-w-xs items-center gap-1.5"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={WEEKS_PER_PRIORITY}
                        aria-valuenow={priority.weeks}
                        aria-label={`${priority.text}: ${priority.weeks} of ${WEEKS_PER_PRIORITY} weeks`}
                      >
                        {Array.from(
                          { length: WEEKS_PER_PRIORITY },
                          (_, weekIndex) => (
                            <span
                              key={weekIndex}
                              className={`h-2 flex-1 rounded-full ${
                                weekIndex < priority.weeks
                                  ? 'bg-sage-600'
                                  : 'bg-sage-200/70'
                              }`}
                            />
                          ),
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => addWeek(priority.index)}
                        disabled={priority.done}
                        className="shrink-0 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-600 transition hover:bg-sage-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        + week
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3 rounded-2xl bg-sage-100 px-4 py-3">
            <p className="text-sm font-medium text-sage-600">
              This month's bouquet
            </p>
            <div className="flex items-center gap-2.5">
              <span className="text-sm tabular-nums text-sage-600">
                {bloomedCount} of {priorities.length || 0}
              </span>
              <div
                className="h-1.5 w-16 overflow-hidden rounded-full bg-sage-200/80 sm:w-20"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={priorities.length || 0}
                aria-valuenow={bloomedCount}
                aria-label="Bloomed priorities this month"
              >
                <div
                  className="h-full rounded-full bg-sage-600 transition-all duration-500"
                  style={{
                    width: `${
                      priorities.length > 0
                        ? (bloomedCount / priorities.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
