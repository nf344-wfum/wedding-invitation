import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
}

/**
 * Reusable scroll-reveal container.
 * Gently fades in while translating upward ~24px as it scrolls into view.
 * Triggered once with smooth cubic-bezier easing.
 */
export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -20px 0px', amount: 0.1 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

/**
 * Container that reveals child StaggerItems in sequence.
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0.05,
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -20px 0px', amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  yOffset?: number
}

/**
 * Individual item inside a StaggerContainer.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  yOffset = 18,
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
