import { useState } from 'react'
import { AffirmationCard } from './components/AffirmationCard'
import { Dashboard } from './components/Dashboard'
import { GoalForm } from './components/GoalForm'
import { GoalList } from './components/GoalList'
import { Layout } from './components/Layout'
import { VisionBoard } from './components/VisionBoard'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Goal, View, VisionItem } from './types'

const GOALS_KEY = 'glow-within-goals'
const VISIONS_KEY = 'glow-within-visions'

export default function App() {
  const [view, setView] = useState<View>('dashboard')
  const [goals, setGoals] = useLocalStorage<Goal[]>(GOALS_KEY, [])
  const [visions, setVisions] = useLocalStorage<VisionItem[]>(VISIONS_KEY, [])

  function addGoal(goal: Goal) {
    setGoals((prev) => [goal, ...prev])
  }

  function toggleGoal(id: string) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    )
  }

  function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  function addVision(item: VisionItem) {
    setVisions((prev) => [item, ...prev])
  }

  function deleteVision(id: string) {
    setVisions((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Layout view={view} onNavigate={setView}>
      {view === 'dashboard' && (
        <Dashboard goals={goals} visions={visions} onNavigate={setView} />
      )}

      {view === 'goals' && (
        <div className="space-y-8">
          <header className="animate-fade-up">
            <h1 className="font-display text-4xl text-ink">Goals</h1>
            <p className="mt-2 max-w-xl text-ink-soft">
              Set intentions by category and watch them gather gently over time.
            </p>
          </header>
          <AffirmationCard compact />
          <GoalForm onAdd={addGoal} />
          <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="mb-4 font-display text-2xl text-ink">Your goals</h2>
            <GoalList
              goals={goals}
              onToggle={toggleGoal}
              onDelete={deleteGoal}
            />
          </section>
        </div>
      )}

      {view === 'vision' && (
        <div className="space-y-8">
          <header className="animate-fade-up">
            <h1 className="font-display text-4xl text-ink">Vision Board</h1>
            <p className="mt-2 max-w-xl text-ink-soft">
              Collect images of the life you want to manifest, each with a note
              of intention.
            </p>
          </header>
          <VisionBoard
            items={visions}
            onAdd={addVision}
            onDelete={deleteVision}
          />
        </div>
      )}
    </Layout>
  )
}
