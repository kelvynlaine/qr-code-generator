import { AtSign, Link2, Phone, Type, Wifi } from 'lucide-react'
import type { ContentType, QRConfig } from '../../types/qr'
import { validateEmail, validateUrl } from '../../lib/qrData'
import { Field, Select, TextArea, TextInput, Toggle } from '../ui/Controls'

interface Props {
  config: QRConfig
  update: (patch: Partial<QRConfig>) => void
}

const TABS: { value: ContentType; label: string; icon: typeof Link2 }[] = [
  { value: 'url', label: 'Lien', icon: Link2 },
  { value: 'text', label: 'Texte', icon: Type },
  { value: 'email', label: 'E-mail', icon: AtSign },
  { value: 'phone', label: 'Téléphone', icon: Phone },
  { value: 'wifi', label: 'Wi-Fi', icon: Wifi },
]

export function ContentInput({ config, update }: Props) {
  const urlError = validateUrl(config.url)
  const emailError = validateEmail(config.email.address)

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="Type de contenu" className="flex flex-wrap gap-1 rounded-xl bg-subtle p-1">
        {TABS.map(({ value, label, icon: Icon }) => {
          const active = config.contentType === value
          return (
            <button
              key={value}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => update({ contentType: value })}
              className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-surface text-accent-600 shadow-sm dark:text-accent-300'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </button>
          )
        })}
      </div>

      {config.contentType === 'url' && (
        <Field
          label="Adresse du lien"
          error={urlError}
          hint="Le QR code redirigera vers cette page."
        >
          {(id) => (
            <TextInput
              id={id}
              type="url"
              inputMode="url"
              placeholder="https://exemple.com"
              value={config.url}
              onChange={(e) => update({ url: e.target.value })}
            />
          )}
        </Field>
      )}

      {config.contentType === 'text' && (
        <Field label="Texte libre" hint="Affiché tel quel après le scan. Plus le texte est long, plus le QR code est dense.">
          {(id) => (
            <TextArea
              id={id}
              placeholder="Votre message…"
              value={config.text}
              onChange={(e) => update({ text: e.target.value })}
            />
          )}
        </Field>
      )}

      {config.contentType === 'email' && (
        <div className="space-y-4">
          <Field label="Destinataire" error={emailError}>
            {(id) => (
              <TextInput
                id={id}
                type="email"
                placeholder="contact@exemple.com"
                value={config.email.address}
                onChange={(e) => update({ email: { ...config.email, address: e.target.value } })}
              />
            )}
          </Field>
          <Field label="Objet (optionnel)">
            {(id) => (
              <TextInput
                id={id}
                value={config.email.subject}
                onChange={(e) => update({ email: { ...config.email, subject: e.target.value } })}
              />
            )}
          </Field>
          <Field label="Message pré-rempli (optionnel)">
            {(id) => (
              <TextArea
                id={id}
                value={config.email.body}
                onChange={(e) => update({ email: { ...config.email, body: e.target.value } })}
              />
            )}
          </Field>
        </div>
      )}

      {config.contentType === 'phone' && (
        <Field label="Numéro de téléphone" hint="Format international recommandé : +33 6 12 34 56 78">
          {(id) => (
            <TextInput
              id={id}
              type="tel"
              inputMode="tel"
              placeholder="+33 6 12 34 56 78"
              value={config.phone}
              onChange={(e) => update({ phone: e.target.value })}
            />
          )}
        </Field>
      )}

      {config.contentType === 'wifi' && (
        <div className="space-y-4">
          <Field label="Nom du réseau (SSID)">
            {(id) => (
              <TextInput
                id={id}
                value={config.wifi.ssid}
                onChange={(e) => update({ wifi: { ...config.wifi, ssid: e.target.value } })}
              />
            )}
          </Field>
          <Field label="Sécurité">
            {(id) => (
              <Select
                id={id}
                value={config.wifi.encryption}
                onChange={(e) =>
                  update({ wifi: { ...config.wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' } })
                }
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Réseau ouvert</option>
              </Select>
            )}
          </Field>
          {config.wifi.encryption !== 'nopass' && (
            <Field
              label="Mot de passe"
              hint="Le mot de passe est encodé dans l’image : ne partagez ce QR code qu’avec des personnes de confiance."
            >
              {(id) => (
                <TextInput
                  id={id}
                  type="text"
                  value={config.wifi.password}
                  onChange={(e) => update({ wifi: { ...config.wifi, password: e.target.value } })}
                />
              )}
            </Field>
          )}
          <Toggle
            label="Réseau masqué"
            checked={config.wifi.hidden}
            onChange={(hidden) => update({ wifi: { ...config.wifi, hidden } })}
          />
        </div>
      )}
    </div>
  )
}
