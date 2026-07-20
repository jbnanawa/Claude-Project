import { useState } from 'react'
import { MOOD_STYLES } from '../data/moods'
import { dayKey } from '../lib/date'
import type { JournalEntry } from '../types'

interface JournalCalendarProps {
  entries: JournalEntry[]
  selectedDay: string | null
  onSelectDay: (day: string | null) => void
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function JournalCalendar({
  entries,
  selectedDay,
  onSelectDay,
}: JournalCalendarProps) {
  const today = new Date()
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )

  // Latest entry per day decides which mood shows on the calendar.
  const moodByDay = new Map<string, JournalEntry>()
  for (const entry of [...entries].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  )) {
    moodByDay.set(dayKey(new Date(entry.createdAt)), entry)
  }

  const isCurrentMonth =
    month.getFullYear() === today.getFullYear() &&
    month.getMonth() === today.getMonth()

  const monthLabel = month.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate()
  const leadingBlanks = month.getDay()
  const todayKey = dayKey(today)

  function shiftMonth(delta: number) {
    setMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    )
  }

  const checkedInCount = [...moodByDay.keys()].filter((key) =>
    key.startsWith(
      `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`,
    ),
  ).length

  const selectedEntries = selectedDay
    ? [...entries]
        .filter((entry) => dayKey(new Date(entry.createdAt)) === selectedDay)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    : []

  return (
    <section
      className="glass-card rounded-2xl p-5 animate-fade-up sm:p-6"
      style={{ animationDelay: '60ms' }}
      aria-label="Check-in calendar"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-ink sm:text-2xl">
            Your check-in calendar
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {checkedInCount > 0
              ? `You showed up ${checkedInCount} ${checkedInCount === 1 ? 'day' : 'days'} this month — love that for you.`
              : 'Every day you check in gets a little mood mark here.'}
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

      <div className="mt-5 grid grid-cols-7 gap-1 text-center sm:gap-1.5">
        {WEEKDAYS.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="pb-1 text-xs font-medium text-ink-muted"
            aria-hidden="true"
          >
            {day}
          </span>
        ))}

        {Array.from({ length: leadingBlanks }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const dayNumber = index + 1
          const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`
          const entry = moodByDay.get(key)
          const style = entry ? MOOD_STYLES[entry.mood] : null
          const isToday = key === todayKey
          const isSelected = key === selectedDay

          if (!entry) {
            return (
              <span
                key={key}
                className={`grid aspect-square place-items-center rounded-xl text-sm ${
                  isToday
                    ? 'font-semibold text-blush-600 ring-1 ring-inset ring-blush-300'
                    : 'text-ink-muted'
                }`}
              >
                {dayNumber}
              </span>
            )
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDay(isSelected ? null : key)}
              aria-pressed={isSelected}
              aria-label={`Check-in on ${monthLabel} ${dayNumber}, feeling ${style?.label.toLowerCase()}`}
              className={`grid aspect-square place-items-center rounded-xl border text-sm font-medium transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${style?.bg} ${style?.border} ${style?.text} ${
                isSelected
                  ? 'ring-2 ring-blush-400 ring-offset-1'
                  : isToday
                    ? 'ring-1 ring-inset ring-blush-300'
                    : ''
              }`}
            >
              <span className="leading-none">
                <span className="block text-[0.7rem] leading-tight sm:text-xs">
                  {dayNumber}
                </span>
                <span
                  className="block text-xs leading-tight sm:text-sm"
                  aria-hidden="true"
                >
                  {style?.emoji}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {selectedDay ? (
        <div className="mt-4 rounded-xl border border-blush-200 bg-blush-50/60 p-4 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-ink">
              {new Date(`${selectedDay}T12:00:00`).toLocaleDateString(
                undefined,
                { weekday: 'long', month: 'long', day: 'numeric' },
              )}
            </p>
            <button
              type="button"
              onClick={() => onSelectDay(null)}
              className="text-sm font-medium text-blush-600 underline-offset-2 transition hover:text-blush-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
            >
              Close preview
            </button>
          </div>

          {selectedEntries.length === 0 ? (
            <p className="mt-2 text-sm text-ink-soft">
              Nothing saved on this day anymore.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {selectedEntries.map((entry) => {
                const style = MOOD_STYLES[entry.mood]
                return (
                  <li key={entry.id}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
                      >
                        <span aria-hidden="true">{style.emoji}</span>
                        {style.label}
                      </span>
                      <span className="text-xs text-ink-muted">
                        {new Date(entry.createdAt).toLocaleTimeString(
                          undefined,
                          { hour: 'numeric', minute: '2-digit' },
                        )}
                      </span>
                    </div>
                    {entry.gratitude ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-ink">
                        <span className="font-medium text-blush-600">
                          Grateful for:
                        </span>{' '}
                        {entry.gratitude}
                      </p>
                    ) : null}
                    {entry.text ? (
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                        {entry.text}
                      </p>
                    ) : null}
                    {!entry.gratitude && !entry.text ? (
                      <p className="mt-1.5 text-sm italic text-ink-muted">
                        Just a mood check-in — no words this time.
                      </p>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  )
}
