# QR Studio — générateur de QR codes personnalisés

Générateur de QR codes gratuit, sans inscription et **100 % côté client** : aucune donnée
(contenu, logo, réglages) ne quitte le navigateur.

## Démarrage

```bash
npm install
npm run dev
```

Autres scripts : `npm run build` (typecheck + build de production), `npm run preview`, `npm run lint`.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (plugin Vite, tokens sémantiques + dark mode par classe)
- [`qr-code-styling`](https://github.com/kozakdenys/qr-code-styling) pour le rendu du QR
- `lucide-react` pour les icônes, Google Fonts chargées à la demande

## Fonctionnalités

**Contenu** — lien (avec validation), texte libre, e-mail (objet + corps), téléphone, Wi-Fi.
Le format vCard est déjà présent dans les types et l'encodeur (`src/lib/qrData.ts`), il ne lui
manque qu'un formulaire pour être activé dans l'onglet de saisie.

**Personnalisation** — couleur unie ou dégradé (linéaire/radial + orientation), fond plein ou
transparent, 8 palettes prêtes à l'emploi, 6 styles de modules, styles d'yeux indépendants
(contour + centre, couleurs séparées optionnelles), logo central avec halo de sécurité, cadre
arrondi, marge et niveau de correction d'erreur.

**Texte sous le QR** — 10 polices Google Fonts, taille 10→48 px, couleur, alignement, gras,
italique, espacement des lettres.

**Aperçu** — mise à jour en temps réel (rendu SVG, debounce 90 ms) et indicateur de contraste
qui alerte quand le QR risque de ne plus être scannable.

**Export** — PNG, JPG et SVG vectoriel, de 512 à 4096 px, nom de fichier horodaté
(`qrcode-AAAA-MM-JJ.png`). Le texte est **rasterisé dans l'image** (canvas), pas seulement
affiché en HTML.

## Architecture

```
src/
  components/
    QRGenerator/   ContentInput, ColorCustomizer, StyleCustomizer, TextCustomizer,
                   LogoCustomizer, FrameCustomizer, QRPreview, DownloadButtons
    Layout/        Header (drawer mobile + dark mode), Footer
    Marketing/     Hero, HowItWorks, UseCases, FAQ
    ui/            Controls (Field, Slider, Toggle, ColorField…), Section
  hooks/useQRCode.ts
  lib/             colors.ts (contraste WCAG), fonts.ts, presets.ts,
                   qrData.ts (encodage + options), export.ts (composition canvas/SVG)
  types/qr.ts      QRConfig + configuration par défaut
```

### Composition de la carte

L'aperçu et l'export partagent le même repère de mise en page : une carte de référence de
`CARD_REFERENCE_SIZE` (320 px), avec 20 px de marge intérieure et 14 px entre le QR et le texte.
À l'export, tout est multiplié par `taille / 320`, ce qui garantit que l'image téléchargée est
identique à l'aperçu quelle que soit la résolution choisie (voir `src/lib/export.ts`).

Le QR est régénéré par la librairie à la taille finale (pas d'agrandissement flou), puis dessiné
sur le canvas avant le texte. Les polices sont attendues via `document.fonts.load()` avant le
rendu, sinon le canvas dessinerait avec la police de repli.

## Pages

Le site est une SPA multipage (`react-router-dom`) :

| Route | Contenu |
| --- | --- |
| `/` | Générateur + sections éditoriales condensées |
| `/comment-ca-marche` | Guide détaillé en 4 étapes (JSON-LD `HowTo`) |
| `/cas-usage` | 6 cas d'usage développés |
| `/faq` | FAQ complète (JSON-LD `FAQPage`) |
| `/politique-de-confidentialite` | RGPD, cookies AdSense, Consent Mode v2, droits |
| `/mentions-legales` | Éditeur, hébergeur, responsabilité (**champs à compléter**) |
| `/conditions-utilisation` | CGU |
| `/contact` | À propos + contact |

En production, l'hébergeur doit renvoyer `index.html` sur toutes les routes.
`public/_redirects` couvre Netlify ; sur Vercel ajouter une règle `rewrites`, sur Nginx un
`try_files $uri /index.html`.

## Monétisation AdSense

### Mise en service

1. Copier `.env.example` en `.env.local` et renseigner `VITE_SITE_URL`.
2. Compléter les **mentions légales** (identité réelle de l'éditeur et de l'hébergeur) — un
   gabarit non rempli est un motif de refus AdSense.
3. Remplacer `https://qrstudio.example` dans `public/robots.txt` et `public/sitemap.xml`.
4. Créer le compte AdSense, puis coller la ligne fournie par Google dans `public/ads.txt`.
5. Renseigner `VITE_ADSENSE_CLIENT_ID` puis les `VITE_AD_SLOT_*` au fur et à mesure de la
   création des blocs.

Tant que `VITE_ADSENSE_CLIENT_ID` est vide, `<AdUnit>` ne rend **rien** et aucun script
publicitaire n'est chargé : c'est le mode à conserver pendant l'examen du site par Google.
Un slot vide désactive proprement son emplacement.

### Consentement

`ConsentProvider` + `ConsentBanner` implémentent le Google Consent Mode v2. Les signaux
(`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`) sont initialisés à
`denied` dans `index.html`, **avant** tout script publicitaire. Le script AdSense n'est injecté
qu'après une acceptation explicite ; un refus n'en charge aucun. « Tout accepter » et « Tout
refuser » ont un poids visuel strictement identique, et le choix est mémorisé 6 mois. Le lien
« Préférences cookies » du footer et le bouton de la politique de confidentialité permettent
de revenir sur son choix à tout moment.

### Emplacements

| Emplacement | Pages | Format |
| --- | --- | --- |
| Bannière haute | pages de contenu uniquement | horizontal, 50/90 px réservés |
| Après le générateur | accueil | auto, 100/280 px réservés |
| In-article | guides et FAQ | fluid, 120 px réservés |
| Rectangle latéral | pages de contenu (desktop) | rectangle, 250/600 px réservés |
| Pied de page | toutes | horizontal |
| Ancre mobile | toutes, < 640 px | horizontal, fermable |

Choix assumés : **aucune publicité au-dessus ni à côté du générateur**. La bannière haute est
exclue de l'accueil (elle pousserait le générateur sous la ligne de flottaison) et la colonne
latérale n'existe que sur les pages éditoriales, jamais à côté des boutons du produit. L'ancre
mobile n'apparaît qu'une fois la zone de téléchargement sortie de l'écran, et reste fermable
(bouton de 44 px, mémorisé pour la session). Maximum 4 emplacements par page.

Chaque bloc réserve sa hauteur en CSS (`--ad-min-height`) avant chargement : le contenu ne se
décale pas quand l'annonce arrive.

## Vérifications effectuées

Les exports (défaut, dégradé, points, classy, Wi-Fi) ont été décodés avec `BarcodeDetector` après
composition : tous restituent bien le contenu encodé, texte personnalisé inclus.

Côté publicité, testé dans le navigateur avec un Publisher ID factice : le script AdSense n'est
chargé qu'après acceptation, les signaux Consent Mode passent bien de `denied` à `granted`, aucun
bloc n'est rendu dans le générateur, la distance entre le premier bloc et la zone de téléchargement
est de ~470 px (minimum requis : 150 px), et l'ancre mobile n'apparaît qu'une fois cette zone
dépassée.
