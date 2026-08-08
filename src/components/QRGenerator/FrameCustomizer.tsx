import type { ErrorCorrectionLevel } from 'qr-code-styling'
import type { QRConfig } from '../../types/qr'
import { ColorField, Field, Select, Slider, Toggle } from '../ui/Controls'

interface Props {
  config: QRConfig
  update: (patch: Partial<QRConfig>) => void
}

export function FrameCustomizer({ config, update }: Props) {
  return (
    <div className="space-y-5">
      <Toggle
        label="Cadre autour du QR code"
        description="Attire l’œil et délimite la zone à scanner."
        checked={config.frame.enabled}
        onChange={(enabled) => update({ frame: { ...config.frame, enabled } })}
      />

      {config.frame.enabled && (
        <div className="space-y-4 rounded-lg border border-border p-3">
          <ColorField
            label="Couleur du cadre"
            value={config.frame.color}
            onChange={(color) => update({ frame: { ...config.frame, color } })}
          />
          <Slider
            label="Épaisseur"
            value={config.frame.width}
            min={1}
            max={12}
            unit="px"
            onChange={(width) => update({ frame: { ...config.frame, width } })}
          />
          <Slider
            label="Arrondi des angles"
            value={config.frame.radius}
            min={0}
            max={48}
            unit="px"
            onChange={(radius) => update({ frame: { ...config.frame, radius } })}
          />
        </div>
      )}

      <Slider
        label="Marge autour du QR code"
        value={config.margin}
        min={0}
        max={32}
        unit="px"
        onChange={(margin) => update({ margin })}
      />

      <Field
        label="Niveau de correction d’erreur"
        hint="Plus le niveau est élevé, plus le QR code résiste aux logos, salissures et impressions imparfaites."
      >
        {(id) => (
          <Select
            id={id}
            value={config.errorCorrectionLevel}
            onChange={(e) => update({ errorCorrectionLevel: e.target.value as ErrorCorrectionLevel })}
          >
            <option value="L">L — 7 % (QR le plus léger)</option>
            <option value="M">M — 15 %</option>
            <option value="Q">Q — 25 %</option>
            <option value="H">H — 30 % (recommandé avec un logo)</option>
          </Select>
        )}
      </Field>
    </div>
  )
}
