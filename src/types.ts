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
  /** Set when the goal is checked off; completed goals leave the dashboard the next day. */
  completedAt?: string
}

export interface VisionItem {
  id: string
  imageUrl: string
  title: string
  description: string
  achieved?: boolean
  createdAt: string
}

export interface UserProfile {
  name: string
  focusAreas: GoalCategory[]
  createdAt: string
}

export type Mood = 'radiant' | 'content' | 'steady' | 'tender' | 'heavy'

export interface JournalEntry {
  id: string
  mood: Mood
  gratitude: string
  text: string
  createdAt: string
}

export interface MonthlyIntentions {
  /** Month key like "2026-07"; intentions reset when a new month begins. */
  month: string
  focus: string
  priorities: string[]
  /** Parallel to priorities; a checked-off priority "blooms". */
  prioritiesDone?: boolean[]
  /** Weeks lived toward each priority (0–4). Four weeks = bloomed. */
  priorityWeeks?: number[]
  notes: string
}

export type View = 'dashboard' | 'goals' | 'vision' | 'journal'
