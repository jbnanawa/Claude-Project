import { useState, type ChangeEvent, type FormEvent } from 'react'
import { createId } from '../lib/id'
import type { VisionItem } from '../types'

interface VisionBoardProps {
  items: VisionItem[]
  onAdd: (item: VisionItem) => void
  onDelete: (id: string) => void
}

export function VisionBoard({ items, onAdd, onDelete }: VisionBoardProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')

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
      setError('Please choose an image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setPreview(result)
      setImageUrl('')
      setError('')
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const source = preview || imageUrl.trim()
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedDescription || !source) {
      setError('Add a title, description, and image to save this vision.')
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

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-blush-200/70 bg-surface-solid/90 p-6 shadow-[0_8px_28px_rgba(61,50,48,0.04)] animate-fade-up"
      >
        <h2 className="font-display text-2xl text-ink">Add to your vision board</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Save an image and describe what you want to manifest.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Title
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
              What I want to manifest
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe the feeling, lifestyle, or outcome this image represents..."
              className="w-full resize-y rounded-xl border border-blush-200 bg-blush-50 px-3.5 py-2.5 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">
              Image URL
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
              Or upload an image
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
              onError={() => setError('That image could not be loaded. Try another URL or upload.')}
            />
          </div>
        )}

        {error ? <p className="mt-3 text-sm text-blush-700">{error}</p> : null}

        <button
          type="submit"
          className="mt-5 rounded-xl bg-blush-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blush-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
        >
          Add to board
        </button>
      </form>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blush-300 bg-blush-50/50 px-6 py-12 text-center animate-fade-in">
          <p className="font-display text-xl text-ink">Your board is waiting</p>
          <p className="mt-2 text-sm text-ink-soft">
            Add images that mirror the life you are calling in.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item, index) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-blush-200/70 bg-surface-solid/90 shadow-[0_8px_24px_rgba(61,50,48,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(61,50,48,0.08)] animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-blush-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-ink">{item.title}</h3>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-blush-100 hover:text-blush-700"
                  >
                    Remove
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
