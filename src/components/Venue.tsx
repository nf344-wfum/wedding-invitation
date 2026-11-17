import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { CONTENT } from '../content'
import { GoldDivider, IslamicStar } from '../assets/decorative-patterns'
import { RevealSection } from './ScrollReveal'

export const Venue: React.FC = () => {
  const { lang, t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()

  if (!CONTENT.config.showMap) return null

  return (
    <section id="venue" className="relative py-12 sm:py-16 px-4 bg-ivory-50 text-ink">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <RevealSection>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-ivory-100 border border-gold-500/40 mb-2 shadow-xs">
              <IslamicStar size={11} className="text-gold-700" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold-700">
                {lang === 'en' ? 'Location' : 'ভেন্যু'}
              </span>
              <IslamicStar size={11} className="text-gold-700" />
            </div>
            <h2 className="font-english-display sm:font-bangla-serif text-2xl sm:text-3xl font-bold text-crimson-700">
              {t.venueHeading}
            </h2>
            <GoldDivider width="max-w-[140px]" className="my-2" variant="ring" />
          </div>
        </RevealSection>

        {/* Address Card */}
        <RevealSection delay={0.08}>
          <div className="invitation-card rounded-2xl p-4 sm:p-5 shadow-gold-card mb-4 text-center hover:border-gold-700 transition-colors">
            <div className="flex items-center justify-center gap-2 text-crimson-700 font-bold text-sm sm:text-base mb-1">
              <MapPin size={18} className="shrink-0 text-gold-700" />
              <span>{CONTENT.venue.name[lang]}</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted font-medium">
              {CONTENT.venue.address[lang]}
            </p>
          </div>
        </RevealSection>

        {/* Compact Map Container with thin gold frame (1px gold-500 at 60%) */}
        <RevealSection delay={0.16}>
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-gold-500/60 shadow-gold-card bg-ivory-100">
            <iframe
              title={lang === 'en' ? 'Xinxian Restaurant & Event Space Google Map' : 'জিনজিয়ান রেস্টুরেন্ট অ্যান্ড ইভেন্ট স্পেস গুগল ম্যাপ'}
              src={CONTENT.venue.googleMapsEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Direct Link Below Map with Micro-Interaction */}
          <div className="mt-3.5 text-center">
            <motion.a
              href={CONTENT.venue.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full btn-secondary text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <ExternalLink size={13} />
              <span>{t.details.directionsBtn}</span>
            </motion.a>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
