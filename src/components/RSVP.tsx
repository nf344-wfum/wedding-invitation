import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageCircle, Phone, ChevronDown, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { CONTENT } from '../content'
import { GoldDivider, IslamicStar } from '../assets/decorative-patterns'
import { RevealSection, StaggerContainer, StaggerItem } from './ScrollReveal'

export const RSVP: React.FC = () => {
  const { lang, t } = useLanguage()
  const [accordionOpen, setAccordionOpen] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  const encodedMessage = encodeURIComponent(CONTENT.contact.whatsappMessage[lang])
  const whatsappUrl = `${CONTENT.contact.whatsappRsvp.url}?text=${encodedMessage}`
  const phoneUrl = CONTENT.contact.informationPhone.telUrl

  return (
    <section id="rsvp" className="relative py-12 sm:py-16 px-4 bg-ivory-100 text-ink border-t border-gold-500/25 bg-watermark-pattern">
      <div className="max-w-xl mx-auto text-center">
        {/* Primary Elevated RSVP Card - 100% Permanently Visible without Toggle */}
        <RevealSection>
          <div className="invitation-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-gold-card mb-6">
            {/* Card Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-ivory-100 border border-gold-500/40 mb-2 shadow-xs">
              <IslamicStar size={11} className="text-gold-700" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold-700">
                {lang === 'en' ? 'Confirmation' : 'সম্মতি জ্ঞাপন'}
              </span>
              <IslamicStar size={11} className="text-gold-700" />
            </div>

            {/* Heading */}
            <h2 className="font-english-display sm:font-bangla-serif text-2xl sm:text-3xl font-bold text-crimson-700">
              {t.rsvpHeading}
            </h2>

            {/* Helper Text */}
            <p className="text-xs sm:text-sm text-ink-muted mt-1.5 max-w-md mx-auto font-normal">
              {t.rsvpHelper}
            </p>
            <GoldDivider width="max-w-[140px]" className="my-3" variant="ring" />

            {/* WhatsApp & Call Action Buttons with Micro-Interactions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-4">
              {/* WhatsApp RSVP: #0B5B4A background with white text (passes WCAG AA at 8.05:1) */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98, y: 0 }}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full btn-whatsapp font-bold text-sm shadow-md cursor-pointer"
                aria-label={`${t.buttons.whatsapp}: ${CONTENT.contact.whatsappRsvp.display}`}
              >
                <MessageCircle size={19} className="fill-white/20 stroke-white" />
                <span>{t.buttons.whatsapp}</span>
              </motion.a>

              {/* Direct Telephone Call for Event Information: secondary style (gold-700 border & text) */}
              <motion.a
                href={phoneUrl}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98, y: 0 }}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full btn-secondary font-bold text-sm shadow-xs cursor-pointer"
                aria-label={`${t.buttons.call}: ${CONTENT.contact.informationPhone.display}`}
              >
                <Phone size={18} className="text-gold-700" />
                <span>{t.buttons.call}</span>
              </motion.a>
            </div>

            {/* Event Information Phone Number Display Info (Clickable for mobile 1-tap call) */}
            <motion.a
              href={phoneUrl}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory-100 border border-gold-500/50 text-xs text-ink-muted hover:border-crimson-700 hover:text-crimson-700 transition-colors shadow-2xs active:scale-98 cursor-pointer"
              aria-label={`Call ${CONTENT.contact.informationPhone.display}`}
            >
              <CheckCircle2 size={14} className="text-crimson-700 shrink-0" />
              <span>
                {t.rsvpContactLabel}
                <strong className="text-crimson-700 tracking-wider font-bold ml-1 underline decoration-gold-500/50 underline-offset-2">
                  {lang === 'en'
                    ? CONTENT.contact.informationPhone.display
                    : CONTENT.contact.informationPhone.displayBn}
                </strong>
              </span>
            </motion.a>
          </div>
        </RevealSection>

        {/* Collapsible Hosts & Welcome Committee Accordion */}
        <RevealSection delay={0.1}>
          <div className="bg-ivory-50 rounded-2xl border border-gold-500/50 shadow-xs overflow-hidden text-left">
            <button
              type="button"
              data-testid="accordion-toggle"
              aria-label="Toggle Hosts & Welcome Committee"
              aria-controls="hosts-accordion-content"
              onClick={() => setAccordionOpen(!accordionOpen)}
              aria-expanded={accordionOpen}
              className="w-full flex items-center justify-between p-4 sm:p-4.5 text-xs sm:text-sm font-semibold text-ink hover:text-crimson-700 hover:bg-gold-500/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <IslamicStar size={14} className="text-gold-700" />
                <span className="font-bold text-crimson-700">{t.accordion.title}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-ink-muted font-normal">
                <span>{accordionOpen ? (lang === 'en' ? 'Hide' : 'সংক্ষেপ') : (lang === 'en' ? 'View details' : 'বিস্তারিত')}</span>
                <ChevronDown
                  size={16}
                  className={`text-crimson-700 transition-transform duration-300 ${
                    accordionOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {accordionOpen && (
                <motion.div
                  id="hosts-accordion-content"
                  initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 pt-0 border-t border-gold-500/30 text-xs sm:text-sm space-y-4">
                    {/* Hosts (With love / দাওয়াতান্তে) */}
                    <div className="bg-ivory-100/60 rounded-xl p-3 sm:p-3.5 border border-gold-500/30">
                      <h4 className="font-english-display italic text-crimson-700 text-sm sm:text-base font-semibold mb-1">
                        {t.accordion.withLove}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-ink font-semibold">
                        {CONTENT.hosts.members.map((member, idx) => (
                          <span key={idx} className="text-xs sm:text-sm tracking-wide">
                            {member[lang]}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Welcoming Committee with Staggered Entrance (Welcoming you / অভ্যর্থনায়) */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <IslamicStar size={11} className="text-gold-700" />
                        <h4 className="font-bold text-gold-700 uppercase tracking-widest text-[11px]">
                          {t.accordion.welcoming}
                        </h4>
                      </div>
                      <StaggerContainer className="flex flex-wrap gap-1.5 sm:gap-2" staggerDelay={0.03}>
                        {CONTENT.welcomingCommittee.members.map((member, idx) => (
                          <StaggerItem key={idx}>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-b from-[#FFFDF9] to-[#F5ECE0] border border-gold-500/50 text-ink text-xs sm:text-[13px] font-medium shadow-[0_1px_2px_rgba(184,145,58,0.12)] hover:border-gold-700 hover:text-crimson-700 transition-colors">
                              {member[lang]}
                            </span>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
