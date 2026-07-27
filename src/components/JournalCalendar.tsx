import { useEffect, useRef, useState } from 'react'
import { dayKey } from '../lib/date'
import {
  GARDEN_STAGES,
  currentStage,
  plantedDays,
  stageForDay,
} from '../lib/garden'
import type { JournalEntry } from '../types'
import { SeasonIcon } from './SeasonIcon'

interface JournalCalendarProps {
  entries: JournalEntry[]
  selectedDay: string | null
  onSelectDay: (day: string | null) => void
}

export function JournalCalendar({
  entries,
  selectedDay,
  onSelectDay,
}: JournalCalendarProps) {
  const today = new Date()
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const scrollerRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLElement | null>(null)

  const planted = plantedDays(entries)
  const season = currentStage(entries) ?? GARDEN_STAGES[0]

  // Latest entry per day marks the calendar.
  const entryByDay = new Map<string, JournalEntry>()
  for (const entry of [...entries].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  )) {
    entryByDay.set(dayKey(new Date(entry.createdAt)), entry)
  }

  const isCurrentMonth =
    month.getFullYear() === today.getFullYear() &&
    month.getMonth() === today.getMonth()

  const monthPrefix = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`

  const monthLabel = month.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate()
  const todayKey = dayKey(today)

  const wateredInMonth = [...entryByDay.keys()]
    .filter((key) => key.startsWith(monthPrefix))
    .sort((a, b) => a.localeCompare(b))

  const scrollAnchorKey = isCurrentMonth
    ? todayKey
    : selectedDay?.startsWith(monthPrefix)
      ? selectedDay
      : (wateredInMonth.at(-1) ?? `${monthPrefix}-01`)

  function shiftMonth(delta: number) {
    setMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    )
  }

  const checkedInCount = wateredInMonth.length

  // Keep today (or the latest watered day) in view when the strip loads.
  useEffect(() => {
    const target = anchorRef.current
    const scroller = scrollerRef.current
    if (!target || !scroller) return
    const left =
      target.offsetLeft - scroller.clientWidth / 2 + target.clientWidth / 2
    scroller.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [month, scrollAnchorKey])

  return (
    <section
      className="glass-card p-5 animate-fade-up sm:p-6"
      style={{ animationDelay: '60ms' }}
      aria-label="Growth calendar"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-ink sm:text-2xl">
            Your growth calendar
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {checkedInCount > 0
              ? `You watered ${checkedInCount} ${checkedInCount === 1 ? 'day' : 'days'} this month — ${season.label} season is growing.`
              : 'Every day you water gets a plant from your current season.'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition hover:bg-blush-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>
          <span className="min-w-32 text-center text-sm font-medium text-ink">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            disabled={isCurrentMonth}
            aria-label="Next month"
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition hover:bg-blush-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-1 mt-4 flex gap-1.5 overflow-x-auto px-2 py-2 [scrollbar-width:thin]"
        role="list"
        aria-label={`${monthLabel} days`}
      >
        {Array.from({ length: daysInMonth }, (_, index) => {
          const dayNumber = index + 1
          const date = new Date(
            month.getFullYear(),
            month.getMonth(),
            dayNumber,
          )
          const key = dayKey(date)
          const entry = entryByDay.get(key)
          const daySeason = stageForDay(planted, key) ?? GARDEN_STAGES[0]
          const isToday = key === todayKey
          const isSelected = key === selectedDay
          const weekday = date.toLocaleDateString(undefined, {
            weekday: 'narrow',
          })

          const cellClass = `flex w-11 shrink-0 flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-center transition ${
            entry
              ? `border border-sage-200 bg-sage-100 text-sage-600 ${
                  isSelected
                    ? 'ring-2 ring-sage-400 ring-offset-1'
                    : isToday
                      ? 'ring-1 ring-inset ring-sage-300'
                      : ''
                }`
              : isToday
                ? 'font-semibold text-sage-600 ring-1 ring-inset ring-sage-300'
                : 'text-ink-muted'
          }`

          if (!entry) {
            return (
              <span
                key={key}
                ref={
                  key === scrollAnchorKey
                    ? (node) => {
                        anchorRef.current = node
                      }
                    : undefined
                }
                role="listitem"
                className={cellClass}
                aria-current={isToday ? 'date' : undefined}
              >
                <span className="text-[0.65rem] font-medium uppercase tracking-wide text-ink-muted">
                  {weekday}
                </span>
                <span className="text-sm leading-none">{dayNumber}</span>
                <span className="h-4" aria-hidden="true" />
              </span>
            )
          }

          return (
            <button
              key={key}
              ref={
                key === scrollAnchorKey
                  ? (node) => {
                      anchorRef.current = node
                    }
                  : undefined
              }
              type="button"
              role="listitem"
              onClick={() => onSelectDay(isSelected ? null : key)}
              aria-pressed={isSelected}
              aria-current={isToday ? 'date' : undefined}
              aria-label={`Watered on ${monthLabel} ${dayNumber}, ${daySeason.label} season`}
              className={`${cellClass} hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400`}
            >
              <span className="text-[0.65rem] font-medium uppercase tracking-wide text-sage-600">
                {weekday}
              </span>
              <span className="text-sm font-medium leading-none">
                {dayNumber}
              </span>
              <span className="flex h-8 items-center justify-center" aria-hidden="true">
                <SeasonIcon
                  id={daySeason.id}
                  className="text-2xl"
                />
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
