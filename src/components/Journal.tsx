import { useEffect, useState, type FormEvent } from 'react'
import { createId } from '../lib/id'
import { dayKey } from '../lib/date'
import {
  GARDEN_STAGES,
  currentStage,
  plantedDays,
  stageForDay,
} from '../lib/garden'
import type { JournalEntry } from '../types'
import { JournalCalendar } from './JournalCalendar'
import { SeasonIcon } from './SeasonIcon'

interface JournalProps {
  entries: JournalEntry[]
  onAdd: (entry: JournalEntry) => void
  onDelete: (id: string) => void
  onUpdate: (entry: JournalEntry) => void
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatEntryDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (isSameDay(date, now)) return 'Today'
  if (isSameDay(date, yesterday)) return 'Yesterday'
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function Journal({ entries, onAdd, onDelete, onUpdate }: JournalProps) {
  const [gratitude, setGratitude] = useState('')
  const [text, setText] = useState('')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editGratitude, setEditGratitude] = useState('')
  const [editText, setEditText] = useState('')

  const planted = plantedDays(entries)
  const season = currentStage(entries) ?? GARDEN_STAGES[0]

  useEffect(() => {
    if (!openMenuId) return
    function closeOnOutsideClick(event: PointerEvent) {
      if (!(event.target as Element).closest('[data-journal-menu]')) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () =>
      document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [openMenuId])

  function startEditing(entry: JournalEntry) {
    setOpenMenuId(null)
    setEditingId(entry.id)
    setEditGratitude(entry.gratitude)
    setEditText(entry.text)
  }

  function saveEditing(entry: JournalEntry) {
    if (!editGratitude.trim()) return
    onUpdate({
      ...entry,
      gratitude: editGratitude.trim(),
      text: editText.trim(),
    })
    setEditingId(null)
  }

  const sorted = [...entries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
  const visibleEntries = selectedDay
    ? sorted.filter((entry) => dayKey(new Date(entry.createdAt)) === selectedDay)
    : sorted
  const checkedInToday =
    sorted.length > 0 && isSameDay(new Date(sorted[0].createdAt), new Date())

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const inputClasses =
    'w-full rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200'

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!gratitude.trim()) return

    onAdd({
      id: createId(),
      mood: 'content',
      gratitude: gratitude.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    })

    setGratitude('')
    setText('')
  }

  if (checkedInToday) {
    return (
      <div className="space-y-8 sm:space-y-10">
        <section
          className="glass-card p-5 animate-fade-up sm:p-6"
          aria-label="Today's check-in"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl text-ink sm:text-2xl">
              Today's water
            </h2>
            <p className="text-sm text-ink-muted">{todayLabel}</p>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <span
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sage-100"
              aria-hidden="true"
            >
              <SeasonIcon id="water" className="h-10 w-10" />
            </span>
            <div>
              <p className="font-display text-lg text-ink">
                Watered for today — {season.label} season
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm leading-relaxed text-ink-soft">
                <SeasonIcon id={season.id} className="h-4 w-4" />
                Your gratitude is growing. Come back tomorrow to keep watering.
                To tweak today's entry, use the little menu below.
              </p>
            </div>
          </div>
        </section>

        <JournalCalendar
          entries={entries}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {renderPastCheckIns()}
      </div>
    )
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      <form
        onSubmit={handleSubmit}
        className="glass-card p-5 animate-fade-up sm:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl text-ink sm:text-2xl">
            Today's water
          </h2>
          <p className="text-sm text-ink-muted">{todayLabel}</p>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          Every day you show up is one drop of water. Plant one little gratitude
          to grow today.
        </p>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              One little gratitude to plant
            </span>
            <input
              type="text"
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="e.g. Morning light through the window"
              required
              className={inputClasses}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Anything else on your mind?{' '}
              <span className="font-normal text-ink-muted">(optional)</span>
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="No filter needed — just let it out..."
              className={`${inputClasses} resize-y`}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!gratitude.trim()}
          className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blush-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Plant this gratitude
          <SeasonIcon id="seed" className="h-5 w-5 brightness-0 invert" />
        </button>
        {!gratitude.trim() ? (
          <p className="mt-2 text-xs text-ink-muted">
            Add one little gratitude to water your garden today.
          </p>
        ) : null}
      </form>

      <JournalCalendar
        entries={entries}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      {renderPastCheckIns()}
    </div>
  )

  function renderPastCheckIns() {
    return (
      <section
        className="animate-fade-up"
        style={{ animationDelay: '100ms' }}
        aria-label="Past waters"
      >
        <h2 className="mb-4 font-display text-2xl text-ink">
          {selectedDay
            ? `Waters from ${new Date(`${selectedDay}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`
            : 'Past waters'}
        </h2>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-10 text-center animate-fade-in">
            <p className="font-display text-xl text-ink">Nothing planted yet</p>
            <p className="mt-2 text-sm text-ink-soft">
              Once you water a day, your moments will grow here.
            </p>
          </div>
        ) : visibleEntries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-10 text-center animate-fade-in">
            <p className="font-display text-xl text-ink">
              Nothing left on this day
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="font-medium text-blush-600 underline-offset-2 transition hover:text-blush-700 hover:underline"
              >
                Show everything
              </button>{' '}
              to see the rest of your garden.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {visibleEntries.map((entry, index) => {
              const entryDay = dayKey(new Date(entry.createdAt))
              const entrySeason =
                stageForDay(planted, entryDay) ?? GARDEN_STAGES[0]

              if (editingId === entry.id) {
                return (
                  <li
                    key={entry.id}
                    className="glass-card p-4 animate-fade-up sm:p-5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-ink">
                        {formatEntryDate(entry.createdAt)}
                      </p>
                      <span className="text-xs text-ink-muted">
                        {new Date(entry.createdAt).toLocaleTimeString(
                          undefined,
                          { hour: 'numeric', minute: '2-digit' },
                        )}
                      </span>
                    </div>

                    <input
                      type="text"
                      value={editGratitude}
                      onChange={(e) => setEditGratitude(e.target.value)}
                      placeholder="One little gratitude to plant..."
                      required
                      className={`${inputClasses} mt-3`}
                    />
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={3}
                      placeholder="No filter needed — just let it out..."
                      className={`${inputClasses} mt-2 resize-y`}
                    />

                    <div className="mt-3 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEditing(entry)}
                        disabled={!editGratitude.trim()}
                        className="rounded-lg bg-blush-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blush-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </li>
                )
              }

              return (
                <li
                  key={entry.id}
                  className={`glass-card p-4 transition hover:-translate-y-0.5 animate-fade-up sm:p-5 ${
                    openMenuId === entry.id ? 'relative z-30' : 'relative z-0'
                  }`}
                  style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-ink">
                          {formatEntryDate(entry.createdAt)}
                        </p>
                        <span className="text-xs text-ink-muted">
                          {new Date(entry.createdAt).toLocaleTimeString(
                            undefined,
                            { hour: 'numeric', minute: '2-digit' },
                          )}
                        </span>
                        <span
                          className="inline-flex items-center gap-1 rounded-lg border border-sage-200 bg-sage-100 px-2 py-0.5 text-xs font-medium text-sage-600"
                          title={`${entrySeason.label} season`}
                        >
                          <SeasonIcon
                            id={entrySeason.id}
                            className="h-4 w-4"
                          />
                          {entrySeason.label}
                        </span>
                      </div>

                      {entry.gratitude ? (
                        <p className="mt-2.5 text-sm leading-relaxed text-ink">
                          <span className="font-medium text-blush-600">
                            Grateful for:
                          </span>{' '}
                          {entry.gratitude}
                        </p>
                      ) : null}

                      {entry.text ? (
                        <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                          {entry.text}
                        </p>
                      ) : null}
                    </div>

                    <div className="relative shrink-0" data-journal-menu>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId(openMenuId === entry.id ? null : entry.id)
                        }
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === entry.id}
                        aria-label="Options for this water"
                        className="rounded-lg px-1.5 py-1 text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <circle cx="8" cy="3" r="1.4" />
                          <circle cx="8" cy="8" r="1.4" />
                          <circle cx="8" cy="13" r="1.4" />
                        </svg>
                      </button>
                      {openMenuId === entry.id ? (
                        <div
                          role="menu"
                          className="glass-menu absolute right-0 top-full z-40 mt-1 w-40 rounded-xl p-1"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => startEditing(entry)}
                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-blush-100"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => onDelete(entry.id)}
                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-blush-700 transition hover:bg-blush-100"
                          >
                            Remove
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    )
  }
}
