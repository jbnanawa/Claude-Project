import type { GoalCategory } from '../types'

export const GOAL_CATEGORIES: GoalCategory[] = [
  'Wellness',
  'Career',
  'Relationships',
  'Mindset',
  'Abundance',
  'Creativity',
]

export const CATEGORY_STYLES: Record<
  GoalCategory,
  { bg: string; text: string; border: string }
> = {
  Wellness: {
    bg: 'bg-sage-100',
    text: 'text-sage-600',
    border: 'border-sage-200',
  },
  Career: {
    bg: 'bg-blush-100',
    text: 'text-blush-700',
    border: 'border-blush-200',
  },
  Relationships: {
    bg: 'bg-blush-200/60',
    text: 'text-blush-700',
    border: 'border-blush-300',
  },
  Mindset: {
    bg: 'bg-sage-100',
    text: 'text-sage-600',
    border: 'border-sage-200',
  },
  Abundance: {
    bg: 'bg-blush-100',
    text: 'text-blush-700',
    border: 'border-blush-200',
  },
  Creativity: {
    bg: 'bg-sage-100',
    text: 'text-sage-600',
    border: 'border-sage-200',
  },
}
