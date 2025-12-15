'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export interface SpeakerItem {
    id: number
    image: string
    name: string
    designation: string
    linkedin?: string
    instagram?: string
    twitter?: string
}

export interface ChromaGridProps {
    items: SpeakerItem[]
    className?: string
    radius?: number
    damping?: number
    fadeOut?: number
    ease?: string
}

type SetterFn = (v: number | string) => void

// Social media icons
const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
)

const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
)

const ChromaGrid: React.FC<ChromaGridProps> = ({
    items,
    className = '',
    radius = 350,
    damping = 0.45,
    fadeOut = 0.6,
    ease = 'power3.out'
}) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const fadeRef = useRef<HTMLDivElement>(null)
    const setX = useRef<SetterFn | null>(null)
    const setY = useRef<SetterFn | null>(null)
    const pos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const el = rootRef.current
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
            duration: damping,
            ease,
            onUpdate: () => {
                setX.current?.(pos.current.x)
                setY.current?.(pos.current.y)
            },
            overwrite: true
        })
    }

    const handleMove = (e: React.PointerEvent) => {
        const r = rootRef.current!.getBoundingClientRect()
        moveTo(e.clientX - r.left, e.clientY - r.top)
        gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
    }

    const handleLeave = () => {
        gsap.to(fadeRef.current, {
            opacity: 1,
            duration: fadeOut,
            overwrite: true
        })
    }

    const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
        const c = e.currentTarget as HTMLElement
        const rect = c.getBoundingClientRect()
        c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }

    return (
        <div
            ref={rootRef}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`relative w-full flex flex-wrap justify-center items-start gap-6 md:gap-8 ${className}`}
            style={
                {
                    '--r': `${radius}px`,
                    '--x': '50%',
                    '--y': '50%'
                } as React.CSSProperties
            }
        >
            {items.map((speaker) => (
                <article
                    key={speaker.id}
                    onMouseMove={handleCardMove}
                    className="group relative flex flex-col w-[280px] md:w-[320px] rounded-[20px] overflow-hidden border-2 border-transparent transition-all duration-300 cursor-pointer hover:border-tedx-red/40 hover:-translate-y-2"
                    style={
                        {
                            background: 'linear-gradient(165deg, rgba(235, 0, 40, 0.15), #080808)',
                            '--spotlight-color': 'rgba(235, 0, 40, 0.25)'
                        } as React.CSSProperties
                    }
                >
                    {/* Red accent line at top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tedx-red via-red-500 to-tedx-red opacity-80" />

                    {/* Spotlight effect on hover */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                        style={{
                            background:
                                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                        }}
                    />

                    {/* Image container */}
                    <div className="relative z-10 flex-1 p-[10px] box-border">
                        <div className="relative h-[300px] md:h-[350px] overflow-hidden rounded-[10px]">
                            <Image
                                src={speaker.image}
                                alt={speaker.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
                        </div>
                    </div>

                    {/* Content footer */}
                    <footer className="relative z-10 p-4 md:p-5 text-white font-sans">
                        <h3 className="m-0 text-lg md:text-xl font-bold mb-1 group-hover:text-tedx-red transition-colors duration-300">
                            {speaker.name}
                        </h3>
                        <p className="m-0 text-sm md:text-base text-gray-400 mb-4">
                            {speaker.designation}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {speaker.linkedin && (
                                <a
                                    href={speaker.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:bg-tedx-red hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <LinkedInIcon />
                                </a>
                            )}
                            {speaker.instagram && (
                                <a
                                    href={speaker.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <InstagramIcon />
                                </a>
                            )}
                            {speaker.twitter && (
                                <a
                                    href={speaker.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <TwitterIcon />
                                </a>
                            )}
                        </div>
                    </footer>
                </article>
            ))}

            {/* Grayscale mask layer - follows cursor */}
            <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                    backdropFilter: 'grayscale(1) brightness(0.75)',
                    WebkitBackdropFilter: 'grayscale(1) brightness(0.75)',
                    background: 'rgba(0,0,0,0.001)',
                    maskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
                    WebkitMaskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
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
                    maskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
                    WebkitMaskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
                    opacity: 1
                }}
            />
        </div>
    )
}

export default ChromaGrid
