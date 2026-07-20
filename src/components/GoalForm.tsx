import { useState, type FormEvent } from 'react'
import { GOAL_CATEGORIES } from '../data/categories'
import { createId } from '../lib/id'
import type { Goal, GoalCategory } from '../types'

interface GoalFormProps {
  onAdd: (goal: Goal) => void
}

export function GoalForm({ onAdd }: GoalFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<GoalCategory>('Wellness')
  const [notes, setNotes] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    onAdd({
      id: createId(),
      title: trimmed,
      category,
      notes: notes.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setNotes('')
    setCategory('Wellness')
  }

  return (
    <form
      id="add-goal"
      onSubmit={handleSubmit}
      className="glass-card scroll-mt-24 rounded-2xl p-6 animate-fade-up"
    >
      <h2 className="font-display text-xl text-ink sm:text-2xl">
        What are we working toward?
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Pick a category and tell me what you're reaching for.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">
            Goal
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Morning walks three times a week"
            className="w-full rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">
            Category
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as GoalCategory)}
            className="w-full rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
          >
            {GOAL_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">
            Why this one?{' '}
            <span className="font-normal text-ink-muted">(optional)</span>
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="A little note to remind you why this matters..."
            className="w-full resize-y rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-blush-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 sm:w-auto"
      >
        Add it to the list
      </button>
    </form>
  )
}
