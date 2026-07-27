import type { ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import type { View } from '../types'
import logo from '../assets/brand/logo.png'
import { AccountAvatarButton } from './AccountSettings'

interface LayoutProps {
  view: View
  onNavigate: (view: View) => void
  profileName?: string
  profileAvatarColor?: string
  children: ReactNode
}

const NAV_ITEMS: {
  id: Exclude<View, 'account'>
  label: string
  shortLabel: string
  icon: ReactNode
}[] = [
  {
    id: 'dashboard',
    label: 'Today',
    shortLabel: 'Today',
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.2" />
        <path d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.7 4.7l1.3 1.3M14 14l1.3 1.3M4.7 15.3l1.3-1.3M14 6l1.3-1.3" />
      </svg>
    ),
  },
  {
    id: 'journal',
    label: 'Garden',
    shortLabel: 'Garden',
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 16.5V9" />
        <path d="M10 9.2C7.8 6.4 5.2 5.5 3.5 5.9c.4 2.8 2.4 4.8 4.9 5.5" />
        <path d="M10 9.2c2.2-2.8 4.8-3.7 6.5-3.3-.4 2.8-2.4 4.8-4.9 5.5" />
      </svg>
    ),
  },
  {
    id: 'goals',
    label: 'Goals',
    shortLabel: 'Goals',
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="6.5" />
        <circle cx="10" cy="10" r="3" />
        <circle cx="10" cy="10" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'vision',
    label: 'Vision Board',
    shortLabel: 'Vision',
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="14" height="12" rx="2" />
        <path d="m3 13 3.5-3.5L10 13l2.5-2.5L17 14" />
        <circle cx="7.2" cy="7.5" r="1.2" />
      </svg>
    ),
  },
]

export function Layout({
  view,
  onNavigate,
  profileName = '',
  profileAvatarColor,
  children,
}: LayoutProps) {
  const { user, isGuest } = useAuth()
  const avatarName = isGuest
    ? profileName || 'Guest'
    : user?.displayName || profileName || user?.email || 'You'
  const photoURL = isGuest ? null : user?.photoURL

  return (
    <div className="flex min-h-screen flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))] sm:pb-0">
      <header className="sticky top-0 z-20 border-b border-blush-200/60 bg-white shadow-[0_1px_12px_rgba(61,50,48,0.03)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-x-3 px-4 py-3 sm:px-6 sm:py-3.5">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="group flex items-center gap-2.5 rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <img
              src={logo}
              alt=""
              draggable={false}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-lg tracking-tight text-sage-400 sm:text-xl">
              Everiora
            </span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Desktop top nav */}
            <nav
              className="hidden items-center gap-1.5 sm:flex"
              aria-label="Main"
            >
              {NAV_ITEMS.map((item) => {
                const active = view === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
                      active
                        ? 'bg-sage-400 text-white shadow-[0_4px_14px_rgba(81,95,81,0.35)]'
                        : 'text-ink-soft hover:bg-sage-100 hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <AccountAvatarButton
              name={avatarName}
              photoURL={photoURL}
              avatarColor={profileAvatarColor}
              isGuest={isGuest}
              active={view === 'account'}
              onClick={() => onNavigate('account')}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>

      <footer className="mx-auto hidden w-full max-w-5xl px-4 pb-8 pt-4 sm:block sm:px-6">
        <p className="text-center text-xs text-ink-muted">
          Everiora · made with love, just for you
        </p>
      </footer>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-blush-200/70 bg-blush-50/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(61,50,48,0.06)] backdrop-blur-md sm:hidden"
        aria-label="Main"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-4 px-1 pt-1.5 pb-1.5">
          {NAV_ITEMS.map((item) => {
            const active = view === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex w-full flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
                    active
                      ? 'bg-sage-100 text-sage-600'
                      : 'text-ink-muted hover:text-ink-soft'
                  }`}
                >
                  <span className="grid h-8 w-8 place-items-center">
                    {item.icon}
                  </span>
                  <span className="text-[0.65rem] font-medium leading-tight tracking-wide">
                    {item.shortLabel}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
