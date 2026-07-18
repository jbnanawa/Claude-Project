import { getDailyAffirmation } from '../data/affirmations'

interface AffirmationCardProps {
  compact?: boolean
}

export function AffirmationCard({ compact = false }: AffirmationCardProps) {
  const affirmation = getDailyAffirmation()
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-blush-200/80 bg-surface-solid/90 shadow-[0_8px_30px_rgba(196,123,123,0.08)] animate-fade-up ${
        compact ? 'p-5' : 'p-7 sm:p-8'
      }`}
      style={{ animationDelay: '80ms' }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-blush-200/50 blur-2xl animate-soft-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-sage-200/40 blur-2xl"
        aria-hidden
      />

      <p className="relative text-xs font-medium uppercase tracking-[0.18em] text-blush-600">
        Daily affirmation
      </p>
      <p className="relative mt-1 text-sm text-ink-muted">{today}</p>
      <blockquote
        className={`relative font-display text-ink leading-relaxed ${
          compact ? 'mt-4 text-xl' : 'mt-5 text-2xl sm:text-3xl'
        }`}
      >
        “{affirmation}”
      </blockquote>
    </section>
  )
}
