'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'
import BlurText from './BlurText'
import TextType from './TextType'

export default function Hero() {
  const { ref, isInView } = useInView()
  const [initiumComplete, setInitiumComplete] = useState(false)
  const [taglineComplete, setTaglineComplete] = useState(false)
  const [showTaglineAnimation, setShowTaglineAnimation] = useState(false)

  // Delay tagline animation until INITIUM BlurText animation completes
  useEffect(() => {
    if (initiumComplete) {
      const timer = setTimeout(() => setShowTaglineAnimation(true), 300)
      return () => clearTimeout(timer)
    }
  }, [initiumComplete])

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

      {/* Content - Left aligned on desktop, centered on mobile */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl md:max-w-3xl"
        >
          {/* Main Content Container */}
          <div className="flex flex-col items-center md:items-start">

            {/* INITIUM with BlurText animation and simple hover effect */}
            <div className="mb-4 md:mb-6 w-full md:w-auto">
              <motion.div
                className="cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isInView && (
                  <BlurText
                    text="INITIUM"
                    delay={100}
                    animateBy="letters"
                    direction="bottom"
                    stepDuration={0.4}
                    triggerOnLoad={isInView}
                    onAnimationComplete={() => setInitiumComplete(true)}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-wider justify-center md:justify-start transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(235,0,40,0.4)]"
                    animationFrom={{ filter: 'blur(12px)', opacity: 0, y: 40 }}
                    animationTo={[
                      { filter: 'blur(6px)', opacity: 0.6, y: 10 },
                      { filter: 'blur(0px)', opacity: 1, y: 0 }
                    ]}
                  />
                )}
                {/* Colored letters overlay for TEDx theme */}
                <style jsx global>{`
                  .blur-text span:nth-child(1) { color: rgba(235, 0, 40, 0.9); }
                  .blur-text span:nth-child(2) { color: rgba(255, 255, 255, 0.85); }
                  .blur-text span:nth-child(3) { color: rgba(255, 255, 255, 0.85); }
                  .blur-text span:nth-child(4) { color: rgba(255, 255, 255, 0.85); }
                  .blur-text span:nth-child(5) { color: rgba(255, 255, 255, 0.85); }
                  .blur-text span:nth-child(6) { color: rgba(255, 255, 255, 0.85); }
                  .blur-text span:nth-child(7) { color: rgba(255, 255, 255, 0.85); }
                  .blur-text:hover span:nth-child(1) { color: rgba(235, 0, 40, 1); text-shadow: 0 0 20px rgba(235, 0, 40, 0.6); }
                  .blur-text:hover span { text-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
                `}</style>
              </motion.div>
            </div>

            {/* Tagline - अंत: अस्ति आरंभ with TextType animation */}
            <AnimatePresence>
              {showTaglineAnimation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8 md:mb-10 group cursor-pointer"
                >
                  <div className="transition-transform duration-300 ease-out group-hover:scale-110">
                    <TextType
                      text="अंत: अस्ति आरंभ"
                      typingSpeed={80}
                      loop={false}
                      showCursor={true}
                      cursorCharacter="।"
                      cursorClassName="text-tedx-red/70"
                      triggerOnLoad={true}
                      onComplete={() => setTaglineComplete(true)}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-tedx-red/80"
                      style={{
                        fontFamily: "'Noto Sans Devanagari', sans-serif",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative line */}
            <AnimatePresence>
              {taglineComplete && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-tedx-red/60 to-transparent origin-left mx-auto md:mx-0"
                />
              )}
            </AnimatePresence>

            {/* Date Banner - appears after animations complete */}
            <AnimatePresence>
              {taglineComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-10 flex flex-col items-center md:items-start"
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
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-4 text-white/40 text-sm md:text-base tracking-wide text-center md:text-left"
                  >
                    National Institute of Technology, Hamirpur
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
