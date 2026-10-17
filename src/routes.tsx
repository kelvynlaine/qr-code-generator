import type { ReactElement } from 'react'
import { Home } from './pages/Home'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { UseCasesPage } from './pages/UseCasesPage'
import { FaqPage } from './pages/FaqPage'
import { GuidesIndex } from './pages/GuidesIndex'
import { QrCodeSizeGuide } from './pages/guides/QrCodeSizeGuide'
import { StaticVsDynamicGuide } from './pages/guides/StaticVsDynamicGuide'
import { ReadableColorsGuide } from './pages/guides/ReadableColorsGuide'
import { QrSecurityGuide } from './pages/guides/QrSecurityGuide'
import { WifiGuide } from './pages/guides/WifiGuide'
import { MenuRestaurantGuide } from './pages/guides/MenuRestaurantGuide'
import { ErrorCorrectionGuide } from './pages/guides/ErrorCorrectionGuide'
import { BusinessCardGuide } from './pages/guides/BusinessCardGuide'
import { SocialMediaGuide } from './pages/guides/SocialMediaGuide'
import { GoogleReviewsGuide } from './pages/guides/GoogleReviewsGuide'
import { ExportFormatGuide } from './pages/guides/ExportFormatGuide'
import { TestBeforePrintGuide } from './pages/guides/TestBeforePrintGuide'
import { EmailPhoneGuide } from './pages/guides/EmailPhoneGuide'
import { TrackingGuide } from './pages/guides/TrackingGuide'
import { EventGuide } from './pages/guides/EventGuide'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { LegalNotice } from './pages/LegalNotice'
import { Terms } from './pages/Terms'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { GUIDES, guidePath } from './data/guides'

export interface AppRoute {
  path: string
  element: ReactElement
  /** Présence dans le sitemap. Absent = page exclue (404). */
  sitemap?: { priority: number; changefreq: 'weekly' | 'monthly' | 'yearly' }
}

const GUIDE_PAGES: Record<string, ReactElement> = {
  'taille-qr-code-impression': <QrCodeSizeGuide />,
  'qr-code-statique-ou-dynamique': <StaticVsDynamicGuide />,
  'personnaliser-qr-code-sans-perdre-la-lecture': <ReadableColorsGuide />,
  'securite-qr-code-quishing': <QrSecurityGuide />,
  'qr-code-wifi': <WifiGuide />,
  'qr-code-menu-restaurant': <MenuRestaurantGuide />,
  'niveau-correction-erreur-qr-code': <ErrorCorrectionGuide />,
  'qr-code-carte-de-visite': <BusinessCardGuide />,
  'qr-code-reseaux-sociaux': <SocialMediaGuide />,
  'qr-code-avis-google': <GoogleReviewsGuide />,
  'format-qr-code-png-jpg-svg': <ExportFormatGuide />,
  'tester-qr-code-avant-impression': <TestBeforePrintGuide />,
  'qr-code-email-telephone': <EmailPhoneGuide />,
  'mesurer-scans-qr-code-utm': <TrackingGuide />,
  'qr-code-mariage-evenement': <EventGuide />,
}

/**
 * Source unique des routes : utilisée par le routeur, par le pré-rendu
 * (un fichier HTML par entrée) et par la génération du sitemap.
 */
export const ROUTES: AppRoute[] = [
  { path: '/', element: <Home />, sitemap: { priority: 1, changefreq: 'weekly' } },
  { path: '/guides', element: <GuidesIndex />, sitemap: { priority: 0.9, changefreq: 'weekly' } },
  ...GUIDES.map((guide) => ({
    path: guidePath(guide.slug),
    element: GUIDE_PAGES[guide.slug],
    sitemap: { priority: 0.8, changefreq: 'monthly' as const },
  })),
  { path: '/comment-ca-marche', element: <HowItWorksPage />, sitemap: { priority: 0.8, changefreq: 'monthly' } },
  { path: '/cas-usage', element: <UseCasesPage />, sitemap: { priority: 0.8, changefreq: 'monthly' } },
  { path: '/faq', element: <FaqPage />, sitemap: { priority: 0.8, changefreq: 'monthly' } },
  { path: '/a-propos', element: <About />, sitemap: { priority: 0.6, changefreq: 'yearly' } },
  { path: '/contact', element: <Contact />, sitemap: { priority: 0.5, changefreq: 'yearly' } },
  { path: '/mentions-legales', element: <LegalNotice />, sitemap: { priority: 0.3, changefreq: 'yearly' } },
  {
    path: '/politique-de-confidentialite',
    element: <PrivacyPolicy />,
    sitemap: { priority: 0.3, changefreq: 'yearly' },
  },
  { path: '/conditions-utilisation', element: <Terms />, sitemap: { priority: 0.3, changefreq: 'yearly' } },
  { path: '*', element: <NotFound /> },
]
