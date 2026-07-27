import { useId, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  INTENTIONS_KEY,
  WEEKS_PER_PRIORITY,
  coerceIntentionsStore,
  currentMonthKey,
  intentionsForMonth,
  isMonthlyIntentionsStore,
  weekLabel,
  type MonthlyIntentionsStore,
} from '../lib/intentions'
import type { MonthlyIntentions, View } from '../types'

interface MonthlyIntentionsPreviewProps {
  onNavigate: (view: View, targetId?: string) => void
}

export function MonthlyIntentionsPreview({
  onNavigate,
}: MonthlyIntentionsPreviewProps) {
  const gaugeGradientId = `intention-gauge-${useId().replace(/:/g, '')}`
  const [rawStored] = useLocalStorage<
    MonthlyIntentionsStore | MonthlyIntentions
  >(INTENTIONS_KEY, {}, isMonthlyIntentionsStore)

  const store = useMemo(
    () => coerceIntentionsStore(rawStored),
    [rawStored],
  )
  const monthKey = currentMonthKey()
  const intentions = intentionsForMonth(store, monthKey)
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
  const semiCircumference = Math.PI * radius
  const dashOffset = semiCircumference * (1 - ringProgress)
  const gaugeHeight = ringSize / 2 + stroke / 2
  const cx = ringSize / 2
  const cy = ringSize / 2

  return (
    <section
      className="glass-card relative h-full overflow-hidden p-5 sm:p-6"
      aria-label="Monthly goals"
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
          onClick={() => onNavigate('goals', 'monthly')}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-1 text-sm font-medium text-accent transition hover:text-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {hasContent ? 'Monthly goals' : 'Set them'}
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
        <div className="relative mt-6 flex flex-col items-center justify-center py-6 text-center sm:py-8">
          <span
            className="grid h-14 w-14 place-items-center text-sage-400"
            aria-hidden="true"
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 3v4M16 3v4" />
              <path d="M12 14.5l.9 1.9 2.1.3-1.5 1.5.4 2.1L12 19.2l-1.9 1.1.4-2.1-1.5-1.5 2.1-.3.9-1.9z" />
            </svg>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            No goals planted for {monthLabel} yet. Set a focus and a few
            priorities — they&apos;ll bloom here as you mark progress.
          </p>
        </div>
      ) : (
        <div className="relative mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="mx-auto shrink-0 sm:mx-0">
            <div
              className="relative flex flex-col items-center"
              style={{ width: ringSize }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={weekMax || priorities.length || 1}
              aria-valuenow={weekMax > 0 ? weekTotal : completedCount}
              aria-label="This month's intention progress"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ height: gaugeHeight }}
              >
                <svg
                  className="absolute left-0 top-0"
                  width={ringSize}
                  height={ringSize}
                  viewBox={`0 0 ${ringSize} ${ringSize}`}
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id={gaugeGradientId}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3d483d" />
                      <stop offset="55%" stopColor="#5f735f" />
                      <stop offset="100%" stopColor="#9aaf9a" />
                    </linearGradient>
                  </defs>
                  {/* Top semicircle: rotate so stroke starts at 9 o'clock and runs to 3. */}
                  <g transform={`rotate(180 ${cx} ${cy})`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={stroke}
                      strokeDasharray={`${semiCircumference} ${circumference}`}
                      strokeLinecap="round"
                      className="text-sage-200/80"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill="none"
                      stroke={`url(#${gaugeGradientId})`}
                      strokeWidth={stroke}
                      strokeLinecap="round"
                      strokeDasharray={`${semiCircumference} ${circumference}`}
                      strokeDashoffset={dashOffset}
                      className="transition-[stroke-dashoffset] duration-700"
                    />
                  </g>
                </svg>
              </div>
              <div className="-mt-3 text-center">
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
                  done
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
