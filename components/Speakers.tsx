'use client'

import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'
import { useState, useEffect, useRef, useCallback } from 'react'

const speakers = [
  {
    id: 1,
    name: 'Sichrat Donar',
    profession: 'AI Researcher',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    description: 'Lorem ipsum dolor sit eweity awt hoalite, nennase astremo',
  },
  {
    id: 2,
    name: 'Jastan Nahtan',
    profession: 'Social Entrepreneur',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    description: 'Lorem ipsum dolor sit eweity and trusify, prelaecrometstitine',
  },
  {
    id: 3,
    name: 'Sichoed Donor',
    profession: 'Neuroscientist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    description: 'Lorem ipsum dolor sit eweity awt hoalite, nennase astremo',
  },
  {
    id: 4,
    name: 'Jarran Nahtan',
    profession: 'Climate Activist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    description: 'Lorem ipsum dolor sit eweity and leturno prelaecrometdintim',
  },
  {
    id: 5,
    name: 'Maya Sharma',
    profession: 'Tech Entrepreneur',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    description: 'Lorem ipsum dolor sit eweity awt hoalite, nennase astremo',
  },
  {
    id: 6,
    name: 'Vikram Singh',
    profession: 'Space Scientist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    description: 'Lorem ipsum dolor sit eweity and trusify, prelaecrometstitine',
  },
]

export default function Speakers() {
  const { ref, isInView } = useInView()
  const [isPaused, setIsPaused] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('left')
  const containerRef = useRef<HTMLDivElement>(null)

  // Duplicate speakers for seamless infinite scroll
  const allSpeakers = [...speakers, ...speakers]

  // Handle drag to change scroll direction
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPaused(true)
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent, startX: number) => {
    const endX = 'touches' in e ? e.changedTouches[0].clientX : e.clientX
    const diff = endX - startX

    if (Math.abs(diff) > 50) {
      setScrollDirection(diff > 0 ? 'right' : 'left')
    }
    setIsPaused(false)
  }

  return (
    <section id="speakers" className="py-20 md:py-32 bg-black text-white overflow-hidden">
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>

      <div ref={ref} className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">
            <span className="text-tedx-red">MEET</span> THE SPEAKERS
          </h2>
        </motion.div>

        {/* Infinite Scrolling Container */}
        <div
          className="relative mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={containerRef}
            className={`flex gap-5 cursor-grab active:cursor-grabbing ${scrollDirection === 'left' ? 'scroll-left' : 'scroll-right'
              } ${isPaused ? 'paused' : ''}`}
            onMouseDown={(e) => {
              const startX = e.clientX
              const handleUp = (upEvent: MouseEvent) => {
                handleDragEnd(upEvent as unknown as React.MouseEvent, startX)
                window.removeEventListener('mouseup', handleUp)
              }
              window.addEventListener('mouseup', handleUp)
            }}
            onTouchStart={(e) => {
              const startX = e.touches[0].clientX
              const handleEnd = (endEvent: TouchEvent) => {
                handleDragEnd(endEvent as unknown as React.TouchEvent, startX)
                containerRef.current?.removeEventListener('touchend', handleEnd)
              }
              containerRef.current?.addEventListener('touchend', handleEnd)
            }}
          >
            {allSpeakers.map((speaker, index) => (
              <div
                key={`${speaker.id}-${index}`}
                className="flex-shrink-0 w-[300px] group transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/60 hover:border-tedx-red/40 transition-all duration-400">
                  {/* Image Container */}
                  <div className="relative h-[320px] overflow-hidden">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                    {/* Red accent on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-tedx-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  </div>

                  {/* Content */}
                  <div className="p-5 relative">
                    {/* Name with underline effect */}
                    <h3 className="text-xl font-bold text-white mb-1 relative inline-block">
                      {speaker.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-tedx-red group-hover:w-full transition-all duration-300" />
                    </h3>

                    <p className="text-tedx-red/80 text-sm font-medium uppercase tracking-wider mb-3">
                      {speaker.profession}
                    </p>

                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                      {speaker.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />

          {/* Direction indicator */}
          <div className="flex justify-center mt-8 gap-3">
            <button
              onClick={() => setScrollDirection('right')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${scrollDirection === 'right' ? 'bg-tedx-red' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setScrollDirection('left')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${scrollDirection === 'left' ? 'bg-tedx-red' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


