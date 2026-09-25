/**
 * Métadonnées des guides éditoriaux, partagées par la page d'index, la mise en
 * page des articles, les routes et le sitemap généré au pré-rendu.
 */
export interface GuideMeta {
  slug: string
  title: string
  /** Balise meta description (≈ 150 caractères). */
  description: string
  /** Chapeau affiché sous le titre de l'article. */
  lead: string
  /** Résumé court pour les cartes. */
  excerpt: string
  readingMinutes: number
  publishedAt: string
  updatedAt: string
}

export const GUIDE_AUTHOR = 'Kelvyn Laine'

export const GUIDES: GuideMeta[] = [
  {
    slug: 'taille-qr-code-impression',
    title: 'Quelle taille pour un QR code imprimé ?',
    description:
      'Distance de lecture, taille des modules, marge blanche, résolution d’export : comment dimensionner un QR code pour une carte de visite, un flyer ou une affiche.',
    lead: 'Un QR code trop petit est la première cause d’échec sur les supports imprimés. Voici comment calculer la bonne taille, support par support, avant de lancer l’impression.',
    excerpt: 'La règle des dix, le rôle de la densité du code et les tailles recommandées par support.',
    readingMinutes: 7,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    slug: 'qr-code-statique-ou-dynamique',
    title: 'QR code statique ou dynamique : lequel choisir ?',
    description:
      'Fonctionnement, avantages et risques des QR codes statiques et dynamiques, et la solution pour modifier la destination d’un code déjà imprimé sans abonnement.',
    lead: 'Derrière la même image se cachent deux technologies très différentes. Le choix engage la durée de vie de tous vos supports imprimés — mieux vaut le faire en connaissance de cause.',
    excerpt: 'Pourquoi certains QR codes cessent de fonctionner, et comment garder la main sur la destination.',
    readingMinutes: 6,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    slug: 'personnaliser-qr-code-sans-perdre-la-lecture',
    title: 'Personnaliser un QR code sans nuire à sa lecture',
    description:
      'Couleurs, contraste, dégradés, formes des modules, logo et correction d’erreur : ce que l’on peut modifier sans risque sur un QR code, et comment le tester.',
    lead: 'Un QR code à vos couleurs inspire davantage confiance qu’un carré noir anonyme. À condition de savoir ce que le téléphone cherche dans l’image — et de ne pas le lui cacher.',
    excerpt: 'Comment un téléphone lit un QR code, et ce que cela implique pour les couleurs, les formes et le logo.',
    readingMinutes: 8,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    slug: 'securite-qr-code-quishing',
    title: 'QR codes et sécurité : se protéger du quishing',
    description:
      'Faux autocollants, courriers piégés, QR codes Wi-Fi : les arnaques par QR code expliquées, et les bonnes pratiques pour ceux qui scannent comme pour ceux qui impriment.',
    lead: 'Un QR code n’affiche pas sa destination avant d’être scanné. Cette opacité en fait un outil apprécié des escrocs, et impose quelques réflexes simples des deux côtés du code.',
    excerpt: 'Les arnaques les plus courantes et les précautions à prendre, que vous scanniez ou que vous imprimiez.',
    readingMinutes: 7,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    slug: 'qr-code-wifi',
    title: 'QR code Wi-Fi : connecter ses invités en un scan',
    description:
      'Créer un QR code Wi-Fi fiable : format WIFI, choix entre WPA, WEP et réseau ouvert, réseau invité, dépannage et bonnes pratiques d’affichage.',
    lead: 'Plus besoin d’épeler un mot de passe au comptoir : un QR code Wi-Fi bien préparé connecte vos visiteurs d’un geste. Encore faut-il que chaque champ soit exact et que votre réseau principal reste à l’abri.',
    excerpt: 'Le format WIFI décrypté, les réglages à choisir et les causes d’échec les plus fréquentes.',
    readingMinutes: 8,
    publishedAt: '2026-09-25',
    updatedAt: '2026-09-25',
  },
  {
    slug: 'qr-code-menu-restaurant',
    title: 'QR code pour menu de restaurant : le guide pratique',
    description:
      'Page web ou PDF, choix du support, lumière et usure, obligations d’affichage et accessibilité : comment déployer un menu par QR code qui fonctionne.',
    lead: 'Le menu par QR code fait gagner du temps et de l’impression, à condition que le client trouve sa carte en quelques secondes, quel que soit l’éclairage de la salle ou le téléphone qu’il a en main.',
    excerpt: 'Préparer la page de destination, choisir le support et éviter les pièges du service.',
    readingMinutes: 8,
    publishedAt: '2026-09-25',
    updatedAt: '2026-09-25',
  },
  {
    slug: 'niveau-correction-erreur-qr-code',
    title: 'Correction d’erreur d’un QR code : choisir entre L, M, Q et H',
    description:
      'Reed-Solomon, niveaux L, M, Q et H, effet sur la densité, logo central : comprendre la correction d’erreur d’un QR code pour choisir le bon réglage.',
    lead: 'C’est grâce à elle qu’un QR code taché, plié ou orné d’un logo continue de fonctionner. Mais la correction d’erreur a un prix, et le bon niveau dépend de ce que vous encodez et de l’endroit où le code vivra.',
    excerpt: 'Ce que protègent vraiment les quatre niveaux, ce qu’ils coûtent en densité et comment choisir.',
    readingMinutes: 8,
    publishedAt: '2026-09-25',
    updatedAt: '2026-09-25',
  },
  {
    slug: 'qr-code-carte-de-visite',
    title: 'QR code sur carte de visite : lien, contact ou vCard ?',
    description:
      'Lien vers une page de contact, vCard ou appel direct : que mettre dans le QR code d’une carte de visite, quelle taille prévoir et comment le tester.',
    lead: 'Sur 85 × 55 mm, chaque millimètre compte. Bien choisi et bien dimensionné, le QR code prolonge la carte de visite au lieu de l’encombrer, et permet d’enregistrer vos coordonnées sans les recopier.',
    excerpt: 'Choisir entre lien, vCard et appel direct, puis dimensionner le code pour un si petit format.',
    readingMinutes: 9,
    publishedAt: '2026-09-25',
    updatedAt: '2026-09-25',
  },
  {
    slug: 'qr-code-reseaux-sociaux',
    title: 'QR code Instagram, TikTok, LinkedIn : gagner des abonnés hors ligne',
    description:
      'Quelle adresse encoder, profil direct ou page de liens, où afficher le code et comment inciter au scan : le QR code au service de vos réseaux sociaux.',
    lead: 'Une vitrine, un colis ou un stand de salon voient passer des personnes qui ne vous suivent pas encore. Un QR code bien pensé leur évite de chercher votre nom de compte, et vous fait gagner des abonnés.',
    excerpt: 'Encoder la bonne adresse, choisir les bons emplacements et donner une vraie raison de scanner.',
    readingMinutes: 8,
    publishedAt: '2026-09-25',
    updatedAt: '2026-09-25',
  },
]

export const guidePath = (slug: string): string => `/guide/${slug}`

/** Date longue en français, calculée en UTC pour un rendu identique serveur et navigateur. */
export function formatGuideDate(isoDate: string): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  )
}
