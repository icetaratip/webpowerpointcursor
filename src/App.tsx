import { useEffect, useMemo, useRef, useState } from 'react'
import { brands } from './brands'
import { Chart } from './Charts'
import { Icon } from './icons'
import type { IconName } from './icons'
import { IdeDemo } from './IdeDemo'
import { slides } from './slides'
import type { Slide, SlideItem } from './slides'

declare global {
  interface Window {
    AOS?: {
      init: (options?: Record<string, unknown>) => void
      refreshHard: () => void
    }
  }
}

const NAV_ITEMS = [
  { id: 'story', label: 'Story' },
  { id: 'engine', label: 'Engine' },
  { id: 'demo', label: 'Demo' },
  { id: 'proof', label: 'Proof' },
  { id: 'team', label: 'Team' },
  { id: 'deal', label: 'Deal' },
  { id: 'future', label: 'Capital' },
  { id: 'closing', label: 'Close' },
] as const

const findSlide = (id: string) => slides.find((slide) => slide.id === id)
const take = <T,>(items: T[] | undefined, count: number) => items?.slice(0, count) ?? []
const aos = (delay = 0, animation = 'fade-up') => ({
  'data-aos': animation,
  'data-aos-delay': String(delay),
})

function compact(text: string | undefined, max = 150) {
  if (!text) return ''
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= max) return normalized
  if (/[\u0e00-\u0e7f]/.test(normalized)) return normalized

  const preview = normalized.slice(0, max).trim()
  const cutAt = Math.max(preview.lastIndexOf(' '), preview.lastIndexOf(','), preview.lastIndexOf('·'))
  if (cutAt > max * 0.55) return `${preview.slice(0, cutAt).trim()}...`

  return `${preview}...`
}

function splitBullets(text: string | undefined) {
  return (
    text
      ?.split('·')
      .map((part) => part.trim())
      .filter(Boolean) ?? []
  )
}

function splitPerson(text: string) {
  const split = text.split(/\s[—-]\s/)
  return {
    name: split[0] ?? text,
    title: split[1],
  }
}

function splitTakeaway(text: string) {
  const match = text.match(/^([^:：]+)[:：]\s*(.+)$/)
  return {
    label: match?.[1] ?? text,
    text: match?.[2] ?? '',
  }
}

function DisplayTitle({ title }: { title: string }) {
  return (
    <>
      {title.split('\n').map((line) => (
        <span key={line}>{line}</span>
      ))}
    </>
  )
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
        }

        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </>
  )
}

interface CountParts {
  raw: string
  prefix: string
  suffix: string
  end: number
  decimals: number
  useGrouping: boolean
}

function parseCountParts(display: string | number | undefined, fallback?: number): CountParts | null {
  const raw = String(display ?? fallback ?? '').trim()
  const match = raw.match(/-?\d+(?:,\d{3})*(?:\.\d+)?|-?\d+(?:\.\d+)?/)

  if (!raw || !match || match.index === undefined) return null

  const numericText = match[0].replace(/,/g, '')
  const end = Number(numericText)

  if (!Number.isFinite(end)) return null

  const isYearLike = /^\d{4}$/.test(numericText) && end >= 1900 && end <= 2100

  return {
    raw,
    prefix: raw.slice(0, match.index),
    suffix: raw.slice(match.index + match[0].length),
    end,
    decimals: numericText.includes('.') ? numericText.split('.')[1]?.length ?? 0 : 0,
    useGrouping: raw.includes(',') || (!isYearLike && Math.abs(end) >= 10000),
  }
}

function formatCountValue(value: number, parts: CountParts) {
  const fixed = parts.decimals > 0 ? value.toFixed(parts.decimals) : String(Math.round(value))

  if (!parts.useGrouping) return fixed

  const [whole, decimal] = fixed.split('.')
  const grouped = Number(whole).toLocaleString('en-US')

  return decimal ? `${grouped}.${decimal}` : grouped
}

function CountUpValue({
  display,
  value,
  delay = 0,
}: {
  display: string | number | undefined
  value?: number
  delay?: number
}) {
  const parts = useMemo(() => parseCountParts(display, value), [display, value])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!parts) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setCurrent(parts.end)
      return
    }

    let frame = 0
    const duration = 1450
    const timeout = window.setTimeout(() => {
      const startedAt = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)

        setCurrent(parts.end * eased)

        if (progress < 1) frame = window.requestAnimationFrame(tick)
      }

      frame = window.requestAnimationFrame(tick)
    }, delay)

    setCurrent(0)

    return () => {
      window.clearTimeout(timeout)
      window.cancelAnimationFrame(frame)
    }
  }, [delay, parts])

  if (!parts) return <strong>{display ?? value}</strong>

  return (
    <strong className="count-up" aria-label={parts.raw}>
      {parts.prefix}
      {formatCountValue(current, parts)}
      {parts.suffix}
    </strong>
  )
}

function LogoStrip({ logos, compact = false }: { logos?: Slide['logos']; compact?: boolean }) {
  if (!logos?.length) return null

  return (
    <ul className={`logo-strip${compact ? ' logo-strip--compact' : ''}`}>
      {logos.map((logo) => (
        <li key={logo.alt}>
          <img
            src={logo.src}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
          <span>{logo.alt}</span>
        </li>
      ))}
    </ul>
  )
}

function IconBadge({ icon }: { icon?: IconName }) {
  if (!icon) return null
  return (
    <span className="icon-badge" aria-hidden="true">
      <Icon name={icon} size={18} />
    </span>
  )
}

function WorkspacePreview() {
  return (
    <div className="workspace-preview" aria-label="ภาพจำลองพื้นที่ทำงานของ Cursor">
      <div className="workspace-preview__bar">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="workspace-preview__title">maen-shop / checkout-flow</span>
        <span className="workspace-preview__mode">Agent</span>
      </div>

      <div className="workspace-preview__body">
        <aside className="workspace-preview__files" aria-label="รายการไฟล์">
          {['src', 'Checkout.tsx', 'payment.ts', 'schema.sql', 'tests'].map((file, index) => (
            <span key={file} className={index === 1 ? 'is-active' : undefined}>
              {file}
            </span>
          ))}
        </aside>

        <div className="workspace-preview__editor">
          <div className="code-line"><span>01</span>const task = await agent.plan()</div>
          <div className="code-line is-hot"><span>02</span>agent.edit(['Checkout.tsx', 'payment.ts'])</div>
          <div className="code-line"><span>03</span>await tests.run('checkout')</div>
          <div className="code-line is-added"><span>04</span>+ validated: true</div>
        </div>

        <aside className="workspace-preview__agent">
          <p>Cursor Agent</p>
          <strong>เข้าใจโปรเจกต์ทั้งก้อน</strong>
          <span>อ่าน context และแก้หลายไฟล์ใน workflow เดียว</span>
        </aside>
      </div>
    </div>
  )
}

function HeroSection({ cover, highlights }: { cover?: Slide; highlights?: Slide }) {
  const primaryStats = take(highlights?.chart?.points, 3)

  return (
    <section className="hero" id="story">
      <div className="hero__copy" {...aos(0, 'fade-right')}>
        <p className="eyebrow">Case Study / AI Code Editor</p>
        <h1>Anysphere &amp; Cursor</h1>
        {cover?.lead && (
          <p className="hero__lead">
            Cursor คือ AI code editor ที่ช่วยสร้าง แก้ไข วิเคราะห์ และตรวจโค้ดในที่เดียว
          </p>
        )}
        <div className="hero__actions" aria-label="ทางลัดในหน้า">
          <a href="#demo">View Demo</a>
          <a href="#proof">View Numbers</a>
        </div>
        <LogoStrip logos={cover?.logos} />
      </div>

      <div className="hero__visual" {...aos(120, 'fade-left')}>
        <WorkspacePreview />
        <div className="hero__stats" aria-label="ตัวเลขสำคัญ">
          {primaryStats.map((point, index) => (
            <article className="hero__stat-card" key={point.label} {...aos(index * 70)}>
              <span>{compact(point.label, 34)}</span>
              <CountUpValue display={point.display} value={point.value} delay={220 + index * 140} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryPanel({ slide }: { slide?: Slide }) {
  if (!slide) return null
  const isHistory = slide.id === 'who'

  return (
    <section className={`chapter chapter--story${isHistory ? ' chapter--history' : ''}`} aria-labelledby={`${slide.id}-title`}>
      <div className="chapter__label" {...aos(0, 'fade-right')}>
        <IconBadge icon={slide.icon} />
        <span>{slide.kicker}</span>
      </div>
      <div className="chapter__content" {...aos(80)}>
        <h2 id={`${slide.id}-title`}>
          <DisplayTitle title={slide.title} />
        </h2>
        {slide.lead && (
          <p className="chapter__lead">
            <InlineText text={slide.lead} />
          </p>
        )}
        {isHistory && <LogoStrip logos={slide.logos} compact />}
        <div className="story-lines">
          {take(slide.body, 4).map((line, index) => (
            <p key={line} {...aos(index * 70)}>
              <InlineText text={compact(line, 210)} />
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureTile({ item, delay = 0 }: { item: SlideItem; delay?: number }) {
  const hasVisual = Boolean(item.image || item.images?.length)

  return (
    <article className={`feature-tile${hasVisual ? ' feature-tile--image' : ''}`} {...aos(delay)}>
      <div className="feature-tile__head">
        <IconBadge icon={item.icon} />
        <span>{item.label}</span>
      </div>
      <p>{compact(item.text, hasVisual ? 70 : 120)}</p>
      {item.images?.length ? (
        <div className="language-icons" aria-hidden="true">
          {item.images.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
          ))}
        </div>
      ) : item.image ? (
        <img className="feature-tile__image" src={item.image} alt="" loading="lazy" />
      ) : null}
    </article>
  )
}

function EngineSection({
  what,
  problem,
  features,
}: {
  what?: Slide
  problem?: Slide
  features: SlideItem[]
}) {
  return (
    <section className="chapter chapter--engine" id="engine" aria-labelledby="engine-title">
      <div className="engine-head" {...aos(0)}>
        <div className="chapter__label">
          <IconBadge icon="bot" />
          <span>Product Engine</span>
        </div>

        <div className="engine-head__copy">
          <h2 id="engine-title">{what?.title ?? 'AI Code Editor ที่ทำงานในบริบทจริง'}</h2>
          {what?.lead && <p className="chapter__lead">{compact(what.lead, 170)}</p>}
        </div>
      </div>

      <div className="engine-grid">
        <div className="engine-grid__problem" {...aos(80, 'fade-right')}>
          <p className="panel-title">ปัญหาที่ Cursor จับ</p>
          {take(problem?.items, 4).map((item) => (
            <div className="problem-row" key={item.label}>
              <IconBadge icon={item.icon} />
              <span>{compact(item.text, 105)}</span>
            </div>
          ))}
        </div>

        <div className="engine-grid__features">
          {take(features, 6).map((item, index) => (
            <FeatureTile key={`${item.label}-${item.text}`} item={item} delay={index * 70} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoSection({ demo }: { demo?: Slide }) {
  return (
    <section className="chapter chapter--demo" id="demo" aria-labelledby="demo-title">
      <div className="chapter__label" {...aos(0, 'fade-right')}>
        <IconBadge icon="terminal" />
        <span>{demo?.kicker ?? 'Live Workflow'}</span>
      </div>

      <div className="chapter__content" {...aos(80)}>
        <h2 id="demo-title">{demo?.title ?? 'เห็นภาพ Cursor ทำงานจริง'}</h2>
        {demo?.lead && <p className="chapter__lead">{demo.lead}</p>}
        <IdeDemo />
      </div>
    </section>
  )
}

function MetricStrip({ slide }: { slide?: Slide }) {
  const points = take(slide?.chart?.points, 4)

  return (
    <div className="metric-strip">
      {points.map((point, index) => (
        <article key={point.label} {...aos(index * 70)}>
          <span>{compact(point.label, 34)}</span>
          <strong>{point.display ?? point.value}</strong>
          {point.note && <small>{point.note}</small>}
        </article>
      ))}
    </div>
  )
}

function ProofSection({
  highlights,
  funding,
  customers,
  investors,
}: {
  highlights?: Slide
  funding?: Slide
  customers?: Slide
  investors?: Slide
}) {
  return (
    <section className="chapter chapter--proof" id="proof" aria-labelledby="proof-title">
      <div className="chapter__label" {...aos(0, 'fade-right')}>
        <IconBadge icon="gauge" />
        <span>Traction & Capital</span>
      </div>

      <div className="chapter__content" {...aos(80)}>
        <h2 id="proof-title">{highlights?.title ?? 'จาก Startup สู่สินทรัพย์เชิงกลยุทธ์'}</h2>
        {highlights?.lead && <p className="chapter__lead">{highlights.lead}</p>}

        <MetricStrip slide={highlights} />

        <div className="proof-layout">
          <div className="proof-layout__chart" {...aos(0, 'fade-right')}>
            {funding?.chart && <Chart chart={funding.chart} />}
          </div>

          <div className="proof-layout__logos" {...aos(100, 'fade-left')}>
            <p className="panel-title">ลูกค้าและเครือข่าย</p>
            <LogoStrip logos={customers?.logos} compact />
            <LogoStrip logos={investors?.items?.filter((item) => item.logo).map((item) => ({ src: item.logo!, alt: item.label }))} compact />
          </div>
        </div>
      </div>
    </section>
  )
}

function MarketSection({
  business,
  revenue,
  pricing,
  enterprise,
}: {
  business?: Slide
  revenue?: Slide
  pricing?: Slide
  enterprise?: Slide
}) {
  const planCards = [
    ...take(pricing?.items, 2).map((item) => ({
      icon: item.icon,
      title: item.label,
      bullets: splitBullets(item.text),
    })),
    {
      icon: enterprise?.icon,
      title: enterprise?.title ?? 'Business / Enterprise',
      bullets: [
        enterprise?.lead ?? 'สำหรับองค์กร',
        ...take(enterprise?.items, 4).map((item) => item.text),
      ].filter(Boolean),
    },
  ]

  return (
    <section className="chapter chapter--market" id="business" aria-labelledby="market-title">
      <div className="market-head" {...aos(0)}>
        <div className="chapter__label">
          <IconBadge icon="blocks" />
          <span>{business?.kicker ?? 'ลักษณะธุรกิจ'}</span>
        </div>

        <div className="market-head__copy">
          <h2 id="market-title">{business?.title ?? 'ลักษณะธุรกิจ'}</h2>
          {business?.lead && <p className="chapter__lead">{business.lead}</p>}
        </div>
      </div>

      <div className="market-stack">
        <div className="market-grid">
          <div className="audience-stack">
            <p className="panel-title">กลุ่มผู้ใช้</p>
            {take(business?.items, 4).map((item, index) => (
              <article className="audience-card" key={item.label} {...aos(index * 60)}>
                <IconBadge icon={item.icon} />
                <span>{item.label}</span>
                <strong>{item.text}</strong>
              </article>
            ))}
          </div>

          <div className="pricing-panel" {...aos(120, 'fade-left')}>
            <p className="panel-title">{revenue?.kicker ?? 'การสร้างรายได้'}</p>
            <h3>{revenue?.lead ?? 'Cursor มีโมเดลธุรกิจแบบ Freemium'}</h3>
            {revenue?.body?.[0] && <p>{compact(revenue.body[0], 170)}</p>}
          </div>
        </div>

        <div className="revenue-panel" {...aos(0)}>
          <div className="revenue-panel__head">
            <p className="panel-title">{revenue?.kicker ?? 'การสร้างรายได้'}</p>
            <h3>{revenue?.title ?? 'โมเดลธุรกิจแบบ Freemium'}</h3>
            {revenue?.lead && <p>{revenue.lead}</p>}
          </div>

          <div className="plan-grid">
            {planCards.map((plan, index) => (
              <article className="plan-card" key={plan.title} {...aos(index * 70)}>
                <div className="plan-card__head">
                  <IconBadge icon={plan.icon} />
                  <h4>{plan.title}</h4>
                </div>
                <ul>
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {revenue?.body?.[0] && <p className="revenue-note">{revenue.body[0]}</p>}
        </div>
      </div>
    </section>
  )
}

function TeamSection({ team }: { team?: Slide }) {
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedMember =
    selectedTeamIndex === null ? null : team?.items?.[selectedTeamIndex] ?? null
  const selectedPerson = selectedMember ? splitPerson(selectedMember.text) : null

  useEffect(() => {
    if (selectedTeamIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTeamIndex(null)
        return
      }

      if (event.key !== 'Tab') return
      const dialog = closeButtonRef.current?.closest('.team-modal__panel')
      if (!dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'))

      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      cardRefs.current[selectedTeamIndex]?.focus()
    }
  }, [selectedTeamIndex])

  return (
    <section className="chapter chapter--team" id="team" aria-labelledby="team-title">
      <div className="team-head" {...aos(0)}>
        <div className="chapter__label">
          <IconBadge icon="users" />
          <span>{team?.kicker ?? 'Founding Team'}</span>
        </div>

        <div className="team-head__copy">
          <h2 id="team-title">{team?.title ?? 'ผู้สร้าง Cursor'}</h2>
          {team?.lead && <p className="chapter__lead">{compact(team.lead, 165)}</p>}
        </div>
      </div>

      {team?.heroImage && (
        <figure className="team-group-photo" {...aos(90)}>
          <img
            src={team.heroImage}
            alt="ทีมผู้ร่วมก่อตั้ง Cursor ยืนรวมกัน"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.closest('.team-group-photo')?.remove()
            }}
          />
        </figure>
      )}

      <div className="team-wall">
        {team?.items?.map((item, index) => {
          const person = splitPerson(item.text)
          return (
            <article
              key={item.text}
              className="team-card"
              {...aos(index * 80)}
            >
              <button
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                type="button"
                className="team-card__hit"
                aria-haspopup="dialog"
                aria-label={`ดูรายละเอียดของ ${person.name}`}
                onClick={() => setSelectedTeamIndex(index)}
              />
              <div className="team-card__media">
                {item.image && <img src={item.image} alt={person.name} loading="lazy" />}
              </div>
              <div className="team-card__body">
                <div className="team-card__meta">
                  <span>{item.label}</span>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                </div>
                <h3>{person.name}</h3>
                {(item.note || person.title) && <p className="team-card__role">{item.note ?? person.title}</p>}
                {item.bullets?.length && (
                  <ul className="team-card__duties">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {selectedMember && selectedPerson && (
        <div className="team-modal" onClick={() => setSelectedTeamIndex(null)}>
          <div
            className="team-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="team-modal__close"
              type="button"
              aria-label="ปิดรายละเอียดทีม"
              onClick={() => setSelectedTeamIndex(null)}
            >
              ×
            </button>

            <div className="team-modal__portrait">
              {selectedMember.image && <img src={selectedMember.image} alt={selectedPerson.name} />}
            </div>

            <div className="team-modal__content">
              <div className="team-modal__eyebrow">
                <span>{selectedMember.label}</span>
                <small>{String((selectedTeamIndex ?? 0) + 1).padStart(2, '0')}</small>
              </div>
              <h3 id="team-modal-title">{selectedPerson.name}</h3>
              {(selectedMember.note || selectedPerson.title) && (
                <p className="team-modal__role">{selectedMember.note ?? selectedPerson.title}</p>
              )}
              {selectedMember.bullets?.length && (
                <ul className="team-modal__bullets">
                  {selectedMember.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              <div className="team-modal__tags" aria-label="บทบาทสำคัญ">
                <span>Cursor</span>
                <span>AI Editor</span>
                <span>Founding Team</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function DealSection({ deal }: { deal?: Slide }) {
  const [isImageOpen, setIsImageOpen] = useState(false)

  useEffect(() => {
    if (!isImageOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsImageOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isImageOpen])

  if (!deal) return null

  const dealTerms = [
    { label: 'รูปแบบดีล', value: 'จ่ายด้วยหุ้นทั้งหมด' },
    { label: 'กำหนดปิดดีล', value: 'ไตรมาส 3 ปี 2026' },
    { label: 'ความหมายเชิงกลยุทธ์', value: 'ทรัพย์สิน AI สำหรับองค์กร' },
  ]

  return (
    <section className="chapter chapter--deal" id="deal" aria-labelledby="deal-title">
      <div className="deal-shell" {...aos(0)}>
        <div className="deal-hero">
          <div className="deal-copy" {...aos(0)}>
            <div className="deal-kicker">
              <IconBadge icon={deal.icon ?? 'rocket'} />
              <span>{deal.kicker}</span>
            </div>
            <h2 id="deal-title">
              <DisplayTitle title={deal.title} />
            </h2>
            <p>{deal.lead}</p>

            <div className="deal-timeline" aria-label="ลำดับเหตุการณ์ดีล">
              <span>ประกาศดีล</span>
              <strong>16 มิ.ย. 2026</strong>
              <span>คาดว่าจะปิดดีล</span>
              <strong>ไตรมาส 3 ปี 2026</strong>
            </div>
          </div>

          <div className="deal-visual" {...aos(120, 'fade-left')}>
            <div className="deal-visual__topline">
              {deal.logos?.[0] && <img className="deal-logo" src={deal.logos[0].src} alt={deal.logos[0].alt} loading="lazy" />}
              <span>สัญญาณการเข้าซื้อกิจการ</span>
            </div>
            {deal.heroImage && (
              <button className="deal-image-button" type="button" onClick={() => setIsImageOpen(true)} aria-label="เปิดรูปขนาดใหญ่">
                <img
                  className="deal-image"
                  src={deal.heroImage}
                  alt="SpaceX และ Cursor"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              </button>
            )}
          </div>
        </div>

        <div className="deal-points" aria-label="รายละเอียดข้อตกลง">
          {dealTerms.map((term, index) => (
            <article key={term.label} {...aos(180 + index * 70)}>
              <span>{term.label}</span>
              <strong>{term.value}</strong>
            </article>
          ))}
        </div>
      </div>

      {deal.heroImage && isImageOpen && (
        <div className="image-modal" role="dialog" aria-modal="true" aria-label="รูปภาพขนาดใหญ่" onClick={() => setIsImageOpen(false)}>
          <div className="image-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button className="image-modal__close" type="button" onClick={() => setIsImageOpen(false)}>
              ปิด
            </button>
            <img src={deal.heroImage} alt="SpaceX และ Cursor" />
          </div>
        </div>
      )}
    </section>
  )
}

function FutureSection({ future }: { future?: Slide }) {
  const capitalCards: Array<{ logo?: string; mark?: string; title: string; text: string }> = [
    {
      logo: brands.openai,
      title: 'OpenAI Startup Fund',
      text: 'เงินทุนและเครือข่ายด้าน AI ที่ช่วยให้ Cursor เติบโตตั้งแต่ช่วงเริ่มต้น',
    },
    {
      mark: 'a16z',
      title: 'Andreessen Horowitz',
      text: 'กองทุน Venture Capital ชั้นนำที่ช่วยเพิ่มความน่าเชื่อถือและโอกาสในการสเกลธุรกิจ',
    },
    {
      logo: brands.thrive,
      title: 'Thrive Capital',
      text: 'สนับสนุนการเติบโตระยะยาว การขยายทีม และการเข้าสู่ตลาดองค์กร',
    },
  ]

  return (
    <section className="chapter chapter--future" id="future" aria-labelledby="future-title">
      <div className="future-head" {...aos(0)}>
        <div className="chapter__label">
          <IconBadge icon={future?.icon ?? 'landmark'} />
          <span>{future?.kicker ?? 'เงินลงทุนจาก Venture Capital'}</span>
        </div>

        <div className="future-head__copy">
          <h2 id="future-title">
            <DisplayTitle title={future?.title ?? 'เงินทุนที่เร่งการเติบโตของ Cursor'} />
          </h2>
          {future?.lead && <p className="chapter__lead">{future.lead}</p>}
        </div>
      </div>

      <div className="future-flow" aria-label="เป้าหมายการใช้เงินลงทุน" {...aos(80)}>
        <span>พัฒนาผลิตภัณฑ์</span>
        <span>ขยายทีมงาน</span>
        <span>เร่งการเติบโตของ AI Editor</span>
      </div>

      <div className="future-grid">
        {capitalCards.map((card, index) => (
          <article className="future-card" key={card.title} {...aos(index * 80)}>
            {card.logo ? (
              <img className="future-card__logo" src={card.logo} alt="" loading="lazy" />
            ) : (
              <span className="future-card__mark">{card.mark}</span>
            )}
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ClosingSection({ closing }: { closing?: Slide }) {
  const notes = take(closing?.body, 3).map((line) => splitTakeaway(line))

  return (
    <section className="closing" id="closing" aria-labelledby="closing-title">
      <div className="closing__inner" {...aos(0)}>
        <div className="closing__masthead">
          <div className="closing__label">
            <IconBadge icon={closing?.icon ?? 'sparkles'} />
            <span>{closing?.kicker ?? 'Summary'}</span>
          </div>
          {closing?.logos?.[0] && <img className="closing__mark" src={closing.logos[0].src} alt="" loading="lazy" />}
        </div>

        <div className="closing__grid">
          <div className="closing__title-block" {...aos(0, 'fade-right')}>
            <h2 id="closing-title">
              <DisplayTitle title={closing?.title ?? 'Cursor ทำให้การสร้างซอฟต์แวร์เร็วขึ้น'} />
            </h2>
            {closing?.footnote && <p className="closing__footnote">{closing.footnote}</p>}
          </div>

          <div className="closing__summary" {...aos(120, 'fade-left')}>
            {closing?.lead && <p>{closing.lead}</p>}
            <div className="closing__notes">
              {notes.map((note, index) => (
                <article className="closing__note" key={`${note.label}-${index}`} {...aos(index * 70)}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{note.label}</strong>
                  {note.text && <p>{note.text}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalVideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = document.getElementById('video-finale')
    if (!video || !section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.36)

        if (isVisible) {
          video.currentTime = 0
          void video.play().catch(() => undefined)
          return
        }

        video.pause()
      },
      { threshold: [0, 0.36, 0.72] },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  return (
    <section className="video-finale" id="video-finale" aria-label="วิดีโอปิดท้าย">
      <video ref={videoRef} className="video-finale__media" muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="/v/v.mp4" type="video/mp4" />
      </video>
      <div className="video-finale__shade" aria-hidden="true" />
    </section>
  )
}

function SiteHeader({ activeId, hidden = false }: { activeId: string; hidden?: boolean }) {
  return (
    <header className={`site-header${hidden ? ' is-hidden' : ''}`}>
      <a className="brand-mark" href="#story" aria-label="ไปหน้าแรก">
        <img src={brands.cursor} alt="" width={24} height={24} />
        <span>Cursor</span>
      </a>

      <nav className="site-nav" aria-label="เมนูหลัก">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={activeId === item.id ? 'is-active' : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState<string>('story')
  const [isVideoActive, setIsVideoActive] = useState(false)

  const mapped = useMemo(() => {
    const features = [
      ...take(findSlide('features-1')?.items, 4),
      ...take(findSlide('features-2')?.items, 3),
    ]

    return {
      cover: findSlide('cover'),
      who: findSlide('who'),
      what: findSlide('what-i-am'),
      problem: findSlide('problem'),
      demo: findSlide('ide-demo'),
      highlights: findSlide('highlights'),
      funding: findSlide('funding'),
      customers: findSlide('customers'),
      investors: findSlide('investors'),
      business: findSlide('business'),
      revenue: findSlide('revenue-model'),
      pricing: findSlide('pricing-hobby-pro'),
      enterprise: findSlide('pricing-team-ent'),
      risks: findSlide('risks'),
      team: findSlide('team'),
      deal: findSlide('spacex'),
      future: findSlide('future'),
      closing: findSlide('closing'),
      features,
    }
  }, [])

  useEffect(() => {
    const startAos = () => {
      window.AOS?.init({
        once: true,
        duration: 1100,
        easing: 'ease-out-quart',
        offset: 80,
        delay: 0,
        disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      })
      window.AOS?.refreshHard()
    }

    if (window.AOS) {
      startAos()
      return
    }

    window.addEventListener('load', startAos, { once: true })
    return () => window.removeEventListener('load', startAos)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.2, 0.45, 0.7] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const videoSection = document.getElementById('video-finale')
    if (!videoSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoActive(Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.28))
      },
      { threshold: [0, 0.28, 0.6] },
    )

    observer.observe(videoSection)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#story">ข้ามไปยังเนื้อหา</a>
      <SiteHeader activeId={activeId} hidden={isVideoActive} />

      <main>
        <HeroSection cover={mapped.cover} highlights={mapped.highlights} />
        <StoryPanel slide={mapped.who} />
        <EngineSection what={mapped.what} problem={mapped.problem} features={mapped.features} />
        <DemoSection demo={mapped.demo} />
        <ProofSection
          highlights={mapped.highlights}
          funding={mapped.funding}
          customers={mapped.customers}
          investors={mapped.investors}
        />
        <MarketSection business={mapped.business} revenue={mapped.revenue} pricing={mapped.pricing} enterprise={mapped.enterprise} />
        <TeamSection team={mapped.team} />
        <DealSection deal={mapped.deal} />
        <FutureSection future={mapped.future} />
        <ClosingSection closing={mapped.closing} />
      </main>

      <footer className="site-footer">
        <span>Anysphere &amp; Cursor / Product Story</span>
      </footer>

      <FinalVideoSection />
    </div>
  )
}
