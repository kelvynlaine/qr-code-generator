import { Link } from 'react-router-dom'
import { PageLayout } from '../components/Layout/PageLayout'
import { AdUnit } from '../components/Ads/AdUnit'
import { AD_SLOTS } from '../lib/adsense'
import { useSeo } from '../hooks/useSeo'

const HOW_TO_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Créer un QR code personnalisé gratuitement',
  description:
    'Créer un QR code personnalisé avec ses couleurs, ses formes, un logo et un texte, puis le télécharger en PNG, JPG ou SVG.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', name: 'Choisir le type de contenu', text: 'Sélectionnez lien, texte, e-mail, téléphone ou Wi-Fi et saisissez votre contenu.' },
    { '@type': 'HowToStep', name: 'Personnaliser le design', text: 'Choisissez les couleurs, la forme des modules et des yeux, un logo et un cadre.' },
    { '@type': 'HowToStep', name: 'Vérifier la lisibilité', text: 'Contrôlez l’indicateur de contraste puis testez le scan avec votre téléphone.' },
    { '@type': 'HowToStep', name: 'Télécharger', text: 'Exportez en PNG, JPG ou SVG, de 512 à 4096 pixels.' },
  ],
}

export function HowItWorksPage() {
  useSeo({
    title: 'Comment créer un QR code personnalisé en 4 étapes — QR Studio',
    description:
      'Guide complet pour créer un QR code personnalisé gratuit : choix du contenu, couleurs et formes, logo central, vérification de la lisibilité et export PNG, JPG ou SVG.',
    jsonLd: HOW_TO_JSON_LD,
  })

  return (
    <PageLayout
      title="Comment créer un QR code personnalisé"
      lead="Quatre étapes, moins d’une minute, aucune inscription. Ce guide détaille chaque réglage et les pièges à éviter avant d’imprimer."
    >
      <h2 id="etape-1">Étape 1 — Choisir le type de contenu</h2>
      <p>
        Un QR code n’est rien d’autre qu’une chaîne de caractères encodée graphiquement. Ce qui change
        d’un usage à l’autre, c’est le <strong>format</strong> de cette chaîne : c’est lui qui indique
        au téléphone quoi faire du contenu scanné. Le générateur s’en charge pour vous à partir du
        type que vous sélectionnez.
      </p>
      <ul>
        <li>
          <strong>Lien</strong> — le cas le plus courant. Saisissez l’adresse complète, avec{' '}
          <code>https://</code>. Une URL sans schéma est parfois interprétée comme du texte brut par
          les lecteurs les plus anciens : le champ vous alerte si le format n’est pas valide.
        </li>
        <li>
          <strong>Texte libre</strong> — affiché tel quel après le scan. Utile pour un message, un
          code promotionnel, une référence produit. Attention : plus le texte est long, plus le QR
          code comporte de modules, donc plus il devient dense et difficile à scanner de loin.
        </li>
        <li>
          <strong>E-mail</strong> — ouvre l’application de messagerie avec le destinataire, et si vous
          le souhaitez l’objet et le corps du message déjà remplis. Idéal pour un formulaire de
          contact sans formulaire.
        </li>
        <li>
          <strong>Téléphone</strong> — déclenche un appel. Utilisez le format international
          (<code>+33 6 …</code>) pour que le code fonctionne aussi pour un visiteur étranger.
        </li>
        <li>
          <strong>Wi-Fi</strong> — connecte automatiquement le visiteur à votre réseau. Rappelez-vous
          que le mot de passe est encodé en clair dans l’image : ce QR code se traite comme le mot de
          passe lui-même.
        </li>
      </ul>

      <h2 id="etape-2">Étape 2 — Personnaliser le design</h2>
      <p>
        C’est ici que se joue la différence entre un carré noir anonyme et un visuel qui appartient à
        votre marque. Trois familles de réglages sont disponibles.
      </p>
      <h3>Les couleurs</h3>
      <p>
        Vous pouvez choisir une couleur unie ou un dégradé (linéaire ou radial, avec orientation
        réglable) pour les modules, et une couleur de fond — ou aucun fond, si vous prévoyez de
        superposer le code sur un visuel. Huit palettes prêtes à l’emploi appliquent en un clic une
        combinaison déjà validée en contraste, ce qui évite le principal écueil du QR code coloré.
      </p>
      <h3>Les formes</h3>
      <p>
        Six styles de modules sont proposés, du carré classique aux points ronds en passant par les
        variantes arrondies et « classy ». Les trois grands carrés des coins — appelés{' '}
        <em>yeux</em> ou motifs de repérage — se règlent indépendamment : c’est eux que le lecteur
        cherche en premier pour orienter le code, et leur donner une forme et une couleur distinctes
        est le moyen le plus efficace de personnaliser un QR code sans nuire à sa lecture.
      </p>
      <h3>Le logo et le cadre</h3>
      <p>
        Un logo central peut être importé (il reste dans votre navigateur, il n’est envoyé nulle
        part). Le halo de sécurité masque les modules situés dessous pour un rendu net. Enfin, un
        cadre arrondi et un texte d’appel à l’action — « Scannez-moi », votre nom, un slogan — aident
        concrètement au taux de scan : un QR code sans consigne est nettement moins scanné qu’un QR
        code qui dit ce qu’il fait.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="etape-3">Étape 3 — Vérifier que le code reste lisible</h2>
      <p>
        Un QR code embarque une correction d’erreur : une partie des données est redondante, ce qui
        permet au lecteur de reconstituer l’information même si une portion du code est masquée ou
        abîmée. Quatre niveaux existent, de L (7 % de tolérance) à H (30 %). Le niveau H est
        recommandé dès que vous ajoutez un logo, puisque celui-ci masque physiquement des modules.
      </p>
      <p>
        La lisibilité dépend surtout du <strong>contraste</strong> entre les modules et le fond.
        L’indicateur sous l’aperçu calcule ce rapport en temps réel et vous prévient dès qu’il
        descend sous le seuil de sécurité. Deux règles simples valent pour tous les lecteurs : gardez
        les modules nettement plus foncés que le fond, et n’inversez jamais clair et foncé — beaucoup
        de lecteurs refusent les QR codes en négatif.
      </p>
      <p>
        Dernier réflexe, le seul qui compte vraiment : <strong>scannez votre export final</strong>.
        Pas l’aperçu à l’écran, le fichier téléchargé, avec au moins deux téléphones différents.
      </p>

      <h2 id="etape-4">Étape 4 — Télécharger au bon format</h2>
      <p>
        Trois formats sont proposés, et le bon choix dépend de la destination. Le{' '}
        <strong>PNG</strong> est le format polyvalent : net, sans perte, avec transparence possible.
        Le <strong>JPG</strong> est plus léger mais compressé et sans transparence — la compression
        peut créer des artefacts autour des modules, à réserver aux usages où le poids prime. Le{' '}
        <strong>SVG</strong> est vectoriel : il s’agrandit à l’infini sans perte de qualité, c’est le
        fichier à transmettre à un imprimeur ou à un graphiste.
      </p>
      <p>
        Côté taille, 512 px suffisent pour un usage web, 1024 px couvrent la majorité des besoins, et
        2048 à 4096 px conviennent à l’impression grande taille. Une règle terrain utile : un QR code
        se scanne confortablement à une distance d’environ dix fois sa largeur. Un code de 3 cm se lit
        à 30 cm, ce qui est parfait sur une carte de visite mais très insuffisant sur une affiche vue
        depuis un trottoir.
      </p>

      <p>
        <Link to="/">Retourner au générateur</Link> pour créer votre QR code, ou consulter les{' '}
        <Link to="/cas-usage">cas d’usage</Link> pour trouver des idées concrètes.
      </p>
    </PageLayout>
  )
}
