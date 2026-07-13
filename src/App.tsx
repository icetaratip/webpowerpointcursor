import { useCallback, useEffect, useState } from 'react'
import { brands } from './brands'
import { Chart } from './Charts'
import { Icon } from './icons'
import { IdeDemo } from './IdeDemo'
import { slides } from './slides'
import type { Slide } from './slides'

function LogoRow({ logos }: { logos: { src: string; alt: string }[] }) {
  return (
    <ul className="slide__logos">
      {logos.map((logo) => (
        <li key={logo.alt}>
          <img src={logo.src} alt={logo.alt} title={logo.alt} loading="lazy" />
          <span>{logo.alt}</span>
        </li>
      ))}
    </ul>
  )
}

function SlideView({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  const side = slide.layout === 'side' && slide.chart
  const isTeam = slide.kind === 'team'

  return (
    <article className={`slide slide--${slide.kind}${side ? ' slide--side' : ''}`} data-slide={slide.id}>
      <header className="slide__chrome">
        <span className="slide__brand">
          <img src={brands.cursor} alt="" className="slide__brand-mark" />
          CURSOR
        </span>
        <span className="slide__count">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </header>

      {slide.kicker && (
        <p className="slide__kicker">
          {slide.icon && <Icon name={slide.icon} size={16} className="slide__kicker-icon" />}
          {slide.kicker}
        </p>
      )}

      <h1 className="slide__title">
        {slide.title.split('\n').map((line) => (
          <span key={line} className="slide__title-line">
            {line}
          </span>
        ))}
      </h1>

      {slide.lead && <p className="slide__lead">{slide.lead}</p>}

      {slide.logos && !isTeam && <LogoRow logos={slide.logos} />}

      {slide.heroImage && (
        <figure className="slide__hero-photo">
          <img src={slide.heroImage} alt="SpaceX" />
        </figure>
      )}

      {slide.showIde && <IdeDemo />}

      <div className={side ? 'slide__cols' : 'slide__main'}>
        <div className="slide__content">
          {slide.meta && (
            <ul className="slide__meta">
              {slide.meta.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          {slide.items && (
            <div className={`slide__items slide__items--${slide.kind}`}>
              {slide.items.map((item) => (
                <div key={`${item.label}-${item.text}`} className={`slide__item${item.image ? ' slide__item--person' : ''}`}>
                  {item.image ? (
                    <img className="slide__avatar" src={item.image} alt={item.text} />
                  ) : null}
                  <div className="slide__item-body">
                    <div className="slide__item-head">
                      {!item.image && item.logo && (
                        <span className="slide__item-logo">
                          <img src={item.logo} alt="" />
                        </span>
                      )}
                      {!item.image && !item.logo && item.icon && (
                        <span className="slide__item-icon">
                          <Icon name={item.icon} size={18} />
                        </span>
                      )}
                      <span className="slide__item-label">{item.label}</span>
                    </div>
                    <span className="slide__item-text">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {slide.body && slide.kind === 'timeline' && (
            <ol className="slide__timeline">
              {slide.body.map((line, i) => (
                <li key={line}>
                  <span className="slide__step">{String(i + 1).padStart(2, '0')}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          )}

          {slide.body && slide.kind !== 'timeline' && (
            <ul className="slide__body">
              {slide.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </div>

        {slide.chart && (
          <div className="slide__chart">
            <Chart chart={slide.chart} />
          </div>
        )}
      </div>

      {slide.footnote && <p className="slide__footnote">{slide.footnote}</p>}

      {slide.kind === 'cover' && <div className="slide__orb" aria-hidden="true" />}
    </article>
  )
}

export default function App() {
  const [index, setIndex] = useState(0)
  const total = slides.length

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(total - 1, next)))
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        go(index + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        go(index - 1)
      } else if (e.key === 'Home') {
        go(0)
      } else if (e.key === 'End') {
        go(total - 1)
      } else if (e.key.toLowerCase() === 'p') {
        window.print()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, total])

  return (
    <div className="deck">
      <div className="deck__atmosphere" aria-hidden="true" />

      <main className="deck__stage" key={slides[index].id}>
        <SlideView slide={slides[index]} index={index} total={total} />
      </main>

      <nav className="deck__nav" aria-label="ควบคุมสไลด์">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0}>
          ← ก่อนหน้า
        </button>
        <div className="deck__dots" role="tablist" aria-label="เลือกสไลด์">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`สไลด์ ${i + 1}: ${s.title.replace('\n', ' ')}`}
              className={i === index ? 'is-active' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} disabled={index === total - 1}>
          ถัดไป →
        </button>
        <button type="button" className="deck__print" onClick={() => window.print()} title="พิมพ์เป็น PDF (P)">
          PDF
        </button>
      </nav>

      <div className="print-deck" aria-hidden="true">
        {slides.map((slide, i) => (
          <SlideView key={slide.id} slide={slide} index={i} total={total} />
        ))}
      </div>
    </div>
  )
}
