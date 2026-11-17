import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { CONTENT } from '../content'

// Ambient falling particles configuration (naturally distributed along corridors and upper arch)
interface Particle {
  id: number
  type: 'leaf' | 'petal' | 'sparkle'
  startX: number // percentage
  startY: number // percentage
  size: number
  duration: number
  delay: number
  rotate: number
  desktopOnly?: boolean
  sway?: 'left' | 'right'
}

const PARTICLES: Particle[] = [
  // --- Left Margin Corridor ---
  { id: 1, type: 'leaf', startX: 5, startY: 8, size: 15, duration: 7.8, delay: 0.0, rotate: 20, sway: 'right' },
  { id: 2, type: 'sparkle', startX: 14, startY: 14, size: 10, duration: 3.8, delay: 0.5, rotate: 0 },
  { id: 3, type: 'leaf', startX: 10, startY: 20, size: 14, duration: 8.2, delay: 1.2, rotate: -35, sway: 'left' },
  { id: 4, type: 'petal', startX: 6, startY: 26, size: 14, duration: 8.0, delay: 1.8, rotate: -40, sway: 'right' },
  { id: 5, type: 'leaf', startX: 12, startY: 34, size: 16, duration: 7.2, delay: 2.5, rotate: 45, sway: 'right' },
  { id: 6, type: 'leaf', startX: 7, startY: 42, size: 13, duration: 8.5, delay: 0.8, rotate: -20, sway: 'left' },
  { id: 7, type: 'sparkle', startX: 15, startY: 48, size: 11, duration: 4.2, delay: 2.2, rotate: 0 },
  { id: 8, type: 'leaf', startX: 9, startY: 54, size: 15, duration: 7.6, delay: 3.4, rotate: 60, sway: 'right' },
  { id: 9, type: 'petal', startX: 13, startY: 60, size: 15, duration: 8.4, delay: 4.0, rotate: 30, sway: 'left' },
  { id: 10, type: 'leaf', startX: 6, startY: 66, size: 14, duration: 8.2, delay: 1.6, rotate: -45, sway: 'left' },
  { id: 11, type: 'leaf', startX: 11, startY: 74, size: 15, duration: 8.8, delay: 4.8, rotate: 25, sway: 'right' },
  { id: 12, type: 'leaf', startX: 8, startY: 82, size: 13, duration: 7.5, delay: 2.8, rotate: -15, sway: 'left' },

  // --- Right Margin Corridor ---
  { id: 13, type: 'leaf', startX: 90, startY: 7, size: 16, duration: 7.5, delay: 0.4, rotate: -25, sway: 'left' },
  { id: 14, type: 'sparkle', startX: 84, startY: 12, size: 11, duration: 4.0, delay: 1.0, rotate: 0 },
  { id: 15, type: 'leaf', startX: 86, startY: 18, size: 14, duration: 8.4, delay: 1.5, rotate: 40, sway: 'right' },
  { id: 16, type: 'petal', startX: 91, startY: 25, size: 15, duration: 8.2, delay: 2.2, rotate: 45, sway: 'left' },
  { id: 17, type: 'leaf', startX: 83, startY: 32, size: 15, duration: 7.4, delay: 3.0, rotate: -45, sway: 'left' },
  { id: 18, type: 'leaf', startX: 88, startY: 40, size: 13, duration: 8.6, delay: 0.9, rotate: 35, sway: 'right' },
  { id: 19, type: 'sparkle', startX: 85, startY: 46, size: 10, duration: 3.6, delay: 2.6, rotate: 0 },
  { id: 20, type: 'leaf', startX: 89, startY: 52, size: 16, duration: 7.6, delay: 3.8, rotate: -30, sway: 'left' },
  { id: 21, type: 'petal', startX: 82, startY: 58, size: 14, duration: 8.5, delay: 4.4, rotate: -25, sway: 'right' },
  { id: 22, type: 'leaf', startX: 87, startY: 65, size: 14, duration: 8.0, delay: 2.0, rotate: 50, sway: 'right' },
  { id: 23, type: 'leaf', startX: 92, startY: 72, size: 15, duration: 8.8, delay: 5.2, rotate: -35, sway: 'left' },
  { id: 24, type: 'leaf', startX: 85, startY: 80, size: 13, duration: 7.8, delay: 3.2, rotate: 20, sway: 'right' },

  // --- Upper Arch Zone (Above Text Overlay) ---
  { id: 25, type: 'sparkle', startX: 32, startY: 6, size: 12, duration: 3.5, delay: 0.3, rotate: 0 },
  { id: 26, type: 'sparkle', startX: 68, startY: 7, size: 10, duration: 4.2, delay: 1.7, rotate: 0 },
  { id: 27, type: 'leaf', startX: 25, startY: 10, size: 14, duration: 7.8, delay: 1.1, rotate: 15, sway: 'right' },
  { id: 28, type: 'leaf', startX: 74, startY: 11, size: 15, duration: 8.0, delay: 2.4, rotate: -20, sway: 'left' },
  { id: 29, type: 'leaf', startX: 38, startY: 18, size: 13, duration: 8.2, delay: 3.6, rotate: 30, sway: 'left' },
  { id: 30, type: 'leaf', startX: 62, startY: 17, size: 14, duration: 7.5, delay: 4.6, rotate: -35, sway: 'right' },

  // --- Desktop-Only Outer Margin Accents ---
  { id: 31, type: 'leaf', startX: 16, startY: 12, size: 14, duration: 8.0, delay: 1.4, rotate: -15, sway: 'left', desktopOnly: true },
  { id: 32, type: 'petal', startX: 48, startY: 12, size: 13, duration: 8.4, delay: 2.9, rotate: 20, sway: 'right', desktopOnly: true },
  { id: 33, type: 'leaf', startX: 80, startY: 14, size: 15, duration: 7.8, delay: 3.3, rotate: 30, sway: 'right', desktopOnly: true },
  { id: 34, type: 'leaf', startX: 18, startY: 44, size: 13, duration: 8.5, delay: 4.1, rotate: 40, sway: 'right', desktopOnly: true },
  { id: 35, type: 'leaf', startX: 78, startY: 46, size: 14, duration: 8.1, delay: 5.5, rotate: -40, sway: 'left', desktopOnly: true },
  { id: 36, type: 'petal', startX: 52, startY: 15, size: 14, duration: 8.2, delay: 4.5, rotate: -20, sway: 'left', desktopOnly: true },
  { id: 37, type: 'leaf', startX: 15, startY: 72, size: 14, duration: 8.6, delay: 2.1, rotate: -25, sway: 'left', desktopOnly: true },
  { id: 38, type: 'leaf', startX: 81, startY: 74, size: 15, duration: 8.3, delay: 5.9, rotate: 35, sway: 'right', desktopOnly: true },
]

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  // Pause animations when tab is hidden for high performance
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-ivory-50 flex items-center justify-center min-h-[auto]"
    >
      {/* Desktop Heavily Blurred Backdrop using the SAME image */}
      <div
        className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={CONTENT.config.heroImage}
          alt=""
          width={CONTENT.config.heroImageWidth}
          height={CONTENT.config.heroImageHeight}
          className="w-full h-full object-cover blur-[40px] scale-125 opacity-40 select-none"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-ivory-50/40" />
      </div>

      {/* Main 9:16 Framed Painting Panel */}
      <div
        role="img"
        aria-label={CONTENT.config.heroAlt[lang]}
        className="relative w-full aspect-[9/16] md:w-auto md:h-[100svh] md:max-h-[100svh] md:aspect-[9/16] md:border md:border-gold-500/40 md:shadow-2xl overflow-hidden bg-ivory-100 flex items-center justify-center mx-auto"
      >
        {/* Painting Image with gentle Ken Burns zoom */}
        <motion.img
          src={CONTENT.config.heroImage}
          alt={CONTENT.config.heroAlt[lang]}
          width={CONTENT.config.heroImageWidth}
          height={CONTENT.config.heroImageHeight}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          animate={
            prefersReducedMotion || !isVisible
              ? { scale: 1 }
              : { scale: [1, 1.03, 1] }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gentle Candle-Glow Pulse over Chandelier (x ~50%, y ~10-26%) */}
        {!prefersReducedMotion && (
          <div
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[46%] h-[16%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,225,140,0.55)_0%,rgba(255,200,90,0.25)_40%,transparent_75%)] mix-blend-screen pointer-events-none animate-glow-pulse"
            aria-hidden="true"
          />
        )}

        {/* One-time soft gold shimmer sweep across the arch frame on first load */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden z-10"
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent -skew-x-12 animate-shimmer-sweep pointer-events-none" />
          </div>
        )}

        {/* Ambient Drifting Gold Leaves, Rose Petals, and Sparkles */}
        {!prefersReducedMotion && isVisible && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden z-10"
            aria-hidden="true"
          >
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className={`absolute ${p.desktopOnly ? 'hidden md:block' : ''}`}
                style={{
                  left: `${p.startX}%`,
                  top: `${p.startY}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  y: [0, 55, 110],
                  x: p.sway === 'left' ? [0, -8, 6] : [0, 8, -6],
                  rotate:
                    p.sway === 'left'
                      ? [p.rotate, p.rotate - 30, p.rotate - 60]
                      : [p.rotate, p.rotate + 35, p.rotate + 70],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.15, 0.85, 1],
                }}
              >
                {p.type === 'leaf' && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full text-gold-500 drop-shadow"
                  >
                    <path
                      d="M12 2C7 6 4 12 6 18C8 20 11 21 14 19C19 16 21 8 12 2Z"
                      fill="currentColor"
                      fillOpacity="0.85"
                    />
                    <path
                      d="M6 18C10 14 13 9 17 5"
                      stroke="#7A5C14"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {p.type === 'petal' && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full text-crimson-700 drop-shadow"
                  >
                    <path
                      d="M12 3C8 6 6 11 8 16C9.5 19.5 14.5 19.5 16 16C18 11 16 6 12 3Z"
                      fill="currentColor"
                      fillOpacity="0.8"
                    />
                  </svg>
                )}

                {p.type === 'sparkle' && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-full h-full text-gold-300 drop-shadow"
                  >
                    <path
                      d="M10 0L12.2 7.8L20 10L12.2 12.2L10 20L7.8 12.2L0 10L7.8 7.8L10 0Z"
                      fill="currentColor"
                      fillOpacity="0.9"
                    />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Scaled HTML Text Overlay inside Empty Zone (Top 28% to 58%, Max Width ~70%) */}
        <div
          className="absolute top-[28%] bottom-[42%] left-[14%] right-[14%] flex flex-col items-center justify-center text-center z-20 pointer-events-auto"
        >
          {/* Soft Radial Ivory Glow for pristine legibility */}
          <div
            className="absolute inset-0 -m-3 sm:-m-4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,246,234,0.72)_0%,rgba(251,246,234,0.55)_50%,rgba(251,246,234,0)_80%)] blur-md -z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* 1. Sacred Bismillah in Amiri Crimson */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            lang="ar"
            dir="rtl"
            className="font-arabic text-sm sm:text-base md:text-sm lg:text-[15px] text-crimson-700 tracking-wide select-none drop-shadow-sm leading-tight mb-1"
          >
            {t.bismillah}
          </motion.div>

          {/* 2. Hero Tagline */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-english-sans text-[9px] sm:text-[11px] md:text-[10px] lg:text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-muted mb-1 drop-shadow-sm"
          >
            {t.heroTagline}
          </motion.p>

          {/* 3. Couple Names in Crimson Display */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="font-english-display text-2xl sm:text-3xl md:text-xl lg:text-2xl font-semibold text-crimson-700 tracking-tight leading-snug my-0.5 sm:my-1 drop-shadow-sm"
          >
            {CONTENT.groom.name[lang]}{' '}
            <span className="font-light italic text-gold-700">&</span>{' '}
            {CONTENT.bride.name[lang]}
          </motion.h1>

          {/* 4. Subtitle "Wedding Ceremony" in artistic script */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className={`${
              lang === 'en'
                ? 'font-artistic text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-crimson-700 tracking-wide leading-none my-1'
                : 'font-bangla-serif text-sm sm:text-base font-bold text-crimson-700 tracking-wide my-0.5'
            } drop-shadow-xs`}
          >
            {t.subtitle}
          </motion.p>

          {/* 5. Date Line */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs md:text-[11px] lg:text-xs font-semibold text-gold-700 drop-shadow-sm mt-0.5"
          >
            <Calendar className="w-3.5 h-3.5 text-gold-500 inline-block flex-shrink-0" />
            <span>{t.dateLine}</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
