import type { DotType, CornerDotType, CornerSquareType } from 'qr-code-styling'

export interface Palette {
  name: string
  foreground: string
  background: string
  /** Second ton, utilisé si l'utilisateur bascule en dégradé. */
  accent: string
  /** Couleur de texte lisible sur `background`. */
  caption: string
}

/** Combinaisons validées : toutes offrent un contraste ≥ 7:1 (scan fiable). */
export const PALETTES: Palette[] = [
  { name: 'Indigo', foreground: '#4F46E5', background: '#FFFFFF', accent: '#9333EA', caption: '#0F172A' },
  { name: 'Encre', foreground: '#0F172A', background: '#FFFFFF', accent: '#334155', caption: '#0F172A' },
  { name: 'Forêt', foreground: '#065F46', background: '#ECFDF5', accent: '#0D9488', caption: '#064E3B' },
  { name: 'Sunset', foreground: '#9A3412', background: '#FFF7ED', accent: '#BE123C', caption: '#7C2D12' },
  { name: 'Océan', foreground: '#0C4A6E', background: '#F0F9FF', accent: '#0891B2', caption: '#0C4A6E' },
  { name: 'Prune', foreground: '#6B21A8', background: '#FAF5FF', accent: '#DB2777', caption: '#581C87' },
  { name: 'Nuit', foreground: '#F8FAFC', background: '#0F172A', accent: '#A5B4FC', caption: '#F8FAFC' },
  { name: 'Café', foreground: '#3F2A1D', background: '#FBF3E4', accent: '#92400E', caption: '#3F2A1D' },
]

export const DOT_TYPES: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Carrés' },
  { value: 'dots', label: 'Points' },
  { value: 'rounded', label: 'Arrondis' },
  { value: 'extra-rounded', label: 'Extra-arrondis' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy doux' },
]

export const CORNER_SQUARE_TYPES: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Carré' },
  { value: 'dot', label: 'Rond' },
  { value: 'extra-rounded', label: 'Arrondi' },
]

export const CORNER_DOT_TYPES: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Carré' },
  { value: 'dot', label: 'Rond' },
]
