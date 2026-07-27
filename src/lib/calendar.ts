import type { Goal, GoalCalendar, GoalRepeat } from '../types'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** Local date-time as YYYYMMDDTHHMMSS for calendar URLs / ICS (floating local). */
function formatLocalStamp(date: Date): string {
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  )
}

/** UTC stamp for ICS DTSTAMP / UID timestamps. */
function formatUtcStamp(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  )
}

function parseAlertTime(alertTime?: string): { hours: number; minutes: number } {
  const match = /^(\d{1,2}):(\d{2})$/.exec(alertTime ?? '')
  if (!match) return { hours: 9, minutes: 0 }
  return {
    hours: Math.min(23, Number(match[1])),
    minutes: Math.min(59, Number(match[2])),
  }
}

function eventWindow(goal: Goal): { start: Date; end: Date } {
  const start = new Date()
  const { hours, minutes } = parseAlertTime(
    goal.alertEnabled ? goal.alertTime : undefined,
  )
  start.setSeconds(0, 0)
  start.setHours(hours, minutes, 0, 0)
  // If today's alert time already passed, schedule for tomorrow.
  if (start.getTime() < Date.now() - 60_000) {
    start.setDate(start.getDate() + 1)
  }
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  return { start, end }
}

function rruleFor(repeat?: GoalRepeat): string | undefined {
  switch (repeat) {
    case 'daily':
      return 'FREQ=DAILY'
    case 'weekly':
      return 'FREQ=WEEKLY'
    case 'weekdays':
      return 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'
    case 'monthly':
      return 'FREQ=MONTHLY'
    default:
      return undefined
  }
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function buildIcs(goal: Goal): string {
  const { start, end } = eventWindow(goal)
  const stamp = formatUtcStamp(new Date())
  const uid = `${goal.id}@everiora.app`
  const rrule = rruleFor(goal.repeat)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Everiora//Goals//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatLocalStamp(start)}`,
    `DTEND:${formatLocalStamp(end)}`,
    `SUMMARY:${escapeIcsText(goal.title)}`,
  ]

  const description = [
    goal.category ? `Category: ${goal.category}` : '',
    goal.notes?.trim() || '',
  ]
    .filter(Boolean)
    .join('\\n')

  if (description) lines.push(`DESCRIPTION:${escapeIcsText(description)}`)
  if (goal.location?.trim()) {
    lines.push(`LOCATION:${escapeIcsText(goal.location.trim())}`)
  }
  if (rrule) lines.push(`RRULE:${rrule}`)
  if (goal.alertEnabled) {
    lines.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder',
      'TRIGGER:-PT0M',
      'END:VALARM',
    )
  }
  lines.push('END:VEVENT', 'END:VCALENDAR')
  return `${lines.join('\r\n')}\r\n`
}

function downloadIcs(goal: Goal) {
  const blob = new Blob([buildIcs(goal)], {
    type: 'text/calendar;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  const safeName = goal.title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  anchor.href = url
  anchor.download = `${safeName || 'goal'}.ics`
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function googleCalendarUrl(goal: Goal): string {
  const { start, end } = eventWindow(goal)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: goal.title,
    dates: `${formatUtcStamp(start)}/${formatUtcStamp(end)}`,
  })
  const details = [
    goal.category ? `Category: ${goal.category}` : '',
    goal.notes?.trim() || '',
    goal.repeat && goal.repeat !== 'none'
      ? `Repeats: ${goal.repeat}`
      : '',
  ]
    .filter(Boolean)
    .join('\n')
  if (details) params.set('details', details)
  if (goal.location?.trim()) params.set('location', goal.location.trim())
  const rrule = rruleFor(goal.repeat)
  if (rrule) params.set('recur', `RRULE:${rrule}`)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function outlookCalendarUrl(goal: Goal): string {
  const { start, end } = eventWindow(goal)
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: goal.title,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
  })
  const body = [
    goal.category ? `Category: ${goal.category}` : '',
    goal.notes?.trim() || '',
    goal.repeat && goal.repeat !== 'none'
      ? `Repeats: ${goal.repeat}`
      : '',
  ]
    .filter(Boolean)
    .join('\n')
  if (body) params.set('body', body)
  if (goal.location?.trim()) params.set('location', goal.location.trim())
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

/**
 * Open or download a calendar event for the goal.
 * Google/Outlook use web compose links; Apple gets an .ics file.
 */
export function syncGoalToCalendar(
  goal: Goal,
  provider: GoalCalendar = goal.calendarSync ?? 'none',
): void {
  if (provider === 'none') return

  if (provider === 'apple') {
    downloadIcs(goal)
    return
  }

  const url =
    provider === 'google' ? googleCalendarUrl(goal) : outlookCalendarUrl(goal)
  window.open(url, '_blank', 'noopener,noreferrer')
}
