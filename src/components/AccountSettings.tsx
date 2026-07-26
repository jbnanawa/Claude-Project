import { useAuth } from '../auth/AuthContext'
import type { UserProfile } from '../types'

interface AccountSettingsProps {
  profile: UserProfile
}

function Avatar({
  name,
  photoURL,
  sizeClass = 'h-16 w-16 text-2xl',
}: {
  name: string
  photoURL?: string | null
  sizeClass?: string
}) {
  const initial = (name.trim()[0] || '?').toUpperCase()

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt=""
        className={`${sizeClass} rounded-full object-cover shadow-[inset_0_0_0_1px_rgba(213,224,214,0.8)]`}
      />
    )
  }

  return (
    <span
      className={`grid ${sizeClass} place-items-center rounded-full bg-sage-100 font-display font-medium text-sage-600 shadow-[inset_0_0_0_1px_rgba(213,224,214,0.8)]`}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}

export function AccountSettings({ profile }: AccountSettingsProps) {
  const {
    user,
    isGuest,
    configured,
    signInWithGoogle,
    signInWithApple,
    signOut,
  } = useAuth()

  const displayName = isGuest
    ? profile.name || 'Guest'
    : user?.displayName || profile.name || 'You'
  const email = isGuest ? null : user?.email
  const photoURL = isGuest ? null : user?.photoURL

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="animate-fade-up">
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Account
        </h1>
        <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">
          Your profile and how you sign in to Everiora.
        </p>
      </header>

      <section className="glass-card p-6 animate-fade-up sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <Avatar name={displayName} photoURL={photoURL} />
          <div className="min-w-0">
            <p className="font-display text-2xl text-ink">{displayName}</p>
            {email ? (
              <p className="mt-1 text-sm text-ink-soft">{email}</p>
            ) : null}
            <p className="mt-2 inline-flex items-center rounded-lg border border-sage-200 bg-sage-100/70 px-2.5 py-0.5 text-xs font-medium text-sage-600">
              {isGuest ? 'Guest on this device' : 'Signed in'}
            </p>
          </div>
        </div>
      </section>

      {isGuest ? (
        <section className="glass-card space-y-4 p-6 animate-fade-up sm:p-8">
          <h2 className="font-display text-xl text-ink">Link an account</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Sign in with Google or Apple when you&apos;re ready. Your data stays
            on this device for now.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={!configured}
              className="inline-flex items-center justify-center rounded-xl border border-sage-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-blush-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => void signInWithApple()}
              disabled={!configured}
              className="inline-flex items-center justify-center rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue with Apple
            </button>
          </div>
        </section>
      ) : null}

      <section className="glass-card p-6 animate-fade-up sm:p-8">
        <h2 className="font-display text-xl text-ink">Session</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {isGuest
            ? 'Leave guest mode to return to the sign-in screen.'
            : 'Sign out on this device. You can always come back.'}
        </p>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-5 inline-flex items-center justify-center rounded-xl border border-blush-300 bg-blush-50 px-4 py-2.5 text-sm font-semibold text-blush-700 transition hover:bg-blush-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
        >
          {isGuest ? 'Leave guest mode' : 'Sign out'}
        </button>
      </section>
    </div>
  )
}

export function AccountAvatarButton({
  name,
  photoURL,
  isGuest,
  active,
  onClick,
}: {
  name: string
  photoURL?: string | null
  isGuest: boolean
  active?: boolean
  onClick: () => void
}) {
  const initial = (name.trim()[0] || (isGuest ? 'G' : '?')).toUpperCase()

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Account settings"
      aria-current={active ? 'page' : undefined}
      title="Account settings"
      className={`ml-1 grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
        active
          ? 'ring-2 ring-sage-400 ring-offset-2 ring-offset-blush-50'
          : 'hover:opacity-90'
      }`}
    >
      {photoURL ? (
        <img src={photoURL} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="grid h-full w-full place-items-center bg-sage-100 font-display text-sm font-medium text-sage-600">
          {initial}
        </span>
      )}
    </button>
  )
}
