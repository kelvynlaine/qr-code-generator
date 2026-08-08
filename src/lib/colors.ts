/** Utilitaires couleur : normalisation hexadécimale et calcul de contraste WCAG. */

export function isValidHex(value: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim())
}

/** Normalise une saisie utilisateur ("4f46e5", "#abc") en `#RRGGBB`, ou null si invalide. */
export function normalizeHex(value: string): string | null {
  let v = value.trim()
  if (!v.startsWith('#')) v = `#${v}`
  if (!isValidHex(v)) return null
  if (v.length === 4) {
    v = `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`
  }
  return v.toUpperCase()
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = normalizeHex(hex) ?? '#000000'
  return [
    parseInt(n.slice(1, 3), 16),
    parseInt(n.slice(3, 5), 16),
    parseInt(n.slice(5, 7), 16),
  ]
}

/** Luminance relative WCAG 2.1. */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Ratio de contraste entre deux couleurs (1 à 21). */
export function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a)
  const l2 = relativeLuminance(b)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

/** Moyenne de deux couleurs — sert à estimer le contraste d'un dégradé. */
export function mixHex(a: string, b: string): string {
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  const to = (n: number) => Math.round(n).toString(16).padStart(2, '0')
  return `#${to((r1 + r2) / 2)}${to((g1 + g2) / 2)}${to((b1 + b2) / 2)}`.toUpperCase()
}

export type ScanabilityLevel = 'good' | 'warning' | 'danger'

export interface ScanabilityReport {
  ratio: number
  level: ScanabilityLevel
  message: string
  /** true si le premier plan est plus clair que le fond (inversion, souvent mal lue). */
  inverted: boolean
}

/**
 * Un lecteur de QR code a besoin d'un contraste franc entre modules et fond.
 * En pratique, on vise ≥ 5:1 ; en dessous de 3:1 le scan échoue presque toujours.
 */
export function checkScanability(foreground: string, background: string): ScanabilityReport {
  const ratio = contrastRatio(foreground, background)
  const inverted = relativeLuminance(foreground) > relativeLuminance(background)

  if (ratio < 3) {
    return {
      ratio,
      inverted,
      level: 'danger',
      message: 'Contraste trop faible : ce QR code a très peu de chances d’être scanné.',
    }
  }
  if (ratio < 5 || inverted) {
    return {
      ratio,
      inverted,
      level: 'warning',
      message: inverted
        ? 'Modules plus clairs que le fond : certains lecteurs ne scannent pas les QR codes inversés.'
        : 'Contraste limite : testez le scan avant d’imprimer, ou foncez la couleur des modules.',
    }
  }
  return {
    ratio,
    inverted,
    level: 'good',
    message: 'Contraste optimal : votre QR code est facilement scannable.',
  }
}
