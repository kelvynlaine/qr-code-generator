import { Hero } from '../components/Marketing/Hero'
import { QRGenerator } from '../components/QRGenerator'
import { HowItWorks } from '../components/Marketing/HowItWorks'
import { UseCases } from '../components/Marketing/UseCases'
import { FAQ } from '../components/Marketing/FAQ'
import { AdUnit } from '../components/Ads/AdUnit'
import { AD_SLOTS } from '../lib/adsense'
import { useSeo } from '../hooks/useSeo'

const APP_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Studio',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  description:
    'Générateur de QR codes personnalisés gratuit : couleurs, dégradés, formes, logo et texte, avec export PNG, JPG et SVG.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  featureList: [
    'Personnalisation des couleurs et dégradés',
    'Styles de modules et d’yeux',
    'Logo central',
    'Texte personnalisé sous le QR code',
    'Export PNG, JPG et SVG jusqu’à 4096 px',
  ],
}

export function Home() {
  useSeo({
    title: 'Générateur de QR code personnalisé gratuit — couleurs, logo et texte | QR Studio',
    description:
      'Créez un QR code personnalisé gratuitement : couleurs et dégradés, formes des modules, logo central, texte sous le code. Aperçu en temps réel, export PNG, JPG et SVG. Sans inscription, sans expiration.',
    jsonLd: APP_JSON_LD,
  })

  return (
    <>
      <Hero />
      <QRGenerator />

      {/*
        Premier emplacement publicitaire de la page d'accueil : volontairement placé
        APRÈS le générateur, dans la respiration entre le produit et le contenu
        éditorial. Aucune publicité n'est insérée au-dessus ni à côté du générateur,
        pour garder le parcours saisie → personnalisation → téléchargement intact.
      */}
      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <AdUnit slot={AD_SLOTS.afterGenerator} format="auto" minHeight={100} minHeightDesktop={280} />
      </div>

      <HowItWorks />
      <UseCases />
      <FAQ limit={4} showAllLink />
    </>
  )
}
