import { createPortal } from 'react-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { dayKey } from '../lib/date'
import {
  GARDEN_STAGES,
  plantedDays,
  stageIndexForDays,
} from '../lib/garden'
import type { JournalEntry, View } from '../types'
import { SeasonIcon } from './SeasonIcon'

interface GrowthJourneyCardProps {
  entries: JournalEntry[]
  onNavigate: (view: View) => void
}

// Ambient magic that appears in the card as the garden grows — no badges,
// the dashboard just quietly becomes prettier.
const DECORATIONS = [
  {
    at: 7,
    emoji: '\u{1F98B}',
    label: 'Butterflies',
    position: 'right-6 top-5',
  },
  { at: 14, emoji: '\u{1F41D}', label: 'Bees', position: 'left-[45%] top-4' },
  { at: 30, emoji: '\u{1F308}', label: 'A rainbow', position: 'left-6 top-5' },
  {
    at: 60,
    emoji: '\u{1F305}',
    label: 'Sunrise skies',
    position: 'right-[30%] bottom-6',
  },
  {
    at: 100,
    emoji: '\u{1F319}',
    label: 'Fireflies',
    position: 'left-10 bottom-8',
  },
  {
    at: 180,
    emoji: '\u2728',
    label: 'Lanterns',
    position: 'right-10 bottom-12',
  },
]

const CELEBRATED_KEY = 'glow-within-garden-stage'

function isStageIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value)
}

export function GrowthJourneyCard({
  entries,
  onNavigate,
}: GrowthJourneyCardProps) {
  const [celebrated, setCelebrated] = useLocalStorage<number>(
    CELEBRATED_KEY,
    -1,
    isStageIndex,
  )

  const today = new Date()
  const todayKey = dayKey(today)

  const planted = plantedDays(entries)
  const wateredDays = new Set(planted)
  const totalDays = planted.length
  const wateredToday = wateredDays.has(todayKey)

  // -1 until the first check-in plants the seed.
  const stageIndex = stageIndexForDays(totalDays)
  const stage = stageIndex >= 0 ? GARDEN_STAGES[stageIndex] : null
  const nextStage = GARDEN_STAGES[stageIndex + 1]
  const daysToNext = nextStage ? nextStage.at - totalDays : 0

  // Fill toward the next season overall (not from the current season's start),
  // so the bar doesn't reset to empty the day you unlock a season.
  const progressToNext = nextStage
    ? Math.min(1, totalDays / nextStage.at)
    : 1

  // Current week, Sunday through Saturday. Missed days simply stay unbloomed.
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay())
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + index)
    const key = dayKey(date)
    return {
      key,
      label: date.toLocaleDateString(undefined, { weekday: 'narrow' }),
      watered: wateredDays.has(key),
      isToday: key === todayKey,
      isFuture: key > todayKey,
    }
  })
  const wateredThisWeek = week.filter((day) => day.watered).length
  const wateredEarlier = Math.max(0, totalDays - wateredThisWeek)

  const unlockedMagic = DECORATIONS.filter((item) => totalDays >= item.at)

  // Week circles mirror the current season plant.
  const weekPlantId = stage ? stage.id : GARDEN_STAGES[0].id

  const celebration =
    stage && stageIndex > celebrated ? { ...stage, index: stageIndex } : null

  return (
    <section
      className="glass-card relative overflow-hidden p-5 animate-fade-up sm:p-6"
      style={{ animationDelay: '150ms' }}
      aria-label="Your growth journey"
    >
      <div
        className="pointer-events-none absolute -left-10 -bottom-12 h-40 w-40 rounded-full bg-sage-200/50 blur-2xl animate-soft-pulse"
        aria-hidden="true"
      />
      {unlockedMagic.map((item) => (
        <span
          key={item.label}
          className={`pointer-events-none absolute text-xl opacity-80 animate-soft-pulse ${item.position}`}
          aria-hidden="true"
        >
          {item.emoji}
        </span>
      ))}

      <div className="relative flex flex-wrap items-start justify-between gap-x-8 gap-y-6">
        <div className="min-w-0 max-w-md">
          <h2 className="font-display text-xl text-ink sm:text-2xl">
            Your Growth Journey
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Every day you show up is one drop of water. Miss a day? The flower
            simply doesn't bloom — no guilt, ever.
          </p>

          <div className="mt-5 flex items-center gap-4">
            <span
              className={`grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sage-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:h-20 sm:w-20 ${
                stage ? '' : 'opacity-50'
              }`}
              aria-hidden="true"
            >
              <span className="animate-sprout-grow">
                <SeasonIcon
                  id={stage ? stage.id : GARDEN_STAGES[0].id}
                  className="h-12 w-12 sm:h-16 sm:w-16"
                />
              </span>
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage-600">
                Current season
              </p>
              <p className="mt-0.5 font-display text-2xl text-ink">
                {stage ? `${stage.label} Season` : 'Ready to plant'}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {stage
                  ? stage.message
                  : 'Your first check-in plants the first seed of your future.'}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:max-w-xs">
          <p className="text-sm text-ink-soft">
            You've shown up{' '}
            <span className="font-display text-2xl tabular-nums text-ink">
              {totalDays}
            </span>{' '}
            {totalDays === 1 ? 'day' : 'days'} for yourself.
          </p>

          {nextStage ? (
            <div className="mt-3">
              <div
                className="h-3 overflow-hidden rounded-full bg-sage-200/70"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={nextStage.at}
                aria-valuenow={totalDays}
                aria-label={`Progress to ${nextStage.label} Season`}
              >
                <div
                  className="h-full rounded-full bg-sage-600 transition-all duration-700"
                  style={{
                    width: `${Math.max(progressToNext * 100, totalDays > 0 ? 8 : 0)}%`,
                  }}
                />
              </div>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-soft">
                <SeasonIcon id={nextStage.id} className="h-5 w-5" />
                {nextStage.label} in {daysToNext} more{' '}
                {daysToNext === 1 ? 'day' : 'days'}
              </p>
            </div>
          ) : (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-soft">
              <SeasonIcon id="glow-within" className="h-5 w-5" />
              You've reached every season — keep watering.
            </p>
          )}

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-sage-600">
            This week
          </p>
          {wateredEarlier > 0 ? (
            <p className="mt-1 text-xs text-ink-muted">
              {wateredThisWeek} of {totalDays}{' '}
              {totalDays === 1 ? 'day' : 'days'} show here — {wateredEarlier}{' '}
              from earlier weeks.
            </p>
          ) : null}
          <div className="mt-2.5 flex items-center justify-between gap-1">
            {week.map((day) => (
              <div key={day.key} className="min-w-0 flex-1 text-center">
                <span
                  title={
                    day.watered
                      ? day.isToday
                        ? 'Bloomed today'
                        : 'Bloomed'
                      : day.isToday
                        ? 'Still time to water today'
                        : day.isFuture
                          ? 'Not yet'
                          : "Didn't bloom — that's okay"
                  }
                  className={`mx-auto grid h-9 w-9 place-items-center rounded-full ${
                    day.watered
                      ? 'bg-white shadow-[inset_0_0_0_1px_rgba(213,224,214,0.9)]'
                      : day.isToday
                        ? 'border border-dashed border-sage-400 bg-transparent'
                        : 'border border-dashed border-sage-200/80 bg-transparent'
                  } ${day.isToday ? 'ring-2 ring-sage-400 ring-offset-1' : ''}`}
                  aria-hidden="true"
                >
                  {day.watered ? (
                    <SeasonIcon id={weekPlantId} className="h-5 w-5" />
                  ) : day.isToday ? (
                    <SeasonIcon id="water" className="h-5 w-5 opacity-40" />
                  ) : null}
                </span>
                <span
                  className="mt-1.5 block text-[0.65rem] font-medium uppercase tracking-wide text-ink-muted"
                  aria-hidden="true"
                >
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('journal')}
        className={`relative mt-6 w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
          wateredToday
            ? 'inline-flex items-center justify-center gap-1.5 rounded-xl border border-sage-200 bg-sage-100 px-3.5 py-2.5 text-sm font-medium text-sage-600 transition hover:bg-sage-200/70'
            : 'inline-flex items-center justify-center gap-1.5 rounded-xl bg-sage-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-600 active:scale-[0.99]'
        }`}
      >
        {wateredToday ? (
          <>
            <SeasonIcon id="water" className="h-5 w-5" /> Watered for today —
            your gratitude is growing
          </>
        ) : (
          <>
            Plant a gratitude to grow today
            <SeasonIcon id="seed" className="h-5 w-5 brightness-0 invert" />
          </>
        )}
      </button>

      {celebration
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`A new season: ${celebration.label}`}
              className="fixed inset-0 z-50 grid place-items-center bg-ink/25 px-4 backdrop-blur-sm animate-fade-in"
            >
              <div className="glass-menu w-full max-w-sm rounded-3xl p-8 text-center animate-fade-up">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-600">
                  A new season begins
                </p>
                <span
                  className="mx-auto mt-5 grid h-20 w-20 place-items-center rounded-2xl bg-sage-100 animate-soft-pulse"
                  aria-hidden="true"
                >
                  <SeasonIcon id={celebration.id} className="h-12 w-12" />
                </span>
                <h2 className="mt-5 font-display text-3xl tracking-tight text-ink">
                  {celebration.label === 'Sanctuary'
                    ? 'Welcome to Sanctuary'
                    : `${celebration.label} Season`}
                </h2>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink-soft">
                  {celebration.message}
                </p>
                <button
                  type="button"
                  onClick={() => setCelebrated(celebration.index)}
                  autoFocus
                  className="mt-7 w-full rounded-xl bg-blush-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                >
                  Keep growing
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
