import { useState } from 'react'
import { CATEGORY_STYLES } from '../data/categories'
import type { Goal } from '../types'

interface GoalListProps {
  goals: Goal[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function GoalList({ goals, onToggle, onDelete }: GoalListProps) {
  const [tab, setTab] = useState<'progress' | 'archived'>('progress')

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

  const sorted = [...goals].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const inProgress = sorted.filter((goal) => !goal.completed)
  const archived = sorted.filter((goal) => goal.completed)
  const visible = tab === 'archived' ? archived : inProgress

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Goal filter"
        className="inline-flex items-center gap-1 rounded-xl border border-blush-200/70 bg-surface-solid/90 p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'progress'}
          onClick={() => setTab('progress')}
          className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
            tab === 'progress'
              ? 'bg-blush-500 text-white'
              : 'text-ink-soft hover:bg-blush-100 hover:text-ink'
          }`}
        >
          In progress ({inProgress.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'archived'}
          onClick={() => setTab('archived')}
          className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
            tab === 'archived'
              ? 'bg-blush-500 text-white'
              : 'text-ink-soft hover:bg-blush-100 hover:text-ink'
          }`}
        >
          Completed ({archived.length})
        </button>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-10 text-center animate-fade-in">
          {tab === 'archived' ? (
            <>
              <p className="font-display text-xl text-ink">Nothing completed yet</p>
              <p className="mt-2 text-sm text-ink-soft">
                Goals you mark as completed will rest here.
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-xl text-ink">Everything is completed</p>
              <p className="mt-2 text-sm text-ink-soft">
                Add a new goal or revisit your archive to celebrate.
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
                className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 p-4 shadow-[0_6px_20px_rgba(61,50,48,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(61,50,48,0.06)] animate-fade-up"
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
                      <span
                        className={`rounded-lg border px-2 py-0.5 text-xs font-medium ${
                          goal.completed
                            ? 'border-sage-200 bg-sage-100 text-sage-600'
                            : 'border-mist-200 bg-mist-100 text-mist-600'
                        }`}
                      >
                        {goal.completed ? 'Completed' : 'In progress'}
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
                    className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                  >
                    Remove
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
