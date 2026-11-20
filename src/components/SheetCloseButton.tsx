interface SheetCloseButtonProps {
  onClick: () => void
}

/**
 * Header close control for sheets and dialogs: an X icon on phones (where
 * the content opens as a bottom sheet) and the "Cancel" text from sm up.
 */
export function SheetCloseButton({ onClick }: SheetCloseButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label="Close"
        className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 sm:hidden"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onClick}
        className="hidden shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 sm:inline-flex"
      >
        Cancel
      </button>
    </>
  )
}
