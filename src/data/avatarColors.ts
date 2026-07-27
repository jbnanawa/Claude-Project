/** Soft avatar swatches — bg/text pairs sized for readable initials. */
export const AVATAR_COLORS = [
  { id: 'sage', bg: '#eef3ee', text: '#4f6150', label: 'Sage' },
  { id: 'blush', bg: '#fdf0eb', text: '#8a4a4e', label: 'Blush' },
  { id: 'mist', bg: '#edf2f7', text: '#455c72', label: 'Mist' },
  { id: 'peach', bg: '#ffe4d6', text: '#8a4a4e', label: 'Peach' },
  { id: 'lilac', bg: '#f3e8f5', text: '#6b4f73', label: 'Lilac' },
  { id: 'butter', bg: '#fff4d6', text: '#745e32', label: 'Butter' },
  { id: 'mint', bg: '#dff5f2', text: '#3d6b66', label: 'Mint' },
  { id: 'rose', bg: '#fce4ec', text: '#8a4a4e', label: 'Rose' },
] as const

export type AvatarColorId = (typeof AVATAR_COLORS)[number]['id']

export function avatarColorById(id: string | undefined) {
  return AVATAR_COLORS.find((color) => color.id === id) ?? AVATAR_COLORS[0]
}
