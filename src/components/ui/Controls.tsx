import { useEffect, useId, useState, type ReactNode } from 'react'
import { normalizeHex } from '../../lib/colors'

/* Primitives d'interface réutilisées par tout le panneau de personnalisation. */

export function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
    </label>
  )
}

interface FieldProps {
  label: string
  hint?: string
  error?: string | null
  children: (id: string) => ReactNode
}

export function Field({ label, hint, error, children }: FieldProps) {
  const id = useId()
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children(id)}
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

const inputClass =
  'w-full min-h-11 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted ' +
  'transition-colors duration-150 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-24 resize-y ${props.className ?? ''}`} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ''}`} />
}

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
}

export function Slider({ label, value, min, max, step = 1, unit = '', onChange }: SliderProps) {
  const id = useId()
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-xs tabular-nums text-muted">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

interface ToggleProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
  const id = useId()
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div>
        <Label htmlFor={id}>{label}</Label>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-accent-600' : 'bg-border'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

interface SegmentedControlProps<T extends string> {
  label?: string
  value: T
  options: { value: T; label: ReactNode; ariaLabel?: string }[]
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <div role="group" aria-label={label} className="flex gap-1 rounded-lg bg-subtle p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={option.ariaLabel}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`min-h-9 flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-150 ${
              value === option.value
                ? 'bg-surface text-accent-600 shadow-sm dark:text-accent-300'
                : 'text-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

interface ColorFieldProps {
  label: string
  value: string
  onChange: (hex: string) => void
}

/** Color picker natif stylé + saisie hexadécimale tolérante (`abc`, `#ABC`, `4f46e5`). */
export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const id = useId()
  const [draft, setDraft] = useState(value)

  useEffect(() => setDraft(value), [value])

  const commit = (raw: string) => {
    const hex = normalizeHex(raw)
    if (hex) onChange(hex)
    else setDraft(value)
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-11 w-12 shrink-0"
          aria-label={`${label} — sélecteur de couleur`}
        />
        <input
          type="text"
          value={draft}
          spellCheck={false}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit((e.target as HTMLInputElement).value)
          }}
          aria-label={`${label} — code hexadécimal`}
          className={`${inputClass} font-mono uppercase`}
        />
      </div>
    </div>
  )
}

interface OptionGridProps<T extends string> {
  label: string
  value: T
  options: { value: T; label: string; preview?: ReactNode }[]
  columns?: number
  onChange: (value: T) => void
}

/** Grille de choix visuels (styles de modules, styles d'yeux…). */
export function OptionGrid<T extends string>({
  label,
  value,
  options,
  columns = 3,
  onChange,
}: OptionGridProps<T>) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div
        role="group"
        aria-label={label}
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg border p-2 text-xs font-medium transition-all duration-150 ${
              value === option.value
                ? 'border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300'
                : 'border-border bg-surface text-muted hover:border-accent-300 hover:text-ink'
            }`}
          >
            {option.preview}
            <span className="text-center leading-tight">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
