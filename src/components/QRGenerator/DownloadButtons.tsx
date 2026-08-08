import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import type { QRConfig } from '../../types/qr'
import { downloadCard, type ExportFormat } from '../../lib/export'
import { hasContent } from '../../lib/qrData'
import { Field, Select } from '../ui/Controls'

interface Props {
  config: QRConfig
}

const SIZES = [
  { value: 512, label: '512 px — web et réseaux sociaux' },
  { value: 1024, label: '1024 px — usage courant' },
  { value: 2048, label: '2048 px — haute qualité' },
  { value: 4096, label: '4096 px — impression grand format' },
]

export function DownloadButtons({ config }: Props) {
  const [size, setSize] = useState(1024)
  const [pending, setPending] = useState<ExportFormat | null>(null)
  const [error, setError] = useState<string | null>(null)
  const disabled = !hasContent(config)

  const handleDownload = async (format: ExportFormat) => {
    setPending(format)
    setError(null)
    try {
      await downloadCard(config, size, format)
    } catch {
      setError('Le téléchargement a échoué. Réessayez ou changez de format.')
    } finally {
      setPending(null)
    }
  }

  return (
    // `zone-telechargement` sert de repère à l'ancre publicitaire mobile : celle-ci
    // ne s'affiche jamais tant que cette zone est visible à l'écran.
    <div id="zone-telechargement" className="space-y-3">
      <Field label="Taille d’export" hint="Le SVG est vectoriel : la taille ne limite pas sa qualité.">
        {(id) => (
          <Select id={id} value={size} onChange={(e) => setSize(Number(e.target.value))}>
            {SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        )}
      </Field>

      <button
        type="button"
        disabled={disabled || pending !== null}
        onClick={() => handleDownload('png')}
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-600/20 transition-all duration-200 hover:bg-accent-700 hover:shadow-accent-600/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending === 'png' ? (
          <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
        ) : (
          <Download aria-hidden="true" className="h-5 w-5" />
        )}
        Télécharger en PNG
      </button>

      <div className="grid grid-cols-2 gap-3">
        {(['jpeg', 'svg'] as const).map((format) => (
          <button
            key={format}
            type="button"
            disabled={disabled || pending !== null}
            onClick={() => handleDownload(format)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-ink transition-colors duration-150 hover:border-accent-400 hover:text-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending === format ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <Download aria-hidden="true" className="h-4 w-4" />
            )}
            {format === 'jpeg' ? 'JPG' : 'SVG'}
          </button>
        ))}
      </div>

      {config.transparentBackground && (
        <p className="text-xs text-muted">
          Le fond transparent n’est conservé qu’en PNG et SVG : l’export JPG ajoutera un fond blanc.
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
