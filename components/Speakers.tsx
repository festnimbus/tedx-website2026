'use client'

import { motion, useMotionValue, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useInView } from './hooks/useInView'
import { useState, useEffect, useRef } from 'react'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()
  const [dragVelocity, setDragVelocity] = useState(0)
  
  // Duplicate speakers array for seamless infinite scroll
  const allSpeakers = [...speakers, ...speakers, ...speakers]
  const cardWidth = 320 + 24 // card width + gap

  useEffect(() => {
    if (!isPaused) {
      const currentX = x.get()
      const targetX = currentX - cardWidth * speakers.length
      
      controls.start({
        x: [currentX, targetX],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      })
    } else {
      controls.stop()
    }
  }, [isPaused, controls, x, cardWidth, speakers.length])

  const handleDragEnd = (_: any, info: any) => {
    setIsPaused(false)
    
    // Check drag direction and velocity
    if (Math.abs(info.velocity.x) > 50) {
      setDragVelocity(info.velocity.x)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const currentX = x.get()
    // Scroll left/right based on wheel direction
    x.set(currentX - e.deltaY * 0.5)
  }

  return (
    <section id="speakers" className="py-20 md:py-32 bg-black text-white overflow-hidden">
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
          onWheel={handleWheel}
        >
          <motion.div
            ref={containerRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            style={{ x }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -cardWidth * speakers.length * 2, right: cardWidth * speakers.length }}
            dragElastic={0.1}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
          >
            {allSpeakers.map((speaker, index) => (
              <div
                key={`${speaker.id}-${index}`}
                className="flex-shrink-0 w-[320px] group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-tedx-red transition-all duration-500 hover:shadow-2xl hover:shadow-tedx-red/20 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-[280px] overflow-hidden bg-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 z-10" />
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-tedx-red/0 group-hover:bg-tedx-red/10 transition-all duration-500 z-20" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-tedx-red transition-colors duration-300">
                      {speaker.name}
                    </h3>
                    <p className="text-tedx-red text-sm font-semibold mb-3 uppercase tracking-wide">
                      {speaker.profession}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {speaker.description}
                    </p>
                    
                    {/* Social Icons Placeholder */}
                    <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-1 bg-gradient-to-r from-tedx-red via-white to-tedx-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
