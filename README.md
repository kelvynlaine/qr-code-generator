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
| `/guides`, `/guide/<slug>` | Index et guides éditoriaux (JSON-LD `Article`) |
| `/politique-de-confidentialite` | RGPD, cookies AdSense, message de consentement Google, droits |
| `/mentions-legales` | Éditeur, hébergeur, responsabilité |
| `/conditions-utilisation` | CGU |
| `/contact` | À propos + contact |

Chaque route est pré-rendue en HTML statique (`scripts/prerender.mjs`) : `/faq` est servi par
`faq.html`, `/guide/x` par `guide/x.html`. `public/.htaccess` (Apache / LiteSpeed, Hostinger)
fait cette correspondance, force le HTTPS, renvoie une vraie 404 pour les adresses inconnues et
redirige en 301 les adresses de l'ancienne version du site encore indexées par Google.

## Déploiement (Hostinger)

Le site est déployé sur **https://codeqrgen.fr**. Vite inline les variables d'environnement au
moment du build : après toute modification de `.env.local`, il faut reconstruire et ré-uploader.

```bash
npm run build
```

Puis téléverser **le contenu** de `dist/` (et non le dossier lui-même) dans `public_html`, en
vérifiant que `.htaccess`, `ads.txt`, `robots.txt` et `sitemap.xml` sont bien à la racine —
le gestionnaire de fichiers Hostinger masque les fichiers commençant par un point par défaut.

Contrôles après mise en ligne : `https://codeqrgen.fr/ads.txt` doit afficher la ligne Google en
texte brut, et `https://codeqrgen.fr/faq` doit s'ouvrir directement sans 404.

## Monétisation AdSense

### Mise en service

1. ✅ Domaine renseigné (`VITE_SITE_URL`), `robots.txt` et `sitemap.xml` à jour.
2. ✅ Publisher ID `ca-pub-2244677473979299` dans `.env.local`, ligne `ads.txt` en place et
   détectée comme « Autorisé » par AdSense.
3. ✅ Site `codeqrgen.fr` enregistré dans AdSense — statut « Examen requis ».
4. ✅ Blocs d'annonces créés dans AdSense (désactivés côté site pendant l'examen).
5. ✅ Mentions légales sans données fictives (éditeur, contact, hébergeur).
6. ⬜ Ajouter les informations de paiement dans AdSense (à faire par l'éditeur).
7. ⬜ Soumettre le sitemap dans la Google Search Console.

`.env.local` n'est pas versionné ; `.env.production` (versionné) fait foi pour `npm run build`.

| Variable | Valeur | Rôle |
| --- | --- | --- |
| `VITE_ADSENSE_CLIENT_ID` | `ca-pub-2244677473979299` | Script AdSense + balise de validation dans le `<head>` |
| `VITE_ADSENSE_SHOW_UNITS` | `false` | Blocs manuels ; passer à `true` **après** approbation |
| `VITE_AD_SLOT_AFTER_GENERATOR` | `5433820303` | QR Studio - Apres generateur (display carré) |
| `VITE_AD_SLOT_IN_ARTICLE` | `9542641610` | QR Studio - In-article (natif In-Article) |

Le script AdSense est injecté dans le `<head>` de toutes les pages au build (plugin
`adsense-head` de `vite.config.ts`), y compris dans le HTML pré-rendu : c'est ce que vérifie le
robot d'examen. Les blocs `<AdUnit>` ne rendent **rien** tant que `VITE_ADSENSE_SHOW_UNITS`
n'est pas à `true` : pendant l'examen, aucun emplacement « Publicité » vide n'est affiché.

### Consentement

Le consentement RGPD est assuré **uniquement** par le message « Réglementations européennes »
publié dans AdSense (Confidentialité et messages), une CMP certifiée IAB TCF chargée par le
script AdSense. Aucun bandeau maison : deux dispositifs en parallèle se contrediraient. Le lien
« Préférences cookies » du footer et le bouton de la politique de confidentialité rouvrent le
message Google (`src/lib/cookiePreferences.ts`).

### Emplacements

| Emplacement | Pages | Format |
| --- | --- | --- |
| Après le générateur | accueil | auto, 100/280 px réservés |
| In-article | guides, FAQ, comment ça marche, cas d'usage | fluid, 120 px réservés |

Aucune publicité au-dessus ni à côté du générateur, ni sur les pages de navigation ou de
service (index des guides, contact, pages légales, 404). Un seul bloc in-article par page.

Chaque bloc réserve sa hauteur en CSS (`--ad-min-height`) avant chargement : le contenu ne se
décale pas quand l'annonce arrive.

## Vérifications effectuées

Les exports (défaut, dégradé, points, classy, Wi-Fi) ont été décodés avec `BarcodeDetector` après
composition : tous restituent bien le contenu encodé, texte personnalisé inclus.

Côté publicité : aucun bloc n'est rendu dans le générateur, et la distance entre le premier
bloc et la zone de téléchargement est de ~470 px (minimum requis : 150 px).
