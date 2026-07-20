import type { Mood } from '../types'

export const MOODS: Mood[] = ['radiant', 'content', 'steady', 'tender', 'heavy']

export const MOOD_STYLES: Record<
  Mood,
  { label: string; emoji: string; bg: string; text: string; border: string }
> = {
  radiant: {
    label: 'Radiant',
    emoji: '\u2728',
    bg: 'bg-blush-100',
    text: 'text-blush-700',
    border: 'border-blush-200',
  },
  content: {
    label: 'Content',
    emoji: '\u{1F338}',
    bg: 'bg-blush-200/60',
    text: 'text-blush-700',
    border: 'border-blush-300',
  },
  steady: {
    label: 'Steady',
    emoji: '\u{1F33F}',
    bg: 'bg-sage-100',
    text: 'text-sage-600',
    border: 'border-sage-200',
  },
  tender: {
    label: 'Tender',
    emoji: '\u{1FAE7}',
    bg: 'bg-mist-100',
    text: 'text-mist-600',
    border: 'border-mist-200',
  },
  heavy: {
    label: 'Heavy',
    emoji: '\u{1F327}\uFE0F',
    bg: 'bg-mist-200/60',
    text: 'text-mist-600',
    border: 'border-mist-200',
  },
}
