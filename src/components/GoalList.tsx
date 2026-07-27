import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CATEGORY_STYLES, GOAL_CATEGORIES } from '../data/categories'
import { syncGoalToCalendar } from '../lib/calendar'
import type {
  Goal,
  GoalCalendar,
  GoalCategory,
  GoalRepeat,
} from '../types'
import {
  CALENDAR_OPTIONS,
  LocationMapField,
  REPEAT_OPTIONS,
  SelectChevron,
  goalFieldClass,
  goalSelectClass,
} from './GoalFields'

interface GoalListProps {
  goals: Goal[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (goal: Goal) => void
}

export function GoalList({
  goals,
  onToggle,
  onDelete,
  onUpdate,
}: GoalListProps) {
  const [tab, setTab] = useState<'progress' | 'archived'>('progress')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editCategory, setEditCategory] = useState<GoalCategory>('Wellness')
  const [editRepeat, setEditRepeat] = useState<GoalRepeat>('none')
  const [editAlertEnabled, setEditAlertEnabled] = useState(false)
  const [editAlertTime, setEditAlertTime] = useState('09:00')
  const [editLocation, setEditLocation] = useState('')
  const [editLocationLat, setEditLocationLat] = useState<number | undefined>()
  const [editLocationLng, setEditLocationLng] = useState<number | undefined>()
  const [editCalendarSync, setEditCalendarSync] =
    useState<GoalCalendar>('none')

  const editingGoal = editingId
    ? goals.find((goal) => goal.id === editingId)
    : undefined

  useEffect(() => {
    if (!openMenuId) return
    function closeOnOutsideClick(event: PointerEvent) {
      if (!(event.target as Element).closest('[data-goal-menu]')) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [openMenuId])

  useEffect(() => {
    if (!editingId) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [editingId])

  function startEditing(goal: Goal) {
    setOpenMenuId(null)
    setEditingId(goal.id)
    setEditTitle(goal.title)
    setEditCategory(goal.category)
    setEditRepeat(goal.repeat ?? 'none')
    setEditAlertEnabled(Boolean(goal.alertEnabled))
    setEditAlertTime(goal.alertTime ?? '09:00')
    setEditLocation(goal.location ?? '')
    setEditLocationLat(goal.locationLat)
    setEditLocationLng(goal.locationLng)
    setEditCalendarSync(goal.calendarSync ?? 'none')
  }

  function closeEditing() {
    setEditingId(null)
  }

  function saveEditing() {
    if (!editingGoal) return
    const trimmed = editTitle.trim()
    if (!trimmed) return

    const trimmedLocation = editLocation.trim()
    const updated: Goal = {
      ...editingGoal,
      title: trimmed,
      category: editCategory,
      repeat: editRepeat,
      alertEnabled: editAlertEnabled,
      alertTime: editAlertEnabled ? editAlertTime : undefined,
      location: trimmedLocation || undefined,
      locationLat:
        trimmedLocation && typeof editLocationLat === 'number'
          ? editLocationLat
          : undefined,
      locationLng:
        trimmedLocation && typeof editLocationLng === 'number'
          ? editLocationLng
          : undefined,
      calendarSync: editCalendarSync,
    }

    onUpdate(updated)
    syncGoalToCalendar(updated)
    setEditingId(null)
  }

  if (goals.length === 0) {
    return (
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
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </span>
        <p className="mt-4 font-display text-xl text-ink">
          No goals yet — and that&apos;s okay
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Add your first one above and it&apos;ll show up right here.
        </p>
      </div>
    )
  }

  const sorted = [...goals].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const inProgress = sorted.filter((goal) => !goal.completed)
  const archived = sorted.filter((goal) => goal.completed)
  const visible = tab === 'archived' ? archived : inProgress

  return (
    <div className="space-y-4">
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-accent px-6 py-10 text-center animate-fade-in">
          {tab === 'archived' ? (
            <>
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
                  <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5L12 14.8 7.5 16.7l.9-5L4.8 8.2l5-.7L12 3z" />
                </svg>
              </span>
              <p className="mt-4 font-display text-xl text-ink">
                Nothing checked off yet
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                No rush — your wins will land here when they&apos;re ready.
              </p>
            </>
          ) : (
            <>
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
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.5 2.5 4.5-5" />
                </svg>
              </span>
              <p className="mt-4 font-display text-xl text-ink">
                Look at you — all done!
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Add a new goal, or peek at your completed list and celebrate a
                little.
              </p>
            </>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((goal, index) => {
            const style = CATEGORY_STYLES[goal.category]

            return (
              <li
                key={goal.id}
                className={`glass-card p-4 transition hover:-translate-y-0.5 animate-fade-up ${
                  openMenuId === goal.id ? 'relative z-30' : 'relative z-0'
                }`}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => onToggle(goal.id)}
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer accent-blush-500"
                    aria-label={`Mark ${goal.title} as ${goal.completed ? 'incomplete' : 'complete'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`font-medium text-ink ${
                          goal.completed ? 'line-through opacity-55' : ''
                        }`}
                      >
                        {goal.title}
                      </h3>
                      <span
                        className={`rounded-lg border px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
                      >
                        {goal.category}
                      </span>
                    </div>
                    {goal.notes ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                        {goal.notes}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative shrink-0" data-goal-menu>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId(openMenuId === goal.id ? null : goal.id)
                      }
                      aria-haspopup="menu"
                      aria-expanded={openMenuId === goal.id}
                      aria-label={`Options for ${goal.title}`}
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
                    {openMenuId === goal.id ? (
                      <div
                        role="menu"
                        className="glass-menu absolute right-0 top-full z-40 mt-1 w-36 rounded-xl p-1"
                      >
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => startEditing(goal)}
                          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-blush-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setOpenMenuId(null)
                            onDelete(goal.id)
                          }}
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

      <div
        role="tablist"
        aria-label="Goal filter"
        className="glass-card inline-flex items-center gap-1 rounded-full p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'progress'}
          onClick={() => setTab('progress')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            tab === 'progress'
              ? 'bg-sage-400 text-white'
              : 'text-ink-soft hover:bg-sage-100 hover:text-ink'
          }`}
        >
          In progress ({inProgress.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'archived'}
          onClick={() => setTab('archived')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            tab === 'archived'
              ? 'bg-sage-400 text-white'
              : 'text-ink-soft hover:bg-sage-100 hover:text-ink'
          }`}
        >
          Completed ({archived.length})
        </button>
      </div>

      {editingGoal
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-goal-title"
            >
              <button
                type="button"
                aria-label="Dismiss"
                onClick={closeEditing}
                className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
              />
              <form
                className="relative z-10 flex h-[100dvh] max-h-[100dvh] w-full max-w-lg flex-col overflow-y-auto rounded-t-3xl bg-surface-solid p-6 shadow-[0_-12px_40px_rgba(61,50,48,0.2)] animate-slide-up sm:h-auto sm:max-h-[min(90vh,calc(100%-3rem))] sm:rounded-3xl sm:shadow-[0_20px_60px_rgba(61,50,48,0.28)]"
                style={{
                  paddingBottom:
                    'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
                }}
                onSubmit={(event) => {
                  event.preventDefault()
                  saveEditing()
                }}
              >
            <div
              className="mx-auto mb-4 h-1 w-10 rounded-full bg-sage-200 sm:hidden"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2
                  id="edit-goal-title"
                  className="font-display text-xl text-ink sm:text-2xl"
                >
                  Edit goal
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  Update details, reminders, and where this lives.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditing}
                className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
              >
                Cancel
              </button>
            </div>

            <div className="mt-6 grid flex-1 content-start gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Goal
                </span>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  autoFocus
                  className={goalFieldClass}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Category
                </span>
                <span className="relative block">
                  <select
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(e.target.value as GoalCategory)
                    }
                    className={goalSelectClass}
                  >
                    {GOAL_CATEGORIES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Repeat
                </span>
                <span className="relative block">
                  <select
                    value={editRepeat}
                    onChange={(e) =>
                      setEditRepeat(e.target.value as GoalRepeat)
                    }
                    className={goalSelectClass}
                  >
                    {REPEAT_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </span>
              </label>

              <div className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Alert
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-sage-200 bg-blush-50 px-3.5 py-2.5 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={editAlertEnabled}
                      onChange={(e) => setEditAlertEnabled(e.target.checked)}
                      className="h-4 w-4 accent-sage-600"
                    />
                    Remind me
                  </label>
                  <label
                    className={`relative block min-w-[9.5rem] flex-1 ${
                      editAlertEnabled ? '' : 'pointer-events-none opacity-45'
                    }`}
                  >
                    <span className="sr-only">Alert time</span>
                    <input
                      type="time"
                      value={editAlertTime}
                      onChange={(e) => setEditAlertTime(e.target.value)}
                      disabled={!editAlertEnabled}
                      className={goalFieldClass}
                    />
                  </label>
                </div>
              </div>

              <LocationMapField
                value={editLocation}
                latitude={editLocationLat}
                longitude={editLocationLng}
                onChange={(next) => {
                  setEditLocation(next.location)
                  setEditLocationLat(next.locationLat)
                  setEditLocationLng(next.locationLng)
                }}
              />

              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Sync to calendar
                </span>
                <span className="relative block max-w-md">
                  <select
                    value={editCalendarSync}
                    onChange={(e) =>
                      setEditCalendarSync(e.target.value as GoalCalendar)
                    }
                    className={goalSelectClass}
                  >
                    {CALENDAR_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </span>
                <p className="mt-1.5 text-xs text-ink-muted">
                  {editCalendarSync === 'apple'
                    ? 'Saves an .ics file you can open in Apple Calendar.'
                    : editCalendarSync === 'google'
                      ? 'Opens Google Calendar with this goal ready to add.'
                      : editCalendarSync === 'outlook'
                        ? 'Opens Outlook with this goal ready to add.'
                        : 'Choose a calendar to add this goal when you save.'}
                </p>
              </label>
            </div>

            <button
              type="submit"
              disabled={!editTitle.trim()}
              className="mt-6 w-full shrink-0 rounded-xl bg-sage-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-6 sm:w-auto"
            >
              Save changes
            </button>
              </form>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
