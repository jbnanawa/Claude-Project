import { useEffect, useState, type FormEvent } from 'react'
import { createId } from '../lib/id'
import { dayKey } from '../lib/date'
import {
  GARDEN_STAGES,
  currentStage,
  plantedDays,
  stageForDay,
} from '../lib/garden'
import { isRichEmpty, sanitizeRichHtml } from '../lib/richText'
import type { JournalEntry } from '../types'
import { JournalCalendar } from './JournalCalendar'
import { MessageField, RichText } from './MessageField'
import { SeasonIcon } from './SeasonIcon'

interface JournalProps {
  entries: JournalEntry[]
  onAdd: (entry: JournalEntry) => void
  onDelete: (id: string) => void
  onUpdate: (entry: JournalEntry) => void
  /** Open the gratitude composer on mount (e.g. from “Water with gratitude”). */
  startComposing?: boolean
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

/** Soft pastels for water-feed cards — white → color, stable per entry id. */
const FEED_CARD_COLORS = [
  'rgba(200, 230, 201, 0.95)', // sage mist
  'rgba(255, 204, 188, 0.95)', // peach blush
  'rgba(187, 222, 251, 0.95)', // sky
  'rgba(225, 190, 231, 0.95)', // lilac
  'rgba(255, 224, 178, 0.95)', // warm cream
  'rgba(178, 235, 242, 0.95)', // mint
  'rgba(248, 187, 208, 0.95)', // rose
  'rgba(255, 236, 179, 0.95)', // soft butter
]

function feedCardColor(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  const color = FEED_CARD_COLORS[hash % FEED_CARD_COLORS.length]
  return `linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, ${color} 100%)`
}

export function Journal({
  entries,
  onAdd,
  onDelete,
  onUpdate,
  startComposing = false,
}: JournalProps) {
  const [gratitude, setGratitude] = useState('')
  const [composing, setComposing] = useState(startComposing)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editGratitude, setEditGratitude] = useState('')

  const planted = plantedDays(entries)
  const season = currentStage(entries) ?? GARDEN_STAGES[0]

  useEffect(() => {
    if (startComposing) setComposing(true)
  }, [startComposing])

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
  }

  function saveEditing(entry: JournalEntry) {
    if (isRichEmpty(editGratitude)) return
    onUpdate({
      ...entry,
      gratitude: sanitizeRichHtml(editGratitude),
    })
    setEditingId(null)
  }

  function closeComposer() {
    setComposing(false)
    setGratitude('')
  }

  const sorted = [...entries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
  const visibleEntries = selectedDay
    ? sorted.filter((entry) => dayKey(new Date(entry.createdAt)) === selectedDay)
    : sorted
  const checkedInToday =
    sorted.length > 0 && isSameDay(new Date(sorted[0].createdAt), new Date())

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isRichEmpty(gratitude)) return

    onAdd({
      id: createId(),
      mood: 'content',
      gratitude: sanitizeRichHtml(gratitude),
      text: '',
      createdAt: new Date().toISOString(),
    })

    setGratitude('')
    setComposing(false)
  }

  if (checkedInToday) {
    return (
      <div className="space-y-8 sm:space-y-10">
        <JournalCalendar
          entries={entries}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        <section
          className="glass-card p-5 animate-fade-up sm:p-6"
          aria-label="Watered with gratitude"
          aria-live="polite"
        >
          <div className="flex min-w-0 items-start gap-3">
            <span
              className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-white bg-sage-100"
              aria-hidden="true"
            >
              <span className="animate-water-drop">
                <SeasonIcon id="water" className="text-[3.25rem]" />
              </span>
            </span>
            <div>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Watered with gratitude
              </h2>
              <p className="mt-1.5 text-base leading-relaxed text-ink-soft">
                Your plant has been watered for today. Come back tomorrow for
                your next drop. You&apos;re in your {season.label} Season, and
                every small moment counts. To update today&apos;s entry, use the
                menu below.
              </p>
            </div>
          </div>
        </section>

        {renderPastCheckIns()}
      </div>
    )
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      <JournalCalendar
        entries={entries}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      {composing ? (
        <form
          id="add-gratitude"
          onSubmit={handleSubmit}
          className="glass-card scroll-mt-24 p-5 animate-fade-up sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-xl text-ink sm:text-2xl">
              Today I&apos;m grateful for…
            </p>
            <button
              type="button"
              onClick={closeComposer}
              className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
            >
              Cancel
            </button>
          </div>
          <div className="mt-3">
            <MessageField
              value={gratitude}
              onChange={setGratitude}
              placeholder="e.g. Morning light through the window"
              autoFocus
              aria-label="Today I'm grateful for"
            />
          </div>

          <button
            type="submit"
            disabled={isRichEmpty(gratitude)}
            className="mt-6 inline-flex w-full min-h-14 items-center justify-center rounded-2xl bg-sage-400 px-6 py-4 text-base font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Water with gratitude
          </button>
        </form>
      ) : (
        <section
          id="add-gratitude"
          className="glass-card scroll-mt-24 p-5 animate-fade-up sm:p-6"
          aria-label="Add gratitude"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Today&apos;s gratitude
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Add a drop when you&apos;re ready — one note is enough to water
                your plant.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setComposing(true)}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-sage-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
            >
              <SeasonIcon id="water" className="text-xl" />
              Add gratitude
            </button>
          </div>
        </section>
      )}

      {renderPastCheckIns()}
    </div>
  )

  function renderPastCheckIns() {
    return (
      <section
        className="animate-fade-up"
        style={{ animationDelay: '100ms' }}
        aria-label="Water feed"
      >
        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-accent px-6 py-10 text-center animate-fade-in">
            <span
              className="mx-auto grid h-14 w-14 place-items-center text-sage-400"
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
                <path d="M12 3c-3.5 4.5-7 8-7 11.5A7 7 0 0 0 12 21a7 7 0 0 0 7-6.5C19 11 15.5 7.5 12 3Z" />
              </svg>
            </span>
            <p className="mt-4 font-display text-xl text-ink">
              Nothing in your feed yet
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Once you water a day, your gratitude moments will show up here.
            </p>
          </div>
        ) : visibleEntries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-accent px-6 py-10 text-center animate-fade-in">
            <span
              className="mx-auto grid h-14 w-14 place-items-center text-sage-400"
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
              </svg>
            </span>
            <p className="mt-4 font-display text-xl text-ink">
              Nothing on this day
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="font-medium text-blush-600 underline-offset-2 transition hover:text-blush-700 hover:underline"
              >
                Show everything
              </button>{' '}
              to see the rest of your feed.
            </p>
          </div>
        ) : (
          <ul className="columns-1 gap-x-3 sm:columns-2">
            {visibleEntries.map((entry, index) => {
              const entryDay = dayKey(new Date(entry.createdAt))
              const entrySeason =
                stageForDay(planted, entryDay) ?? GARDEN_STAGES[0]

              if (editingId === entry.id) {
                return (
                  <li
                    key={entry.id}
                    className="mb-3 break-inside-avoid glass-card p-4 animate-fade-up sm:p-5"
                    style={{ background: feedCardColor(entry.id) }}
                  >
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                      <p className="font-display text-lg leading-none tracking-tight text-ink sm:text-xl">
                        {formatEntryDate(entry.createdAt)}
                      </p>
                      <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted">
                        {new Date(entry.createdAt).toLocaleTimeString(
                          undefined,
                          { hour: 'numeric', minute: '2-digit' },
                        )}
                      </span>
                    </div>

                    <div className="mt-3">
                      <MessageField
                        value={editGratitude}
                        onChange={setEditGratitude}
                        placeholder="Today I'm grateful for…"
                        autoFocus
                        minHeightClass="min-h-24"
                        aria-label="Edit gratitude"
                      />
                    </div>

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
                        disabled={isRichEmpty(editGratitude)}
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
                  className={`mb-3 break-inside-avoid glass-card p-4 transition hover:-translate-y-0.5 animate-fade-up sm:p-5 ${
                    openMenuId === entry.id ? 'relative z-30' : 'relative z-0'
                  }`}
                  style={{
                    background: feedCardColor(entry.id),
                    animationDelay: `${Math.min(index, 6) * 40}ms`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                        <p className="font-display text-lg leading-none tracking-tight text-ink sm:text-xl">
                          {formatEntryDate(entry.createdAt)}
                        </p>
                        <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted">
                          {new Date(entry.createdAt).toLocaleTimeString(
                            undefined,
                            { hour: 'numeric', minute: '2-digit' },
                          )}
                        </span>
                        <span
                          className="inline-flex items-center gap-1 rounded-full border border-sage-200/80 bg-white/55 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-sage-600"
                          title={`${entrySeason.label} season`}
                        >
                          <SeasonIcon
                            id={entrySeason.id}
                            className="text-sm"
                          />
                          {entrySeason.label}
                        </span>
                      </div>

                      {entry.gratitude ? (
                        <div className="mt-2.5 text-sm leading-relaxed text-ink">
                          <span className="font-medium text-blush-600">
                            Grateful for:
                          </span>
                          <RichText
                            html={entry.gratitude}
                            className="mt-1.5 text-ink"
                          />
                        </div>
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
