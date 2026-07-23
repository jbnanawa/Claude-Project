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
      className="glass-card scroll-mt-24 p-6 animate-fade-up"
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
            className="w-full rounded-xl border border-sage-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">
            Category
          </span>
          <span className="relative block">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
              className="w-full appearance-none rounded-xl border border-sage-200 bg-blush-50 py-2.5 pr-10 pl-3.5 text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
            >
              {GOAL_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-ink-soft"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m6 8 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
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
            className="w-full resize-y rounded-xl border border-sage-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-sage-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 sm:w-auto"
      >
        Add it to the list
      </button>
    </form>
  )
}
