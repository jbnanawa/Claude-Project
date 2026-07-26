import { useEffect, useRef, useState } from 'react'
import { useAuth } from './auth/AuthContext'
import { AccountSettings } from './components/AccountSettings'
import { Dashboard } from './components/Dashboard'
import { Intentions } from './components/Intentions'
import { Journal } from './components/Journal'
import { Layout } from './components/Layout'
import { Login } from './components/Login'
import { Onboarding } from './components/Onboarding'
import { VisionBoard } from './components/VisionBoard'
import { GOAL_CATEGORIES } from './data/categories'
import { MOOD_STYLES } from './data/moods'
import { useLocalStorage } from './hooks/useLocalStorage'
import { compressImage, isCompressibleDataUrl } from './lib/image'
import type {
  Goal,
  GoalCategory,
  JournalEntry,
  UserProfile,
  View,
  VisionItem,
} from './types'

const GOALS_KEY = 'glow-within-goals'
const VISIONS_KEY = 'glow-within-visions'
const JOURNAL_KEY = 'glow-within-journal'
const PROFILE_KEY = 'glow-within-profile'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isGoalArray(value: unknown): value is Goal[] {
  return (
    Array.isArray(value) &&
    value.every(
      (goal) =>
        isRecord(goal) &&
        typeof goal.id === 'string' &&
        typeof goal.title === 'string' &&
        typeof goal.completed === 'boolean' &&
        typeof goal.createdAt === 'string',
    )
  )
}

function isVisionArray(value: unknown): value is VisionItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.imageUrl === 'string' &&
        typeof item.createdAt === 'string',
    )
  )
}

function isJournalArray(value: unknown): value is JournalEntry[] {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        typeof entry.id === 'string' &&
        typeof entry.mood === 'string' &&
        entry.mood in MOOD_STYLES &&
        typeof entry.gratitude === 'string' &&
        typeof entry.text === 'string' &&
        typeof entry.createdAt === 'string',
    )
  )
}

function isProfileOrNull(value: unknown): value is UserProfile | null {
  if (value === null) return true
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    typeof value.createdAt === 'string' &&
    Array.isArray(value.focusAreas) &&
    value.focusAreas.every((area) =>
      GOAL_CATEGORIES.includes(area as GoalCategory),
    )
  )
}

export default function App() {
  const { user, isGuest, loading } = useAuth()
  const captureParams = new URLSearchParams(window.location.search)
  const captureView = captureParams.get('view')
  const captureEmpty = captureParams.get('empty') === '1'
  const captureOnboarding = captureView === 'onboarding'
  const captureStep = captureParams.get('step')
  const onboardingStep =
    captureStep === 'name' ||
    captureStep === 'focus' ||
    captureStep === 'welcome' ||
    captureStep === 'garden'
      ? captureStep
      : 'welcome'

  const [view, setView] = useState<View>(() => {
    const next = captureView
    if (
      next === 'dashboard' ||
      next === 'journal' ||
      next === 'goals' ||
      next === 'vision' ||
      next === 'account'
    ) {
      return next
    }
    return 'dashboard'
  })
  const scrollTarget = useRef<string | null>(null)
  const [intentionsTab, setIntentionsTab] = useState<'daily' | 'monthly' | null>(
    null,
  )
  const [journalCompose, setJournalCompose] = useState(false)
  const [visionCompose, setVisionCompose] = useState(false)

  function navigateTo(nextView: View, targetId?: string) {
    scrollTarget.current = targetId ?? null
    setJournalCompose(nextView === 'journal' && targetId === 'add-gratitude')
    setVisionCompose(nextView === 'vision' && targetId === 'add-vision')
    if (nextView === 'goals') {
      if (targetId === 'monthly') {
        setIntentionsTab('monthly')
      } else if (targetId === 'add-goal' || targetId === 'daily') {
        setIntentionsTab('daily')
      } else {
        setIntentionsTab(null)
      }
    }
    setView(nextView)
  }

  // Land at the top of each page, or at a specific section when a link asks
  // for one — e.g. "Add goals" jumps to the add-goal form.
  useEffect(() => {
    const target = scrollTarget.current
    scrollTarget.current = null
    if (target === 'add-goal' || target === 'add-vision' || target === 'add-gratitude') {
      // Wait a tick so the destination form is mounted.
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ block: 'start' })
      })
    } else if (target && target !== 'daily' && target !== 'monthly') {
      document.getElementById(target)?.scrollIntoView({ block: 'start' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [view, intentionsTab])
  const [goals, setGoals, goalsPersistFailed] = useLocalStorage<Goal[]>(
    GOALS_KEY,
    [],
    isGoalArray,
  )
  const [visions, setVisions, visionsPersistFailed] = useLocalStorage<
    VisionItem[]
  >(VISIONS_KEY, [], isVisionArray)
  const [journalEntries, setJournalEntries, journalPersistFailed] =
    useLocalStorage<JournalEntry[]>(JOURNAL_KEY, [], isJournalArray)
  const [profile, setProfile] = useLocalStorage<UserProfile | null>(
    PROFILE_KEY,
    null,
    isProfileOrNull,
  )
  const persistFailed =
    goalsPersistFailed || visionsPersistFailed || journalPersistFailed

  // Capture deep-links (`?view=…`) need a profile so we don't land on onboarding.
  const captureProfile: UserProfile = {
    name: 'Janelle',
    focusAreas: ['Wellness', 'Mindset', 'Creativity'],
    createdAt: '2026-01-01T00:00:00.000Z',
  }
  const activeProfile =
    profile ??
    (captureView && !captureOnboarding ? captureProfile : null)

  // One-time migration: shrink oversized images saved before compression
  // existed, so the board stays under the localStorage quota.
  useEffect(() => {
    let cancelled = false
    const oversized = visions.filter((item) =>
      isCompressibleDataUrl(item.imageUrl),
    )
    for (const item of oversized) {
      compressImage(item.imageUrl)
        .then((compressed) => {
          if (cancelled || compressed === item.imageUrl) return
          setVisions((prev) =>
            prev.map((vision) =>
              vision.id === item.id
                ? { ...vision, imageUrl: compressed }
                : vision,
            ),
          )
        })
        .catch(() => {
          // Leave the original image in place if compression fails.
        })
    }
    return () => {
      cancelled = true
    }
    // Run once on mount; migrating again on every change is unnecessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // One-time migration: goals completed before completedAt existed get
  // stamped now, so they linger on the dashboard today and clear tomorrow.
  useEffect(() => {
    setGoals((prev) =>
      prev.some((goal) => goal.completed && !goal.completedAt)
        ? prev.map((goal) =>
            goal.completed && !goal.completedAt
              ? { ...goal, completedAt: new Date().toISOString() }
              : goal,
          )
        : prev,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function addGoal(goal: Goal) {
    setGoals((prev) => [goal, ...prev])
  }

  function toggleGoal(id: string) {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== id) return goal
        return goal.completed
          ? { ...goal, completed: false, completedAt: undefined }
          : { ...goal, completed: true, completedAt: new Date().toISOString() }
      }),
    )
  }

  function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  function addVision(item: VisionItem) {
    setVisions((prev) => [item, ...prev])
  }

  function deleteVision(id: string) {
    setVisions((prev) => prev.filter((item) => item.id !== id))
  }

  function updateVision(updated: VisionItem) {
    setVisions((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    )
  }

  function addJournalEntry(entry: JournalEntry) {
    setJournalEntries((prev) => [entry, ...prev])
  }

  function deleteJournalEntry(id: string) {
    setJournalEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  function updateJournalEntry(updated: JournalEntry) {
    setJournalEntries((prev) =>
      prev.map((entry) => (entry.id === updated.id ? updated : entry)),
    )
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <p className="text-sm text-ink-soft animate-fade-in">Opening Everiora…</p>
      </div>
    )
  }

  if (!user && !isGuest) {
    return <Login />
  }

  if (!activeProfile || captureOnboarding) {
    return (
      <Onboarding
        onComplete={setProfile}
        initialStep={captureOnboarding ? onboardingStep : 'welcome'}
        initialName={captureOnboarding && onboardingStep !== 'welcome' ? 'Janelle' : ''}
        initialFocusAreas={
          captureOnboarding && onboardingStep === 'focus'
            ? ['Wellness', 'Mindset']
            : []
        }
      />
    )
  }

  return (
    <Layout
      view={view}
      onNavigate={navigateTo}
      profileName={activeProfile.name}
    >
      {persistFailed ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-blush-300 bg-blush-100 px-4 py-3 text-sm text-blush-700 animate-fade-in"
        >
          Oops — that last change didn't save because your browser storage is
          full. Remove a vision piece or re-upload an image or two and you'll
          be back in business.
        </div>
      ) : null}

      {view === 'dashboard' && (
        <Dashboard
          goals={goals}
          visions={visions}
          journalEntries={journalEntries}
          profile={activeProfile}
          onNavigate={navigateTo}
          onToggleGoal={toggleGoal}
        />
      )}

      {view === 'goals' && (
        <Intentions
          goals={goals}
          onAddGoal={addGoal}
          onToggleGoal={toggleGoal}
          onDeleteGoal={deleteGoal}
          initialTab={intentionsTab}
        />
      )}

      {view === 'vision' && (
        <div className="space-y-8 sm:space-y-10">
          <header className="animate-fade-up">
            <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Vision Board
            </h1>
          </header>
          <VisionBoard
            items={captureEmpty ? [] : visions}
            onAdd={addVision}
            onDelete={deleteVision}
            onUpdate={updateVision}
            startComposing={visionCompose}
          />
        </div>
      )}

      {view === 'journal' && (
        <div className="space-y-8 sm:space-y-10">
          <header className="animate-fade-up">
            <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Garden
            </h1>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">
              Add a gratitude moment to water your plant. Every day you show up
              becomes one drop of care, helping your season slowly grow.
            </p>
          </header>
          <Journal
            entries={journalEntries}
            onAdd={addJournalEntry}
            onDelete={deleteJournalEntry}
            onUpdate={updateJournalEntry}
            startComposing={journalCompose}
          />
        </div>
      )}

      {view === 'account' && <AccountSettings profile={activeProfile} />}
    </Layout>
  )
}
