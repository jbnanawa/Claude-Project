export type GoalCategory =
  | 'Wellness'
  | 'Career'
  | 'Relationships'
  | 'Mindset'
  | 'Abundance'
  | 'Creativity'

export type GoalRepeat = 'none' | 'daily' | 'weekly' | 'weekdays' | 'monthly'

export type GoalCalendar =
  | 'none'
  | 'apple'
  | 'google'
  | 'outlook'

export interface Goal {
  id: string
  title: string
  category: GoalCategory
  notes: string
  completed: boolean
  createdAt: string
  /** Set when the goal is checked off; completed goals leave the dashboard the next day. */
  completedAt?: string
  /** How often this goal should repeat. */
  repeat?: GoalRepeat
  /** Reminder time as HH:mm (24h), when alertEnabled. */
  alertTime?: string
  /** Whether a timed alert is set. */
  alertEnabled?: boolean
  /** Optional place associated with the goal. */
  location?: string
  /** Coordinates when the place was chosen from map search. */
  locationLat?: number
  locationLng?: number
  /** Preferred calendar to sync this goal to (local preference). */
  calendarSync?: GoalCalendar
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
  /** Soft avatar wash id (see AVATAR_COLORS). */
  avatarColor?: string
  /** Birthday as YYYY-MM-DD. */
  birthday?: string
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
  /** Parallel to priorities; true when a priority is fully completed. */
  prioritiesDone?: boolean[]
  /** Weeks lived toward each priority (0–4). Four weeks = completed. */
  priorityWeeks?: number[]
  notes: string
}

export type View = 'dashboard' | 'goals' | 'vision' | 'journal' | 'account'
