import { useState, type FormEvent } from 'react'
import { GOAL_CATEGORIES } from '../data/categories'
import type { GoalCategory, UserProfile } from '../types'
import logo from '../assets/brand/logo.png'

const STEPS = ['welcome', 'name', 'focus', 'garden'] as const
type Step = (typeof STEPS)[number]

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void
  /** Optional starting step — used for deep links / Figma capture. */
  initialStep?: Step
  initialName?: string
  initialFocusAreas?: GoalCategory[]
}

const CATEGORY_BLURBS: Record<GoalCategory, string> = {
  Wellness: 'Rest, movement, and care',
  Career: 'Work that feels aligned',
  Relationships: 'Connection and community',
  Mindset: 'Gentle inner shifts',
  Abundance: 'Welcoming more in',
  Creativity: 'Making and expressing',
}

export function Onboarding({
  onComplete,
  initialStep = 'welcome',
  initialName = '',
  initialFocusAreas = [],
}: OnboardingProps) {
  const [step, setStep] = useState<Step>(initialStep)
  const [name, setName] = useState(initialName)
  const [focusAreas, setFocusAreas] = useState<GoalCategory[]>(initialFocusAreas)

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
          className="glass-card p-10 animate-fade-up"
        >
          {step === 'welcome' && (
            <div className="text-center">
              <img
                src={logo}
                alt=""
                draggable={false}
                className="mx-auto h-14 w-14 object-contain"
              />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-sage-600">
                Welcome to
              </p>
              <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                Everiora
              </h1>
              <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
                Your cozy little corner for goals, daily affirmations, vision
                boards, and journaling. Let's make it feel like yours — it
                takes less than a minute.
              </p>
              <button
                type="button"
                onClick={() => setStep('name')}
                className="mt-8 w-full rounded-xl bg-sage-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 sm:w-auto"
              >
                Let's do this
              </button>
            </div>
          )}

          {step === 'name' && (
            <form onSubmit={handleNameSubmit}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-600">
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
                className="mt-6 w-full rounded-xl border border-sage-200 bg-blush-50 px-4 py-3 text-lg text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
              />
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('welcome')}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-sage-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="rounded-xl bg-sage-400 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {step === 'focus' && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-600">
                Almost there, {name.trim()}
              </p>
              <h1 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                Where do you want to glow?
              </h1>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Choose one or more focus areas — tap to select or deselect. You
                can change these anytime.
              </p>
              <p className="mt-2 text-sm font-medium text-ink-muted" aria-live="polite">
                {focusAreas.length === 0
                  ? 'None selected yet — multiple selections allowed.'
                  : `${focusAreas.length} selected`}
              </p>

              <div
                className="mt-6 grid gap-2.5 sm:grid-cols-2"
                role="group"
                aria-label="Focus areas — select one or more"
              >
                {GOAL_CATEGORIES.map((category) => {
                  const selected = focusAreas.includes(category)
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleFocus(category)}
                      aria-pressed={selected}
                      className={`rounded-xl px-4 py-3.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
                        selected
                          ? 'bg-sage-600 text-white shadow-sm ring-2 ring-sage-600 ring-offset-2 ring-offset-[#faf6f3]'
                          : 'border-2 border-sage-200 bg-white text-ink hover:border-sage-300'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="block text-sm font-semibold">
                          {category}
                        </span>
                        {selected ? (
                          <svg
                            className="h-5 w-5 shrink-0"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m3 8.5 3.5 3.5L13 5" />
                          </svg>
                        ) : (
                          <span
                            className="h-5 w-5 shrink-0 rounded-full border-2 border-sage-200"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span
                        className={`mt-0.5 block text-xs ${
                          selected ? 'text-white' : 'text-ink-muted'
                        }`}
                      >
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
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-sage-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep('garden')}
                  className="rounded-xl bg-sage-400 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
                >
                  {focusAreas.length > 0 ? 'Continue' : 'Skip for now'}
                </button>
              </div>
            </div>
          )}

          {step === 'garden' && (
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-600">
                One more thing
              </p>
              <h1 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                Your Growth Journey
              </h1>
              <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
                Each check-in, reflection, and gratitude moment helps your
                garden grow. No pressure — just small moments of showing up for
                yourself.
              </p>
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('focus')}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-sage-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={finish}
                  className="rounded-xl bg-sage-400 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
                >
                  Start glowing
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
                  ? 'w-6 bg-sage-400'
                  : index < stepIndex
                    ? 'w-1.5 bg-sage-400'
                    : 'w-1.5 bg-sage-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
