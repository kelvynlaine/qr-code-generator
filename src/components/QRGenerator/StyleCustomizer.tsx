import type { CornerDotType, CornerSquareType, DotType } from 'qr-code-styling'
import type { QRConfig } from '../../types/qr'
import { CORNER_DOT_TYPES, CORNER_SQUARE_TYPES, DOT_TYPES } from '../../lib/presets'
import { ColorField, OptionGrid, Toggle } from '../ui/Controls'

interface Props {
  config: QRConfig
  update: (patch: Partial<QRConfig>) => void
}

/** Aperçu miniature d'un style de modules (2×2 « pixels » de QR code). */
function DotPreview({ type }: { type: DotType }) {
  const radius: Record<DotType, number> = {
    square: 0,
    dots: 5,
    rounded: 2,
    'extra-rounded': 3.5,
    classy: 0,
    'classy-rounded': 1.5,
  }
  const r = radius[type]
  const classy = type === 'classy' || type === 'classy-rounded'
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="h-6 w-6" fill="currentColor">
      {[
        [1, 1],
        [12, 1],
        [1, 12],
        [12, 12],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="9"
          height="9"
          rx={classy ? (i === 0 || i === 3 ? 4.5 : r) : r}
        />
      ))}
    </svg>
  )
}

function EyePreview({ type }: { type: CornerSquareType | CornerDotType }) {
  const rx = type === 'dot' ? 11 : type === 'extra-rounded' ? 6 : 0
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3">
      <rect x="2.5" y="2.5" width="17" height="17" rx={rx} />
    </svg>
  )
}

export function StyleCustomizer({ config, update }: Props) {
  return (
    <div className="space-y-5">
      <OptionGrid
        label="Style des modules"
        value={config.dotType}
        columns={3}
        onChange={(dotType) => update({ dotType })}
        options={DOT_TYPES.map((d) => ({ ...d, preview: <DotPreview type={d.value} /> }))}
      />

      <OptionGrid
        label="Contour des yeux"
        value={config.cornerSquareType}
        columns={3}
        onChange={(cornerSquareType) => update({ cornerSquareType })}
        options={CORNER_SQUARE_TYPES.map((c) => ({ ...c, preview: <EyePreview type={c.value} /> }))}
      />

      <OptionGrid
        label="Centre des yeux"
        value={config.cornerDotType}
        columns={2}
        onChange={(cornerDotType) => update({ cornerDotType })}
        options={CORNER_DOT_TYPES.map((c) => ({ ...c, preview: <EyePreview type={c.value} /> }))}
      />

      <Toggle
        label="Couleur des yeux distincte"
        description="Par défaut, les yeux reprennent la couleur des modules."
        checked={config.customEyes}
        onChange={(customEyes) => update({ customEyes })}
      />

      {config.customEyes && (
        <div className="grid gap-4 rounded-lg border border-border p-3 sm:grid-cols-2">
          <ColorField
            label="Contour"
            value={config.cornerSquareColor}
            onChange={(cornerSquareColor) => update({ cornerSquareColor })}
          />
          <ColorField
            label="Centre"
            value={config.cornerDotColor}
            onChange={(cornerDotColor) => update({ cornerDotColor })}
          />
        </div>
      )}
    </div>
  )
}
