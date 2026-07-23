import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  INTENTIONS_KEY,
  MAX_PRIORITIES,
  WEEKS_PER_PRIORITY,
  currentMonthKey,
  emptyIntentions,
  isMonthlyIntentions,
  weekLabel,
  withDone,
} from '../lib/intentions'
import type { MonthlyIntentions } from '../types'

const PRIORITY_PROMPTS = [
  'Priority 1',
  'Priority 2',
  'Priority 3',
] as const

function hasIntentionsContent(intentions: MonthlyIntentions): boolean {
  return (
    intentions.focus.trim().length > 0 ||
    intentions.notes.trim().length > 0 ||
    intentions.priorities.some((item) => item.trim().length > 0)
  )
}

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

  const [draft, setDraft] = useState<MonthlyIntentions>(saved)
  const [status, setStatus] = useState<'idle' | 'added' | 'updated'>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const readyToAutosave = useRef(false)

  useEffect(() => {
    // Skip the first paint so mounting doesn't flash a save status.
    readyToAutosave.current = true
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      if (statusTimer.current) clearTimeout(statusTimer.current)
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
  const completedCount = draftWeeks.filter(
    (weeks, index) =>
      draft.priorities[index]?.trim() && weeks >= WEEKS_PER_PRIORITY,
  ).length

  useEffect(() => {
    if (!readyToAutosave.current || !isDirty) return

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      const next = withDone({ ...draft, month: monthKey })
      const wasEmpty = !hasIntentionsContent(saved)
      const hasContent = hasIntentionsContent(next)
      setStored(next)

      if (!hasContent) {
        setStatus('idle')
        return
      }

      setStatus(wasEmpty ? 'added' : 'updated')
      if (statusTimer.current) clearTimeout(statusTimer.current)
      statusTimer.current = setTimeout(() => setStatus('idle'), 2500)
    }, 400)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [draft, isDirty, monthKey, saved, setStored])

  function update(patch: Partial<MonthlyIntentions>) {
    setDraft((prev) => ({ ...prev, month: monthKey, ...patch }))
  }

  function updatePriority(index: number, text: string) {
    const priorities = [...draft.priorities]
    while (priorities.length < MAX_PRIORITIES) priorities.push('')
    priorities[index] = text
    update({ priorities: priorities.slice(0, MAX_PRIORITIES) })
  }

  function setWeeks(index: number, weeks: number) {
    setDraft((prev) => {
      const nextWeeks = Array.from({ length: MAX_PRIORITIES }, (_, i) => {
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
  }

  const inputClasses =
    'w-full rounded-xl border border-sage-200 bg-white/80 px-3.5 py-3 text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200'

  return (
    <section
      className="glass-card p-5 animate-fade-up sm:p-6"
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
        A short ritual for the month ahead — one focus, a few priorities.
      </p>

      <div className="mt-6 space-y-7">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">
            This month, I want to focus on:
          </span>
          <input
            type="text"
            value={draft.focus}
            onChange={(e) => update({ focus: e.target.value })}
            placeholder="One intention that guides everything else"
            className={`${inputClasses} font-display text-lg sm:text-xl`}
          />
        </label>

        <fieldset>
          <legend className="mb-1 text-sm font-medium text-ink">
            My top priorities:
          </legend>
          <p className="mb-3 text-xs text-ink-muted">
            Tap a bar segment to set progress — from Not started to Complete.
          </p>
          <div className="space-y-3">
            {Array.from({ length: MAX_PRIORITIES }, (_, index) => {
              const priority = draft.priorities[index] ?? ''
              const weeks = draftWeeks[index] ?? 0
              const hasText = priority.trim().length > 0
              const status = weekLabel(weeks)
              const complete = weeks >= WEEKS_PER_PRIORITY

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-blush-200/80 bg-blush-50/50 p-3.5 sm:p-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush-100 text-xs font-semibold text-blush-600"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={priority}
                      onChange={(e) => updatePriority(index, e.target.value)}
                      placeholder={PRIORITY_PROMPTS[index]}
                      aria-label={`Priority ${index + 1}`}
                      className={`min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-ink-muted focus:ring-0 sm:text-base ${
                        complete ? 'line-through opacity-60' : ''
                      }`}
                    />
                    <span
                      className={`shrink-0 text-xs font-medium ${
                        complete
                          ? 'text-sage-600'
                          : weeks > 0
                            ? 'text-ink-soft'
                            : 'text-ink-muted'
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-3 pl-10">
                    <div
                      className="flex max-w-xs items-center gap-1.5"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(
                        (weeks / WEEKS_PER_PRIORITY) * 100,
                      )}
                      aria-label={`Priority ${index + 1} progress`}
                    >
                      {Array.from(
                        { length: WEEKS_PER_PRIORITY },
                        (_, stepIndex) => {
                          const filled = stepIndex < weeks
                          return (
                            <button
                              key={stepIndex}
                              type="button"
                              disabled={!hasText}
                              onClick={() =>
                                setWeeks(
                                  index,
                                  filled ? stepIndex : stepIndex + 1,
                                )
                              }
                              title={
                                !hasText
                                  ? 'Write this priority first'
                                  : filled
                                    ? `${weekLabel(stepIndex + 1)} — tap to lower here`
                                    : weekLabel(stepIndex + 1)
                              }
                              aria-label={`Set priority ${index + 1} to ${weekLabel(stepIndex + 1)}`}
                              className={`h-3.5 flex-1 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50 ${
                                filled
                                  ? 'bg-sage-600 hover:bg-sage-400'
                                  : 'bg-sage-200/70 hover:bg-sage-200'
                              }`}
                            />
                          )
                        },
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">
            Why does this matter to me?{' '}
            <span className="font-normal text-ink-muted">(optional)</span>
          </span>
          <textarea
            value={draft.notes}
            onChange={(e) => update({ notes: e.target.value })}
            rows={3}
            placeholder="A few words to come back to when the month gets noisy..."
            className={`${inputClasses} resize-y`}
          />
        </label>

        <div className="flex items-center justify-between gap-3 rounded-2xl bg-sage-100 px-4 py-3">
          <p className="text-sm font-medium text-sage-600">
            This month&apos;s progress
          </p>
          <div className="flex items-center gap-2.5">
            <span className="text-sm tabular-nums text-sage-600">
              {completedCount} of {filledPriorities || MAX_PRIORITIES}
            </span>
            <div
              className="h-1.5 w-16 overflow-hidden rounded-full bg-sage-200/80 sm:w-20"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={filledPriorities || MAX_PRIORITIES}
              aria-valuenow={completedCount}
              aria-label="Completed priorities this month"
            >
              <div
                className="h-full rounded-full bg-sage-600 transition-all duration-500"
                style={{
                  width: `${
                    filledPriorities > 0
                      ? (completedCount / filledPriorities) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-5 min-h-5 text-sm">
        {status === 'added' ? (
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
            Intentions added
          </span>
        ) : status === 'updated' ? (
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
            Intentions updated
          </span>
        ) : null}
      </p>
    </section>
  )
}
