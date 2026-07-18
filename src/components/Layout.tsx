import type { ReactNode } from 'react'
import type { View } from '../types'

interface LayoutProps {
  view: View
  onNavigate: (view: View) => void
  children: ReactNode
}

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'goals', label: 'Goals' },
  { id: 'vision', label: 'Vision Board' },
]

export function Layout({ view, onNavigate, children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-blush-200/60 bg-blush-50/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="group flex items-center gap-2.5 text-left"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blush-200 text-sm font-semibold text-blush-700 transition group-hover:bg-blush-300">
              Gw
            </span>
            <span className="font-display text-lg text-ink sm:text-xl">
              Glow Within
            </span>
          </button>

          <nav
            className="flex w-full items-center gap-1 overflow-x-auto sm:w-auto sm:gap-1.5"
            aria-label="Main"
          >
            {NAV_ITEMS.map((item) => {
              const active = view === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`shrink-0 rounded-xl px-3 py-2 text-sm font-medium transition sm:px-3.5 ${
                    active
                      ? 'bg-blush-500 text-white'
                      : 'text-ink-soft hover:bg-blush-100 hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  )
}
