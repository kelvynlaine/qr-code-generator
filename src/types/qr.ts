import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  GradientType,
} from 'qr-code-styling'

/** Types de contenu encodables. `vcard` est prévu en structure pour une V1.1. */
export type ContentType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard'

export type TextAlign = 'left' | 'center' | 'right'

export interface GradientConfig {
  type: GradientType
  rotation: number // en degrés
  from: string
  to: string
}

export interface CaptionConfig {
  text: string
  fontFamily: string
  /** Taille exprimée dans le repère de la carte de référence (voir CARD_REFERENCE_SIZE). */
  size: number
  color: string
  align: TextAlign
  bold: boolean
  italic: boolean
  letterSpacing: number
}

export interface QRConfig {
  contentType: ContentType

  // Sources de contenu
  url: string
  text: string
  email: { address: string; subject: string; body: string }
  phone: string
  wifi: { ssid: string; password: string; encryption: 'WPA' | 'WEP' | 'nopass'; hidden: boolean }
  vcard: { firstName: string; lastName: string; org: string; phone: string; email: string; url: string }

  // Couleurs
  foregroundMode: 'solid' | 'gradient'
  foregroundColor: string
  foregroundGradient: GradientConfig
  backgroundColor: string
  transparentBackground: boolean

  // Formes
  dotType: DotType
  customEyes: boolean
  cornerSquareType: CornerSquareType
  cornerDotType: CornerDotType
  cornerSquareColor: string
  cornerDotColor: string

  // Logo central
  logo: string | null
  logoSize: number // 0.1 – 0.5
  logoMargin: number
  hideBackgroundDots: boolean

  // Texte sous le QR
  caption: CaptionConfig

  // Cadre autour de la carte
  frame: { enabled: boolean; color: string; width: number; radius: number }

  // Options techniques
  errorCorrectionLevel: ErrorCorrectionLevel
  margin: number
}

/**
 * Largeur de la carte de référence. Toutes les valeurs de mise en page
 * (padding, taille du texte, cadre) sont exprimées dans ce repère puis
 * multipliées par `exportSize / CARD_REFERENCE_SIZE` à l'export.
 */
export const CARD_REFERENCE_SIZE = 320

export const DEFAULT_CONFIG: QRConfig = {
  contentType: 'url',

  url: 'https://exemple.com',
  text: '',
  email: { address: '', subject: '', body: '' },
  phone: '',
  wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
  vcard: { firstName: '', lastName: '', org: '', phone: '', email: '', url: '' },

  foregroundMode: 'solid',
  foregroundColor: '#4F46E5',
  foregroundGradient: { type: 'linear', rotation: 45, from: '#4F46E5', to: '#9333EA' },
  backgroundColor: '#FFFFFF',
  transparentBackground: false,

  dotType: 'rounded',
  customEyes: false,
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  cornerSquareColor: '#4F46E5',
  cornerDotColor: '#4F46E5',

  logo: null,
  logoSize: 0.32,
  logoMargin: 6,
  hideBackgroundDots: true,

  caption: {
    text: 'Scannez-moi',
    fontFamily: 'Inter',
    size: 18,
    color: '#0F172A',
    align: 'center',
    bold: true,
    italic: false,
    letterSpacing: 0,
  },

  frame: { enabled: false, color: '#4F46E5', width: 3, radius: 20 },

  errorCorrectionLevel: 'H',
  margin: 8,
}
