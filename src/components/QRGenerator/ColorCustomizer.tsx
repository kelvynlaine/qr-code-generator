import { Check } from 'lucide-react'
import type { QRConfig } from '../../types/qr'
import { PALETTES } from '../../lib/presets'
import { ColorField, Label, SegmentedControl, Slider, Toggle } from '../ui/Controls'

interface Props {
  config: QRConfig
  update: (patch: Partial<QRConfig>) => void
}

export function ColorCustomizer({ config, update }: Props) {
  const applyPalette = (index: number) => {
    const palette = PALETTES[index]
    update({
      foregroundColor: palette.foreground,
      backgroundColor: palette.background,
      transparentBackground: false,
      foregroundGradient: { ...config.foregroundGradient, from: palette.foreground, to: palette.accent },
      cornerSquareColor: palette.foreground,
      cornerDotColor: palette.foreground,
      caption: { ...config.caption, color: palette.caption },
      frame: { ...config.frame, color: palette.foreground },
    })
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Palettes prêtes à l’emploi</Label>
        <div className="grid grid-cols-4 gap-2">
          {PALETTES.map((palette, index) => {
            const active =
              config.foregroundColor === palette.foreground && config.backgroundColor === palette.background
            return (
              <button
                key={palette.name}
                type="button"
                onClick={() => applyPalette(index)}
                aria-label={`Palette ${palette.name}`}
                aria-pressed={active}
                title={palette.name}
                className={`relative flex min-h-11 items-center justify-center rounded-lg border-2 transition-transform duration-150 hover:scale-105 ${
                  active ? 'border-accent-500' : 'border-border'
                }`}
                style={{ background: palette.background }}
              >
                <span
                  className="h-5 w-5 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${palette.foreground}, ${palette.accent})` }}
                />
                {active && (
                  <Check
                    aria-hidden="true"
                    className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-accent-600 p-0.5 text-white"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <SegmentedControl
        label="Couleur des modules"
        value={config.foregroundMode}
        onChange={(foregroundMode) => update({ foregroundMode })}
        options={[
          { value: 'solid', label: 'Uni' },
          { value: 'gradient', label: 'Dégradé' },
        ]}
      />

      {config.foregroundMode === 'solid' ? (
        <ColorField
          label="Couleur des modules"
          value={config.foregroundColor}
          onChange={(foregroundColor) => update({ foregroundColor })}
        />
      ) : (
        <div className="space-y-4 rounded-lg border border-border p-3">
          <SegmentedControl
            label="Type de dégradé"
            value={config.foregroundGradient.type}
            onChange={(type) => update({ foregroundGradient: { ...config.foregroundGradient, type } })}
            options={[
              { value: 'linear', label: 'Linéaire' },
              { value: 'radial', label: 'Radial' },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ColorField
              label="Couleur 1"
              value={config.foregroundGradient.from}
              onChange={(from) => update({ foregroundGradient: { ...config.foregroundGradient, from } })}
            />
            <ColorField
              label="Couleur 2"
              value={config.foregroundGradient.to}
              onChange={(to) => update({ foregroundGradient: { ...config.foregroundGradient, to } })}
            />
          </div>
          {config.foregroundGradient.type === 'linear' && (
            <Slider
              label="Orientation"
              value={config.foregroundGradient.rotation}
              min={0}
              max={360}
              step={15}
              unit="°"
              onChange={(rotation) => update({ foregroundGradient: { ...config.foregroundGradient, rotation } })}
            />
          )}
        </div>
      )}

      <Toggle
        label="Fond transparent"
        description="Idéal pour superposer le QR code sur un visuel (PNG et SVG uniquement)."
        checked={config.transparentBackground}
        onChange={(transparentBackground) => update({ transparentBackground })}
      />

      {!config.transparentBackground && (
        <ColorField
          label="Couleur de fond"
          value={config.backgroundColor}
          onChange={(backgroundColor) => update({ backgroundColor })}
        />
      )}
    </div>
  )
}
