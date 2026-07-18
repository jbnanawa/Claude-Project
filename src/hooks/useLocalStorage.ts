import { useEffect, useRef, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() =>
    readStoredValue(key, initialValue, validate),
  )

  const skipNextWrite = useRef(false)

  useEffect(() => {
    if (skipNextWrite.current) {
      skipNextWrite.current = false
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // Quota exceeded (e.g. very large vision images) or private mode.
      console.warn(`Could not persist "${key}" to localStorage.`, error)
    }
  }, [key, value])

  // Keep state in sync when the same app is open in another tab.
  const latest = useRef({ initialValue, validate })
  latest.current = { initialValue, validate }

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== key || event.storageArea !== localStorage) return
      const { initialValue, validate } = latest.current
      skipNextWrite.current = true
      setValue(readStoredValue(key, initialValue, validate))
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  return [value, setValue] as const
}

function readStoredValue<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T,
): T {
  try {
    const stored = localStorage.getItem(key)
    if (stored == null) return initialValue
    const parsed: unknown = JSON.parse(stored)
    if (validate && !validate(parsed)) {
      console.warn(`Stored "${key}" has an unexpected shape; starting fresh.`)
      return initialValue
    }
    return parsed as T
  } catch {
    return initialValue
  }
}
