'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'

export default function Hero() {
  const { ref, isInView } = useInView()

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-black overflow-hidden">
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
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-70% to-black" />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight uppercase"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white block">IDEAS WORTH</span>
            <span className="text-white block">SPREADING</span>
          </motion.h1>

          <motion.p
            className="text-tedx-red text-xl md:text-2xl font-bold mb-6 uppercase tracking-wide"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            FEBRUARY 13, 2026
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
