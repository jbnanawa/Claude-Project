import { useState, type FormEvent } from 'react'
import { CATEGORY_STYLES, GOAL_CATEGORIES } from '../data/categories'
import type { GoalCategory, UserProfile } from '../types'

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void
}

const STEPS = ['welcome', 'name', 'focus'] as const
type Step = (typeof STEPS)[number]

const CATEGORY_BLURBS: Record<GoalCategory, string> = {
  Wellness: 'Rest, movement, and care',
  Career: 'Work that feels aligned',
  Relationships: 'Connection and community',
  Mindset: 'Gentle inner shifts',
  Abundance: 'Welcoming more in',
  Creativity: 'Making and expressing',
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>('welcome')
  const [name, setName] = useState('')
  const [focusAreas, setFocusAreas] = useState<GoalCategory[]>([])

  const stepIndex = STEPS.indexOf(step)

  function toggleFocus(category: GoalCategory) {
    setFocusAreas((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    )
  }

  function handleNameSubmit(event: FormEvent) {
    event.preventDefault()
    if (name.trim()) setStep('focus')
  }

  function finish() {
    onComplete({
      name: name.trim(),
      focusAreas,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-lg">
        <div
          key={step}
          className="glass-card rounded-3xl p-6 animate-fade-up sm:p-10"
        >
          {step === 'welcome' && (
            <div className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blush-200 text-lg font-semibold text-blush-700">
                Gw
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-blush-600">
                Welcome to
              </p>
              <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                Glow Within
              </h1>
              <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
                Your cozy little corner for goals, daily affirmations, vision
                boards, and journaling. Let's make it feel like yours — it
                takes less than a minute.
              </p>
              <button
                type="button"
                onClick={() => setStep('name')}
                className="mt-8 w-full rounded-xl bg-blush-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 sm:w-auto"
              >
                Let's do this
              </button>
            </div>
          )}

          {step === 'name' && (
            <form onSubmit={handleNameSubmit}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-600">
                First things first
              </p>
              <h1 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                What should we call you?
              </h1>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Don't worry — your name never leaves this device. We just want
                to say hi properly.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoFocus
                maxLength={40}
                className="mt-6 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-3 text-lg text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
              />
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('welcome')}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-blush-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="rounded-xl bg-blush-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {step === 'focus' && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-600">
                Almost there, {name.trim()}
              </p>
              <h1 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                Where do you want to glow?
              </h1>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Pick whatever feels right — no pressure, you can always change
                your mind later.
              </p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {GOAL_CATEGORIES.map((category) => {
                  const style = CATEGORY_STYLES[category]
                  const selected = focusAreas.includes(category)
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleFocus(category)}
                      aria-pressed={selected}
                      className={`rounded-xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
                        selected
                          ? `${style.bg} ${style.border} shadow-[0_4px_14px_rgba(61,50,48,0.08)]`
                          : 'border-blush-200 bg-blush-50 hover:bg-blush-100'
                      }`}
                    >
                      <span
                        className={`block text-sm font-semibold ${
                          selected ? style.text : 'text-ink'
                        }`}
                      >
                        {category}
                        {selected ? ' ✓' : ''}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        {CATEGORY_BLURBS[category]}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('name')}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-blush-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={finish}
                  className="rounded-xl bg-blush-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                >
                  {focusAreas.length > 0 ? 'Start glowing' : 'Skip for now'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className="mt-6 flex items-center justify-center gap-2"
          aria-hidden="true"
        >
          {STEPS.map((item, index) => (
            <span
              key={item}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === stepIndex
                  ? 'w-6 bg-blush-500'
                  : index < stepIndex
                    ? 'w-1.5 bg-blush-400'
                    : 'w-1.5 bg-blush-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
