const MAX_DIMENSION = 1280
const JPEG_QUALITY = 0.82

// Data URLs above this length are worth recompressing (~220 KB of base64).
export const COMPRESSION_THRESHOLD = 300_000

export function isCompressibleDataUrl(source: string): boolean {
  return source.startsWith('data:image/') && source.length > COMPRESSION_THRESHOLD
}

/**
 * Downscale and re-encode an image data URL as JPEG so vision items stay
 * well under the localStorage quota. Remote URLs are left untouched by
 * callers (canvas export would fail on cross-origin images anyway).
 */
export function compressImage(source: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const largestSide = Math.max(image.naturalWidth, image.naturalHeight)
      const scale = Math.min(1, MAX_DIMENSION / largestSide)
      const width = Math.max(1, Math.round(image.naturalWidth * scale))
      const height = Math.max(1, Math.round(image.naturalHeight * scale))

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      if (!context) {
        reject(new Error('Canvas is not available'))
        return
      }
      // White backdrop so transparent PNG regions don't turn black in JPEG.
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, width, height)
      context.drawImage(image, 0, 0, width, height)

      const compressed = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
      resolve(compressed.length < source.length ? compressed : source)
    }
    image.onerror = () => reject(new Error('Could not load image'))
    image.src = source
  })
}

/** True when the URL path looks like a direct image file. */
export function looksLikeDirectImageUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
    if (/\.(jpe?g|png|gif|webp|avif|svg)(\?|#|$)/i.test(url.pathname)) return true
    // Common image CDNs serve without a file extension in the path.
    return /(images|imgur|unsplash|pinimg|cloudinary|imgix|twimg|googleusercontent)/i.test(
      url.hostname,
    )
  } catch {
    return false
  }
}

/** Proxy that bypasses many hotlink blocks for remote image URLs. */
export function proxiedImageUrl(value: string): string {
  const trimmed = value.trim()
  return `https://wsrv.nl/?url=${encodeURIComponent(trimmed)}&n=-1`
}

export function linkImageHint(value: string): string {
  if (!looksLikeDirectImageUrl(value)) {
    return 'That looks like a webpage link, not an image. Right-click the photo → Copy image address, then paste that here — or upload from your device.'
  }
  return "That image link didn't load. Try another direct image URL, or upload from your device."
}
