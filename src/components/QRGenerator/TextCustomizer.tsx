import { AlignCenter, AlignLeft, AlignRight, Bold, Italic } from 'lucide-react'
import type { QRConfig, TextAlign } from '../../types/qr'
import { FONTS, fontStack, loadFont } from '../../lib/fonts'
import { ColorField, Field, Label, SegmentedControl, Slider, TextInput } from '../ui/Controls'

interface Props {
  config: QRConfig
  update: (patch: Partial<QRConfig>) => void
}

export function TextCustomizer({ config, update }: Props) {
  const { caption } = config
  const patchCaption = (patch: Partial<QRConfig['caption']>) =>
    update({ caption: { ...caption, ...patch } })

  return (
    <div className="space-y-5">
      <Field label="Texte sous le QR code" hint="Laissez vide pour n’exporter que le QR code.">
        {(id) => (
          <TextInput
            id={id}
            placeholder="Scannez-moi"
            value={caption.text}
            onChange={(e) => patchCaption({ text: e.target.value })}
          />
        )}
      </Field>

      <Field label="Police">
        {(id) => (
          <select
            id={id}
            value={caption.fontFamily}
            onChange={(e) => {
              // Charge la feuille Google Fonts avant de l'appliquer à l'aperçu.
              loadFont(e.target.value)
              patchCaption({ fontFamily: e.target.value })
            }}
            style={{ fontFamily: fontStack(caption.fontFamily) }}
            className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 focus:outline-none"
          >
            {FONTS.map((font) => (
              <option key={font.family} value={font.family}>
                {font.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Slider
        label="Taille du texte"
        value={caption.size}
        min={10}
        max={48}
        unit="px"
        onChange={(size) => patchCaption({ size })}
      />

      <Slider
        label="Espacement des lettres"
        value={caption.letterSpacing}
        min={-2}
        max={12}
        step={0.5}
        unit="px"
        onChange={(letterSpacing) => patchCaption({ letterSpacing })}
      />

      <ColorField label="Couleur du texte" value={caption.color} onChange={(color) => patchCaption({ color })} />

      <SegmentedControl<TextAlign>
        label="Alignement"
        value={caption.align}
        onChange={(align) => patchCaption({ align })}
        options={[
          { value: 'left', ariaLabel: 'Aligner à gauche', label: <AlignLeft aria-hidden="true" className="mx-auto h-4 w-4" /> },
          { value: 'center', ariaLabel: 'Centrer', label: <AlignCenter aria-hidden="true" className="mx-auto h-4 w-4" /> },
          { value: 'right', ariaLabel: 'Aligner à droite', label: <AlignRight aria-hidden="true" className="mx-auto h-4 w-4" /> },
        ]}
      />

      <div className="space-y-1.5">
        <Label>Style</Label>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={caption.bold}
            aria-label="Gras"
            onClick={() => patchCaption({ bold: !caption.bold })}
            className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-150 ${
              caption.bold
                ? 'border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300'
                : 'border-border text-muted hover:text-ink'
            }`}
          >
            <Bold aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-pressed={caption.italic}
            aria-label="Italique"
            onClick={() => patchCaption({ italic: !caption.italic })}
            className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-150 ${
              caption.italic
                ? 'border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300'
                : 'border-border text-muted hover:text-ink'
            }`}
          >
            <Italic aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
