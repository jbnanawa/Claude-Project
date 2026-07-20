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
