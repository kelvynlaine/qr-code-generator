import { Link } from 'react-router-dom'
import { PageLayout } from '../components/Layout/PageLayout'
import { useSeo } from '../hooks/useSeo'
import { useConsent } from '../lib/consent'

const UPDATED_AT = '9 août 2026'

export function PrivacyPolicy() {
  const { reopen, status } = useConsent()

  useSeo({
    title: 'Politique de confidentialité — QR Studio',
    description:
      'Comment QR Studio traite vos données : génération locale des QR codes, cookies publicitaires Google AdSense, consentement et exercice de vos droits RGPD.',
  })

  return (
    <PageLayout
      title="Politique de confidentialité"
      lead="QR Studio est conçu pour fonctionner sans collecter vos données. Cette page explique précisément ce qui est traité, par qui, et comment reprendre la main."
      updatedAt={UPDATED_AT}
    >
      <h2 id="responsable">1. Responsable du traitement</h2>
      <p>
        Le site QR Studio est édité par l’éditeur identifié sur la page{' '}
        <Link to="/mentions-legales">Mentions légales</Link>. Pour toute question relative à vos
        données personnelles, vous pouvez écrire à{' '}
        <a href="mailto:kelvyn.off@gmail.com">kelvyn.off@gmail.com</a>.
      </p>

      <h2 id="donnees-generateur">2. Les données que vous saisissez dans le générateur</h2>
      <p>
        <strong>
          Le contenu que vous encodez (lien, texte, e-mail, numéro de téléphone, identifiants Wi-Fi),
          le logo que vous importez et vos réglages de personnalisation ne sont jamais transmis à un
          serveur.
        </strong>{' '}
        La totalité du calcul du QR code et de la génération des fichiers PNG, JPG et SVG s’effectue
        dans votre navigateur, en JavaScript. Rien n’est enregistré, ni journalisé, ni analysé de
        notre côté : fermer l’onglet suffit à tout effacer.
      </p>
      <p>
        Ce point mérite une précision de sécurité : un QR code Wi-Fi contient votre mot de passe en
        clair dans l’image. Ce n’est pas lié à notre site — c’est le format standard — mais cela
        signifie que l’image exportée doit être traitée comme une donnée sensible et n’être partagée
        qu’avec des personnes de confiance.
      </p>

      <h2 id="cookies">3. Cookies et stockage local</h2>
      <p>Le site utilise deux catégories de traceurs, avec des finalités très différentes.</p>
      <h3>3.1 Stockage strictement nécessaire (sans consentement)</h3>
      <ul>
        <li>
          <strong>Thème d’affichage</strong> — mémorise votre préférence clair/sombre dans le
          stockage local de votre navigateur.
        </li>
        <li>
          <strong>Choix de consentement</strong> — mémorise votre réponse à la bannière cookies, pour
          ne pas vous la présenter à chaque visite. Conservé 6 mois maximum.
        </li>
      </ul>
      <p>
        Ces informations restent sur votre appareil et ne sont transmises à personne. Elles sont
        exemptées de consentement au sens des lignes directrices de la CNIL.
      </p>
      <h3>3.2 Cookies publicitaires (soumis à votre consentement)</h3>
      <p>
        Le service est gratuit et financé par la publicité. Si — et seulement si — vous y consentez,
        nous chargeons <strong>Google AdSense</strong>. Google et ses partenaires peuvent alors
        déposer des cookies sur votre terminal pour :
      </p>
      <ul>
        <li>diffuser des annonces personnalisées en fonction de votre navigation ;</li>
        <li>mesurer la performance des annonces et limiter leur répétition ;</li>
        <li>détecter les activités frauduleuses (clics automatisés notamment).</li>
      </ul>
      <p>
        Tant que vous n’avez pas répondu à la bannière, <strong>aucun script publicitaire n’est
        chargé</strong>. Si vous refusez, le script n’est pas chargé non plus et aucune publicité ne
        s’affiche. Nous appliquons le <strong>Google Consent Mode v2</strong> : les signaux de
        consentement (<em>ad_storage</em>, <em>ad_user_data</em>, <em>ad_personalization</em>,{' '}
        <em>analytics_storage</em>) sont positionnés sur « refusé » par défaut et ne passent à
        « accordé » qu’après votre acceptation explicite.
      </p>
      <p>
        Pour comprendre le traitement effectué par Google en tant que partenaire publicitaire,
        consultez{' '}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          Comment Google utilise les données lorsque vous utilisez des sites ou applications de ses
          partenaires
        </a>{' '}
        ainsi que la{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          politique de confidentialité de Google
        </a>
        . Vous pouvez également régler la personnalisation des annonces depuis{' '}
        <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer">
          Google My Ad Center
        </a>
        .
      </p>

      <h2 id="modifier-consentement">4. Modifier ou retirer votre consentement</h2>
      <p>
        Votre consentement est révocable à tout moment, aussi simplement qu’il a été donné. Le bouton
        ci-dessous réaffiche la bannière et réinitialise votre choix.
      </p>
      <p>
        <button
          type="button"
          onClick={reopen}
          className="min-h-11 rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-accent-700"
        >
          Modifier mes préférences cookies
        </button>{' '}
        <span className="text-sm">
          (choix actuel :{' '}
          {status === 'granted' ? 'cookies publicitaires acceptés' : status === 'denied' ? 'cookies publicitaires refusés' : 'aucun choix enregistré'})
        </span>
      </p>
      <p>
        Vous pouvez aussi supprimer les cookies déjà déposés depuis les réglages de votre navigateur,
        ou naviguer en mode privé.
      </p>

      <h2 id="hebergement">5. Journaux d’hébergement</h2>
      <p>
        Comme tout site web, l’hébergeur enregistre techniquement les requêtes reçues (adresse IP,
        date, page demandée, type de navigateur) à des fins de sécurité et de bon fonctionnement du
        service. Ces journaux relèvent de l’intérêt légitime de l’éditeur (article 6.1.f du RGPD) et
        sont conservés pour une durée limitée par l’hébergeur, sans être exploités à des fins
        commerciales ou publicitaires par nos soins.
      </p>

      <h2 id="droits">6. Vos droits</h2>
      <p>
        Conformément au Règlement général sur la protection des données (RGPD) et à la loi
        « Informatique et Libertés », vous disposez des droits suivants :
      </p>
      <ul>
        <li>
          <strong>Droit d’accès</strong> — obtenir la confirmation que des données vous concernant
          sont traitées, et en obtenir une copie.
        </li>
        <li>
          <strong>Droit de rectification</strong> — faire corriger des données inexactes.
        </li>
        <li>
          <strong>Droit à l’effacement</strong> — demander la suppression de vos données.
        </li>
        <li>
          <strong>Droit d’opposition</strong> — vous opposer à un traitement fondé sur l’intérêt
          légitime, et notamment au traitement à des fins de prospection.
        </li>
        <li>
          <strong>Droit à la limitation</strong> et <strong>droit à la portabilité</strong> des
          données que vous nous auriez fournies.
        </li>
        <li>
          <strong>Droit de retirer votre consentement</strong> à tout moment, sans que cela remette
          en cause la licéité du traitement effectué avant ce retrait.
        </li>
      </ul>
      <p>
        En pratique, le générateur ne nous transmettant aucune donnée, nous ne détenons dans la
        quasi-totalité des cas aucune information vous concernant. Pour exercer vos droits, écrivez à{' '}
        <a href="mailto:kelvyn.off@gmail.com">kelvyn.off@gmail.com</a> ; une réponse vous sera
        apportée dans un délai maximum d’un mois. Si vous estimez, après nous avoir contactés, que vos
        droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la{' '}
        <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
          CNIL
        </a>
        .
      </p>

      <h2 id="mineurs">7. Mineurs</h2>
      <p>
        Le service n’est pas destiné aux enfants de moins de 15 ans et ne collecte sciemment aucune
        donnée les concernant.
      </p>

      <h2 id="evolution">8. Évolution de cette politique</h2>
      <p>
        Cette politique peut être mise à jour pour refléter une évolution du service ou de la
        réglementation. La date de dernière mise à jour figure en haut de page ; en cas de changement
        substantiel affectant vos droits, la bannière de consentement vous sera présentée à nouveau.
      </p>
    </PageLayout>
  )
}
