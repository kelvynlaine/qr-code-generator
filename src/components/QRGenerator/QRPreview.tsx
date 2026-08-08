import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import type { QRConfig } from '../../types/qr'
import { CARD_REFERENCE_SIZE } from '../../types/qr'
import { useQRCode } from '../../hooks/useQRCode'
import { checkScanability, mixHex } from '../../lib/colors'
import { foregroundColors, hasContent } from '../../lib/qrData'
import { fontStack } from '../../lib/fonts'

interface Props {
  config: QRConfig
}

/** Mêmes constantes que `lib/export.ts` : l'aperçu doit refléter l'export au pixel près. */
const PADDING = 20
const CAPTION_GAP = 14

export function QRPreview({ config }: Props) {
  const containerRef = useQRCode(config, CARD_REFERENCE_SIZE - PADDING * 2)
  const [fg1, fg2] = foregroundColors(config)
  const effectiveForeground = config.foregroundMode === 'gradient' ? mixHex(fg1, fg2) : fg1
  const effectiveBackground = config.transparentBackground ? '#FFFFFF' : config.backgroundColor
  const scan = checkScanability(effectiveForeground, effectiveBackground)
  const filled = hasContent(config)

  const ScanIcon = scan.level === 'good' ? CheckCircle2 : scan.level === 'warning' ? AlertTriangle : XCircle
  const scanStyles = {
    good: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300',
    warning: 'bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200',
    danger: 'bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-300',
  }[scan.level]

  return (
    <div className="space-y-4">
      <div className="flex justify-center rounded-2xl border border-border bg-subtle p-4 sm:p-6">
        <div
          className={config.transparentBackground ? 'checkerboard rounded-xl' : 'rounded-xl'}
          style={{ width: '100%', maxWidth: CARD_REFERENCE_SIZE }}
        >
          {/* Carte reproduisant exactement la composition exportée */}
          <div
            style={{
              background: config.transparentBackground ? 'transparent' : config.backgroundColor,
              padding: PADDING,
              borderRadius: config.frame.enabled ? config.frame.radius : 12,
              border: config.frame.enabled
                ? `${config.frame.width}px solid ${config.frame.color}`
                : '1px solid transparent',
              boxSizing: 'border-box',
            }}
          >
            <div ref={containerRef} className="aspect-square w-full" aria-hidden="true" />
            {config.caption.text.trim() && (
              <p
                style={{
                  marginTop: CAPTION_GAP,
                  fontFamily: fontStack(config.caption.fontFamily),
                  fontSize: config.caption.size,
                  lineHeight: 1.3,
                  color: config.caption.color,
                  textAlign: config.caption.align,
                  fontWeight: config.caption.bold ? 700 : 400,
                  fontStyle: config.caption.italic ? 'italic' : 'normal',
                  letterSpacing: config.caption.letterSpacing,
                  overflowWrap: 'break-word',
                }}
              >
                {config.caption.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {!filled && (
        <p className="rounded-lg bg-subtle p-3 text-sm text-muted" role="status">
          Saisissez un contenu pour générer votre QR code.
        </p>
      )}

      <div className={`flex items-start gap-2 rounded-lg p-3 text-sm ${scanStyles}`} role="status">
        <ScanIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          {scan.message} <span className="opacity-70">(contraste {scan.ratio.toFixed(1)}:1)</span>
        </p>
      </div>
    </div>
  )
}
