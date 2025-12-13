'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'
import { useState, useEffect } from 'react'

// Typewriter component for animated text with continuous loop
function TypewriterText({
  text,
  delay = 0,
  isInView,
  onComplete,
  cycle
}: {
  text: string;
  delay?: number;
  isInView: boolean;
  onComplete?: () => void;
  cycle: number;
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  // Reset when cycle changes (for looping)
  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setHasStarted(false)
  }, [cycle])

  useEffect(() => {
    if (!isInView) {
      setDisplayedText('')
      setCurrentIndex(0)
      setHasStarted(false)
      return
    }

    // Start typing after the initial delay
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [isInView, delay, cycle])

  useEffect(() => {
    if (!hasStarted || currentIndex >= text.length) {
      // Call onComplete when finished typing
      if (hasStarted && currentIndex >= text.length && onComplete) {
        onComplete()
      }
      return
    }

    const typingSpeed = 80 // milliseconds per character

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [hasStarted, currentIndex, text, onComplete])

  return (
    <span className="text-white block">
      {displayedText}
      {currentIndex < text.length && hasStarted && (
        <motion.span
          className="inline-block w-[4px] h-[0.9em] bg-tedx-red ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  )
}

export default function Hero() {
  const { ref, isInView } = useInView()
  // Animation runs only once on page load (cycle is constant)
  const cycle = 0

  // Calculate when the second line should start (after first line finishes)
  const firstLineText = 'IDEAS WORTH'
  const secondLineText = 'SPREADING'
  const typingSpeed = 80
  const firstLineDelay = 200 // Initial delay before starting
  const secondLineDelay = firstLineDelay + (firstLineText.length * typingSpeed) + 100

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#171717] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/campus.png"
          alt="NIT Hamirpur Campus"
          fill
          className="object-cover"
          style={{
            filter: 'brightness(0.7) contrast(1.1) saturate(0.85)',
          }}
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#171717]/60" />
        {/* Gradient fade to background at bottom - seamless blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-[#171717]" />
        {/* Extra solid cover at very bottom for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#171717] via-[#171717] to-transparent" />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight uppercase">
            <TypewriterText text={firstLineText} delay={firstLineDelay} isInView={isInView} cycle={cycle} />
            <TypewriterText text={secondLineText} delay={secondLineDelay} isInView={isInView} cycle={cycle} />
          </h1>

          <motion.p
            className="text-tedx-red text-xl md:text-2xl font-bold mb-6 uppercase tracking-wide"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            FEBRUARY 14, 2026
          </motion.p>

          <motion.p
            className="text-white text-base md:text-lg mb-10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            National Institute of Technology, Hamirpur
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="bg-tedx-red hover:bg-tedx-red-dark text-white px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Apply to Speak
            </button>
            <button className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Get Tickets
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
