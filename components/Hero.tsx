'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'
import DecryptedText from './DecryptedText'
import ScrambledText from './ScrambledText'

// Theme animation sequence component
function ThemeReveal({ isInView }: { isInView: boolean }) {
  const [phase, setPhase] = useState(0)
  // Phase 0: Show nothing
  // Phase 1: Show "Initium" 
  // Phase 2: Show tagline
  // Phase 3: Show both together (final state)

  useEffect(() => {
    if (!isInView) return

    const timings = [
      300,   // Wait before starting
      1500,  // Initium display time
      2000,  // Tagline display time
    ]

    const timer1 = setTimeout(() => setPhase(1), timings[0])
    const timer2 = setTimeout(() => setPhase(2), timings[0] + timings[1])
    const timer3 = setTimeout(() => setPhase(3), timings[0] + timings[1] + timings[2])

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [isInView])

  const titleLetters = ['I', 'N', 'I', 'T', 'I', 'U', 'M']

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: {
      y: 60,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    }
  }

  return (
    <div className="flex flex-col items-start">
      {/* Main Title - INITIUM with scramble hover effect */}
      <AnimatePresence mode="wait">
        {phase >= 1 && (
          <motion.div
            key="initium"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-2 md:mb-4"
          >
            <h1 className="flex items-center">
              <motion.div variants={letterVariants}>
                <ScrambledText
                  text="INITIUM"
                  radius={80}
                  duration={0.6}
                  speed={0.25}
                  scrambleChars=".:!@#$%&*XYZABC"
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white/90 tracking-wide hover:text-tedx-red/90 transition-colors duration-300"
                />
              </motion.div>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tagline - Hindi with DecryptedText effect */}
      <AnimatePresence mode="wait">
        {phase >= 2 && (
          <motion.div
            key="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-10"
          >
            <DecryptedText
              text="अंत: अस्ति आरंभ"
              speed={60}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              className="text-tedx-red/80"
              encryptedClassName="text-white/30"
              parentClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide"
              style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative line */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-tedx-red/60 to-transparent origin-left"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  const { ref, isInView } = useInView()

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#080808] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/campus.png"
          alt="NIT Hamirpur Campus"
          fill
          className="object-cover"
          style={{
            filter: 'brightness(0.35) contrast(1.15) saturate(0.7) sepia(0.1)',
          }}
          priority
          quality={90}
        />
        {/* Red-tinted Dark Overlay - warmer, less blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0505]/75 via-[#080808]/70 to-[#080505]/75" />
        {/* Subtle red glow at edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EB0028]/3 via-transparent to-[#EB0028]/3" />
        {/* Gradient fade to background at bottom - seamless blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-[#080808]" />
        {/* Extra solid cover at very bottom for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] via-[#080808] to-transparent" />
      </div>

      {/* Content - Left aligned */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {/* Theme Reveal Animation */}
          <ThemeReveal isInView={isInView} />

          {/* Date Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 3.5 }}
            className="mt-10 flex flex-col items-start"
          >
            {/* Date Display */}
            <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-lg border border-tedx-red/20 bg-[#080808]/60 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90">
                14
              </span>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-base sm:text-lg md:text-xl font-semibold text-tedx-red/80 uppercase tracking-wider">
                  FEB
                </span>
                <span className="text-xs sm:text-sm text-white/40">
                  2026
                </span>
              </div>
            </div>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 4 }}
              className="mt-4 text-white/40 text-sm md:text-base tracking-wide"
            >
              National Institute of Technology, Hamirpur
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
