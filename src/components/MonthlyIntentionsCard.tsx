import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  INTENTIONS_KEY,
  MAX_PRIORITIES,
  WEEKS_PER_PRIORITY,
  coerceIntentionsStore,
  currentMonthKey,
  intentionsForMonth,
  isMonthlyIntentionsStore,
  monthLabelFromKey,
  nextMonthKey,
  weekLabel,
  withDone,
  type MonthlyIntentionsStore,
} from '../lib/intentions'
import type { MonthlyIntentions } from '../types'

const PRIORITY_PROMPTS = [
  'Priority 1',
  'Priority 2',
  'Priority 3',
] as const

type MonthScope = 'current' | 'next'

function hasIntentionsContent(intentions: MonthlyIntentions): boolean {
  return (
    intentions.focus.trim().length > 0 ||
    intentions.notes.trim().length > 0 ||
    intentions.priorities.some((item) => item.trim().length > 0)
  )
}

interface MonthlyIntentionsCardProps {
  editing?: boolean
  onEditingChange?: (editing: boolean) => void
}

export function MonthlyIntentionsCard({
  editing: editingProp,
  onEditingChange,
}: MonthlyIntentionsCardProps = {}) {
  const [rawStored, setRawStored] = useLocalStorage<
    MonthlyIntentionsStore | MonthlyIntentions
  >(INTENTIONS_KEY, {}, isMonthlyIntentionsStore)

  const store = useMemo(
    () => coerceIntentionsStore(rawStored),
    [rawStored],
  )

  const [scope, setScope] = useState<MonthScope>('current')
  const monthKey =
    scope === 'current' ? currentMonthKey() : nextMonthKey()
  const isFutureMonth = scope === 'next'
  const saved = intentionsForMonth(store, monthKey)

  const [draft, setDraft] = useState<MonthlyIntentions>(saved)
  const [status, setStatus] = useState<'idle' | 'added' | 'updated'>('idle')
  const [internalEditing, setInternalEditing] = useState(
    () => !hasIntentionsContent(saved),
  )
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const readyToAutosave = useRef(false)
  const focusInputRef = useRef<HTMLInputElement>(null)
  const didAutoEdit = useRef(false)
  const draftMonthRef = useRef(monthKey)

  const editing = editingProp ?? internalEditing

  function setEditing(next: boolean) {
    onEditingChange?.(next)
    if (editingProp === undefined) setInternalEditing(next)
  }

  // When switching This / Next month, load that month's draft.
  useEffect(() => {
    if (draftMonthRef.current === monthKey) return
    draftMonthRef.current = monthKey
    readyToAutosave.current = false
    setDraft(saved)
    didAutoEdit.current = false
    const empty = !hasIntentionsContent(saved)
    if (empty) setEditing(true)
    requestAnimationFrame(() => {
      readyToAutosave.current = true
    })
  }, [monthKey, saved])

  useEffect(() => {
    if (didAutoEdit.current) return
    if (!hasIntentionsContent(saved)) {
      didAutoEdit.current = true
      setEditing(true)
    }
  }, [saved])

  useEffect(() => {
    readyToAutosave.current = true
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      if (statusTimer.current) clearTimeout(statusTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!editing) return
    requestAnimationFrame(() => {
      focusInputRef.current?.focus()
    })
  }, [editing])

  useEffect(() => {
    if (!editing) return
    const mq = window.matchMedia('(max-width: 639px)')
    const previous = document.body.style.overflow

    function sync() {
      document.body.style.overflow = mq.matches ? 'hidden' : previous
    }

    sync()
    mq.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      document.body.style.overflow = previous
    }
  }, [editing])

  const draftWeeks = draft.priorityWeeks ?? []
  const savedWeeks = saved.priorityWeeks ?? []
  const isDirty =
    draft.focus !== saved.focus ||
    draft.notes !== saved.notes ||
    draft.priorities.length !== saved.priorities.length ||
    draft.priorities.some((item, index) => item !== saved.priorities[index]) ||
    draftWeeks.some((weeks, index) => weeks !== savedWeeks[index])

  const monthLabel = monthLabelFromKey(monthKey)
  const currentMonthLabel = monthLabelFromKey(currentMonthKey())
  const nextMonthLabel = monthLabelFromKey(nextMonthKey())
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
      setRawStored((prev) => {
        const base = coerceIntentionsStore(prev)
        if (!hasContent) {
          const { [monthKey]: _removed, ...rest } = base
          return rest
        }
        return { ...base, [monthKey]: next }
      })

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
  }, [draft, isDirty, monthKey, saved, setRawStored])

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
    if (isFutureMonth) return
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

  const cardBody = (
    <>
      {editing ? (
        <div
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-sage-200 sm:hidden"
          aria-hidden="true"
        />
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl tracking-wide text-sage-600 sm:text-2xl">
            Monthly goals
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {isFutureMonth
              ? 'Plan ahead — set focus and priorities for next month before it begins.'
              : 'A short ritual for the month ahead — one focus, a few priorities.'}
          </p>
        </div>
        {editing ? (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="hidden shrink-0 rounded-xl bg-sage-400 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 sm:inline-flex"
          >
            Edit
          </button>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Month"
        className="mt-5 grid grid-cols-2 gap-1 rounded-full border border-sage-200 bg-white/70 p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={scope === 'current'}
          onClick={() => setScope('current')}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            scope === 'current'
              ? 'bg-sage-400 text-white'
              : 'text-ink-soft hover:text-ink'
          }`}
        >
          {currentMonthLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={scope === 'next'}
          onClick={() => setScope('next')}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            scope === 'next'
              ? 'bg-sage-400 text-white'
              : 'text-ink-soft hover:text-ink'
          }`}
        >
          {nextMonthLabel}
        </button>
      </div>

      <div className="mt-6 space-y-7">
        <div>
          <p className="mb-2 text-sm font-medium text-ink">
            {isFutureMonth
              ? 'Next month, I want to focus on:'
              : 'This month, I want to focus on:'}
          </p>
          {editing ? (
            <input
              ref={focusInputRef}
              type="text"
              value={draft.focus}
              onChange={(e) => update({ focus: e.target.value })}
              placeholder="One intention that guides everything else"
              className={`${inputClasses} font-display text-lg sm:text-xl`}
            />
          ) : (
            <p className="font-display text-lg leading-snug text-ink sm:text-xl">
              {draft.focus.trim() || (
                <span className="text-ink-muted">No focus set yet</span>
              )}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-1 text-sm font-medium text-ink">
            My top priorities:
          </legend>
          <p className="mb-3 text-xs text-ink-muted">
            {isFutureMonth
              ? 'Lock in what matters most — progress tracking opens when the month starts.'
              : 'Tap a bar segment to set progress — from Not started to Complete.'}
          </p>
          <div className="space-y-3">
            {Array.from({ length: MAX_PRIORITIES }, (_, index) => {
              const priority = draft.priorities[index] ?? ''
              const weeks = draftWeeks[index] ?? 0
              const hasText = priority.trim().length > 0
              const statusLabel = weekLabel(weeks)
              const complete = weeks >= WEEKS_PER_PRIORITY

              if (!editing && !hasText) return null

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
                    {editing ? (
                      <input
                        type="text"
                        value={priority}
                        onChange={(e) => updatePriority(index, e.target.value)}
                        placeholder={PRIORITY_PROMPTS[index]}
                        aria-label={`Priority ${index + 1}`}
                        className={`min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-ink-muted focus:ring-0 sm:text-base ${
                          complete && !isFutureMonth
                            ? 'line-through opacity-60'
                            : ''
                        }`}
                      />
                    ) : (
                      <p
                        className={`min-w-0 flex-1 text-sm text-ink sm:text-base ${
                          complete && !isFutureMonth
                            ? 'line-through opacity-60'
                            : ''
                        }`}
                      >
                        {priority}
                      </p>
                    )}
                    {!isFutureMonth ? (
                      <span
                        className={`shrink-0 text-xs font-medium ${
                          complete
                            ? 'text-sage-600'
                            : weeks > 0
                              ? 'text-ink-soft'
                              : 'text-ink-muted'
                        }`}
                      >
                        {statusLabel}
                      </span>
                    ) : null}
                  </div>

                  {!isFutureMonth ? (
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
                  ) : null}
                </div>
              )
            })}
            {!editing && filledPriorities === 0 ? (
              <p className="text-sm text-ink-muted">No priorities set yet</p>
            ) : null}
          </div>
        </fieldset>

        {editing || draft.notes.trim() ? (
          <div>
            <p className="mb-2 text-sm font-medium text-ink">
              Why does this matter to me?{' '}
              <span className="font-normal text-ink-muted">(optional)</span>
            </p>
            {editing ? (
              <textarea
                value={draft.notes}
                onChange={(e) => update({ notes: e.target.value })}
                rows={3}
                placeholder="A few words to come back to when the month gets noisy..."
                className={`${inputClasses} resize-y`}
              />
            ) : (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                {draft.notes}
              </p>
            )}
          </div>
        ) : null}

        {!isFutureMonth ? (
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
        ) : (
          <p className="rounded-2xl bg-mist-100 px-4 py-3 text-sm text-mist-600">
            These goals stay ready for {monthLabel}. When that month begins,
            they&apos;ll show up as this month&apos;s plan.
          </p>
        )}
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
            {isFutureMonth ? 'Next month planned' : 'Goals added'}
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
            Goals updated
          </span>
        ) : null}
      </p>
    </>
  )

  if (editing) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center sm:static sm:z-auto sm:block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="monthly-goals-sheet-title"
      >
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setEditing(false)}
          className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] sm:hidden"
        />
        <section
          id="monthly-intentions"
          className="relative z-10 max-h-[min(92vh,calc(100%-2.5rem))] w-full overflow-y-auto rounded-t-3xl bg-surface-solid p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] shadow-[0_-12px_40px_rgba(61,50,48,0.2)] animate-slide-up sm:max-h-none sm:overflow-visible sm:rounded-[24px] sm:bg-transparent sm:p-0 sm:pb-0 sm:shadow-none sm:animate-none"
          aria-label="Monthly goals"
        >
          <div className="sm:glass-card sm:scroll-mt-24 sm:p-6 sm:animate-fade-up">
            <span id="monthly-goals-sheet-title" className="sr-only">
              Edit monthly goals
            </span>
            {cardBody}
          </div>
        </section>
      </div>
    )
  }

  return (
    <section
      id="monthly-intentions"
      className="glass-card scroll-mt-24 p-5 animate-fade-up sm:p-6"
      style={{ animationDelay: '150ms' }}
      aria-label="Monthly goals"
    >
      {cardBody}
    </section>
  )
}
