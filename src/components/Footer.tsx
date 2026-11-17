import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { IslamicStar } from '../assets/decorative-patterns'
import { RevealSection } from './ScrollReveal'

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage()

  return (
    <footer id="footer" className="py-10 px-4 bg-crimson-900 text-ivory-50 border-t border-gold-500/30 text-center">
      <RevealSection className="max-w-xl mx-auto space-y-4">
        {/* Short Statement */}
        <p className="font-english-display sm:font-bangla-serif text-base sm:text-lg font-semibold text-gold-300">
          {t.footer.presence}
        </p>

        {/* Sacred Sunnah Dua */}
        <div className="p-4 sm:p-5 rounded-xl bg-crimson-900/60 border border-gold-500/40 shadow-sm max-w-md mx-auto">
          <div
            lang="ar"
            dir="rtl"
            className="font-arabic text-lg sm:text-xl text-gold-300 mb-1.5 leading-relaxed select-none"
          >
            {t.footer.duaArabic}
          </div>
          <p className="text-xs sm:text-sm text-ivory-100/90 leading-relaxed font-bangla-body">
            {t.footer.duaTranslation}
          </p>
        </div>

        {/* Understated Monogram & Year */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gold-300/80 pt-2">
          <IslamicStar size={11} className="text-gold-500" />
          <span className="font-english-sans tracking-wider">{lang === 'en' ? 'Azraf & Huzaifa' : 'আজরাফ ও হুজাইফা'} • 2027</span>
          <IslamicStar size={11} className="text-gold-500" />
        </div>
      </RevealSection>
    </footer>
  )
}
