'use client'
import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 25, mass: .4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 h-[3px] origin-left z-[60]
                 bg-gradient-to-r from-brand-blue via-white to-brand-coral pointer-events-none"
    />
  )
}
