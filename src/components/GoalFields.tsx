import { useEffect, useId, useRef, useState } from 'react'
import { mapsUrl, searchPlaces, type MapPlace } from '../lib/maps'
import type { GoalCalendar, GoalRepeat } from '../types'

export const REPEAT_OPTIONS: { value: GoalRepeat; label: string }[] = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

export const CALENDAR_OPTIONS: { value: GoalCalendar; label: string }[] = [
  { value: 'none', label: "Don't sync" },
  { value: 'apple', label: 'Apple Calendar' },
  { value: 'google', label: 'Google Calendar' },
  { value: 'outlook', label: 'Outlook' },
]

export const goalFieldClass =
  'w-full rounded-xl border border-sage-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200'

export const goalSelectClass =
  'w-full appearance-none rounded-xl border border-sage-200 bg-blush-50 py-2.5 pr-10 pl-3.5 text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200'

export function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-ink-soft"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 8 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LocationMapField({
  value,
  latitude,
  longitude,
  onChange,
}: {
  value: string
  latitude?: number
  longitude?: number
  onChange: (next: {
    location: string
    locationLat?: number
    locationLng?: number
  }) => void
}) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [suggestions, setSuggestions] = useState<MapPlace[]>([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const query = value.trim()
    if (query.length < 2) {
      setSuggestions([])
      setSearching(false)
      return
    }

    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setSearching(true)
      try {
        const places = await searchPlaces(query, controller.signal)
        if (!controller.signal.aborted) {
          setSuggestions(places)
          setOpen(places.length > 0)
        }
      } catch {
        if (!controller.signal.aborted) setSuggestions([])
      } finally {
        if (!controller.signal.aborted) setSearching(false)
      }
    }, 280)

    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [value])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const canOpenMap = value.trim().length > 0

  return (
    <div ref={rootRef} className="relative block sm:col-span-2">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-ink-soft">Location</span>
        {canOpenMap ? (
          <a
            href={mapsUrl({
              label: value.trim(),
              latitude,
              longitude,
            })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-xs font-medium text-accent transition hover:text-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open in Maps
            <svg
              className="h-3 w-3"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3h7v7M13 3 7 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ) : null}
      </div>
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        value={value}
        onChange={(e) => {
          onChange({ location: e.target.value })
          setOpen(true)
        }}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true)
        }}
        placeholder="Search a place or type an address"
        className={goalFieldClass}
        autoComplete="off"
      />
      {searching ? (
        <p className="mt-1.5 text-xs text-ink-muted">Searching maps…</p>
      ) : null}
      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="glass-menu absolute z-20 mt-1 max-h-52 w-full overflow-y-auto rounded-xl p-1"
        >
          {suggestions.map((place) => (
            <li key={place.id} role="option">
              <button
                type="button"
                onClick={() => {
                  onChange({
                    location: place.label,
                    locationLat: place.latitude,
                    locationLng: place.longitude,
                  })
                  setSuggestions([])
                  setOpen(false)
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-sage-100"
              >
                {place.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
