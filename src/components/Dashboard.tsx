import { CATEGORY_STYLES } from '../data/categories'
import { dayKey } from '../lib/date'
import type { Goal, JournalEntry, UserProfile, VisionItem, View } from '../types'
import { visionCardImageUrl } from '../lib/quoteCard'
import { AffirmationCard } from './AffirmationCard'
import { GrowthJourneyCard } from './GrowthJourneyCard'
import { MonthlyIntentionsPreview } from './MonthlyIntentionsPreview'

interface DashboardProps {
  goals: Goal[]
  visions: VisionItem[]
  journalEntries: JournalEntry[]
  profile: UserProfile
  onNavigate: (view: View, targetId?: string) => void
  onToggleGoal: (id: string) => void
}

function timeGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 5) return 'Hello, night owl'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard({
  goals,
  visions,
  journalEntries,
  profile,
  onNavigate,
  onToggleGoal,
}: DashboardProps) {
  const boardVisions = [...visions].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )

  // Completed goals linger (struck through) for the day they were checked
  // off, then leave the dashboard; they still live on the Goals page.
  const todayKey = dayKey(new Date())
  const todaysGoals = goals
    .filter(
      (goal) =>
        !goal.completed ||
        (goal.completedAt && dayKey(new Date(goal.completedAt)) === todayKey),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  /** Soft bento spans across a 2-col / 3-col mosaic. */
  function previewBentoClass(index: number): string {
    const pattern = [
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
    ]
    return pattern[index % pattern.length]
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent sm:text-sm">
          {timeGreeting()}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          Your little corner for goals, daily pep talks, and the dreams you're
          making real.
        </p>
        {profile.focusAreas.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-muted">
              You're focusing on:
            </span>
            {profile.focusAreas.map((area) => {
              const style = CATEGORY_STYLES[area]
              return (
                <span
                  key={area}
                  className={`rounded-lg border px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
                >
                  {area}
                </span>
              )
            })}
          </div>
        ) : null}
      </header>

      <AffirmationCard />

      <GrowthJourneyCard entries={journalEntries} onNavigate={onNavigate} />

      <section
        className="grid gap-5 sm:gap-6 lg:grid-cols-2 animate-fade-up"
        style={{ animationDelay: '150ms' }}
      >
        <div className="glass-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-ink sm:text-2xl">
              Today's Goals
            </h2>
            <LinkButton
              label="Add goals"
              onClick={() => onNavigate('goals', 'add-goal')}
            />
          </div>

          {todaysGoals.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center py-6 text-center sm:py-8">
              <span
                className="grid h-14 w-14 place-items-center text-sage-400"
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
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
                Nothing here yet — add your first goal and let&apos;s get things
                moving.
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-2.5">
              {todaysGoals.map((goal) => {
                const style = CATEGORY_STYLES[goal.category]
                return (
                  <li
                    key={goal.id}
                    className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition ${style.bg} ${style.border} ${
                      goal.completed ? 'opacity-70' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => onToggleGoal(goal.id)}
                      className="h-4.5 w-4.5 shrink-0 cursor-pointer accent-blush-500"
                      aria-label={`Mark ${goal.title} as ${goal.completed ? 'incomplete' : 'complete'}`}
                    />
                    <span
                      className={`min-w-0 flex-1 truncate text-sm font-medium text-ink ${
                        goal.completed ? 'line-through opacity-55' : ''
                      }`}
                    >
                      {goal.title}
                    </span>
                    <span
                      className={`shrink-0 rounded-lg border px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
                    >
                      {goal.category}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <MonthlyIntentionsPreview onNavigate={onNavigate} />
      </section>

      <section
        className="glass-card p-5 sm:p-6 animate-fade-up"
        style={{ animationDelay: '220ms' }}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl text-ink sm:text-2xl">
            Vision board
          </h2>
          <LinkButton
            label="Add vision"
            onClick={() => onNavigate('vision', 'add-vision')}
          />
        </div>

        {boardVisions.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center py-8 text-center sm:py-10">
            <span
              className="grid h-14 w-14 place-items-center text-sage-400"
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
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="m21 15-4.5-4.5L7 20" />
              </svg>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              Nothing pinned yet. Add a photo, image link, or quote that feels
              like your future — one piece is enough to start.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('vision', 'add-vision')}
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-sage-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
            >
              Set up my board
            </button>
          </div>
        ) : (
          <div
            className="mt-5 grid auto-rows-[9rem] grid-cols-2 gap-2.5 sm:auto-rows-[11rem] sm:grid-cols-3 sm:gap-3"
            aria-label="Vision board"
          >
            {boardVisions.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate('vision')}
                className={`group relative min-h-0 overflow-hidden rounded-2xl bg-blush-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${previewBentoClass(index)}`}
                aria-label={`Open vision board — ${item.title}`}
              >
                <img
                  src={visionCardImageUrl(item.imageUrl, item.title)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function LinkButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-1 text-sm font-medium text-accent transition hover:text-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
      </svg>
    </button>
  )
}
