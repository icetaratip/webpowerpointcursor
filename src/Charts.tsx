import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export interface ChartPoint {
  label: string
  value: number
  note?: string
  display?: string
  /** ใช้แปลงเป็นบาทไทยเมื่อเป็นตัวเลขมูลค่า USD */
  usdScale?: 'M' | 'B'
}

export interface ChartConfig {
  type: 'bars' | 'line' | 'donut' | 'funnel' | 'stats'
  title?: string
  unit?: string
  points: ChartPoint[]
}

const ACCENT = '#111111'
const ACCENT_MID = '#555550'
const ACCENT_SOFT = '#9a9a94'
const INK = '#111111'
const MUTED = '#777771'
const TRACK = 'rgba(16, 16, 16, 0.12)'

export function Chart({ chart }: { chart: ChartConfig }) {
  switch (chart.type) {
    case 'bars':
      return <BarChart chart={chart} />
    case 'line':
      return <LineChart chart={chart} />
    case 'donut':
      return <DonutChart chart={chart} />
    case 'funnel':
      return <FunnelChart chart={chart} />
    case 'stats':
      return <StatRow chart={chart} />
  }
}

function ChartFrame({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="chart">
      {title && <p className="chart__title">{title}</p>}
      {children}
    </div>
  )
}

function BarChart({ chart }: { chart: ChartConfig }) {
  const max = Math.max(...chart.points.map((p) => p.value), 1)
  return (
    <ChartFrame title={chart.title}>
      <div className="chart-bars" role="img" aria-label={chart.title ?? 'แผนภูมิแท่ง'}>
        {chart.points.map((p, i) => (
          <div key={p.label} className="chart-bars__row">
            <span className="chart-bars__label">{p.label}</span>
            <div className="chart-bars__track">
              <div
                className="chart-bars__fill"
                style={{
                  ['--bar' as string]: `${(p.value / max) * 100}%`,
                  animationDelay: `${i * 80}ms`,
                }}
              />
            </div>
            <span className="chart-bars__value">
              {formatValue(p.value, chart.unit)}
            </span>
          </div>
        ))}
      </div>
    </ChartFrame>
  )
}

function LineChart({ chart }: { chart: ChartConfig }) {
  const chartRef = useRef<SVGSVGElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const w = 520
  const h = 180
  const pad = { t: 16, r: 16, b: 36, l: 8 }
  const values = chart.points.map((p) => p.value)
  const max = Math.max(...values, 1)
  const min = 0
  const innerW = w - pad.l - pad.r
  const innerH = h - pad.t - pad.b

  const coords = chart.points.map((p, i) => {
    const x = pad.l + (i / Math.max(chart.points.length - 1, 1)) * innerW
    const y = pad.t + innerH - ((p.value - min) / (max - min)) * innerH
    return { x, y, ...p }
  })

  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
  const area = `${line} L ${coords[coords.length - 1].x} ${pad.t + innerH} L ${coords[0].x} ${pad.t + innerH} Z`
  const lineLength = coords.reduce((length, c, index) => {
    if (index === 0) return length
    const previous = coords[index - 1]
    return length + Math.hypot(c.x - previous.x, c.y - previous.y)
  }, 0)

  useEffect(() => {
    const element = chartRef.current
    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-10% 0px -20% 0px', threshold: [0.24, 0.48] },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <ChartFrame title={chart.title}>
      <svg
        ref={chartRef}
        className={`chart-line${isVisible ? ' is-animated' : ''}`}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={chart.title ?? 'แผนภูมิเส้น'}
        style={{ '--line-length': lineLength } as CSSProperties}
      >
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.28" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            className="chart-line__grid"
            x1={pad.l}
            x2={w - pad.r}
            y1={pad.t + innerH * (1 - t)}
            y2={pad.t + innerH * (1 - t)}
            stroke={TRACK}
            strokeWidth="1"
          />
        ))}
        <path d={area} fill="url(#lineFill)" className="chart-line__area" />
        <path d={line} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" className="chart-line__path" />
        {coords.map((c, index) => (
          <g key={c.label} className="chart-line__point" style={{ '--point-index': index } as CSSProperties}>
            <circle cx={c.x} cy={c.y} r="5" fill="#ffffff" stroke={ACCENT} strokeWidth="2" />
            <text x={c.x} y={h - 10} textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="IBM Plex Mono, monospace">
              {c.label}
            </text>
            <text x={c.x} y={c.y - 12} textAnchor="middle" fill={INK} fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono, monospace">
              {formatValue(c.value, chart.unit)}
            </text>
          </g>
        ))}
      </svg>
    </ChartFrame>
  )
}

function DonutChart({ chart }: { chart: ChartConfig }) {
  const total = chart.points.reduce((s, p) => s + p.value, 0) || 1
  const r = 54
  const c = 2 * Math.PI * r
  let offset = 0
  const colors = [ACCENT, ACCENT_MID, '#3d6b9a', ACCENT_SOFT, '#6b7c90']

  return (
    <ChartFrame title={chart.title}>
      <div className="chart-donut">
        <svg viewBox="0 0 140 140" className="chart-donut__svg" role="img" aria-label={chart.title ?? 'แผนภูมิโดนัท'}>
          <circle cx="70" cy="70" r={r} fill="none" stroke={TRACK} strokeWidth="16" />
          {chart.points.map((p, i) => {
            const len = (p.value / total) * c
            const el = (
              <circle
                key={p.label}
                cx="70"
                cy="70"
                r={r}
                fill="none"
                stroke={colors[i % colors.length]}
                strokeWidth="16"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 70 70)"
                className="chart-donut__seg"
                style={{ animationDelay: `${i * 90}ms` }}
              />
            )
            offset += len
            return el
          })}
          <text x="70" y="66" textAnchor="middle" fill={INK} fontSize="18" fontWeight="700" fontFamily="Syne, sans-serif">
            {chart.points.length}
          </text>
          <text x="70" y="84" textAnchor="middle" fill={MUTED} fontSize="10" fontFamily="IBM Plex Mono, monospace">
            streams
          </text>
        </svg>
        <ul className="chart-donut__legend">
          {chart.points.map((p, i) => (
            <li key={p.label}>
              <span className="chart-donut__swatch" style={{ background: colors[i % colors.length] }} />
              <span className="chart-donut__name">{p.label}</span>
              <span className="chart-donut__pct">{Math.round((p.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartFrame>
  )
}

function FunnelChart({ chart }: { chart: ChartConfig }) {
  const max = Math.max(...chart.points.map((p) => p.value), 1)
  return (
    <ChartFrame title={chart.title}>
      <div className="chart-funnel" role="img" aria-label={chart.title ?? 'กรวยแปลง'}>
        {chart.points.map((p, i) => {
          const width = 42 + (p.value / max) * 58
          return (
            <div
              key={p.label}
              className="chart-funnel__step"
              style={{
                width: `${width}%`,
                animationDelay: `${i * 70}ms`,
              }}
            >
              <span className="chart-funnel__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="chart-funnel__label">{p.label}</span>
            </div>
          )
        })}
      </div>
    </ChartFrame>
  )
}

function StatRow({ chart }: { chart: ChartConfig }) {
  return (
    <ChartFrame title={chart.title}>
      <div className="chart-stats">
        {chart.points.map((p, i) => {
          const thb = p.usdScale ? formatThbFromUsd(p.value, p.usdScale) : null

          return (
            <article
              key={p.label}
              className="chart-stats__card"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="chart-stats__idx" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="chart-stats__body">
                <p className="chart-stats__label">{p.label}</p>
                <p className="chart-stats__value">{p.display ?? formatValue(p.value, chart.unit)}</p>
                {thb && <p className="chart-stats__thb">{thb}</p>}
                {p.note && <p className="chart-stats__note">{p.note}</p>}
              </div>
            </article>
          )
        })}
      </div>
    </ChartFrame>
  )
}

/** อัตราแลกเปลี่ยนแบบปัดกลมสำหรับสไลด์: 1 ดอลลาร์ ≈ 35 บาท */
const THB_PER_USD = 35

function formatThbFromUsd(value: number, scale: 'M' | 'B') {
  const thb = value * (scale === 'B' ? 1_000_000_000 : 1_000_000) * THB_PER_USD

  if (thb >= 1_000_000_000_000) {
    return `ประมาณ ${(thb / 1_000_000_000_000).toLocaleString('th-TH', { maximumFractionDigits: 2 })} ล้านล้านบาท`
  }
  if (thb >= 1_000_000_000) {
    return `ประมาณ ${(thb / 1_000_000_000).toLocaleString('th-TH', { maximumFractionDigits: 1 })} พันล้านบาท`
  }
  if (thb >= 1_000_000) {
    return `ประมาณ ${(thb / 1_000_000).toLocaleString('th-TH', { maximumFractionDigits: 0 })} ล้านบาท`
  }
  return `ประมาณ ${thb.toLocaleString('th-TH')} บาท`
}

function formatValue(value: number, unit?: string) {
  if (unit === 'B') {
    if (value >= 1) return `$${value}B`
    return `$${(value * 1000).toFixed(0)}M`
  }
  if (unit === 'M') return `$${value}M`
  if (unit === '%') return `${value}%`
  if (unit === '$') return `$${value}`
  if (Number.isInteger(value)) return value.toLocaleString('en-US')
  return String(value)
}
