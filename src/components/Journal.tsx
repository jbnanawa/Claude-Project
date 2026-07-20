import { useEffect, useState, type FormEvent } from 'react'
import { MOODS, MOOD_STYLES } from '../data/moods'
import { createId } from '../lib/id'
import { dayKey } from '../lib/date'
import type { JournalEntry, Mood } from '../types'
import { JournalCalendar } from './JournalCalendar'

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
  const [mood, setMood] = useState<Mood | null>(null)
  const [gratitude, setGratitude] = useState('')
  const [text, setText] = useState('')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editMood, setEditMood] = useState<Mood>('steady')
  const [editGratitude, setEditGratitude] = useState('')
  const [editText, setEditText] = useState('')

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
    setEditMood(entry.mood)
    setEditGratitude(entry.gratitude)
    setEditText(entry.text)
  }

  function saveEditing(entry: JournalEntry) {
    onUpdate({
      ...entry,
      mood: editMood,
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
    if (!mood) return

    onAdd({
      id: createId(),
      mood,
      gratitude: gratitude.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    })

    setMood(null)
    setGratitude('')
    setText('')
  }

  if (checkedInToday) {
    return (
      <div className="space-y-8 sm:space-y-10">
        <section
          className="glass-card rounded-2xl p-5 animate-fade-up sm:p-6"
          aria-label="Today's check-in"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl text-ink sm:text-2xl">
              Today's check-in
            </h2>
            <p className="text-sm text-ink-muted">{todayLabel}</p>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sage-100 text-3xl"
              aria-hidden="true"
            >
              {'\u{1F4A7}'}
            </span>
            <div>
              <p className="font-display text-lg text-ink">
                You're all checked in for today
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Your moment is saved below — come back tomorrow for the next
                one. If you'd like to tweak today's entry, use the little menu
                on it.
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
        className="glass-card rounded-2xl p-5 animate-fade-up sm:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl text-ink sm:text-2xl">
            Today's check-in
          </h2>
          <p className="text-sm text-ink-muted">{todayLabel}</p>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          Take a breath. How are you doing today — really?
        </p>

        <div className="mt-6 space-y-5">
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-ink-soft">
              How's your heart today?
            </legend>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((option) => {
                const style = MOOD_STYLES[option]
                const selected = mood === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMood(option)}
                    aria-pressed={selected}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
                      selected
                        ? `${style.bg} ${style.text} ${style.border} shadow-[0_4px_14px_rgba(61,50,48,0.08)] ring-1 ring-inset ring-current/20`
                        : 'border-blush-200 bg-blush-50 text-ink-soft hover:bg-blush-100 hover:text-ink'
                    }`}
                  >
                    <span aria-hidden="true">{style.emoji}</span>
                    {style.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              One little thing you're thankful for{' '}
              <span className="font-normal text-ink-muted">(optional)</span>
            </span>
            <input
              type="text"
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="e.g. Morning light through the window"
              className={inputClasses}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              What's on your heart?{' '}
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
          disabled={!mood}
          className="mt-6 w-full rounded-xl bg-blush-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Save this moment
        </button>
        {!mood ? (
          <p className="mt-2 text-xs text-ink-muted">
            Just pick a mood first, then you're all set.
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
        aria-label="Past check-ins"
      >
        <h2 className="mb-4 font-display text-2xl text-ink">
          {selectedDay
            ? `Check-ins from ${new Date(`${selectedDay}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`
            : 'Past check-ins'}
        </h2>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-10 text-center animate-fade-in">
            <p className="font-display text-xl text-ink">Nothing here yet</p>
            <p className="mt-2 text-sm text-ink-soft">
              Once you check in, your moments will hang out here.
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
              to see the rest of your moments.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {visibleEntries.map((entry, index) => {
              const style = MOOD_STYLES[entry.mood]

              if (editingId === entry.id) {
                return (
                  <li
                    key={entry.id}
                    className="glass-card rounded-2xl p-4 animate-fade-up sm:p-5"
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

                    <div className="mt-3 flex flex-wrap gap-2">
                      {MOODS.map((option) => {
                        const optionStyle = MOOD_STYLES[option]
                        const selected = editMood === option
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setEditMood(option)}
                            aria-pressed={selected}
                            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
                              selected
                                ? `${optionStyle.bg} ${optionStyle.text} ${optionStyle.border} ring-1 ring-inset ring-current/20`
                                : 'border-blush-200 bg-blush-50 text-ink-soft hover:bg-blush-100 hover:text-ink'
                            }`}
                          >
                            <span aria-hidden="true">{optionStyle.emoji}</span>
                            {optionStyle.label}
                          </button>
                        )
                      })}
                    </div>

                    <input
                      type="text"
                      value={editGratitude}
                      onChange={(e) => setEditGratitude(e.target.value)}
                      placeholder="One little thing you're thankful for..."
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
                        className="rounded-lg bg-blush-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blush-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
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
                  className="glass-card rounded-2xl p-4 transition hover:-translate-y-0.5 animate-fade-up sm:p-5"
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
                          className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
                        >
                          <span aria-hidden="true">{style.emoji}</span>
                          {style.label}
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
                        aria-label="Options for this check-in"
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
                          className="glass-menu absolute right-0 top-full z-10 mt-1 w-40 rounded-xl p-1"
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
