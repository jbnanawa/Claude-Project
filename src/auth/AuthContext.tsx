import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  browserPopupRedirectResolver,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import {
  appleProvider,
  auth,
  googleProvider,
  isFirebaseConfigured,
} from '../lib/firebase'

const GUEST_KEY = 'everiora-guest-session'

interface AuthContextValue {
  user: User | null
  /** Local-only session — no Google/Apple account. */
  isGuest: boolean
  /** True when Firebase user or guest session is active. */
  isSignedIn: boolean
  loading: boolean
  configured: boolean
  error: string | null
  clearError: () => void
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  continueAsGuest: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function friendlyAuthError(err: unknown): string {
  const code =
    err && typeof err === 'object' && 'code' in err
      ? String((err as { code: string }).code)
      : ''
  const message =
    err && typeof err === 'object' && 'message' in err
      ? String((err as { message: string }).message)
      : ''

  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Try again when you’re ready.'
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in window. Allow popups for localhost, or try again.'
    case 'auth/unauthorized-domain':
      return 'This domain isn’t authorized yet. In Firebase → Authentication → Settings → Authorized domains, add both localhost and 127.0.0.1.'
    case 'auth/operation-not-allowed':
      return 'That sign-in method isn’t enabled yet. Turn on Google in Firebase → Authentication → Sign-in method.'
    case 'auth/network-request-failed':
      return 'Network hiccup — check your connection and try again.'
    case 'auth/internal-error':
      return 'Google sign-in hit an internal error. Use http://localhost:5173 (not 127.0.0.1), allow popups, and confirm Google is enabled in Firebase.'
    default:
      if (message.toLowerCase().includes('invalid')) {
        return 'Google rejected the sign-in request. Open http://localhost:5173 exactly, and in Firebase authorized domains keep localhost listed.'
      }
      return message
        ? `Sign-in failed: ${message}`
        : 'Something went wrong signing in. Please try again.'
  }
}

async function signInWithProvider(
  provider: typeof googleProvider | typeof appleProvider,
) {
  if (!auth) {
    throw new Error('Firebase isn’t configured yet. Add your keys to the .env file.')
  }

  try {
    await signInWithPopup(auth, provider, browserPopupRedirectResolver)
  } catch (popupErr) {
    const code =
      popupErr && typeof popupErr === 'object' && 'code' in popupErr
        ? String((popupErr as { code: string }).code)
        : ''

    if (
      code === 'auth/popup-blocked' ||
      code === 'auth/popup-closed-by-user' ||
      code === 'auth/cancelled-popup-request' ||
      code === 'auth/internal-error' ||
      code === ''
    ) {
      await signInWithRedirect(auth, provider, browserPopupRedirectResolver)
      return
    }
    throw popupErr
  }
}

function readGuestFlag(): boolean {
  try {
    return localStorage.getItem(GUEST_KEY) === '1'
  } catch {
    return false
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(readGuestFlag)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    let cancelled = false

    void getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          try {
            localStorage.removeItem(GUEST_KEY)
          } catch {
            /* ignore */
          }
          if (!cancelled) setIsGuest(false)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(friendlyAuthError(err))
      })

    const unsubscribe = onAuthStateChanged(auth, (next) => {
      if (cancelled) return
      setUser(next)
      if (next) {
        try {
          localStorage.removeItem(GUEST_KEY)
        } catch {
          /* ignore */
        }
        setIsGuest(false)
      }
      setLoading(false)
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    setError(null)
    try {
      await signInWithProvider(googleProvider)
    } catch (err) {
      setError(friendlyAuthError(err))
    }
  }

  async function signInWithApple() {
    setError(null)
    try {
      await signInWithProvider(appleProvider)
    } catch (err) {
      setError(friendlyAuthError(err))
    }
  }

  function continueAsGuest() {
    setError(null)
    try {
      localStorage.setItem(GUEST_KEY, '1')
    } catch {
      /* ignore */
    }
    setIsGuest(true)
  }

  async function signOut() {
    setError(null)
    try {
      localStorage.removeItem(GUEST_KEY)
    } catch {
      /* ignore */
    }
    setIsGuest(false)
    if (auth) await firebaseSignOut(auth)
  }

  const value = useMemo(
    () => ({
      user,
      isGuest,
      isSignedIn: Boolean(user) || isGuest,
      loading,
      configured: isFirebaseConfigured,
      error,
      clearError: () => setError(null),
      signInWithGoogle,
      signInWithApple,
      continueAsGuest,
      signOut,
    }),
    [user, isGuest, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
