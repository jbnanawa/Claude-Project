import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

interface HelpTipProps {
  /** Accessible name for the trigger, e.g. "How progress works". */
  label: string
  title: string
  children: ReactNode
}

/**
 * Small "i" button that explains a control. Opens on hover or keyboard focus
 * (desktop) and on tap (phones); Escape or a tap elsewhere closes it.
 */
export function HelpTip({ label, title, children }: HelpTipProps) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const tipId = useId()

  useEffect(() => {
    if (!open) return
    function onPointer(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setPinned(false)
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        setPinned(false)
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span
      ref={wrapRef}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (!pinned) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={() => {
          setPinned(!pinned)
          setOpen(!pinned)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          if (!pinned) setOpen(false)
        }}
        className="grid h-6 w-6 place-items-center rounded-full text-ink-muted transition hover:bg-sage-100 hover:text-sage-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6.25" />
          <path d="M8 7.25v3.5" />
          <circle cx="8" cy="5" r="0.4" fill="currentColor" />
        </svg>
      </button>
      {open ? (
        <span
          id={tipId}
          role="tooltip"
          className="glass-menu absolute bottom-full right-0 z-40 mb-2 block w-64 rounded-xl p-3 text-left text-xs leading-relaxed text-ink-soft animate-fade-in sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
        >
          <span className="mb-1 block text-sm font-medium text-ink">
            {title}
          </span>
          {children}
        </span>
      ) : null}
    </span>
  )
}
