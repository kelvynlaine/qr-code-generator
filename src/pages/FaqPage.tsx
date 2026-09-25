import { Link } from 'react-router-dom'
import { PageLayout } from '../components/Layout/PageLayout'
import { AdUnit } from '../components/Ads/AdUnit'
import { AD_SLOTS } from '../lib/adsense'
import { FAQ_ITEMS } from '../data/faq'
import { useSeo } from '../hooks/useSeo'

/** Données structurées FAQPage : éligibles aux résultats enrichis de Google. */
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer.join(' ') },
  })),
}

export function FaqPage() {
  useSeo({
    title: 'FAQ — Questions fréquentes sur les QR codes personnalisés — QR Studio',
    description:
      'Gratuité, expiration, usage commercial, formats PNG/JPG/SVG, lisibilité avec des couleurs personnalisées, logo, taille d’impression et confidentialité : toutes les réponses.',
    jsonLd: FAQ_JSON_LD,
  })

  return (
    <PageLayout
      title="Questions fréquentes"
      lead="Tout ce qu’il faut savoir avant de créer, d’imprimer et de diffuser un QR code personnalisé."
    >
      {FAQ_ITEMS.map((item, index) => (
        <div key={item.question}>
          <h2 id={`q-${index + 1}`}>{item.question}</h2>
          {item.answer.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          {/* Un seul bloc in-article, au milieu de la lecture. */}
          {index === Math.floor(FAQ_ITEMS.length / 2) - 1 && (
            <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />
          )}
        </div>
      ))}

      <h2 id="autre-question">Une autre question ?</h2>
      <p>
        Les guides <Link to="/comment-ca-marche">Comment ça marche</Link> et{' '}
        <Link to="/cas-usage">Cas d’usage</Link> couvrent les réglages en détail. Si votre question
        reste sans réponse, écrivez-nous depuis la page <Link to="/contact">Contact</Link> — c’est
        souvent ce qui alimente cette FAQ.
      </p>
    </PageLayout>
  )
}
