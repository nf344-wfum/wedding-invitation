import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useCountdown } from '../hooks/useCountdown'
import { formatNumber, padZero } from '../utils/formatters'

export const CountdownStrip: React.FC = () => {
  const { lang, t } = useLanguage()
  const { days, hours, minutes, seconds, isEventDay, isPostEvent } = useCountdown()
  const prefersReducedMotion = useReducedMotion()

  const units = [
    { label: t.countdownLabels.days, value: formatNumber(days, lang) },
    { label: t.countdownLabels.hours, value: padZero(hours, lang) },
    { label: t.countdownLabels.min, value: padZero(minutes, lang) },
    { label: t.countdownLabels.sec, value: padZero(seconds, lang) },
  ]

  return (
    <section
      aria-label={lang === 'bn' ? 'কাউন্টডাউন' : 'Wedding Countdown'}
      className="w-full bg-crimson-900 text-ivory-50 border-y border-gold-500/30 py-3 sm:py-3.5 px-4 shadow-inner"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Dynamic status message if Event Day or Post Event */}
        {isPostEvent ? (
          <div
            className="w-full py-1 text-center font-english-display text-base sm:text-lg text-gold-300 flex items-center justify-center gap-2"
            aria-live="polite"
          >
            <Heart className="w-4 h-4 text-gold-300 fill-current" />
            <span>{t.countdownStates.postEvent || t.countdownFinished}</span>
            <Heart className="w-4 h-4 text-gold-300 fill-current" />
          </div>
        ) : isEventDay ? (
          <div
            className="w-full py-1 text-center font-english-display text-base sm:text-lg text-gold-300 flex items-center justify-center gap-2"
            aria-live="polite"
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span className="font-semibold">{t.countdownStates.eventDay}</span>
            <Sparkles className="w-4 h-4 text-gold-300" />
          </div>
        ) : (
          <>
            {/* Title / Intro Label */}
            <div className="flex items-center gap-2 text-gold-300 text-xs sm:text-sm font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-300 flex-shrink-0" />
              <span className="uppercase tracking-wider font-english-sans text-[11px] sm:text-xs">
                {lang === 'bn' ? 'শুভ বিবাহের ক্ষণগণনা' : 'Counting Down To Wedding Ceremony'}
              </span>
            </div>

            {/* 4 Countdown Units (Ivory numbers, Gold-300 labels) */}
            <div
              className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-6"
              role="timer"
              aria-live="off"
            >
              {units.map((unit, index) => (
                <div key={unit.label} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[46px] xs:min-w-[54px] sm:min-w-[64px] px-1 py-0.5 rounded-md bg-crimson-950/40 border border-gold-500/20 shadow-2xs">
                    <motion.span
                      key={unit.value}
                      initial={prefersReducedMotion ? {} : { y: -3, opacity: 0.8 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="font-english-display text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-ivory-50 tracking-tight leading-none"
                    >
                      {unit.value}
                    </motion.span>
                    <span className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-gold-300 mt-0.5 uppercase tracking-wider">
                      {unit.label}
                    </span>
                  </div>

                  {/* Elegant gold separator colon */}
                  {index < units.length - 1 && (
                    <span className="text-gold-500/60 text-sm sm:text-base font-light mx-0.5 xs:mx-1 sm:mx-1.5 select-none">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
