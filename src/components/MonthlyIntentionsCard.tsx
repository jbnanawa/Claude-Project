import { useEffect, useRef, useState } from 'react'
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
import type { MonthlyIntentions } from '../types'

export function MonthlyIntentionsCard() {
  const [stored, setStored] = useLocalStorage<MonthlyIntentions>(
    INTENTIONS_KEY,
    emptyIntentions(),
    isMonthlyIntentions,
  )

  // A new month starts with a clean slate.
  const monthKey = currentMonthKey()
  const saved = withDone(
    stored.month === monthKey ? stored : emptyIntentions(),
  )

  // Edits live in a draft until the user hits save.
  const [draft, setDraft] = useState<MonthlyIntentions>(saved)
  const [justSaved, setJustSaved] = useState(false)
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (savedTimer.current) clearTimeout(savedTimer.current)
    }
  }, [])

  const draftWeeks = draft.priorityWeeks ?? []
  const savedWeeks = saved.priorityWeeks ?? []
  const isDirty =
    draft.focus !== saved.focus ||
    draft.notes !== saved.notes ||
    draft.priorities.length !== saved.priorities.length ||
    draft.priorities.some((item, index) => item !== saved.priorities[index]) ||
    draftWeeks.some((weeks, index) => weeks !== savedWeeks[index])

  const monthLabel = new Date().toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  const filledPriorities = draft.priorities.filter((item) => item.trim()).length
  const bloomedCount = draftWeeks.filter(
    (weeks, index) =>
      draft.priorities[index]?.trim() && weeks >= WEEKS_PER_PRIORITY,
  ).length

  function update(patch: Partial<MonthlyIntentions>) {
    setDraft((prev) => ({ ...prev, month: monthKey, ...patch }))
    setJustSaved(false)
  }

  function updatePriority(index: number, text: string) {
    const priorities = [...draft.priorities]
    priorities[index] = text
    update({ priorities })
  }

  function setWeeks(index: number, weeks: number) {
    setDraft((prev) => {
      const nextWeeks = prev.priorities.map((_, i) => {
        const current = prev.priorityWeeks?.[i] ?? 0
        if (i !== index) return current
        return Math.max(0, Math.min(WEEKS_PER_PRIORITY, weeks))
      })
      return {
        ...prev,
        month: monthKey,
        priorityWeeks: nextWeeks,
        prioritiesDone: nextWeeks.map((count) => count >= WEEKS_PER_PRIORITY),
      }
    })
    setJustSaved(false)
  }

  function addWeek(index: number) {
    const current = draftWeeks[index] ?? 0
    if (current >= WEEKS_PER_PRIORITY) return
    setWeeks(index, current + 1)
  }

  function addPriority() {
    setDraft((prev) => ({
      ...prev,
      month: monthKey,
      priorities: [...prev.priorities, ''],
      prioritiesDone: [
        ...prev.priorities.map((_, i) => prev.prioritiesDone?.[i] === true),
        false,
      ],
      priorityWeeks: [
        ...prev.priorities.map((_, i) => prev.priorityWeeks?.[i] ?? 0),
        0,
      ],
    }))
    setJustSaved(false)
  }

  function removePriority(index: number) {
    setDraft((prev) => {
      const nextPriorities = prev.priorities.filter((_, i) => i !== index)
      const nextWeeks = prev.priorities
        .map((_, i) => prev.priorityWeeks?.[i] ?? 0)
        .filter((_, i) => i !== index)
      return {
        ...prev,
        month: monthKey,
        priorities: nextPriorities,
        priorityWeeks: nextWeeks,
        prioritiesDone: nextWeeks.map((count) => count >= WEEKS_PER_PRIORITY),
      }
    })
    setJustSaved(false)
  }

  function handleSave() {
    setStored(withDone({ ...draft, month: monthKey }))
    setJustSaved(true)
    if (savedTimer.current) clearTimeout(savedTimer.current)
    savedTimer.current = setTimeout(() => setJustSaved(false), 2500)
  }

  const inputClasses =
    'w-full rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200'

  return (
    <section
      className="glass-card rounded-2xl p-5 animate-fade-up sm:p-6"
      style={{ animationDelay: '150ms' }}
      aria-label="Monthly intentions"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl tracking-wide text-sage-600 sm:text-2xl">
          Monthly intentions
        </h2>
        <p className="text-sm text-ink-muted">{monthLabel}</p>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        One focus, a few priorities, growing all month.
      </p>

      <div className="mt-5 space-y-5">
        <label className="block rounded-2xl border border-blush-200 bg-blush-50/80 p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-sage-600">
            This month's focus
          </span>
          <input
            type="text"
            value={draft.focus}
            onChange={(e) => update({ focus: e.target.value })}
            placeholder="e.g. Slowing down and choosing what feels good"
            className="mt-2 w-full border-0 bg-transparent p-0 font-display text-lg text-ink outline-none placeholder:text-ink-muted focus:ring-0 sm:text-xl"
          />
        </label>

        <fieldset>
          <legend className="sr-only">Your top priorities this month</legend>
          <div className="divide-y divide-blush-200/80">
            {draft.priorities.map((priority, index) => {
              const weeks = draftWeeks[index] ?? 0
              const hasText = priority.trim().length > 0
              const plant = plantForWeeks(weeks)
              const complete = weeks >= WEEKS_PER_PRIORITY

              return (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush-100 text-xs font-semibold text-blush-600"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={priority}
                          onChange={(e) =>
                            updatePriority(index, e.target.value)
                          }
                          placeholder={
                            index === 0
                              ? 'The one thing that matters most'
                              : `Priority ${index + 1}`
                          }
                          aria-label={`Priority ${index + 1}`}
                          className={`min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-ink-muted focus:ring-0 sm:text-base ${
                            complete ? 'line-through opacity-60' : ''
                          }`}
                        />
                        <span
                          className="grid h-7 w-7 shrink-0 place-items-center text-base"
                          aria-hidden="true"
                          title={
                            complete
                              ? 'Bloomed'
                              : weeks > 0
                                ? `${weeks} of ${WEEKS_PER_PRIORITY} weeks`
                                : 'Not started'
                          }
                        >
                          {plant || (
                            <span className="h-1.5 w-1.5 rounded-full bg-blush-200" />
                          )}
                        </span>
                        {draft.priorities.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => removePriority(index)}
                            aria-label={`Remove priority ${index + 1}`}
                            title="Remove this priority"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-blush-100 hover:text-blush-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              aria-hidden="true"
                            >
                              <path d="M4 4l8 8M12 4l-8 8" />
                            </svg>
                          </button>
                        ) : null}
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div
                          className="flex w-1/2 max-w-xs items-center gap-1.5"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={WEEKS_PER_PRIORITY}
                          aria-valuenow={weeks}
                          aria-label={`Priority ${index + 1} weekly progress`}
                        >
                          {Array.from(
                            { length: WEEKS_PER_PRIORITY },
                            (_, weekIndex) => {
                              const filled = weekIndex < weeks
                              return (
                                <button
                                  key={weekIndex}
                                  type="button"
                                  disabled={!hasText}
                                  onClick={() =>
                                    setWeeks(
                                      index,
                                      filled ? weekIndex : weekIndex + 1,
                                    )
                                  }
                                  title={
                                    !hasText
                                      ? 'Write this priority first'
                                      : filled
                                        ? `Week ${weekIndex + 1} done — click to set progress here`
                                        : `Mark through week ${weekIndex + 1}`
                                  }
                                  aria-label={`Set priority ${index + 1} to ${weekIndex + 1} weeks`}
                                  className={`h-2.5 flex-1 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50 ${
                                    filled
                                      ? 'bg-sage-600 hover:bg-sage-400'
                                      : 'bg-sage-200/70 hover:bg-sage-200'
                                  }`}
                                />
                              )
                            },
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => addWeek(index)}
                          disabled={!hasText || complete}
                          className="shrink-0 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-600 transition hover:bg-sage-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          + week
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={addPriority}
            className="mt-1 inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-blush-600 transition hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M8 3v10M3 8h10" />
            </svg>
            Add another priority
          </button>
        </fieldset>

        <div className="flex items-center justify-between gap-3 rounded-2xl bg-sage-100 px-4 py-3">
          <p className="text-sm font-medium text-sage-600">
            This month's bouquet
          </p>
          <div className="flex items-center gap-2.5">
            <span className="text-sm tabular-nums text-sage-600">
              {bloomedCount} of {filledPriorities || draft.priorities.length}
            </span>
            <div
              className="h-1.5 w-16 overflow-hidden rounded-full bg-sage-200/80 sm:w-20"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={filledPriorities || draft.priorities.length}
              aria-valuenow={bloomedCount}
              aria-label="Bloomed priorities this month"
            >
              <div
                className="h-full rounded-full bg-sage-600 transition-all duration-500"
                style={{
                  width: `${
                    filledPriorities > 0
                      ? (bloomedCount / filledPriorities) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">
            Anything else on your mind?
          </span>
          <textarea
            value={draft.notes}
            onChange={(e) => update({ notes: e.target.value })}
            rows={3}
            placeholder="Little reminders, hopes, whatever you want to remember..."
            className={`${inputClasses} resize-y`}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty}
          className="w-full rounded-xl bg-blush-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Save my intentions
        </button>
        <p aria-live="polite" className="text-sm">
          {justSaved ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-sage-600">
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m3 8.5 3.5 3.5L13 5" />
              </svg>
              Saved — all set for {monthLabel.split(' ')[0]}.
            </span>
          ) : isDirty ? (
            <span className="text-ink-muted">You have unsaved changes.</span>
          ) : null}
        </p>
      </div>
    </section>
  )
}
