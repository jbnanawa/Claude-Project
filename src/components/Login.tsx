import logo from '../assets/brand/logo.png'
import { useAuth } from '../auth/AuthContext'

function GoogleMark() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleMark() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.5-3.7zM14.5 6.4c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.7 1.4-.6.7-1.1 1.7-.9 2.7 1 0 2-.5 2.7-1.4z" />
    </svg>
  )
}

export function Login() {
  const {
    configured,
    error,
    clearError,
    signInWithGoogle,
    signInWithApple,
    continueAsGuest,
  } = useAuth()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div
        className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-blush-200/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-16 h-64 w-64 rounded-full bg-sage-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="glass-card relative w-full max-w-md p-8 sm:p-10 animate-fade-up">
        <div className="flex flex-col items-center text-center">
          <img
            src={logo}
            alt=""
            draggable={false}
            className="h-16 w-16 object-contain"
          />
          <h1 className="mt-5 font-display text-4xl tracking-tight text-sage-400">
            Everiora
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Your little corner for goals, gratitude, and the dreams you’re
            growing into. Sign in to continue.
          </p>
        </div>

        {!configured ? (
          <div
            role="alert"
            className="mt-8 rounded-xl border border-accent/40 bg-blush-50/80 px-4 py-3 text-left text-sm leading-relaxed text-ink-soft"
          >
            Sign-in isn’t connected yet. Add your Firebase keys to a{' '}
            <code className="rounded bg-white/70 px-1 py-0.5 text-xs text-ink">
              .env
            </code>{' '}
            file (see{' '}
            <code className="rounded bg-white/70 px-1 py-0.5 text-xs text-ink">
              .env.example
            </code>
            ), enable Google and Apple in the Firebase console, then restart the
            app.
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-blush-300 bg-blush-100 px-4 py-3 text-sm text-blush-700"
          >
            <div className="flex items-start justify-between gap-3">
              <p>{error}</p>
              <button
                type="button"
                onClick={clearError}
                className="shrink-0 text-xs font-medium underline-offset-2 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            disabled={!configured}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-blush-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <GoogleMark />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => void signInWithApple()}
            disabled={!configured}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <AppleMark />
            Continue with Apple
          </button>
          <button
            type="button"
            onClick={continueAsGuest}
            className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-ink-soft transition hover:bg-blush-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
          >
            Continue without signing in
          </button>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink-muted">
          Guest mode keeps everything on this device. You can link Google or
          Apple later.
        </p>
      </div>
    </div>
  )
}
