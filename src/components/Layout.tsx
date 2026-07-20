import type { ReactNode } from 'react'
import type { View } from '../types'

interface LayoutProps {
  view: View
  onNavigate: (view: View) => void
  children: ReactNode
}

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: 'dashboard', label: 'Today' },
  { id: 'goals', label: 'Goals' },
  { id: 'vision', label: 'Vision Board' },
  { id: 'journal', label: 'Journal' },
]

export function Layout({ view, onNavigate, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-blush-200/60 bg-blush-50/85 shadow-[0_1px_12px_rgba(61,50,48,0.03)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-6 sm:py-3.5">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="group flex items-center gap-2.5 rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blush-200 text-sm font-semibold text-blush-700 transition group-hover:bg-blush-300">
              Gw
            </span>
            <span className="font-display text-lg tracking-tight text-ink sm:text-xl">
              Glow Within
            </span>
          </button>

          <nav
            className="-mx-1 flex w-full items-center gap-1 overflow-x-auto px-1 py-0.5 sm:mx-0 sm:w-auto sm:gap-1.5 sm:px-0"
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
                  className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 sm:px-3.5 ${
                    active
                      ? 'bg-blush-500 text-white shadow-[0_4px_14px_rgba(196,123,123,0.35)]'
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

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-8 pt-4 sm:px-6">
        <p className="text-center text-xs text-ink-muted">
          Glow Within · made with love, just for you
        </p>
      </footer>
    </div>
  )
}
