/** Brand icons via glincker/thesvg on jsDelivr */
const CDN = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons'

export const brand = (slug: string, variant = 'mono') =>
  `${CDN}/${slug}/${variant}.svg`

export const brands = {
  cursor: brand('cursor'),
  openai: brand('openai', 'light'),
  github: brand('github'),
  nvidia: brand('nvidia'),
  uber: brand('uber'),
  adobe: brand('adobe'),
  spacex: brand('spacex'),
  vscode:
    'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/visual-studio-code/default.svg',
  anthropic: brand('anthropic'),
  google: brand('google'),
  amazon: brand('amazon'),
  replit: brand('replit'),
  microsoft: brand('microsoft'),
  thrive: 'https://vcwire.tech/wp-content/uploads/2024/08/thrive-capital.png',
  a16zPerson:
    'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i1_q4yBKIKeE/v0/-1x-1.webp',
  dst: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdeB3BgHlfBZQbD9oqQ9iTRD-m7G3B_atDX-mTfo5PSQ&s',
} as const
