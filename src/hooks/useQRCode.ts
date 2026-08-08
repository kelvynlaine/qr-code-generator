import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import type { QRConfig } from '../types/qr'
import { buildQROptions } from '../lib/qrData'

/**
 * Monte une instance `qr-code-styling` dans un conteneur et la met à jour
 * à chaque changement de configuration.
 *
 * L'aperçu est rendu en SVG : il reste net à n'importe quelle taille d'affichage,
 * et la mise à jour est assez légère pour rester fluide en temps réel.
 * Un court debounce évite de régénérer le QR à chaque frappe clavier.
 */
export function useQRCode(config: QRConfig, size = 320) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const instanceRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const options = buildQROptions(config, size, 'svg')

    if (!instanceRef.current) {
      instanceRef.current = new QRCodeStyling(options)
      instanceRef.current.append(container)
      // Le SVG produit porte des dimensions fixes : on le rend responsive.
      const svg = container.querySelector('svg')
      svg?.setAttribute('style', 'width:100%;height:100%;display:block')
      return
    }

    const timer = setTimeout(() => {
      instanceRef.current?.update(options)
      const svg = container.querySelector('svg')
      svg?.setAttribute('style', 'width:100%;height:100%;display:block')
    }, 90)

    return () => clearTimeout(timer)
  }, [config, size])

  return containerRef
}
