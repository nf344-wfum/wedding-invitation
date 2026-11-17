import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, Clock, MapPin, Download, Navigation, Check } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { CONTENT } from '../content'
import { downloadCalendarInvite } from '../utils/calendar'
import { GoldDivider, IslamicStar, GoldCorner } from '../assets/decorative-patterns'
import { RevealSection, StaggerContainer, StaggerItem } from './ScrollReveal'

export const Invitation: React.FC = () => {
  const { lang, t } = useLanguage()
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleDownloadCalendar = () => {
    downloadCalendarInvite(lang)
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3500)
  }

  // Selective typographic emphasis for bride and groom's names in crimson-700
  const renderInvitationBody = () => {
    if (lang === 'en') {
      return (
        <>
          Assalamu Alaikum. With the blessings of Allah, we warmly invite you to celebrate the wedding ceremony of{' '}
          <strong className="font-bold text-crimson-700 tracking-wide underline decoration-gold-500/60 decoration-1 underline-offset-4">
            {CONTENT.groom.fullName.en}
          </strong>{' '}
          and{' '}
          <strong className="font-bold text-crimson-700 tracking-wide underline decoration-gold-500/60 decoration-1 underline-offset-4">
            {CONTENT.bride.fullName.en}
          </strong>
          . Your presence and duas would make our celebration truly special.
        </>
      )
    }

    return (
      <>
        আসসালামু আলাইকুম। মহান আল্লাহর অশেষ রহমতে আমাদের প্রিয় সন্তান{' '}
        <strong className="font-bold text-crimson-700 tracking-normal">
          {CONTENT.groom.fullName.bn}
        </strong>{' '}
        ও{' '}
        <strong className="font-bold text-crimson-700 tracking-normal">
          {CONTENT.bride.fullName.bn}
        </strong>
        -র বিবাহ অনুষ্ঠানে আপনাকে আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার উপস্থিতি ও দোয়া আমাদের আনন্দকে পূর্ণতা দেবে।
      </>
    )
  }

  const milestones = [
    {
      step: t.timeline.dateStep,
      icon: <Calendar size={18} className="text-crimson-700" />,
      primary: t.details.date,
      secondary: null,
      highlight: true,
    },
    {
      step: t.timeline.timeStep,
      icon: <Clock size={18} className="text-crimson-700" />,
      primary: t.details.time,
      secondary: t.timeline.lunchReception,
      highlight: false,
    },
    {
      step: t.timeline.venueStep,
      icon: <MapPin size={18} className="text-crimson-700" />,
      primary: t.details.venue,
      secondary: CONTENT.venue.address[lang],
      highlight: false,
    },
  ]

  return (
    <section
      id="invitation"
      className="relative py-12 sm:py-16 px-4 bg-ivory-100 text-ink border-b border-gold-500/25 overflow-hidden bg-watermark-pattern"
    >
      <div className="max-w-2xl mx-auto">
        <RevealSection>
          {/* Merged Invitation & Details Card with printed double border */}
          <div className="relative invitation-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-gold-card">
            {/* Subtle Animated Corner Accents */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-3 left-3 text-gold-500/40 pointer-events-none"
            >
              <GoldCorner position="tl" size={28} />
            </motion.div>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-3 right-3 text-gold-500/40 pointer-events-none"
            >
              <GoldCorner position="tr" size={28} />
            </motion.div>

            {/* Heading */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-ivory-100 border border-gold-500/40 mb-2">
                <IslamicStar size={11} className="text-gold-700" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-gold-700">
                  {lang === 'en' ? 'Warm Welcome' : 'আমন্ত্রণপত্র'}
                </span>
                <IslamicStar size={11} className="text-gold-700" />
              </div>
              <h2 className="font-english-display sm:font-bangla-serif text-2xl sm:text-3xl font-bold text-crimson-700">
                {t.invitationHeading}
              </h2>
              <GoldDivider width="max-w-[160px]" className="my-2" variant="leaf" />
            </div>

            {/* Refined Invitation Body with Emphasized Couple Names */}
            <p className="font-bangla-body text-sm sm:text-base font-normal text-ink leading-relaxed text-center mb-6">
              {renderInvitationBody()}
            </p>

            {/* Family Details Block: Both Parents and Family Addresses with Staggered Entrance */}
            <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-ivory-100/70 border border-gold-500/40 shadow-xs text-left">
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" staggerDelay={0.12}>
                {/* Groom's Family */}
                <StaggerItem className="p-3 sm:p-3.5 rounded-lg bg-ivory-50 border border-gold-500/50 shadow-xs flex flex-col justify-between hover:border-gold-700 transition-colors">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-crimson-700 mb-2">
                      {t.familyBlock.groomParentsTitle}
                    </span>
                    <div className="space-y-1.5 mb-2.5">
                      <p className="text-xs sm:text-sm text-ink">
                        <span className="text-ink-muted text-[11px] sm:text-xs font-medium">{t.familyBlock.fatherLabel}</span>
                        <strong className="font-bold text-ink">{CONTENT.groom.father[lang]}</strong>
                      </p>
                      <p className="text-xs sm:text-sm text-ink">
                        <span className="text-ink-muted text-[11px] sm:text-xs font-medium">{t.familyBlock.motherLabel}</span>
                        <strong className="font-bold text-ink">{CONTENT.groom.mother[lang]}</strong>
                      </p>
                    </div>
                  </div>
                  {CONTENT.config.showFamilyAddresses && (
                    <div className="pt-2 border-t border-gold-500/30 flex items-start gap-1.5 text-xs">
                      <MapPin size={13} className="text-gold-700 shrink-0 mt-0.5" />
                      <p className="text-[11px] sm:text-xs leading-relaxed text-ink">
                        <strong className="font-bold text-gold-700">{t.familyBlock.addressLabel} </strong>
                        <span className="font-medium text-ink-muted">{CONTENT.groom.address[lang]}</span>
                      </p>
                    </div>
                  )}
                </StaggerItem>

                {/* Bride's Family */}
                <StaggerItem className="p-3 sm:p-3.5 rounded-lg bg-ivory-50 border border-gold-500/50 shadow-xs flex flex-col justify-between hover:border-gold-700 transition-colors">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-crimson-700 mb-2">
                      {t.familyBlock.brideParentsTitle}
                    </span>
                    <div className="space-y-1.5 mb-2.5">
                      <p className="text-xs sm:text-sm text-ink">
                        <span className="text-ink-muted text-[11px] sm:text-xs font-medium">{t.familyBlock.fatherLabel}</span>
                        <strong className="font-bold text-ink">{CONTENT.bride.father[lang]}</strong>
                      </p>
                      <p className="text-xs sm:text-sm text-ink">
                        <span className="text-ink-muted text-[11px] sm:text-xs font-medium">{t.familyBlock.motherLabel}</span>
                        <strong className="font-bold text-ink">{CONTENT.bride.mother[lang]}</strong>
                      </p>
                    </div>
                  </div>
                  {CONTENT.config.showFamilyAddresses && (
                    <div className="pt-2 border-t border-gold-500/30 flex items-start gap-1.5 text-xs">
                      <MapPin size={13} className="text-gold-700 shrink-0 mt-0.5" />
                      <p className="text-[11px] sm:text-xs leading-relaxed text-ink">
                        <strong className="font-bold text-gold-700">{t.familyBlock.addressLabel} </strong>
                        <span className="font-medium text-ink-muted">{CONTENT.bride.address[lang]}</span>
                      </p>
                    </div>
                  )}
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Modern Event Timeline / Connected Milestones Layout */}
            <div className="mb-6 relative">
              {/* Timeline Header Badge */}
              <div className="text-center mb-3">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-crimson-700 bg-ivory-100 border border-gold-500/40 px-3 py-0.5 rounded-full">
                  {t.timeline.title}
                </span>
              </div>

              {/* Connected Milestone Progression */}
              <div className="relative">
                {/* Horizontal Desktop Connector Track */}
                <div
                  className="hidden sm:block absolute top-[26px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-gold-500/40 via-crimson-700/40 to-gold-500/40 pointer-events-none z-0"
                  aria-hidden="true"
                />

                {/* Vertical Mobile Connector Track */}
                <div
                  className="sm:hidden absolute top-[28px] bottom-[28px] left-[27px] w-[2px] bg-gradient-to-b from-gold-500/40 via-crimson-700/40 to-gold-500/40 pointer-events-none z-0"
                  aria-hidden="true"
                />

                <StaggerContainer
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10"
                  staggerDelay={0.12}
                >
                  {milestones.map((milestone, idx) => (
                    <StaggerItem
                      key={idx}
                      className="bg-ivory-50 rounded-xl p-3.5 sm:p-4 border border-gold-500/50 shadow-xs flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2 hover:border-gold-700 transition-all hover:shadow-sm"
                    >
                      {/* Node Icon */}
                      <div className="w-9 h-9 rounded-full bg-ivory-100 border-2 border-gold-500/60 shadow-xs flex items-center justify-center text-crimson-700 shrink-0 relative z-10">
                        {milestone.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 sm:w-full">
                        <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-0.5">
                          {milestone.step}
                        </span>
                        <strong className="block text-xs sm:text-sm font-bold text-ink leading-snug">
                          {milestone.primary}
                        </strong>
                        {milestone.secondary && (
                          <span className="block text-[11px] text-ink-muted font-normal mt-0.5 leading-tight">
                            {milestone.secondary}
                          </span>
                        )}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>

            {/* Action Buttons with Micro-Interactions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <motion.button
                type="button"
                onClick={handleDownloadCalendar}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full btn-primary text-xs sm:text-sm font-semibold shadow-crimson-btn cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check size={16} />
                    <span>{lang === 'en' ? 'Added!' : 'যুক্ত হয়েছে!'}</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>{t.details.calendarBtn}</span>
                  </>
                )}
              </motion.button>

              <motion.a
                href={CONTENT.venue.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full btn-secondary text-xs sm:text-sm font-semibold shadow-xs"
              >
                <Navigation size={16} />
                <span>{t.details.directionsBtn}</span>
              </motion.a>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
