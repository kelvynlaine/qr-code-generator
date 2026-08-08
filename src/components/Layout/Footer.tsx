import { Link } from 'react-router-dom'
import { Mail, QrCode } from 'lucide-react'
import { AdUnit } from '../Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'
import { useConsent } from '../../lib/consent'

const SOCIALS = [
  { label: 'X (Twitter)', href: 'https://x.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub', href: 'https://github.com' },
]

const PRODUCT_LINKS = [
  { to: '/', label: 'Générateur' },
  { to: '/comment-ca-marche', label: 'Comment ça marche' },
  { to: '/cas-usage', label: 'Cas d’usage' },
  { to: '/faq', label: 'FAQ' },
]

const LEGAL_LINKS = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  { to: '/conditions-utilisation', label: 'Conditions d’utilisation' },
  { to: '/contact', label: 'À propos et contact' },
]

export function Footer() {
  const { reopen } = useConsent()

  return (
    <footer className="border-t border-border bg-subtle">
      {/* Dernier emplacement publicitaire, avant les liens légaux. */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <AdUnit slot={AD_SLOTS.footer} format="horizontal" minHeight={100} minHeightDesktop={90} />
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-white">
              <QrCode aria-hidden="true" className="h-5 w-5" />
            </span>
            QR Studio
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Le générateur de QR codes personnalisés, gratuit et sans inscription. Tout est généré
            dans votre navigateur : aucune donnée n’est envoyée sur nos serveurs.
          </p>
        </div>

        <nav aria-label="Liens du site">
          <h2 className="text-sm font-semibold text-ink">Le produit</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors duration-150 hover:text-accent-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informations légales">
          <h2 className="text-sm font-semibold text-ink">Informations</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors duration-150 hover:text-accent-600">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={reopen}
                className="text-left transition-colors duration-150 hover:text-accent-600"
              >
                Préférences cookies
              </button>
            </li>
            <li>
              <a
                href="mailto:kelvyn.off@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-accent-600"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                kelvyn.off@gmail.com
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-sm text-muted">© {new Date().getFullYear()} QR Studio. Tous droits réservés.</p>
          <ul className="flex gap-1">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors duration-150 hover:bg-surface hover:text-accent-600"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
