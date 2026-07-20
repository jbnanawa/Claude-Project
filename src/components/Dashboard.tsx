import { CATEGORY_STYLES } from '../data/categories'
import { dayKey } from '../lib/date'
import type { Goal, JournalEntry, UserProfile, VisionItem, View } from '../types'
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
  const activeGoals = goals.filter((goal) => !goal.completed)
  const completedGoals = goals.filter((goal) => goal.completed)
  const achievedVisions = visions.filter((vision) => vision.achieved)
  const recentVisions = [...visions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3)
  const extraVisions = visions.length - recentVisions.length

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

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-600 sm:text-sm">
          {timeGreeting()}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Hey {profile.name}, good to see you
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

      <section
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 animate-fade-up"
        style={{ animationDelay: '120ms' }}
        aria-label="Overview"
      >
        <StatCard label="Goals in motion" value={activeGoals.length} />
        <StatCard label="Goals done" value={completedGoals.length} />
        <StatCard label="Visions pinned" value={visions.length} />
        <StatCard label="Dreams achieved" value={achievedVisions.length} />
      </section>

      <GrowthJourneyCard entries={journalEntries} onNavigate={onNavigate} />

      <MonthlyIntentionsPreview onNavigate={onNavigate} />

      <section
        className="grid gap-5 sm:gap-6 lg:grid-cols-2 animate-fade-up"
        style={{ animationDelay: '220ms' }}
      >
        <div className="glass-card rounded-2xl p-5 sm:p-6">
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
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Nothing here yet — add your first goal and let's get things
              moving.
            </p>
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

        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-ink sm:text-2xl">
              Vision board
            </h2>
            <LinkButton label="View all" onClick={() => onNavigate('vision')} />
          </div>

          {recentVisions.length === 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Nothing pinned yet. Add a few images of the life you're dreaming
              up — future you will love looking back at them.
            </p>
          ) : (
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {recentVisions.map((item) => (
                <figure
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-blush-200"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </figure>
              ))}
              {extraVisions > 0 ? (
                <button
                  type="button"
                  onClick={() => onNavigate('vision')}
                  className="grid aspect-square place-items-center rounded-xl border border-dashed border-blush-300 bg-blush-50/60 text-sm font-medium text-blush-600 transition hover:bg-blush-100"
                >
                  +{extraVisions} more
                </button>
              ) : null}
            </div>
          )}
        </div>

      </section>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass-card rounded-2xl px-4 py-4 transition hover:-translate-y-0.5 sm:px-5">
      <p className="truncate text-xs text-ink-muted sm:text-sm">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums text-ink sm:text-4xl">
        {value}
      </p>
    </div>
  )
}

function LinkButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-1 text-sm font-medium text-blush-600 transition hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
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
