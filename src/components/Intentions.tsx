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
  onUpdateGoal: (goal: Goal) => void
  /** Opens Daily (add-goal / daily) or Monthly (monthly) when navigating in. */
  initialTab?: IntentionsTab | null
  /** Open the add-goal form on mount (e.g. from “Add goals”). */
  startComposing?: boolean
}

export function Intentions({
  goals,
  onAddGoal,
  onToggleGoal,
  onDeleteGoal,
  onUpdateGoal,
  initialTab = null,
  startComposing = false,
}: IntentionsProps) {
  const [tab, setTab] = useState<IntentionsTab>(initialTab ?? 'daily')
  const [composing, setComposing] = useState(startComposing)
  const [monthlyEditing, setMonthlyEditing] = useState(false)

  useEffect(() => {
    if (initialTab) setTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    if (startComposing) {
      setTab('daily')
      setComposing(true)
    }
  }, [startComposing])

  useEffect(() => {
    if (!composing) return
    requestAnimationFrame(() => {
      document.getElementById('add-goal')?.scrollIntoView({ block: 'start' })
    })
  }, [composing])

  function handleAddGoal(goal: Goal) {
    onAddGoal(goal)
    setComposing(false)
  }

  function openComposer() {
    setTab('daily')
    setMonthlyEditing(false)
    setComposing(true)
  }

  function openMonthlyEditor() {
    setTab('monthly')
    setComposing(false)
    setMonthlyEditing(true)
  }

  function handleFab() {
    if (tab === 'monthly') openMonthlyEditor()
    else openComposer()
  }

  const showFab =
    (tab === 'daily' && !composing) || (tab === 'monthly' && !monthlyEditing)

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="animate-fade-up">
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Goals
        </h1>
        <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">
          Tend your daily goals and this month's focus — big or small, they all
          count.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Goal type"
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
          onClick={() => {
            setTab('daily')
            setMonthlyEditing(false)
          }}
          className={`relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            tab === 'daily' ? 'text-white' : 'text-ink-soft'
          }`}
        >
          Daily goals
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'monthly'}
          onClick={() => {
            setTab('monthly')
            setComposing(false)
          }}
          className={`relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
            tab === 'monthly' ? 'text-white' : 'text-ink-soft'
          }`}
        >
          Monthly goals
        </button>
      </div>

      {tab === 'daily' ? (
        <div className="space-y-8 sm:space-y-10" role="tabpanel">
          {composing ? (
            <GoalForm
              onAdd={handleAddGoal}
              onCancel={() => setComposing(false)}
            />
          ) : (
            <section
              className="hidden glass-card p-5 animate-fade-up sm:block sm:p-6"
              aria-label="Add a goal"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-display text-xl text-ink sm:text-2xl">
                    Add a goal
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    Name what you&apos;re reaching for and pin it to your list.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openComposer}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-sage-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
                >
                  Add goal
                </button>
              </div>
            </section>
          )}

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
              onUpdate={onUpdateGoal}
            />
          </section>
        </div>
      ) : (
        <div role="tabpanel">
          <MonthlyIntentionsCard
            editing={monthlyEditing}
            onEditingChange={setMonthlyEditing}
          />
        </div>
      )}

      {showFab ? (
        <button
          type="button"
          onClick={handleFab}
          aria-label={
            tab === 'monthly' ? 'Edit monthly goals' : 'Add goal'
          }
          className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-sage-400 text-white shadow-[0_8px_24px_rgba(61,50,48,0.22)] transition hover:bg-sage-700 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 sm:hidden"
          style={{
            bottom:
              'calc(4.75rem + env(safe-area-inset-bottom, 0px) + 0.75rem)',
          }}
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      ) : null}
    </div>
  )
}
