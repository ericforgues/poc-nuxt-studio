// Generates the flat SVG placeholders used by the mocked content.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..', 'public', 'images')

const assets = [
  ['hero-studio.svg', 'Studio Saint-Jean', '#7c3aed', '#c4b5fd', 1200, 630],
  ['hero-calendar.svg', 'Session automne', '#4f46e5', '#a5b4fc', 1200, 630],
  ['hero-contact.svg', 'Nous joindre', '#0f766e', '#5eead4', 1200, 630],
  ['teachers/marie-claude.svg', 'MC', '#7c3aed', '#ddd6fe', 400, 400],
  ['teachers/samuel.svg', 'SB', '#b91c1c', '#fecaca', 400, 400],
  ['teachers/lea.svg', 'LF', '#0f766e', '#99f6e4', 400, 400],
  ['teachers/carlos.svg', 'CM', '#c2410c', '#fed7aa', 400, 400],
  ['classes/ballet.svg', 'Ballet', '#7c3aed', '#ede9fe', 800, 500],
  ['classes/contemporain.svg', 'Contemporain', '#0f766e', '#ccfbf1', 800, 500],
  ['classes/hiphop.svg', 'Hip-hop', '#b91c1c', '#fee2e2', 800, 500],
  ['classes/jazz.svg', 'Jazz', '#c2410c', '#ffedd5', 800, 500],
  ['classes/salsa.svg', 'Salsa', '#be185d', '#fce7f3', 800, 500],
  ['classes/ligne.svg', 'Danse en ligne', '#1d4ed8', '#dbeafe', 800, 500]
]

for (const [file, label, fg, bg, width, height] of assets) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <circle cx="${width * 0.82}" cy="${height * 0.22}" r="${height * 0.28}" fill="${fg}" opacity="0.18"/>
  <circle cx="${width * 0.16}" cy="${height * 0.82}" r="${height * 0.34}" fill="${fg}" opacity="0.12"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Public Sans, Segoe UI, sans-serif" font-size="${Math.round(height * 0.11)}" font-weight="700" fill="${fg}">${label}</text>
</svg>
`
  const target = resolve(root, file)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, svg, 'utf8')
}

console.log(`Generated ${assets.length} placeholders in public/images`)
