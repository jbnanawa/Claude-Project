import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { GOAL_CATEGORIES } from '../data/categories'
import { syncGoalToCalendar } from '../lib/calendar'
import { createId } from '../lib/id'
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

interface GoalFormProps {
  onAdd: (goal: Goal) => void
  onCancel?: () => void
}

export function GoalForm({ onAdd, onCancel }: GoalFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<GoalCategory>('Wellness')
  const [repeat, setRepeat] = useState<GoalRepeat>('none')
  const [alertEnabled, setAlertEnabled] = useState(false)
  const [alertTime, setAlertTime] = useState('09:00')
  const [location, setLocation] = useState('')
  const [locationLat, setLocationLat] = useState<number | undefined>()
  const [locationLng, setLocationLng] = useState<number | undefined>()
  const [calendarSync, setCalendarSync] = useState<GoalCalendar>('none')

  useEffect(() => {
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
  }, [])

  function resetForm() {
    setTitle('')
    setCategory('Wellness')
    setRepeat('none')
    setAlertEnabled(false)
    setAlertTime('09:00')
    setLocation('')
    setLocationLat(undefined)
    setLocationLng(undefined)
    setCalendarSync('none')
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    const trimmedLocation = location.trim()

    const goal: Goal = {
      id: createId(),
      title: trimmed,
      category,
      notes: '',
      completed: false,
      createdAt: new Date().toISOString(),
      repeat,
      alertEnabled,
      ...(alertEnabled ? { alertTime } : {}),
      ...(trimmedLocation
        ? {
            location: trimmedLocation,
            ...(typeof locationLat === 'number' &&
            typeof locationLng === 'number'
              ? { locationLat, locationLng }
              : {}),
          }
        : {}),
      calendarSync,
    }

    onAdd(goal)
    syncGoalToCalendar(goal)
    resetForm()
  }

  function renderFields(options: {
    titleId?: string
    autoFocus?: boolean
  }): ReactNode {
    return (
      <>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2
              id={options.titleId}
              className="font-display text-xl text-ink sm:text-2xl"
            >
              What are we working toward?
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Pick a category and tell me what you're reaching for.
            </p>
          </div>
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
            >
              Cancel
            </button>
          ) : null}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Goal
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning walks three times a week"
              autoFocus={options.autoFocus}
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
                value={category}
                onChange={(e) => setCategory(e.target.value as GoalCategory)}
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
                value={repeat}
                onChange={(e) => setRepeat(e.target.value as GoalRepeat)}
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
                  checked={alertEnabled}
                  onChange={(e) => setAlertEnabled(e.target.checked)}
                  className="h-4 w-4 accent-sage-600"
                />
                Remind me
              </label>
              <label
                className={`relative block min-w-[9.5rem] flex-1 ${
                  alertEnabled ? '' : 'pointer-events-none opacity-45'
                }`}
              >
                <span className="sr-only">Alert time</span>
                <input
                  type="time"
                  value={alertTime}
                  onChange={(e) => setAlertTime(e.target.value)}
                  disabled={!alertEnabled}
                  className={goalFieldClass}
                />
              </label>
            </div>
          </div>

          <LocationMapField
            value={location}
            latitude={locationLat}
            longitude={locationLng}
            onChange={(next) => {
              setLocation(next.location)
              setLocationLat(next.locationLat)
              setLocationLng(next.locationLng)
            }}
          />

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Sync to calendar
            </span>
            <span className="relative block max-w-md">
              <select
                value={calendarSync}
                onChange={(e) =>
                  setCalendarSync(e.target.value as GoalCalendar)
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
              {calendarSync === 'apple'
                ? 'Saves an .ics file you can open in Apple Calendar.'
                : calendarSync === 'google'
                  ? 'Opens Google Calendar with this goal ready to add.'
                  : calendarSync === 'outlook'
                    ? 'Opens Outlook with this goal ready to add.'
                    : 'Choose a calendar to add this goal when you save.'}
            </p>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-sage-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 sm:w-auto"
        >
          Add it to the list
        </button>
      </>
    )
  }

  return (
    <>
      {/* Mobile: bottom sheet that slides up */}
      <div
        className="fixed inset-0 z-50 flex items-end justify-center sm:hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-goal-title"
      >
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onCancel}
          className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        />
        <form
          onSubmit={handleSubmit}
          className="relative z-10 max-h-[min(90vh,calc(100%-3rem))] w-full overflow-y-auto rounded-t-3xl bg-surface-solid p-6 shadow-[0_-12px_40px_rgba(61,50,48,0.2)] animate-slide-up"
          style={{
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div
            className="mx-auto mb-4 h-1 w-10 rounded-full bg-sage-200"
            aria-hidden="true"
          />
          {renderFields({ titleId: 'add-goal-title', autoFocus: true })}
        </form>
      </div>

      {/* Desktop: inline card */}
      <form
        id="add-goal"
        onSubmit={handleSubmit}
        className="glass-card scroll-mt-24 hidden p-6 animate-fade-up sm:block"
      >
        {renderFields({})}
      </form>
    </>
  )
}
