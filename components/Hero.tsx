'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'

export default function Hero() {
  const { ref, isInView } = useInView()

  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center bg-[#080808] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/campus.webp"
          alt="NIT Hamirpur Campus"
          fill
          className="object-cover"
          style={{
            filter: 'brightness(0.8) contrast(1.15) saturate(0.7) sepia(0.1)',
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

            {/* INCHOATION - Static text with hover effect */}
            <div className="mb-4 md:mb-6 w-full md:w-auto">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wider text-center md:text-left cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:drop-shadow-[0_0_25px_rgba(235,0,40,0.4)]"
              >
                <span className="text-tedx-red">I</span>
                <span className="text-white/85">NCHOATION</span>
              </h1>
            </div>

            {/* Tagline - अंत: अस्ति आरंभ - Static text */}
            <div className="mb-8 md:mb-10 w-full md:w-auto">
              <p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-tedx-red/80 text-center md:text-left cursor-pointer transition-transform duration-300 hover:scale-110"
                style={{
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                }}
              >
                अंत: अस्ति आरंभ:
              </p>
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-tedx-red/60 to-transparent origin-left mx-auto md:mx-0"
            />

            {/* Date Banner - Premium Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-col items-center md:items-start"
            >
              {/* Date Display - Modern Split Design */}
              <div className="group relative">
                {/* Subtle glow effect on hover */}
                <div className="absolute -inset-2 bg-tedx-red/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-center gap-3 sm:gap-4">
                  {/* Large Date Number */}
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                    14<sup className="text-xl sm:text-2xl md:text-3xl font-bold align-super">th</sup>
                  </span>

                  {/* Vertical Accent Line */}
                  <div className="w-[2px] sm:w-[3px] h-10 sm:h-14 md:h-16 lg:h-20 bg-gradient-to-b from-tedx-red via-tedx-red/60 to-transparent rounded-full" />

                  {/* Month & Year Stack */}
                  <div className="flex flex-col justify-center">
                    <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-tedx-red uppercase tracking-widest">
                      FEBRUARY
                    </span>
                    <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light text-white/50 tracking-[0.2em] sm:tracking-[0.3em]">
                      2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Location with icon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 flex items-center gap-2 text-white/40"
              >
                <svg className="w-4 h-4 text-tedx-red/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm md:text-base tracking-wide">
                  National Institute of Technology, Hamirpur
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
