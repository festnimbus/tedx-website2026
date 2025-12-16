'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface ImageLoopItem {
    src: string
    alt?: string
}

export interface ImageLoopProps {
    images: ImageLoopItem[]
    speed?: number
    direction?: 'left' | 'right'
    imageHeight?: number
    gap?: number
    pauseOnHover?: boolean
    className?: string
}

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
} as const

const useResizeObserver = (
    callback: () => void,
    elements: Array<React.RefObject<Element | null>>,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        if (typeof window === 'undefined') return

        if (!window.ResizeObserver) {
            const handleResize = () => callback()
            window.addEventListener('resize', handleResize)
            callback()
            return () => window.removeEventListener('resize', handleResize)
        }

        const observers = elements.map(ref => {
            if (!ref.current) return null
            const observer = new ResizeObserver(callback)
            observer.observe(ref.current)
            return observer
        })

        callback()

        return () => {
            observers.forEach(observer => observer?.disconnect())
        }
    }, dependencies)
}

const useImageLoader = (
    seqRef: React.RefObject<HTMLDivElement | null>,
    onLoad: () => void,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? []

        if (images.length === 0) {
            onLoad()
            return
        }

        let remainingImages = images.length
        const handleImageLoad = () => {
            remainingImages -= 1
            if (remainingImages === 0) {
                onLoad()
            }
        }

        images.forEach(img => {
            const htmlImg = img as HTMLImageElement
            if (htmlImg.complete) {
                handleImageLoad()
            } else {
                htmlImg.addEventListener('load', handleImageLoad, { once: true })
                htmlImg.addEventListener('error', handleImageLoad, { once: true })
            }
        })

        return () => {
            images.forEach(img => {
                img.removeEventListener('load', handleImageLoad)
                img.removeEventListener('error', handleImageLoad)
            })
        }
    }, dependencies)
}

const useAnimationLoop = (
    trackRef: React.RefObject<HTMLDivElement | null>,
    targetVelocity: number,
    seqWidth: number,
    isHovered: boolean,
    pauseOnHover: boolean
) => {
    const rafRef = useRef<number | null>(null)
    const lastTimestampRef = useRef<number | null>(null)
    const offsetRef = useRef(0)
    const velocityRef = useRef(0)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const track = trackRef.current
        if (!track) return

        const prefersReduced =
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (seqWidth > 0) {
            offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth
            track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
        }

        if (prefersReduced) {
            track.style.transform = 'translate3d(0, 0, 0)'
            return () => {
                lastTimestampRef.current = null
            }
        }

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp
            }

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000
            lastTimestampRef.current = timestamp

            const target = isHovered && pauseOnHover ? 0 : targetVelocity

            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU)
            velocityRef.current += (target - velocityRef.current) * easingFactor

            if (seqWidth > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime
                nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth
                offsetRef.current = nextOffset
                track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
            }

            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
            lastTimestampRef.current = null
        }
    }, [targetVelocity, seqWidth, isHovered, pauseOnHover])
}

export const ImageLoop: React.FC<ImageLoopProps> = ({
    images,
    speed = 80,
    direction = 'left',
    imageHeight = 180,
    gap = 16,
    pauseOnHover = true,
    className
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const seqRef = useRef<HTMLDivElement>(null)

    const [seqWidth, setSeqWidth] = useState<number>(0)
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES)
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const targetVelocity = useMemo(() => {
        const magnitude = Math.abs(speed)
        const directionMultiplier = direction === 'left' ? 1 : -1
        const speedMultiplier = speed < 0 ? -1 : 1
        return magnitude * directionMultiplier * speedMultiplier
    }, [speed, direction])

    const updateDimensions = useCallback(() => {
        const containerWidth = containerRef.current?.clientWidth ?? 0
        const sequenceRect = seqRef.current?.getBoundingClientRect?.()
        const sequenceWidth = sequenceRect?.width ?? 0

        if (sequenceWidth > 0) {
            setSeqWidth(Math.ceil(sequenceWidth))
            const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM
            setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
        }
    }, [])

    useResizeObserver(updateDimensions, [containerRef, seqRef], [images, gap, imageHeight])
    useImageLoader(seqRef, updateDimensions, [images, gap, imageHeight])
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover)

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) setIsHovered(true)
    }, [pauseOnHover])

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) setIsHovered(false)
    }, [pauseOnHover])

    const renderImageItem = useCallback(
        (item: ImageLoopItem, key: React.Key) => (
            <div
                key={key}
                className="flex-none rounded-lg overflow-hidden shadow-lg"
                style={{
                    marginRight: `${gap}px`,
                    height: `${imageHeight}px`
                }}
            >
                <img
                    src={item.src}
                    alt={item.alt || ''}
                    className="h-full w-auto object-cover pointer-events-none"
                    style={{
                        height: `${imageHeight}px`,
                        minWidth: `${imageHeight * 1.2}px`
                    }}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                />
            </div>
        ),
        [gap, imageHeight]
    )

    const imageLists = useMemo(
        () =>
            Array.from({ length: copyCount }, (_, copyIndex) => (
                <div
                    className="flex items-center"
                    key={`copy-${copyIndex}`}
                    aria-hidden={copyIndex > 0}
                    ref={copyIndex === 0 ? seqRef : undefined}
                >
                    {images.map((item, itemIndex) => renderImageItem(item, `${copyIndex}-${itemIndex}`))}
                </div>
            )),
        [copyCount, images, renderImageItem]
    )

    return (
        <div
            ref={containerRef}
            className={`relative overflow-x-hidden ${className || ''}`}
            style={{ height: `${imageHeight + 20}px` }}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#080808] to-transparent"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#080808] to-transparent"
            />

            <div
                className="flex will-change-transform select-none relative z-0 w-max"
                ref={trackRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
            >
                {imageLists}
            </div>
        </div>
    )
}

export default ImageLoop
