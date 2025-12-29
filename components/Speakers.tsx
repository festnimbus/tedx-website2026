'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'
import { useState, useRef } from 'react'
import Link from 'next/link'
import FuzzyText from './FuzzyText'
// import CardSwap, { Card } from './CardSwap' // COMMENTED OUT - Will be used when speakers are announced

const speakers = [
  {
    id: 1,
    name: 'Speaker One',
    profession: 'AI Researcher',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Speaker Two',
    profession: 'Social Entrepreneur',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Speaker Three',
    profession: 'Neuroscientist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Speaker Four',
    profession: 'Climate Activist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Speaker Five',
    profession: 'Tech Entrepreneur',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Speaker Six',
    profession: 'Space Scientist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
]

/* ============================================
   SPEAKER CARD COMPONENTS - COMMENTED OUT
   Uncomment these when speakers are announced
   ============================================ */

// Speaker Card Component
// function SpeakerCard({ speaker }: { speaker: typeof speakers[0] }) {
//   return (
//     <div className="w-full h-full p-4 flex flex-col">
//       {/* Image */}
//       <div className="relative flex-1 rounded-lg overflow-hidden mb-4">
//         <Image
//           src={speaker.image}
//           alt={speaker.name}
//           fill
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
//       </div>

//       {/* Info */}
//       <div className="text-center">
//         <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
//         <p className="text-tedx-red/80 text-sm font-medium uppercase tracking-wider">
//           {speaker.profession}
//         </p>
//       </div>
//     </div>
//   )
// }

// Mobile Swipe Card Component
// function MobileSwipeCards() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const touchStartX = useRef(0)
//   const touchEndX = useRef(0)

//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX
//   }

//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndX.current = e.touches[0].clientX
//   }

//   const handleTouchEnd = () => {
//     const diff = touchStartX.current - touchEndX.current
//     const threshold = 50

//     if (diff > threshold) {
//       // Swipe left - next card
//       setCurrentIndex((prev) => (prev + 1) % speakers.length)
//     } else if (diff < -threshold) {
//       // Swipe right - previous card
//       setCurrentIndex((prev) => (prev - 1 + speakers.length) % speakers.length)
//     }
//   }

//   return (
//     <div className="w-full flex flex-col items-center">
//       {/* Card Container */}
//       <div
//         className="relative w-[300px] h-[380px] touch-pan-y"
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -50 }}
//           transition={{ duration: 0.3 }}
//           className="w-full h-full rounded-xl border border-tedx-red/30 bg-[#0a0a0a] overflow-hidden"
//           style={{ boxShadow: '0 0 25px rgba(235, 0, 40, 0.25)' }}
//         >
//           <SpeakerCard speaker={speakers[currentIndex]} />
//         </motion.div>
//       </div>

//       {/* Dots Indicator */}
//       <div className="flex gap-2 mt-6">
//         {speakers.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
//               ? 'bg-tedx-red w-6'
//               : 'bg-white/30 hover:bg-white/50'
//               }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

/* ============================================
   END OF COMMENTED OUT SPEAKER CARD COMPONENTS
   ============================================ */

// Coming Soon Component with FuzzyText effect
function ComingSoonDisplay({ isMobile = false }: { isMobile?: boolean }) {
  // Improved responsive sizing that works better across all devices
  const fontSize = isMobile
    ? "clamp(2.5rem, 15vw, 4.5rem)"  // Mobile: min 40px, max 72px
    : "clamp(4rem, 10vw, 8rem)"       // Desktop: min 64px, max 128px

  return (
    <div className="flex flex-col items-center justify-center gap-0 py-4 md:py-8">
      <FuzzyText
        fontSize={fontSize}
        fontWeight={900}
        color="#eb0028"
        enableHover={true}
        baseIntensity={0.15}
        hoverIntensity={0.6}
      >
        COMING
      </FuzzyText>
      <FuzzyText
        fontSize={fontSize}
        fontWeight={900}
        color="#ffffff"
        enableHover={true}
        baseIntensity={0.15}
        hoverIntensity={0.6}
      >
        SOON
      </FuzzyText>
    </div>
  )
}

export default function Speakers() {
  const { ref, isInView } = useInView()

  return (
    <section id="speakers" className="relative pt-10 pb-20 md:pt-16 md:pb-32 bg-[#080808] text-white overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 items-center min-h-[500px]">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="pr-8"
          >
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">MEET</span>
              <br />
              <span className="text-white">OUR</span>
              <br />
              <span className="text-tedx-red">SPEAKERS</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Inspiring minds who will share their groundbreaking ideas and transformative stories at TEDxNIT Hamirpur.
            </p>
            <div className="w-20 h-1 bg-tedx-red/60 mb-8" />

            {/* Arrow Button to Speakers Page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/speakers"
                className="group inline-block"
              >
                <div
                  className="relative bg-[#0a0a0a] border border-tedx-red/40 rounded-xl px-6 py-3 transition-all duration-300 group-hover:border-tedx-red/80 group-hover:scale-105 flex items-center gap-3"
                  style={{ boxShadow: '0 0 15px rgba(235, 0, 40, 0.3), inset 0 0 10px rgba(235, 0, 40, 0.1)' }}
                >
                  <span className="text-white font-semibold text-base tracking-wide">Know More</span>
                  <svg
                    className="w-6 h-6 text-tedx-red transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(235, 0, 40, 0.5))' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Coming Soon with FuzzyText */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <ComingSoonDisplay />
          </motion.div>

          {/* COMMENTED OUT - CardSwap for when speakers are announced */}
          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[550px] flex items-center justify-center"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[10%]">
              <CardSwap
                width={320}
                height={400}
                cardDistance={45}
                verticalDistance={55}
                delay={4000}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
              >
                {speakers.map((speaker) => (
                  <Card key={speaker.id}>
                    <SpeakerCard speaker={speaker} />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </motion.div> */}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">MEET OUR</span>
              <br />
              <span className="text-tedx-red">SPEAKERS</span>
            </h2>
            <div className="w-16 h-1 bg-tedx-red/60 mx-auto mb-6" />

            {/* Arrow Button to Speakers Page - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/speakers"
                className="group inline-block"
              >
                <div
                  className="relative bg-[#0a0a0a] border border-tedx-red/40 rounded-xl px-5 py-2.5 transition-all duration-300 group-hover:border-tedx-red/80 group-hover:scale-105 flex items-center gap-2"
                  style={{ boxShadow: '0 0 15px rgba(235, 0, 40, 0.3), inset 0 0 10px rgba(235, 0, 40, 0.1)' }}
                >
                  <span className="text-white font-semibold text-sm tracking-wide">Know More</span>
                  <svg
                    className="w-5 h-5 text-tedx-red transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(235, 0, 40, 0.5))' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Coming Soon Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ComingSoonDisplay isMobile={true} />
          </motion.div>

          {/* COMMENTED OUT - MobileSwipeCards for when speakers are announced */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MobileSwipeCards />
          </motion.div> */}
        </div>
      </div>

      {/* Bottom gradient for seamless blend */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  )
}
