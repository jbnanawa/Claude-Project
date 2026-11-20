interface AddFabProps {
  onClick: () => void
  label: string
  /** Show the "Start here" hint while the section has nothing in it yet. */
  showHint?: boolean
}

/**
 * Floating + button pinned above the mobile tab bar (phones only). On a
 * section's first visit it carries a "Start here" hint pointing at it.
 */
export function AddFab({ onClick, label, showHint = false }: AddFabProps) {
  return (
    <div
      className="fixed right-4 z-40 flex items-center gap-1 sm:hidden"
      style={{
        bottom: 'calc(4.75rem + env(safe-area-inset-bottom, 0px) + 0.75rem)',
      }}
    >
      {showHint ? (
        <div
          className="pointer-events-none flex items-center gap-1 animate-fade-in"
          aria-hidden="true"
        >
          <span className="rounded-full bg-surface-solid px-3 py-1.5 text-sm font-semibold text-sage-700 shadow-[0_4px_16px_rgba(61,50,48,0.14)]">
            Start here
          </span>
          <svg
            className="h-6 w-8 text-sage-400 animate-nudge-right"
            viewBox="0 0 32 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8c6-4 14-4 22 4" />
            <path d="M19 13l6-1-1-6" />
          </svg>
        </div>
      ) : null}
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sage-400 text-white shadow-[0_8px_24px_rgba(61,50,48,0.22)] transition hover:bg-sage-700 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  )
}
