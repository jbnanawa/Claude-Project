export type GoalCategory =
  | 'Wellness'
  | 'Career'
  | 'Relationships'
  | 'Mindset'
  | 'Abundance'
  | 'Creativity'

export interface Goal {
  id: string
  title: string
  category: GoalCategory
  notes: string
  completed: boolean
  createdAt: string
}

export interface VisionItem {
  id: string
  imageUrl: string
  title: string
  description: string
  achieved?: boolean
  createdAt: string
}

export type View = 'dashboard' | 'goals' | 'vision'
