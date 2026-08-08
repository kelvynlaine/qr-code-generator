import QRCodeStyling from 'qr-code-styling'
import type { QRConfig } from '../types/qr'
import { CARD_REFERENCE_SIZE } from '../types/qr'
import { buildQROptions } from './qrData'
import { ensureFontReady, fontStack } from './fonts'

export type ExportFormat = 'png' | 'jpeg' | 'svg'

/** Marge intérieure de la carte, exprimée dans le repère de référence (320px). */
const PADDING = 20
/** Espace entre le QR code et le texte, repère de référence. */
const CAPTION_GAP = 14
const LINE_HEIGHT_RATIO = 1.3

export interface CardLayout {
  scale: number
  padding: number
  qrSize: number
  captionLines: string[]
  captionFontSize: number
  captionLineHeight: number
  captionTop: number
  width: number
  height: number
}

/** Contexte 2D jetable, utilisé uniquement pour mesurer du texte. */
let measureCtx: CanvasRenderingContext2D | null = null
function getMeasureContext(): CanvasRenderingContext2D {
  if (!measureCtx) {
    measureCtx = document.createElement('canvas').getContext('2d')!
  }
  return measureCtx
}

export function canvasFont(config: QRConfig, fontSize: number): string {
  const { bold, italic, fontFamily } = config.caption
  return `${italic ? 'italic ' : ''}${bold ? '700' : '400'} ${fontSize}px ${fontStack(fontFamily)}`
}

/**
 * Découpe le texte en lignes tenant dans `maxWidth`.
 * Les retours à la ligne explicites de l'utilisateur sont conservés.
 */
export function wrapText(
  text: string,
  font: string,
  maxWidth: number,
  letterSpacing: number,
): string[] {
  if (!text.trim()) return []
  const ctx = getMeasureContext()
  ctx.font = font
  // `letterSpacing` n'existe pas sur tous les navigateurs : on l'applique si disponible.
  if ('letterSpacing' in ctx) {
    ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${letterSpacing}px`
  }

  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    const words = paragraph.split(/\s+/).filter(Boolean)
    if (words.length === 0) {
      lines.push('')
      continue
    }
    let current = words[0]
    for (const word of words.slice(1)) {
      const candidate = `${current} ${word}`
      if (ctx.measureText(candidate).width <= maxWidth) {
        current = candidate
      } else {
        lines.push(current)
        current = word
      }
    }
    lines.push(current)
  }
  return lines
}

/** Calcule la géométrie de la carte pour une largeur d'export donnée. */
export function computeLayout(config: QRConfig, size: number): CardLayout {
  const scale = size / CARD_REFERENCE_SIZE
  const padding = PADDING * scale
  const qrSize = size - padding * 2
  const captionFontSize = config.caption.size * scale
  const captionLineHeight = captionFontSize * LINE_HEIGHT_RATIO

  const lines = wrapText(
    config.caption.text,
    canvasFont(config, captionFontSize),
    qrSize,
    config.caption.letterSpacing * scale,
  )

  const captionTop = padding + qrSize + (lines.length ? CAPTION_GAP * scale : 0)
  const captionBlock = lines.length ? lines.length * captionLineHeight : 0
  const height = captionTop + captionBlock + padding

  return {
    scale,
    padding,
    qrSize,
    captionLines: lines,
    captionFontSize,
    captionLineHeight,
    captionTop,
    width: size,
    height,
  }
}

/** Génère l'image du QR code seul (sans texte) à la taille demandée. */
async function renderQRBlob(
  config: QRConfig,
  size: number,
  extension: 'png' | 'svg',
): Promise<Blob> {
  const qr = new QRCodeStyling(buildQROptions(config, size, extension === 'svg' ? 'svg' : 'canvas'))
  const raw = await qr.getRawData(extension)
  if (!raw) throw new Error('Impossible de générer le QR code.')
  return raw as Blob
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Chargement de l’image échoué.'))
    img.src = src
  })
}

/**
 * Compose la carte finale sur un canvas : fond, cadre optionnel, QR code puis
 * texte personnalisé. Le texte est bien rasterisé dans l'image exportée.
 */
export async function renderCardToCanvas(
  config: QRConfig,
  size: number,
  format: ExportFormat,
): Promise<HTMLCanvasElement> {
  const layout = computeLayout(config, size)

  // La police doit être disponible AVANT le dessin, sinon le canvas utilise le fallback.
  if (layout.captionLines.length) {
    await ensureFontReady(config.caption.fontFamily, config.caption.bold ? 700 : 400, layout.captionFontSize)
  }

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(layout.width)
  canvas.height = Math.round(layout.height)
  const ctx = canvas.getContext('2d')!

  // JPG ne gère pas la transparence : on force un fond blanc dans ce cas.
  const opaqueBackground = format === 'jpeg' && config.transparentBackground
  if (!config.transparentBackground || opaqueBackground) {
    ctx.fillStyle = opaqueBackground ? '#FFFFFF' : config.backgroundColor
    if (config.frame.enabled) {
      ctx.beginPath()
      ctx.roundRect(0, 0, canvas.width, canvas.height, config.frame.radius * layout.scale)
      ctx.fill()
    } else {
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  if (config.frame.enabled) {
    const lineWidth = config.frame.width * layout.scale
    ctx.strokeStyle = config.frame.color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.roundRect(
      lineWidth / 2,
      lineWidth / 2,
      canvas.width - lineWidth,
      canvas.height - lineWidth,
      config.frame.radius * layout.scale,
    )
    ctx.stroke()
  }

  // Le QR est rendu à sa taille finale par la librairie (pas d'upscale flou).
  const qrBlob = await renderQRBlob(config, Math.round(layout.qrSize), 'png')
  const url = URL.createObjectURL(qrBlob)
  try {
    const img = await loadImage(url)
    ctx.drawImage(img, layout.padding, layout.padding, layout.qrSize, layout.qrSize)
  } finally {
    URL.revokeObjectURL(url)
  }

  if (layout.captionLines.length) {
    ctx.fillStyle = config.caption.color
    ctx.font = canvasFont(config, layout.captionFontSize)
    ctx.textBaseline = 'top'
    ctx.textAlign = config.caption.align === 'left' ? 'left' : config.caption.align === 'right' ? 'right' : 'center'
    if ('letterSpacing' in ctx) {
      ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        `${config.caption.letterSpacing * layout.scale}px`
    }
    const x =
      config.caption.align === 'left'
        ? layout.padding
        : config.caption.align === 'right'
          ? layout.width - layout.padding
          : layout.width / 2

    layout.captionLines.forEach((line, i) => {
      ctx.fillText(line, x, layout.captionTop + i * layout.captionLineHeight)
    })
  }

  return canvas
}

/** Construit un SVG vectoriel complet (QR + texte), sans perte de qualité. */
export async function renderCardToSVG(config: QRConfig, size: number): Promise<string> {
  const layout = computeLayout(config, size)
  const qrBlob = await renderQRBlob(config, Math.round(layout.qrSize), 'svg')
  const qrSvg = (await qrBlob.text())
    .replace(/<\?xml[^>]*\?>/, '')
    .trim()

  const { caption } = config
  const anchor = caption.align === 'left' ? 'start' : caption.align === 'right' ? 'end' : 'middle'
  const x =
    caption.align === 'left'
      ? layout.padding
      : caption.align === 'right'
        ? layout.width - layout.padding
        : layout.width / 2

  const escapeXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const textEl = layout.captionLines.length
    ? `<text x="${x}" y="${layout.captionTop + layout.captionFontSize}" fill="${caption.color}" ` +
      `font-family="${escapeXml(fontStack(caption.fontFamily))}" font-size="${layout.captionFontSize}" ` +
      `font-weight="${caption.bold ? 700 : 400}" font-style="${caption.italic ? 'italic' : 'normal'}" ` +
      `letter-spacing="${caption.letterSpacing * layout.scale}" text-anchor="${anchor}">` +
      layout.captionLines
        .map(
          (line, i) =>
            `<tspan x="${x}" dy="${i === 0 ? 0 : layout.captionLineHeight}">${escapeXml(line)}</tspan>`,
        )
        .join('') +
      '</text>'
    : ''

  const radius = config.frame.enabled ? config.frame.radius * layout.scale : 0
  const bgRect = config.transparentBackground
    ? ''
    : `<rect width="${layout.width}" height="${layout.height}" rx="${radius}" fill="${config.backgroundColor}"/>`
  const frameRect = config.frame.enabled
    ? `<rect x="${(config.frame.width * layout.scale) / 2}" y="${(config.frame.width * layout.scale) / 2}" ` +
      `width="${layout.width - config.frame.width * layout.scale}" height="${layout.height - config.frame.width * layout.scale}" ` +
      `rx="${radius}" fill="none" stroke="${config.frame.color}" stroke-width="${config.frame.width * layout.scale}"/>`
    : ''

  // L'import de police permet au SVG de s'afficher correctement dans un navigateur.
  const fontImport = layout.captionLines.length
    ? `<style>@import url('https://fonts.googleapis.com/css2?family=${caption.fontFamily.replace(/\s/g, '+')}&amp;display=swap');</style>`
    : ''

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}">
${fontImport}
${bgRect}
<g transform="translate(${layout.padding}, ${layout.padding})">${qrSvg}</g>
${textEl}
${frameRect}
</svg>`
}

/** Nom de fichier horodaté, ex. `qrcode-2026-08-09.png`. */
export function buildFilename(extension: ExportFormat): string {
  const d = new Date()
  const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return `qrcode-${stamp}.${extension === 'jpeg' ? 'jpg' : extension}`
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  // Laisse le temps au navigateur d'initier le téléchargement avant révocation.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function downloadCard(
  config: QRConfig,
  size: number,
  format: ExportFormat,
): Promise<void> {
  if (format === 'svg') {
    const svg = await renderCardToSVG(config, size)
    triggerDownload(new Blob([svg], { type: 'image/svg+xml' }), buildFilename('svg'))
    return
  }

  const canvas = await renderCardToCanvas(config, size, format)
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, format === 'jpeg' ? 'image/jpeg' : 'image/png', 0.95),
  )
  if (!blob) throw new Error('Export impossible.')
  triggerDownload(blob, buildFilename(format))
}
