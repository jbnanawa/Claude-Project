export interface MapPlace {
  id: string
  label: string
  latitude: number
  longitude: number
}

interface OpenMeteoResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country?: string
  admin1?: string
}

interface OpenMeteoResponse {
  results?: OpenMeteoResult[]
}

function formatPlaceLabel(place: OpenMeteoResult): string {
  return [place.name, place.admin1, place.country].filter(Boolean).join(', ')
}

/** Search places via Open-Meteo geocoding (no API key). */
export async function searchPlaces(
  query: string,
  signal?: AbortSignal,
): Promise<MapPlace[]> {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', trimmed)
  url.searchParams.set('count', '6')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')

  const response = await fetch(url, { signal })
  if (!response.ok) return []

  const data = (await response.json()) as OpenMeteoResponse
  return (data.results ?? []).map((place) => ({
    id: String(place.id),
    label: formatPlaceLabel(place),
    latitude: place.latitude,
    longitude: place.longitude,
  }))
}

/** Open Apple Maps on iOS/macOS; Google Maps elsewhere. */
export function mapsUrl(options: {
  label: string
  latitude?: number
  longitude?: number
}): string {
  const { label, latitude, longitude } = options
  const hasCoords =
    typeof latitude === 'number' && typeof longitude === 'number'
  const query = hasCoords
    ? `${latitude},${longitude}`
    : label.trim()

  if (!query) return 'https://maps.apple.com/'

  const isApple =
    typeof navigator !== 'undefined' &&
    /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)

  if (isApple) {
    return `https://maps.apple.com/?q=${encodeURIComponent(hasCoords ? label || query : query)}${
      hasCoords ? `&ll=${latitude},${longitude}` : ''
    }`
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
