'use client'

import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const previousSpeakers = [
  {
    id: 1,
    name: 'Manu Arora',
    designation: 'Founder, Acerternity UI',
    image: '/prev_speakers/1.webp',
  },
  {
    id: 2,
    name: 'Jagdeep Singh',
    designation: 'Civil Servant & Advocate',
    image: '/prev_speakers/5.webp',
  },
  {
    id: 3,
    name: 'Yash Garg',
    designation: 'Founder, College Setu & Ed-tech Entrepreneur',
    image: '/prev_speakers/3.webp',
  },
  {
    id: 4,
    name: 'Yatin Pandit',
    designation: 'Historian & Researcher',
    image: '/prev_speakers/4.webp',
  },
  {
    id: 5,
    name: 'Col. Ashokan K.',
    designation: 'Indian Army Veteran & Security Expert',
    image: '/prev_speakers/2.webp',
  },
]

type SetterFn = (v: number | string) => void

export default function Events() {
  const { ref, isInView } = useInView()
  const gridRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const setX = useRef<SetterFn | null>(null)
  const setY = useRef<SetterFn | null>(null)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn
    const { width, height } = el.getBoundingClientRect()
    pos.current = { x: width / 2, y: height / 2 }
    setX.current(pos.current.x)
    setY.current(pos.current.y)
  }, [])

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: 0.45,
      ease: 'power3.out',
      onUpdate: () => {
        setX.current?.(pos.current.x)
        setY.current?.(pos.current.y)
      },
      overwrite: true
    })
  }

  const handleMove = (e: React.PointerEvent) => {
    const r = gridRef.current!.getBoundingClientRect()
    moveTo(e.clientX - r.left, e.clientY - r.top)
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: 0.6,
      overwrite: true
    })
  }

  return (
    <section id="events" className="py-20 md:py-32 bg-[#080808] text-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">
            Previous <span className="text-tedx-red">Speakers</span>
          </h2>
          <div className="w-24 h-1 bg-tedx-red mx-auto mb-8" />
        </motion.div>

        {/* Mobile Infinite Carousel */}
        <div className="md:hidden overflow-hidden relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

          {/* Infinite scrolling track */}
          <div
            className="flex gap-4 animate-scroll-left"
            style={{ width: 'max-content' }}
          >
            {[...previousSpeakers, ...previousSpeakers, ...previousSpeakers].map((speaker, index) => (
              <div
                key={`${speaker.id}-${index}`}
                className="flex-shrink-0 w-[260px]"
              >
                <div className="relative group cursor-pointer">
                  <div
                    className="relative rounded-[20px] overflow-hidden border-2 border-transparent transition-all duration-300"
                    style={{ background: 'linear-gradient(165deg, rgba(235, 0, 40, 0.15), #080808)' }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tedx-red via-red-500 to-tedx-red opacity-80 z-20" />
                    <div className="relative p-[10px] box-border">
                      <div className="relative h-[300px] overflow-hidden rounded-[10px]">
                        <Image src={speaker.image} alt={speaker.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
                      </div>
                    </div>
                    <div className="relative p-4 text-white">
                      <h3 className="m-0 text-lg font-bold mb-1">{speaker.name}</h3>
                      <p className="m-0 text-sm text-gray-400 line-clamp-1">{speaker.designation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Flex Grid with Grayscale Effect */}
        <div
          ref={gridRef}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          className="hidden md:flex relative flex-wrap justify-center gap-6 lg:gap-8"
          style={{ '--r': '400px', '--x': '50%', '--y': '50%' } as React.CSSProperties}
        >
          {previousSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, margin: "-50px" }}
              className="w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative group cursor-pointer"
              >
                <div
                  className="relative rounded-[20px] overflow-hidden border-2 border-transparent group-hover:border-tedx-red/40 transition-all duration-300"
                  style={{ background: 'linear-gradient(165deg, rgba(235, 0, 40, 0.15), #080808)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tedx-red via-red-500 to-tedx-red opacity-80 z-20" />
                  <div className="relative p-[10px] box-border">
                    <div className="relative h-[350px] lg:h-[380px] overflow-hidden rounded-[10px]">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
                    </div>
                  </div>
                  <div className="relative p-4 lg:p-5 text-white">
                    <h3 className="m-0 text-xl lg:text-2xl font-bold mb-1 group-hover:text-tedx-red transition-colors duration-300">
                      {speaker.name}
                    </h3>
                    <p className="m-0 text-sm lg:text-base text-gray-400">{speaker.designation}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Grayscale mask layer - follows cursor */}
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              backdropFilter: 'grayscale(1) brightness(0.75)',
              WebkitBackdropFilter: 'grayscale(1) brightness(0.75)',
              background: 'rgba(0,0,0,0.001)',
              maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
              WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
            }}
          />

          {/* Fade layer for when mouse leaves */}
          <div
            ref={fadeRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
            style={{
              backdropFilter: 'grayscale(1) brightness(0.75)',
              WebkitBackdropFilter: 'grayscale(1) brightness(0.75)',
              background: 'rgba(0,0,0,0.001)',
              maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
              opacity: 1
            }}
          />
        </div>
      </div>
    </section>
  )
}
