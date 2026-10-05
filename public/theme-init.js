// Applique le thème enregistré avant le premier rendu (évite le flash de couleur).
// Chargé de façon bloquante dans le <head>, donc avant le premier affichage.
try {
  const stored = localStorage.getItem('theme')
  const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  if (dark) document.documentElement.classList.add('dark')
} catch {}
