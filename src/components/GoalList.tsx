import { CATEGORY_STYLES } from '../data/categories'
import type { Goal } from '../types'

interface GoalListProps {
  goals: Goal[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function GoalList({ goals, onToggle, onDelete }: GoalListProps) {
  if (goals.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-10 text-center animate-fade-in">
        <p className="font-display text-xl text-ink">No goals yet</p>
        <p className="mt-2 text-sm text-ink-soft">
          Add your first intention above and it will live here.
        </p>
      </div>
    )
  }

  const sorted = [...goals].sort(
    (a, b) => Number(a.completed) - Number(b.completed) || b.createdAt.localeCompare(a.createdAt),
  )

  return (
    <ul className="space-y-3">
      {sorted.map((goal, index) => {
        const style = CATEGORY_STYLES[goal.category]
        return (
          <li
            key={goal.id}
            className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 p-4 shadow-[0_6px_20px_rgba(61,50,48,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(61,50,48,0.06)] animate-fade-up"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => onToggle(goal.id)}
                className="mt-1 h-4 w-4 accent-blush-500"
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
              <button
                type="button"
                onClick={() => onDelete(goal.id)}
                className="rounded-lg px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700"
              >
                Remove
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
