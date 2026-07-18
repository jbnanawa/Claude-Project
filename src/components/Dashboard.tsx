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
  const recentVisions = [...visions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3)

  const byCategory = GOAL_CATEGORIES.map((category) => ({
    category,
    count: goals.filter((goal) => goal.category === category && !goal.completed).length,
  })).filter((item) => item.count > 0)

  return (
    <div className="space-y-8">
      <header className="animate-fade-up">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blush-600">
          Welcome back
        </p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
          Glow Within
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          A soft space for your goals, daily words, and the visions you are
          calling into form.
        </p>
      </header>

      <AffirmationCard />

      <section
        className="grid gap-4 sm:grid-cols-3 animate-fade-up"
        style={{ animationDelay: '120ms' }}
      >
        <StatCard label="Active goals" value={activeGoals.length} />
        <StatCard label="Completed" value={completedGoals.length} />
        <StatCard label="Vision pieces" value={visions.length} />
      </section>

      <section
        className="grid gap-6 lg:grid-cols-2 animate-fade-up"
        style={{ animationDelay: '180ms' }}
      >
        <div className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 p-6 shadow-[0_8px_28px_rgba(61,50,48,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">Goals by category</h2>
            <button
              type="button"
              onClick={() => onNavigate('goals')}
              className="text-sm font-medium text-blush-600 transition hover:text-blush-700"
            >
              Manage
            </button>
          </div>

          {byCategory.length === 0 ? (
            <p className="mt-5 text-sm text-ink-soft">
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
                    <span className={`text-sm ${style.text}`}>
                      {count} {count === 1 ? 'goal' : 'goals'}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 p-6 shadow-[0_8px_28px_rgba(61,50,48,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">Vision board</h2>
            <button
              type="button"
              onClick={() => onNavigate('vision')}
              className="text-sm font-medium text-blush-600 transition hover:text-blush-700"
            >
              Open board
            </button>
          </div>

          {recentVisions.length === 0 ? (
            <p className="mt-5 text-sm text-ink-soft">
              Your gallery is empty. Pin images that describe what you want to
              manifest.
            </p>
          ) : (
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {recentVisions.map((item) => (
                <figure
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-blush-200"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="aspect-square w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 px-5 py-4 shadow-[0_6px_20px_rgba(61,50,48,0.03)]">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-3xl text-ink">{value}</p>
    </div>
  )
}
