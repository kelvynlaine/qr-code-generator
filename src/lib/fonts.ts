/** Polices Google Fonts proposées pour le texte sous le QR code, + chargement à la demande. */

export interface FontOption {
  /** Nom de famille CSS, tel qu'utilisé dans `font-family`. */
  family: string
  label: string
  category: 'sans' | 'serif' | 'script' | 'display' | 'mono'
  /** Segment `family=` de l'URL Google Fonts. */
  googleParam: string
}

export const FONTS: FontOption[] = [
  { family: 'Inter', label: 'Inter', category: 'sans', googleParam: 'Inter:ital,wght@0,400;0,700;1,400;1,700' },
  { family: 'Poppins', label: 'Poppins', category: 'sans', googleParam: 'Poppins:ital,wght@0,400;0,700;1,400;1,700' },
  { family: 'Montserrat', label: 'Montserrat', category: 'sans', googleParam: 'Montserrat:ital,wght@0,400;0,700;1,400;1,700' },
  { family: 'Playfair Display', label: 'Playfair Display', category: 'serif', googleParam: 'Playfair+Display:ital,wght@0,400;0,700;1,400;1,700' },
  { family: 'Merriweather', label: 'Merriweather', category: 'serif', googleParam: 'Merriweather:ital,wght@0,400;0,700;1,400;1,700' },
  { family: 'Lora', label: 'Lora', category: 'serif', googleParam: 'Lora:ital,wght@0,400;0,700;1,400;1,700' },
  { family: 'Bebas Neue', label: 'Bebas Neue', category: 'display', googleParam: 'Bebas+Neue' },
  { family: 'Caveat', label: 'Caveat (manuscrite)', category: 'script', googleParam: 'Caveat:wght@400;700' },
  { family: 'Pacifico', label: 'Pacifico (manuscrite)', category: 'script', googleParam: 'Pacifico' },
  { family: 'JetBrains Mono', label: 'JetBrains Mono', category: 'mono', googleParam: 'JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700' },
]

const loaded = new Set<string>()

/** Injecte la feuille Google Fonts d'une famille (une seule fois par famille). */
export function loadFont(family: string): void {
  const font = FONTS.find((f) => f.family === family)
  if (!font || loaded.has(family)) return
  loaded.add(family)

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${font.googleParam}&display=swap`
  document.head.appendChild(link)
}

/**
 * Attend que la police soit réellement disponible pour le rendu canvas.
 * Sans cela, l'export dessinerait le texte avec la police de repli.
 */
export async function ensureFontReady(family: string, weight: number, size: number): Promise<void> {
  loadFont(family)
  if (!('fonts' in document)) return
  try {
    await document.fonts.load(`${weight} ${size}px "${family}"`)
    await document.fonts.ready
  } catch {
    // Police indisponible (hors ligne, blocage réseau) : on laisse le fallback système.
  }
}

/** Fallback CSS cohérent avec la catégorie de la police choisie. */
export function fontStack(family: string): string {
  const font = FONTS.find((f) => f.family === family)
  const fallback =
    font?.category === 'serif'
      ? 'Georgia, serif'
      : font?.category === 'mono'
        ? 'ui-monospace, monospace'
        : font?.category === 'script'
          ? 'cursive'
          : 'system-ui, sans-serif'
  return `"${family}", ${fallback}`
}
