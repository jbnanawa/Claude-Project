import { useEffect, useState } from 'react'
import type { Goal } from '../types'
import { GoalForm } from './GoalForm'
import { GoalList } from './GoalList'
import { MonthlyIntentionsCard } from './MonthlyIntentionsCard'

type IntentionsTab = 'daily' | 'monthly'

interface IntentionsProps {
  goals: Goal[]
  onAddGoal: (goal: Goal) => void
  onToggleGoal: (id: string) => void
  onDeleteGoal: (id: string) => void
  /** Opens Daily (add-goal / daily) or Monthly (monthly) when navigating in. */
  initialTab?: IntentionsTab | null
}

export function Intentions({
  goals,
  onAddGoal,
  onToggleGoal,
  onDeleteGoal,
  initialTab = null,
}: IntentionsProps) {
  const [tab, setTab] = useState<IntentionsTab>(initialTab ?? 'daily')

  useEffect(() => {
    if (initialTab) setTab(initialTab)
  }, [initialTab])

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="animate-fade-up">
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Intentions
        </h1>
        <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">
          Tend your daily goals and this month's focus — big or small, they all
          count.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Intention type"
        className="glass-card relative grid w-full grid-cols-2 rounded-full p-1 sm:inline-grid sm:w-auto"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-sage-400 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            tab === 'monthly' ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'daily'}
          onClick={() => setTab('daily')}
          className={`relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            tab === 'daily' ? 'text-white' : 'text-ink-soft'
          }`}
        >
          Daily intentions
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'monthly'}
          onClick={() => setTab('monthly')}
          className={`relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            tab === 'monthly' ? 'text-white' : 'text-ink-soft'
          }`}
        >
          Monthly intentions
        </button>
      </div>

      {tab === 'daily' ? (
        <div className="space-y-8 sm:space-y-10" role="tabpanel">
          <GoalForm onAdd={onAddGoal} />
          <section
            className="animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            <h2 className="mb-4 font-display text-2xl text-ink">
              Everything you're growing
            </h2>
            <GoalList
              goals={goals}
              onToggle={onToggleGoal}
              onDelete={onDeleteGoal}
            />
          </section>
        </div>
      ) : (
        <div role="tabpanel">
          <MonthlyIntentionsCard />
        </div>
      )}
    </div>
  )
}
