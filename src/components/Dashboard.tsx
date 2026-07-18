import { GOAL_CATEGORIES, CATEGORY_STYLES } from '../data/categories'
import type { Goal, VisionItem, View } from '../types'
import { AffirmationCard } from './AffirmationCard'

interface DashboardProps {
  goals: Goal[]
  visions: VisionItem[]
  onNavigate: (view: View) => void
}

export function Dashboard({ goals, visions, onNavigate }: DashboardProps) {
  const activeGoals = goals.filter((goal) => !goal.completed)
  const completedGoals = goals.filter((goal) => goal.completed)
  const achievedVisions = visions.filter((vision) => vision.achieved)
  const recentVisions = [...visions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3)
  const extraVisions = visions.length - recentVisions.length

  const byCategory = GOAL_CATEGORIES.map((category) => ({
    category,
    count: goals.filter((goal) => goal.category === category && !goal.completed).length,
  })).filter((item) => item.count > 0)

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-600 sm:text-sm">
          Welcome back
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Glow Within
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          A soft space for your goals, daily words, and the visions you are
          calling into form.
        </p>
      </header>

      <AffirmationCard />

      <section
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 animate-fade-up"
        style={{ animationDelay: '120ms' }}
        aria-label="Overview"
      >
        <StatCard label="Active goals" value={activeGoals.length} />
        <StatCard label="Completed" value={completedGoals.length} />
        <StatCard label="Vision pieces" value={visions.length} />
        <StatCard label="Achieved" value={achievedVisions.length} />
      </section>

      <section
        className="grid gap-5 sm:gap-6 lg:grid-cols-2 animate-fade-up"
        style={{ animationDelay: '180ms' }}
      >
        <div className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 p-5 shadow-[0_8px_28px_rgba(61,50,48,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-ink sm:text-2xl">
              Goals by category
            </h2>
            <LinkButton label="Manage" onClick={() => onNavigate('goals')} />
          </div>

          {byCategory.length === 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              No active goals yet. Add one to begin shaping your path.
            </p>
          ) : (
            <ul className="mt-5 space-y-2.5">
              {byCategory.map(({ category, count }) => {
                const style = CATEGORY_STYLES[category]
                return (
                  <li
                    key={category}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 ${style.bg} ${style.border}`}
                  >
                    <span className={`text-sm font-medium ${style.text}`}>
                      {category}
                    </span>
                    <span className={`text-sm tabular-nums ${style.text}`}>
                      {count} {count === 1 ? 'goal' : 'goals'}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 p-5 shadow-[0_8px_28px_rgba(61,50,48,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-ink sm:text-2xl">
              Vision board
            </h2>
            <LinkButton label="Open board" onClick={() => onNavigate('vision')} />
          </div>

          {recentVisions.length === 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Your gallery is empty. Pin images that describe what you want to
              manifest.
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
    <div className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 px-4 py-4 shadow-[0_6px_20px_rgba(61,50,48,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(61,50,48,0.07)] sm:px-5">
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
