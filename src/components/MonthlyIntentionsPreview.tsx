import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  INTENTIONS_KEY,
  WEEKS_PER_PRIORITY,
  currentMonthKey,
  emptyIntentions,
  isMonthlyIntentions,
  weekLabel,
  withDone,
} from '../lib/intentions'
import type { MonthlyIntentions, View } from '../types'

interface MonthlyIntentionsPreviewProps {
  onNavigate: (view: View) => void
}

export function MonthlyIntentionsPreview({
  onNavigate,
}: MonthlyIntentionsPreviewProps) {
  const [stored] = useLocalStorage<MonthlyIntentions>(
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
      weeks: weeks[index] ?? 0,
      done: (weeks[index] ?? 0) >= WEEKS_PER_PRIORITY,
    }))
    .filter((item) => item.text.trim())

  const completedCount = priorities.filter((item) => item.done).length
  const weekTotal = priorities.reduce((sum, item) => sum + item.weeks, 0)
  const weekMax = priorities.length * WEEKS_PER_PRIORITY
  const ringProgress =
    weekMax > 0 ? Math.min(1, weekTotal / weekMax) : completedCount > 0 ? 1 : 0

  const hasContent =
    intentions.focus.trim() || priorities.length > 0 || intentions.notes.trim()

  const monthLabel = new Date().toLocaleDateString(undefined, {
    month: 'long',
  })

  const ringSize = 112
  const stroke = 8
  const radius = (ringSize - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - ringProgress)

  return (
    <section
      className="glass-card relative overflow-hidden p-5 animate-fade-up sm:p-6"
      style={{ animationDelay: '150ms' }}
      aria-label="Monthly intentions"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-blush-200/40 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-sage-200/50 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-600">
            {monthLabel}
          </p>
          <h2 className="mt-0.5 font-display text-xl text-ink sm:text-2xl">
            This month at a glance
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('goals')}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-1 text-sm font-medium text-blush-600 transition hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
        >
          {hasContent ? 'Open Intentions' : 'Set them'}
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
        <p className="relative mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
          No intentions planted for {monthLabel} yet. Set a focus and a few
          priorities on Intentions — they'll bloom here as you check weeks off.
        </p>
      ) : (
        <div className="relative mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="mx-auto shrink-0 sm:mx-0">
            <div
              className="relative grid place-items-center"
              style={{ width: ringSize, height: ringSize }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={weekMax || priorities.length || 1}
              aria-valuenow={weekMax > 0 ? weekTotal : completedCount}
              aria-label="This month's intention progress"
            >
              <svg
                className="absolute inset-0 -rotate-90"
                width={ringSize}
                height={ringSize}
                aria-hidden="true"
              >
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={stroke}
                  className="text-sage-200/80"
                />
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="text-sage-600 transition-[stroke-dashoffset] duration-700"
                />
              </svg>
              <div className="text-center">
                <p className="font-display text-3xl tabular-nums leading-none text-ink">
                  {priorities.length > 0 ? (
                    <>
                      {completedCount}
                      <span className="text-ink-muted">/</span>
                      {priorities.length}
                    </>
                  ) : (
                    '—'
                  )}
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage-600">
                  complete
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            {intentions.focus.trim() ? (
              <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                {intentions.focus}
              </p>
            ) : (
              <p className="font-display text-xl text-ink-soft">
                Your priorities for {monthLabel}
              </p>
            )}

            {priorities.length > 0 ? (
              <ul className="mt-4 divide-y divide-blush-200/70">
                {priorities.map((priority, index) => (
                  <li
                    key={index}
                    className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
                  >
                    <p
                      className={`min-w-0 text-sm leading-snug text-ink sm:text-base ${
                        priority.done ? 'opacity-55 line-through' : ''
                      }`}
                    >
                      {priority.text}
                    </p>
                    <span
                      className={`shrink-0 text-xs font-medium tabular-nums ${
                        priority.done
                          ? 'text-sage-600'
                          : priority.weeks > 0
                            ? 'text-ink-soft'
                            : 'text-ink-muted'
                      }`}
                    >
                      {weekLabel(priority.weeks)}
                      {!priority.done && priority.weeks > 0
                        ? ` · ${priority.weeks}/${WEEKS_PER_PRIORITY}`
                        : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : intentions.notes.trim() ? (
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                {intentions.notes}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </section>
  )
}
