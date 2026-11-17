import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Globe, Mail } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

interface NavbarProps {
  onReplayEnvelope?: () => void
  isVisible?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  onReplayEnvelope,
  isVisible = true,
}) => {
  const { lang, toggleLanguage, t } = useLanguage()
  const [isPastHero, setIsPastHero] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const prefersReducedMotion = useReducedMotion()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Track whether the hero has scrolled out of view and which section is active
  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const sections = ['hero', 'invitation', 'venue', 'rsvp']

    const handleScroll = () => {
      // Detect when scrolled past the hero
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect()
        setIsPastHero(rect.bottom <= 64)
      }

      // Detect active section
      const scrollPos = window.scrollY + 140
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i]
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPos >= top) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // IntersectionObserver for hero boundary
    let observer: IntersectionObserver | null = null
    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry) {
            setIsPastHero(entry.boundingClientRect.bottom <= 64)
          }
        },
        {
          rootMargin: '-64px 0px 0px 0px',
          threshold: [0, 0.05, 0.1, 0.5, 1],
        }
      )
      observer.observe(heroEl)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer?.disconnect()
    }
  }, [])

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileMenuOpen])

  // Close mobile menu when navbar is hidden
  useEffect(() => {
    if (!isVisible) {
      setMobileMenuOpen(false)
    }
  }, [isVisible])

  const navItems = [
    { id: 'hero', label: t.nav.home, href: '#hero' },
    { id: 'invitation', label: t.nav.invitation, href: '#invitation' },
    { id: 'venue', label: t.nav.venue, href: '#venue' },
    { id: 'rsvp', label: t.nav.rsvp, href: '#rsvp' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isBn = lang === 'bn'
  const linkFontSize = isBn ? 'text-[16px]' : 'text-[15px]'

  // Glass pill styles (over hero)
  const glassPillClass =
    'bg-[rgba(251,246,234,0.92)] supports-[backdrop-filter]:bg-[rgba(251,246,234,0.72)] backdrop-blur-[8px] [-webkit-backdrop-filter:blur(8px)] border border-[rgba(184,145,58,0.5)] rounded-full shadow-xs'

  // Text halo style for extra safety over gold arch
  const haloStyle: React.CSSProperties = !isPastHero
    ? {
        textShadow:
          '0 0 6px rgba(251, 246, 234, 0.9), 0 0 2px rgba(251, 246, 234, 0.9)',
        letterSpacing: '0.01em',
      }
    : { letterSpacing: '0.01em' }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
          }}
          className={`fixed top-0 left-0 right-0 z-50 w-full ${
            prefersReducedMotion ? '' : 'transition-all duration-200'
          } ${
            isPastHero
              ? 'bg-[var(--ivory-50)] supports-[backdrop-filter]:bg-[rgba(251,246,234,0.94)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] border-b border-[rgba(184,145,58,0.6)] shadow-[0_4px_20px_-2px_rgba(58,42,34,0.06)]'
              : 'bg-transparent border-b-transparent shadow-none'
          }`}
        >
      {/* Light top scrim behind the navbar only (height ~64px + safe area inset) */}
      <div
        className={`absolute inset-x-0 top-0 pointer-events-none ${
          prefersReducedMotion ? '' : 'transition-opacity duration-200'
        } ${isPastHero ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background:
            'linear-gradient(to bottom, rgba(251, 246, 234, 0.55) 0%, rgba(251, 246, 234, 0) 100%)',
          height: 'calc(64px + env(safe-area-inset-top, 0px))',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-2.5 sm:px-6 h-[56px] md:h-16 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className={`flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 rounded-full transition-all ${
            !isPastHero
              ? `${glassPillClass} min-h-[44px] px-3.5 py-1.5 hover:border-gold-700`
              : 'px-2 py-1'
          }`}
          aria-label="Azraf & Huzaifa"
        >
          {/* Mobile Monogram: A & H */}
          <span
            style={haloStyle}
            className="md:hidden font-english-display text-lg font-bold text-crimson-700 tracking-wider whitespace-nowrap"
          >
            A <span className="font-light italic text-gold-700 text-sm">&amp;</span> H
          </span>

          {/* Desktop Brand */}
          <div className="hidden md:flex items-center gap-2">
            <span className="w-7 h-7 rounded-full border border-gold-500/60 bg-ivory-100 flex items-center justify-center font-english-display text-xs font-bold text-crimson-700 shadow-xs">
              AH
            </span>
            <span
              style={haloStyle}
              className="font-english-display text-lg tracking-wider text-crimson-700 font-bold whitespace-nowrap"
            >
              {t.heroTitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                style={haloStyle}
                className={`relative font-semibold ${linkFontSize} transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 whitespace-nowrap ${
                  !isPastHero
                    ? `${glassPillClass} min-h-[40px] px-3.5 py-1.5 ${
                        isActive
                          ? 'text-crimson-700 border-gold-700 shadow-sm'
                          : 'text-ink hover:text-crimson-700 hover:border-gold-700'
                      }`
                    : `px-3.5 py-2 rounded-md ${
                        isActive
                          ? 'text-crimson-700'
                          : 'text-ink hover:text-crimson-700 hover:bg-gold-500/10'
                      }`
                }`}
              >
                {item.label}
                {/* Active indicator underline when on solid bar */}
                {isPastHero && isActive && (
                  <motion.span
                    layoutId="desktop-active-indicator"
                    className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-gold-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Action Controls Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Envelope Replay Button */}
          {onReplayEnvelope && (
            <button
              type="button"
              onClick={onReplayEnvelope}
              style={haloStyle}
              className={`min-h-[44px] flex items-center justify-center gap-1.5 text-crimson-700 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 cursor-pointer ${
                prefersReducedMotion ? '' : 'transition-all duration-200'
              } ${
                !isPastHero
                  ? `${glassPillClass} px-3 py-1.5 hover:border-gold-700`
                  : 'p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border border-gold-500/50 bg-ivory-50 hover:bg-gold-500/15 shadow-xs'
              }`}
              title={t.envelope.replayButton}
              aria-label={t.envelope.replayButton}
            >
              <Mail size={14} className="text-crimson-700 shrink-0" />
              <span className="hidden sm:inline text-xs whitespace-nowrap">
                {t.envelope.replayButton}
              </span>
            </button>
          )}

          {/* Language Toggle (Frosted Glass Pill over hero; sleek pill past hero) */}
          <button
            type="button"
            onClick={toggleLanguage}
            style={haloStyle}
            className={`min-h-[44px] flex items-center justify-center gap-1.5 text-crimson-700 text-xs sm:text-[13px] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 cursor-pointer whitespace-nowrap ${
              prefersReducedMotion ? '' : 'transition-all duration-200'
            } ${
              !isPastHero
                ? `${glassPillClass} px-3 sm:px-3.5 py-1.5 hover:border-gold-700`
                : 'px-3 py-1.5 rounded-full border border-gold-500/60 bg-ivory-50 hover:bg-gold-500/15 shadow-xs'
            }`}
            aria-label={`Switch language to ${lang === 'en' ? 'Bangla' : 'English'}`}
          >
            <Globe size={13} className="text-gold-700 shrink-0" />
            <span className="font-semibold">{lang === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Mobile Hamburger Pill (44x44px target on mobile) */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={haloStyle}
            className={`md:hidden min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 cursor-pointer ${
              prefersReducedMotion ? '' : 'transition-all duration-200'
            } ${
              !isPastHero
                ? `${glassPillClass} text-ink hover:text-crimson-700 hover:border-gold-700`
                : 'rounded-lg text-ink hover:text-crimson-700 hover:bg-gold-500/15'
            }`}
            aria-label={
              lang === 'bn'
                ? mobileMenuOpen
                  ? 'মেনু বন্ধ করুন'
                  : 'মেনু খুলুন'
                : mobileMenuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel opened by Hamburger */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            ref={menuRef}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[var(--ivory-50)] border-b border-[rgba(184,145,58,0.6)] shadow-lg"
          >
            <nav
              className="flex flex-col py-2 px-3 divide-y divide-gold-500/20"
              aria-label="Mobile Navigation"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`min-h-[48px] flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 ${
                      isBn ? 'text-[18px]' : 'text-[17px]'
                    } ${
                      isActive
                        ? 'text-crimson-700 bg-gold-500/15'
                        : 'text-ink hover:text-crimson-700 hover:bg-gold-500/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
