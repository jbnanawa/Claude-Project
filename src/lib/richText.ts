const ALLOWED_TAGS = new Set([
  'B',
  'STRONG',
  'I',
  'EM',
  'U',
  'P',
  'BR',
  'DIV',
  'UL',
  'OL',
  'LI',
  'IMG',
  'SPAN',
])

/** Strip tags/attrs we don't allow; keep a small safe subset for journal notes. */
export function sanitizeRichHtml(html: string): string {
  if (typeof document === 'undefined') return html

  const template = document.createElement('template')
  template.innerHTML = html

  function walk(node: Node) {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) continue
      if (child.nodeType !== Node.ELEMENT_NODE) {
        child.parentNode?.removeChild(child)
        continue
      }

      const el = child as HTMLElement
      if (!ALLOWED_TAGS.has(el.tagName)) {
        while (el.firstChild) {
          el.parentNode?.insertBefore(el.firstChild, el)
        }
        el.parentNode?.removeChild(el)
        continue
      }

      const savedSrc =
        el.tagName === 'IMG' ? el.getAttribute('src') ?? '' : ''
      const savedAlt =
        el.tagName === 'IMG' ? el.getAttribute('alt') ?? '' : ''

      for (const attr of [...el.attributes]) {
        el.removeAttribute(attr.name)
      }

      if (el.tagName === 'IMG') {
        if (
          savedSrc.startsWith('data:image/') ||
          savedSrc.startsWith('https://') ||
          savedSrc.startsWith('http://')
        ) {
          el.setAttribute('src', savedSrc)
          if (savedAlt) el.setAttribute('alt', savedAlt)
        } else {
          el.parentNode?.removeChild(el)
          continue
        }
      }

      walk(el)
    }
  }

  walk(template.content)
  return template.innerHTML
}

/** True when the rich field has no meaningful text or images. */
export function isRichEmpty(html: string): boolean {
  if (typeof document === 'undefined') {
    return !html.replace(/<[^>]*>/g, '').trim()
  }
  const div = document.createElement('div')
  div.innerHTML = html
  if (div.querySelector('img')) return false
  return !(div.textContent ?? '').trim()
}

/** Plain-text fallback for places that can't render HTML. */
export function richToPlainText(html: string): string {
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent ?? '').replace(/\s+/g, ' ').trim()
}
