import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { createId } from '../lib/id'
import { compressImage, isCompressibleDataUrl } from '../lib/image'
import type { VisionItem } from '../types'

interface VisionBoardProps {
  items: VisionItem[]
  onAdd: (item: VisionItem) => void
  onDelete: (id: string) => void
  onUpdate: (item: VisionItem) => void
}

export function VisionBoard({ items, onAdd, onDelete, onUpdate }: VisionBoardProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [tab, setTab] = useState<'progress' | 'archived'>('progress')

  useEffect(() => {
    if (!openMenuId) return
    function closeOnOutsideClick(event: PointerEvent) {
      if (!(event.target as Element).closest('[data-vision-menu]')) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [openMenuId])

  function startEditing(item: VisionItem) {
    setOpenMenuId(null)
    setEditingId(item.id)
    setEditTitle(item.title)
    setEditDescription(item.description)
  }

  function toggleAchieved(item: VisionItem) {
    onUpdate({ ...item, achieved: !item.achieved })
    setOpenMenuId(null)
  }

  function cancelEditing() {
    setEditingId(null)
  }

  function saveEditing(item: VisionItem) {
    const trimmedTitle = editTitle.trim()
    const trimmedDescription = editDescription.trim()
    if (!trimmedTitle || !trimmedDescription) return

    onUpdate({
      ...item,
      title: trimmedTitle,
      description: trimmedDescription,
    })
    setEditingId(null)
  }

  function resetForm() {
    setTitle('')
    setDescription('')
    setImageUrl('')
    setPreview('')
    setError('')
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError("Hmm, that one isn't an image — try a photo instead.")
      return
    }

    const reader = new FileReader()
    reader.onload = async () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      try {
        const stored = isCompressibleDataUrl(result)
          ? await compressImage(result)
          : result
        setPreview(stored)
        setImageUrl('')
        setError('')
      } catch {
        setError("That image didn't want to cooperate. Mind trying another?")
      }
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const source = preview || imageUrl.trim()
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedDescription || !source) {
      setError(
        'Almost there — it just needs a name, a little meaning, and an image.',
      )
      return
    }

    onAdd({
      id: createId(),
      title: trimmedTitle,
      description: trimmedDescription,
      imageUrl: source,
      createdAt: new Date().toISOString(),
    })
    resetForm()
  }

  const sorted = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const inProgress = sorted.filter((item) => !item.achieved)
  const archived = sorted.filter((item) => item.achieved)
  const visible = tab === 'archived' ? archived : inProgress

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="glass-card p-6 animate-fade-up"
      >
        <h2 className="font-display text-xl text-ink sm:text-2xl">
          Add something to your board
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Drop in an image and tell me what it means to you.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Give it a name
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Soft morning rituals"
              className="w-full rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              What does this one mean to you?
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="The feeling, the life, the moment you're picturing..."
              className="w-full resize-y rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Paste an image link
            </span>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value)
                setPreview('')
                setError('')
              }}
              placeholder="https://..."
              className="w-full rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Or upload one from your camera roll
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="block w-full rounded-xl border border-blush-200 bg-blush-50 px-3 py-2 text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-blush-200 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-blush-700"
            />
          </label>
        </div>

        {(preview || imageUrl) && (
          <div className="mt-4 overflow-hidden rounded-xl border border-blush-200">
            <img
              src={preview || imageUrl}
              alt="Vision preview"
              className="h-44 w-full object-cover"
              onError={() =>
                setError(
                  "That link didn't load for me. Try another one, or upload the image instead.",
                )
              }
            />
          </div>
        )}

        {error ? <p className="mt-3 text-sm text-blush-700">{error}</p> : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-blush-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 sm:w-auto"
        >
          Pin it to the board
        </button>
      </form>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-12 text-center animate-fade-in">
          <p className="font-display text-xl text-ink">
            Your board is ready when you are
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Pin a few images of the life you're dreaming about — go on, have
            fun with it.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div
            role="tablist"
            aria-label="Vision filter"
            className="glass-card inline-flex items-center gap-1 rounded-xl p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'progress'}
              onClick={() => setTab('progress')}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
                tab === 'progress'
                  ? 'bg-blush-500 text-white'
                  : 'text-ink-soft hover:bg-blush-100 hover:text-ink'
              }`}
            >
              In progress ({inProgress.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'archived'}
              onClick={() => setTab('archived')}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${
                tab === 'archived'
                  ? 'bg-blush-500 text-white'
                  : 'text-ink-soft hover:bg-blush-100 hover:text-ink'
              }`}
            >
              Archived ({archived.length})
            </button>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-10 text-center animate-fade-in">
              {tab === 'archived' ? (
                <>
                  <p className="font-display text-xl text-ink">
                    Nothing in the archive yet
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    When a vision comes true, it'll rest here — and that day is
                    coming.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl text-ink">
                    You achieved every single one
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    Seriously, that's amazing. Dream up a new one, or scroll
                    the archive and soak it in.
                  </p>
                </>
              )}
            </div>
          ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <article
              key={item.id}
              className="glass-card group transition hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-blush-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                {editingId === item.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full rounded-xl border border-blush-200 bg-blush-50 px-3 py-2 font-display text-lg text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                      placeholder="Description"
                      className="w-full resize-y rounded-xl border border-blush-200 bg-blush-50 px-3 py-2 text-sm leading-relaxed text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEditing(item)}
                        disabled={!editTitle.trim() || !editDescription.trim()}
                        className="rounded-lg bg-blush-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blush-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg text-ink">{item.title}</h3>
                        {item.achieved ? (
                          <span className="rounded-lg border border-sage-200 bg-sage-100 px-2 py-0.5 text-xs font-medium text-sage-600">
                            Achieved
                          </span>
                        ) : null}
                      </div>
                      <div className="relative shrink-0" data-vision-menu>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(openMenuId === item.id ? null : item.id)
                          }
                          aria-haspopup="menu"
                          aria-expanded={openMenuId === item.id}
                          aria-label={`Options for ${item.title}`}
                          className="rounded-lg px-1.5 py-1 text-ink-muted transition hover:bg-blush-100 hover:text-blush-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                        >
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <circle cx="8" cy="3" r="1.4" />
                            <circle cx="8" cy="8" r="1.4" />
                            <circle cx="8" cy="13" r="1.4" />
                          </svg>
                        </button>
                        {openMenuId === item.id ? (
                          <div
                            role="menu"
                            className="glass-menu absolute right-0 top-full z-10 mt-1 w-44 rounded-xl p-1"
                          >
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => toggleAchieved(item)}
                              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-blush-100"
                            >
                              Achieved
                              {item.achieved ? (
                                <svg
                                  className="h-3.5 w-3.5 text-sage-600"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d="m3 8.5 3.5 3.5L13 5" />
                                </svg>
                              ) : null}
                            </button>
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => startEditing(item)}
                              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-blush-100"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => onDelete(item.id)}
                              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-blush-700 transition hover:bg-blush-100"
                            >
                              Remove
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            </article>
          ))}
          </div>
          )}
        </div>
      )}
    </div>
  )
}
