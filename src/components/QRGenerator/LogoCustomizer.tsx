import { useRef, useState } from 'react'
import { Trash2, Upload } from 'lucide-react'
import type { QRConfig } from '../../types/qr'
import { Slider, Toggle } from '../ui/Controls'

interface Props {
  config: QRConfig
  update: (patch: Partial<QRConfig>) => void
}

const MAX_LOGO_BYTES = 2 * 1024 * 1024

export function LogoCustomizer({ config, update }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Format non supporté : choisissez une image (PNG, JPG ou SVG).')
      return
    }
    if (file.size > MAX_LOGO_BYTES) {
      setError('Image trop lourde (2 Mo maximum).')
      return
    }
    setError(null)
    // Le logo reste en data URL côté navigateur : aucun envoi vers un serveur.
    const reader = new FileReader()
    reader.onload = () => {
      update({ logo: reader.result as string, errorCorrectionLevel: 'H' })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      {config.logo ? (
        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <img
            src={config.logo}
            alt="Aperçu du logo importé"
            className="h-12 w-12 rounded-md object-contain"
          />
          <p className="flex-1 text-sm text-muted">Logo importé</p>
          <button
            type="button"
            onClick={() => update({ logo: null })}
            aria-label="Supprimer le logo"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-subtle hover:text-red-600"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-24 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 text-sm text-muted transition-colors duration-150 hover:border-accent-400 hover:text-accent-600"
        >
          <Upload aria-hidden="true" className="h-5 w-5" />
          Importer un logo (PNG, JPG, SVG — 2 Mo max)
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label="Importer un logo"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {config.logo && (
        <>
          <Slider
            label="Taille du logo"
            value={Math.round(config.logoSize * 100)}
            min={10}
            max={45}
            unit="%"
            onChange={(v) => update({ logoSize: v / 100 })}
          />
          <Slider
            label="Marge autour du logo"
            value={config.logoMargin}
            min={0}
            max={20}
            unit="px"
            onChange={(logoMargin) => update({ logoMargin })}
          />
          <Toggle
            label="Halo de sécurité"
            description="Masque les modules sous le logo pour garder un rendu net."
            checked={config.hideBackgroundDots}
            onChange={(hideBackgroundDots) => update({ hideBackgroundDots })}
          />
          <p className="rounded-lg bg-accent-50 p-3 text-xs text-accent-800 dark:bg-accent-500/10 dark:text-accent-200">
            Un logo masque une partie des données. La correction d’erreur est passée au niveau maximum
            (H) — testez tout de même le scan avant impression.
          </p>
        </>
      )}
    </div>
  )
}
