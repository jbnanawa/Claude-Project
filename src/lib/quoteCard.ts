/** Builds a soft quote-card image as an SVG data URL for the vision board. */
export function quoteCardDataUrl(quote: string): string {
  const lines = wrapQuote(quote.trim(), 28).slice(0, 6)
  const startY = 300 - ((lines.length - 1) * 36) / 2

  const textNodes = lines
    .map((line, index) => {
      const y = startY + index * 36
      return `<text x="400" y="${y}" text-anchor="middle" fill="#3d3230" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-style="italic">${escapeXml(line)}</text>`
    })
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f7efe8"/>
      <stop offset="100%" stop-color="#e8f0e8"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <text x="400" y="120" text-anchor="middle" fill="#9E6419" font-family="Georgia, serif" font-size="64" opacity="0.35">“</text>
  ${textNodes}
  <rect x="340" y="520" width="120" height="2" fill="#c5d4c6"/>
</svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function wrapQuote(text: string, maxChars: number): string[] {
  if (!text) return ['“ ”']
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines.length > 0 ? lines : ['“ ”']
}
