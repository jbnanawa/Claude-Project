import { AVATAR_COLORS, avatarColorById } from '../data/avatarColors'
import { useAuth } from '../auth/AuthContext'
import type { UserProfile } from '../types'

interface AccountSettingsProps {
  profile: UserProfile
  onUpdateProfile: (profile: UserProfile) => void
}

function formatBirthday(iso: string): string {
  const date = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function Avatar({
  name,
  photoURL,
  colorId,
  sizeClass = 'h-16 w-16 text-2xl',
}: {
  name: string
  photoURL?: string | null
  colorId?: string
  sizeClass?: string
}) {
  const initial = (name.trim()[0] || '?').toUpperCase()
  const color = avatarColorById(colorId)

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
      className={`grid ${sizeClass} place-items-center rounded-full font-display font-medium shadow-[inset_0_0_0_1px_rgba(213,224,214,0.8)]`}
      style={{ backgroundColor: color.bg, color: color.text }}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}

export function AccountSettings({
  profile,
  onUpdateProfile,
}: AccountSettingsProps) {
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
  const selectedColor = avatarColorById(profile.avatarColor)

  function patchProfile(patch: Partial<UserProfile>) {
    onUpdateProfile({ ...profile, ...patch })
  }

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
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <Avatar
            name={displayName}
            photoURL={photoURL}
            colorId={profile.avatarColor}
          />
          <div className="min-w-0 w-full">
            <p className="font-display text-2xl text-ink">{displayName}</p>
            {email ? (
              <p className="mt-1 text-sm text-ink-soft">{email}</p>
            ) : null}
            <p className="mt-2 inline-flex items-center rounded-lg border border-sage-200 bg-sage-100/70 px-2.5 py-0.5 text-xs font-medium text-sage-600">
              {isGuest ? 'Guest on this device' : 'Signed in'}
            </p>
            {profile.birthday ? (
              <p className="mt-3 text-sm text-ink-soft">
                Birthday · {formatBirthday(profile.birthday)}
              </p>
            ) : null}
          </div>
        </div>

        {!photoURL ? (
          <div className="mt-6">
            <p className="text-sm font-medium text-ink">Avatar color</p>
            <p className="mt-1 text-xs text-ink-muted">
              Pick a soft wash for your initial.
            </p>
            <div
              className="mt-3 flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Avatar color"
            >
              {AVATAR_COLORS.map((color) => {
                const selected = selectedColor.id === color.id
                return (
                  <button
                    key={color.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={color.label}
                    title={color.label}
                    onClick={() => patchProfile({ avatarColor: color.id })}
                    className={`h-9 w-9 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
                      selected
                        ? 'ring-2 ring-sage-400 ring-offset-2 ring-offset-white'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.bg }}
                  />
                )
              })}
            </div>
          </div>
        ) : null}

        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            Birthday
          </span>
          <input
            type="date"
            value={profile.birthday ?? ''}
            onChange={(e) =>
              patchProfile({
                birthday: e.target.value || undefined,
              })
            }
            className="w-full max-w-xs rounded-xl border border-sage-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
          />
        </label>
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
  avatarColor,
  isGuest,
  active,
  onClick,
}: {
  name: string
  photoURL?: string | null
  avatarColor?: string
  isGuest: boolean
  active?: boolean
  onClick: () => void
}) {
  const initial = (name.trim()[0] || (isGuest ? 'G' : '?')).toUpperCase()
  const color = avatarColorById(avatarColor)

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Account settings"
      aria-current={active ? 'page' : undefined}
      title="Account settings"
      className={`ml-1 grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
        active
          ? 'ring-2 ring-sage-400 ring-offset-2 ring-offset-white'
          : 'hover:opacity-90'
      }`}
    >
      {photoURL ? (
        <img src={photoURL} alt="" className="h-full w-full object-cover" />
      ) : (
        <span
          className="grid h-full w-full place-items-center font-display text-sm font-medium"
          style={{ backgroundColor: color.bg, color: color.text }}
        >
          {initial}
        </span>
      )}
    </button>
  )
}
