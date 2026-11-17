import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useAnimationControls } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { IslamicStar } from '../assets/decorative-patterns'

interface InvitationEnvelopeProps {
  isOpen: boolean
  onOpen: () => void
  onClose?: () => void
}

export const InvitationEnvelope: React.FC<InvitationEnvelopeProps> = ({
  isOpen,
  onOpen,
}) => {
  const { lang, t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()

  const [isOpening, setIsOpening] = useState(false)

  // Motion controls for coordinated, uninterrupted animations
  const flapControls = useAnimationControls()
  const cardControls = useAnimationControls()
  const baseControls = useAnimationControls()
  const pocketControls = useAnimationControls()
  const sealControls = useAnimationControls()
  const uiControls = useAnimationControls()

  // Direct DOM refs for discrete stacking changes without React re-render interruptions
  const flapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const isCancelledRef = useRef(false)
  const isRunningRef = useRef(false)
  const timeoutsRef = useRef<number[]>([])

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id))
    timeoutsRef.current = []
  }, [])

  // Cancellable sleep utility
  const sleep = useCallback((ms: number) => {
    return new Promise<void>((resolve, reject) => {
      const id = window.setTimeout(() => {
        if (isCancelledRef.current) {
          reject(new Error('Animation cancelled'))
        } else {
          resolve()
        }
      }, ms)
      timeoutsRef.current.push(id)
    })
  }, [])

  // Reset or cancel animations when isOpen changes or unmounts
  useEffect(() => {
    if (isOpen) {
      isCancelledRef.current = false
      isRunningRef.current = false
      setIsOpening(false)

      // Reset layer stacking
      if (flapRef.current) flapRef.current.style.zIndex = '4'
      if (cardRef.current) cardRef.current.style.zIndex = '2'

      // Initialize all motion controls to their baseline closed state
      flapControls.set({ rotateX: 0, y: 0, opacity: 1, scale: 1 })
      cardControls.set({
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      })
      baseControls.set({ y: 0, opacity: 1, scale: 1 })
      pocketControls.set({ y: 0, opacity: 1, scale: 1 })
      sealControls.set({ scale: 1, opacity: 1 })
      uiControls.set({ opacity: 1, y: 0 })
    } else {
      isCancelledRef.current = true
      isRunningRef.current = false
      clearAllTimeouts()
      flapControls.stop()
      cardControls.stop()
      baseControls.stop()
      pocketControls.stop()
      sealControls.stop()
      uiControls.stop()
    }

    return () => {
      isCancelledRef.current = true
      clearAllTimeouts()
    }
  }, [
    isOpen,
    clearAllTimeouts,
    flapControls,
    cardControls,
    baseControls,
    pocketControls,
    sealControls,
    uiControls,
  ])

  // Prevent background scrolling while envelope overlay is active
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isOpen])

  // Continuous, silky-smooth 0.8s opening sequence
  const handleStartOpen = useCallback(async () => {
    if (isRunningRef.current || isOpening) return
    isRunningRef.current = true
    setIsOpening(true)
    clearAllTimeouts()

    // Reduced motion mode: gentle 0.4s crossfade
    if (prefersReducedMotion) {
      try {
        if (cardRef.current) cardRef.current.style.zIndex = '10'
        await Promise.all([
          baseControls.start({ opacity: 0, transition: { duration: 0.4 } }),
          pocketControls.start({ opacity: 0, transition: { duration: 0.4 } }),
          flapControls.start({ opacity: 0, transition: { duration: 0.4 } }),
          sealControls.start({ opacity: 0, transition: { duration: 0.4 } }),
          uiControls.start({ opacity: 0, transition: { duration: 0.4 } }),
          cardControls.start({
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.4 },
          }),
        ])
        sessionStorage.setItem('envelope_opened', 'true')
        onOpen()
      } catch {
        // cancelled
      } finally {
        isRunningRef.current = false
        setIsOpening(false)
      }
      return
    }

    try {
      // 1. Break wax seal & swing flap open seamlessly
      sealControls.start({
        scale: 1.25,
        opacity: 0,
        transition: { duration: 0.35, ease: 'easeOut' },
      })

      flapControls.start({
        rotateX: 180,
        transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1] as const },
      })

      // Fade out the buttons and top badge smoothly
      uiControls.start({
        opacity: 0,
        y: 12,
        transition: { duration: 0.35, ease: 'easeOut' },
      })

      // At 220ms (as flap rotates past 90deg edge-on), move flap behind and glide card up
      await sleep(220)
      if (flapRef.current) {
        flapRef.current.style.zIndex = '1'
      }
      if (cardRef.current) {
        cardRef.current.style.zIndex = '10'
      }

      // 2. Card emerges smoothly into view while envelope softly recedes
      await Promise.all([
        cardControls.start({
          y: '-20%',
          scale: 1.04,
          opacity: 1,
          boxShadow: '0 25px 50px -12px rgba(58, 42, 34, 0.4)',
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
        }),
        baseControls.start({
          opacity: 0,
          scale: 0.96,
          y: 24,
          transition: { duration: 0.55, ease: 'easeOut', delay: 0.08 },
        }),
        pocketControls.start({
          opacity: 0,
          scale: 0.96,
          y: 24,
          transition: { duration: 0.55, ease: 'easeOut', delay: 0.08 },
        }),
      ])

      // 3. Complete handoff to page with seamless fade
      sessionStorage.setItem('envelope_opened', 'true')
      onOpen()
    } catch {
      // Cancelled cleanly on unmount or reset
    } finally {
      isRunningRef.current = false
      setIsOpening(false)
    }
  }, [
    isOpening,
    prefersReducedMotion,
    onOpen,
    sleep,
    clearAllTimeouts,
    flapControls,
    cardControls,
    baseControls,
    pocketControls,
    sealControls,
    uiControls,
  ])

  // Support keyboard accessibility: Enter to open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isRunningRef.current) {
        handleStartOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleStartOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        role="dialog"
        aria-modal="true"
        aria-label={t.envelope.tagline}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-crimson-950/75 backdrop-blur-md overflow-hidden select-none"
      >
        {/* Ambient Warm Golden Glow */}
        <div className="absolute -inset-10 bg-radial from-gold-500/20 via-crimson-900/10 to-transparent pointer-events-none blur-3xl" />

        {/* Outer Wrapper */}
        <div className="w-full max-w-[310px] min-[390px]:max-w-[340px] sm:max-w-[420px] flex flex-col items-center overflow-visible">
          {/* Sacred Bismillah on Ivory Badge for Maximum Legibility & Contrast */}
          <motion.div
            animate={uiControls}
            initial={{ opacity: 1, y: 0 }}
            className="text-center mb-3"
          >
            <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#FBF6EA] border border-gold-500/50 shadow-md">
              <p
                lang="ar"
                dir="rtl"
                style={{ color: '#000000' }}
                className="font-arabic text-xl sm:text-2xl font-bold tracking-wide leading-relaxed select-none"
              >
                {t.envelope.bismillah}
              </p>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-ink mt-0.5">
                {t.envelope.tagline}
              </p>
            </div>
          </motion.div>

          {/* 3D Envelope Container (Perspective on parent, relative, overflow: visible) */}
          <div className="relative w-full aspect-[4/3] [perspective:1200px] overflow-visible">
            {/* 1. The Envelope Base / Backplate (z-index 1) */}
            <motion.div
              animate={baseControls}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              style={{ zIndex: 1 }}
              className="absolute inset-0 bg-[#F6EEDC] rounded-2xl border-2 border-gold-500/50 shadow-2xl overflow-hidden"
            >
              {/* Subtle Paper Texture Lines */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 via-ivory-50/60 to-gold-300/10" />
            </motion.div>

            {/* 2. Top Triangular Flap (z-index 4 closed, switches to z-index 1 at halfway 0.4s) */}
            <motion.div
              ref={flapRef}
              animate={flapControls}
              initial={{ rotateX: 0, y: 0, opacity: 1, scale: 1 }}
              style={{
                transformOrigin: 'top center',
                zIndex: 4,
              }}
              className="absolute inset-x-0 top-0 h-[52%] pointer-events-none"
            >
              <svg className="w-full h-full drop-shadow-md" viewBox="0 0 400 156" preserveAspectRatio="none">
                <polygon points="0,0 400,0 200,156" fill="#F2E6CE" />
                <path d="M0,0 L200,156 L400,0" stroke="#DFCFAB" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>

            {/* 3. The Inner Invitation Card (Starts at z-index 2, switches to z-index 10 at 1.9s) */}
            <motion.div
              ref={cardRef}
              animate={cardControls}
              initial={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
              style={{
                zIndex: 2,
              }}
              className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 bottom-3 sm:bottom-4 max-w-[88vw] max-h-[80svh] bg-[#FBF6EA] rounded-xl border border-gold-500/60 shadow-lg p-3 sm:p-5 flex flex-col items-center justify-center text-center select-none"
            >
              {/* Card Gold Trim Border */}
              <div className="w-full h-full rounded-lg border border-gold-500/35 p-3 flex flex-col items-center justify-between">
                <IslamicStar size={14} className="text-gold-700" />
                <div>
                  <span
                    className={`block mb-1 text-crimson-700 ${
                      lang === 'en'
                        ? 'font-artistic text-xl sm:text-2xl leading-none'
                        : 'font-bangla-serif text-xs sm:text-sm font-bold uppercase tracking-wider'
                    }`}
                  >
                    {lang === 'en' ? 'Wedding Ceremony' : 'বিবাহ অনুষ্ঠান'}
                  </span>
                  <h3 className="font-english-display sm:font-bangla-serif text-lg sm:text-2xl font-bold text-crimson-700">
                    {t.envelope.coupleNames}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-ink-muted mt-0.5 font-medium">
                    {t.dateLine}
                  </p>
                </div>
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              </div>
            </motion.div>

            {/* 4. Front Pocket: Left & Right Geometric Folds (z-index 3) */}
            <motion.div
              animate={pocketControls}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              style={{ zIndex: 3 }}
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            >
              {/* Left Triangle Fold */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                <polygon points="0,0 0,300 200,165" fill="#EFE3CA" />
                {/* Right Triangle Fold */}
                <polygon points="400,0 400,300 200,165" fill="#E8D9BD" />
                {/* Bottom Triangle Fold */}
                <polygon points="0,300 400,300 200,150" fill="#FBF6EA" />
                <path d="M0,300 L200,150 L400,300" stroke="#DFCFAB" strokeWidth="1.5" fill="none" />
              </svg>

              {/* Monogram on Bottom Flap when closed */}
              <div className="absolute bottom-3 inset-x-0 text-center">
                <span className="font-english-display text-xs sm:text-sm font-bold tracking-widest text-crimson-700/80 uppercase">
                  Azraf &amp; Huzaifa
                </span>
              </div>
            </motion.div>

            {/* 5. Centered Wax Seal (z-index 5, fades out during Phase 1) */}
            <div
              style={{ zIndex: 5 }}
              className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <motion.div
                animate={sealControls}
                initial={{ scale: 1, opacity: 1 }}
                onClick={handleStartOpen}
                whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#8F2336] via-[#7A1F2E] to-[#5E1520] text-gold-300 border-2 border-gold-300/85 shadow-xl flex items-center justify-center p-1 pointer-events-auto cursor-pointer"
                title={t.envelope.openButton}
              >
                {/* Wax Seal Outer Ruffled Rim */}
                <div className="w-full h-full rounded-full border border-gold-300/40 flex flex-col items-center justify-center">
                  <IslamicStar size={10} className="text-gold-300/90 mb-0.5" />
                  <span className="font-english-display text-sm sm:text-base font-bold tracking-wider text-gold-300 leading-none">
                    A&amp;H
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Primary Action Button: Open Invitation */}
          <motion.div
            animate={uiControls}
            initial={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col items-center gap-2.5 w-full"
          >
            <motion.button
              type="button"
              disabled={isOpening}
              onClick={handleStartOpen}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-primary text-ivory-50 font-bold text-sm sm:text-base shadow-crimson-btn flex items-center justify-center gap-2.5 border border-gold-500/40 cursor-pointer transition-all disabled:opacity-75"
            >
              {isOpening ? (
                <>
                  <Sparkles size={18} className="animate-spin text-gold-300" />
                  <span>{lang === 'en' ? 'Opening...' : 'খুলছে...'}</span>
                </>
              ) : (
                <>
                  <Mail size={18} className="text-gold-300" />
                  <span>{t.envelope.openButton}</span>
                </>
              )}
            </motion.button>

            <div className="mt-1">
              <span
                style={{ color: '#000000' }}
                className="inline-block px-3.5 py-1 rounded-full bg-[#FBF6EA] border border-gold-500/40 shadow-sm text-xs font-semibold tracking-wide text-black select-none"
              >
                {lang === 'en' ? 'Click to open or press Enter' : 'খুলতে ক্লিক করুন অথবা Enter চাপুন'}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
