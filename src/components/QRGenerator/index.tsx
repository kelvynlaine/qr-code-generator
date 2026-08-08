import { useCallback, useState } from 'react'
import { Frame, Image, Palette, RotateCcw, Shapes, Type } from 'lucide-react'
import { DEFAULT_CONFIG, type QRConfig } from '../../types/qr'
import { Section } from '../ui/Section'
import { ContentInput } from './ContentInput'
import { ColorCustomizer } from './ColorCustomizer'
import { StyleCustomizer } from './StyleCustomizer'
import { TextCustomizer } from './TextCustomizer'
import { LogoCustomizer } from './LogoCustomizer'
import { FrameCustomizer } from './FrameCustomizer'
import { QRPreview } from './QRPreview'
import { DownloadButtons } from './DownloadButtons'

export function QRGenerator() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG)

  const update = useCallback((patch: Partial<QRConfig>) => {
    setConfig((previous) => ({ ...previous, ...patch }))
  }, [])

  return (
    <section id="generateur" aria-labelledby="generateur-title" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <h2 id="generateur-title" className="sr-only">
        Générateur de QR code
      </h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        {/* Panneau de personnalisation */}
        <div className="order-2 space-y-4 lg:order-1">
          <div className="rounded-xl border border-border bg-surface p-4">
            <ContentInput config={config} update={update} />
          </div>

          <Section title="Couleurs et palettes" icon={<Palette aria-hidden="true" className="h-4 w-4" />} defaultOpen>
            <ColorCustomizer config={config} update={update} />
          </Section>

          <Section title="Formes des modules et des yeux" icon={<Shapes aria-hidden="true" className="h-4 w-4" />}>
            <StyleCustomizer config={config} update={update} />
          </Section>

          <Section title="Texte personnalisé" icon={<Type aria-hidden="true" className="h-4 w-4" />}>
            <TextCustomizer config={config} update={update} />
          </Section>

          <Section title="Logo central" icon={<Image aria-hidden="true" className="h-4 w-4" />}>
            <LogoCustomizer config={config} update={update} />
          </Section>

          <Section title="Cadre et options avancées" icon={<Frame aria-hidden="true" className="h-4 w-4" />}>
            <FrameCustomizer config={config} update={update} />
          </Section>

          <button
            type="button"
            onClick={() => setConfig(DEFAULT_CONFIG)}
            className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-accent-600"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Réinitialiser la personnalisation
          </button>
        </div>

        {/* Aperçu : collé en haut sur desktop, affiché en premier sur mobile */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="space-y-5 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
            <QRPreview config={config} />
            <DownloadButtons config={config} />
          </div>
        </div>
      </div>
    </section>
  )
}
