import {
  useEffect,
  useId,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { compressImage, isCompressibleDataUrl } from '../lib/image'
import { isRichEmpty, sanitizeRichHtml } from '../lib/richText'

interface MessageFieldProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  autoFocus?: boolean
  minHeightClass?: string
  'aria-label'?: string
}

function ToolbarButton({
  label,
  title,
  onClick,
  active,
}: {
  label: ReactNode
  title: string
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      onMouseDown={(event) => {
        // Keep selection in the editor.
        event.preventDefault()
      }}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 ${
        active
          ? 'bg-sage-200 text-sage-600'
          : 'text-ink-soft hover:bg-sage-100 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

export function MessageField({
  value,
  onChange,
  placeholder = 'Write a note…',
  autoFocus,
  minHeightClass = 'min-h-28',
  'aria-label': ariaLabel,
}: MessageFieldProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileInputId = useId()
  const skipNextSync = useRef(false)

  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (skipNextSync.current) {
      skipNextSync.current = false
      return
    }
    if (el.innerHTML !== value) {
      el.innerHTML = value || ''
    }
  }, [value])

  useEffect(() => {
    if (autoFocus) editorRef.current?.focus()
  }, [autoFocus])

  function emitChange() {
    const el = editorRef.current
    if (!el) return
    skipNextSync.current = true
    onChange(sanitizeRichHtml(el.innerHTML))
  }

  function runCommand(command: string, commandValue?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, commandValue)
    emitChange()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
      event.preventDefault()
      runCommand('bold')
    }
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = async () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      if (!result) return
      try {
        const stored = isCompressibleDataUrl(result)
          ? await compressImage(result)
          : result
        editorRef.current?.focus()
        document.execCommand('insertImage', false, stored)
        // Style the newly inserted image if we can find it.
        const imgs = editorRef.current?.querySelectorAll('img')
        const last = imgs?.[imgs.length - 1]
        if (last) {
          last.setAttribute('alt', file.name || 'Attached photo')
        }
        emitChange()
      } catch {
        // Ignore failed compress/insert — user can retry.
      }
    }
    reader.readAsDataURL(file)
  }

  const empty = isRichEmpty(value)

  return (
    <div className="overflow-hidden rounded-xl border border-sage-200 bg-blush-50 transition focus-within:border-sage-400 focus-within:ring-2 focus-within:ring-sage-200">
      <div
        className="flex flex-wrap items-center gap-0.5 border-b border-sage-200/80 px-1.5 py-1.5"
        role="toolbar"
        aria-label="Formatting"
      >
        <ToolbarButton
          title="Bold"
          label={<span className="font-bold">B</span>}
          onClick={() => runCommand('bold')}
        />
        <ToolbarButton
          title="Bulleted list"
          label={
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="2.5" cy="4" r="1.2" />
              <circle cx="2.5" cy="8" r="1.2" />
              <circle cx="2.5" cy="12" r="1.2" />
              <rect x="5.5" y="3.2" width="9" height="1.6" rx="0.5" />
              <rect x="5.5" y="7.2" width="9" height="1.6" rx="0.5" />
              <rect x="5.5" y="11.2" width="9" height="1.6" rx="0.5" />
            </svg>
          }
          onClick={() => runCommand('insertUnorderedList')}
        />
        <ToolbarButton
          title="Numbered list"
          label={
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <text x="1" y="5.2" fontSize="5" fontWeight="600" fontFamily="system-ui,sans-serif">
                1.
              </text>
              <text x="1" y="9.2" fontSize="5" fontWeight="600" fontFamily="system-ui,sans-serif">
                2.
              </text>
              <text x="1" y="13.2" fontSize="5" fontWeight="600" fontFamily="system-ui,sans-serif">
                3.
              </text>
              <rect x="6.5" y="3.2" width="8" height="1.6" rx="0.5" />
              <rect x="6.5" y="7.2" width="8" height="1.6" rx="0.5" />
              <rect x="6.5" y="11.2" width="8" height="1.6" rx="0.5" />
            </svg>
          }
          onClick={() => runCommand('insertOrderedList')}
        />
        <span className="mx-1 h-5 w-px bg-sage-200" aria-hidden="true" />
        <ToolbarButton
          title="Attach image"
          label={
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="8.5" cy="10" r="1.5" />
              <path d="m21 15-4.5-4.5L7 20" />
            </svg>
          }
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          id={fileInputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFile}
        />
      </div>

      <div className="relative">
        {empty ? (
          <p
            className="pointer-events-none absolute left-3.5 top-3 text-base text-ink-muted"
            aria-hidden="true"
          >
            {placeholder}
          </p>
        ) : null}
        <div
          ref={editorRef}
          role="textbox"
          aria-multiline="true"
          aria-label={ariaLabel ?? placeholder}
          contentEditable
          suppressContentEditableWarning
          onInput={emitChange}
          onBlur={emitChange}
          onKeyDown={handleKeyDown}
          className={`message-field-editor ${minHeightClass} max-h-72 overflow-y-auto px-3.5 py-3 text-base leading-relaxed text-ink outline-none`}
        />
      </div>
    </div>
  )
}

interface RichTextProps {
  html: string
  className?: string
}

/** Renders sanitized journal HTML for read-only display. */
export function RichText({ html, className = '' }: RichTextProps) {
  const safe = sanitizeRichHtml(html)
  if (isRichEmpty(safe)) return null
  return (
    <div
      className={`message-field-editor ${className}`}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}
