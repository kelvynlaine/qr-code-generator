import type { Options } from 'qr-code-styling'
import type { QRConfig } from '../types/qr'

/** Échappe les caractères réservés du format Wi-Fi (`\`, `;`, `,`, `:`, `"`). */
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1')
}

/** Encodage vCard 3.0 minimal (compatible iOS / Android). */
function buildVCard(v: QRConfig['vcard']): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${v.lastName};${v.firstName};;;`,
    `FN:${[v.firstName, v.lastName].filter(Boolean).join(' ')}`,
  ]
  if (v.org) lines.push(`ORG:${v.org}`)
  if (v.phone) lines.push(`TEL;TYPE=CELL:${v.phone}`)
  if (v.email) lines.push(`EMAIL:${v.email}`)
  if (v.url) lines.push(`URL:${v.url}`)
  lines.push('END:VCARD')
  return lines.join('\n')
}

/** Transforme la configuration en chaîne encodée dans le QR code. */
export function buildQRData(config: QRConfig): string {
  switch (config.contentType) {
    case 'url':
      return config.url.trim()
    case 'text':
      return config.text
    case 'email': {
      const { address, subject, body } = config.email
      const params = new URLSearchParams()
      if (subject) params.set('subject', subject)
      if (body) params.set('body', body)
      const query = params.toString()
      return `mailto:${address.trim()}${query ? `?${query}` : ''}`
    }
    case 'phone':
      return `tel:${config.phone.replace(/\s/g, '')}`
    case 'wifi': {
      const { ssid, password, encryption, hidden } = config.wifi
      const parts = [`T:${encryption}`, `S:${escapeWifi(ssid)}`]
      if (encryption !== 'nopass') parts.push(`P:${escapeWifi(password)}`)
      if (hidden) parts.push('H:true')
      return `WIFI:${parts.join(';')};;`
    }
    case 'vcard':
      return buildVCard(config.vcard)
  }
}

/** Vrai si le contenu saisi est suffisant pour générer un QR code utile. */
export function hasContent(config: QRConfig): boolean {
  switch (config.contentType) {
    case 'url':
      return config.url.trim().length > 0
    case 'text':
      return config.text.trim().length > 0
    case 'email':
      return config.email.address.trim().length > 0
    case 'phone':
      return config.phone.trim().length > 0
    case 'wifi':
      return config.wifi.ssid.trim().length > 0
    case 'vcard':
      return Boolean(config.vcard.firstName || config.vcard.lastName || config.vcard.phone)
  }
}

/** Validation souple d'URL : on exige un schéma http(s) et un hôte plausible. */
export function validateUrl(value: string): string | null {
  const v = value.trim()
  if (!v) return null
  if (!/^https?:\/\//i.test(v)) {
    return 'L’URL doit commencer par https:// (ou http://).'
  }
  try {
    const parsed = new URL(v)
    if (!parsed.hostname.includes('.')) return 'Le nom de domaine semble incomplet.'
    return null
  } catch {
    return 'Cette URL n’est pas valide.'
  }
}

export function validateEmail(value: string): string | null {
  const v = value.trim()
  if (!v) return null
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Adresse e-mail invalide.'
}

/** Couleur (ou dégradé) effectivement utilisée pour les modules — sert au calcul de contraste. */
export function foregroundColors(config: QRConfig): [string, string] {
  return config.foregroundMode === 'gradient'
    ? [config.foregroundGradient.from, config.foregroundGradient.to]
    : [config.foregroundColor, config.foregroundColor]
}

/**
 * Construit les options `qr-code-styling` à partir de la configuration.
 * Utilisé aussi bien pour l'aperçu que pour les instances d'export haute résolution.
 */
export function buildQROptions(config: QRConfig, size: number, type: 'canvas' | 'svg'): Options {
  const gradient =
    config.foregroundMode === 'gradient'
      ? {
          type: config.foregroundGradient.type,
          rotation: (config.foregroundGradient.rotation * Math.PI) / 180,
          colorStops: [
            { offset: 0, color: config.foregroundGradient.from },
            { offset: 1, color: config.foregroundGradient.to },
          ],
        }
      : undefined

  return {
    type,
    width: size,
    height: size,
    // Le fond de la carte est dessiné par nos soins : le QR lui-même reste transparent.
    margin: Math.round((config.margin * size) / 320),
    data: buildQRData(config) || ' ',
    image: config.logo ?? undefined,
    qrOptions: { errorCorrectionLevel: config.errorCorrectionLevel },
    imageOptions: {
      crossOrigin: 'anonymous',
      hideBackgroundDots: config.hideBackgroundDots,
      imageSize: config.logoSize,
      margin: Math.round((config.logoMargin * size) / 320),
    },
    dotsOptions: {
      type: config.dotType,
      color: config.foregroundColor,
      ...(gradient ? { gradient } : {}),
    },
    cornersSquareOptions: {
      type: config.cornerSquareType,
      color: config.customEyes ? config.cornerSquareColor : config.foregroundColor,
      ...(config.customEyes ? {} : gradient ? { gradient } : {}),
    },
    cornersDotOptions: {
      type: config.cornerDotType,
      color: config.customEyes ? config.cornerDotColor : config.foregroundColor,
      ...(config.customEyes ? {} : gradient ? { gradient } : {}),
    },
    backgroundOptions: {
      color: config.transparentBackground ? 'transparent' : config.backgroundColor,
    },
  }
}
