'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

export interface ScrambledTextProps {
    text: string
    radius?: number
    duration?: number
    speed?: number
    scrambleChars?: string
    className?: string
    style?: React.CSSProperties
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
    text,
    radius = 100,
    duration = 0.8,
    speed = 0.3,
    scrambleChars = '.:!@#$%&*',
    className = '',
    style = {}
}) => {
    const containerRef = useRef<HTMLSpanElement | null>(null)
    const charsRef = useRef<HTMLSpanElement[]>([])
    const [chars, setChars] = useState<string[]>([])
    const originalChars = useRef<string[]>([])
    const animatingRef = useRef<Set<number>>(new Set())

    useEffect(() => {
        const charArray = text.split('')
        setChars(charArray)
        originalChars.current = charArray
    }, [text])

    const scrambleChar = useCallback((index: number, originalChar: string) => {
        if (animatingRef.current.has(index)) return
        animatingRef.current.add(index)

        const el = charsRef.current[index]
        if (!el || originalChar === ' ') {
            animatingRef.current.delete(index)
            return
        }

        let iterations = 0
        const maxIterations = Math.floor(duration / speed * 10)
        const scrambleCharsArray = scrambleChars.split('')

        const interval = setInterval(() => {
            if (iterations >= maxIterations) {
                clearInterval(interval)
                setChars(prev => {
                    const newChars = [...prev]
                    newChars[index] = originalChar
                    return newChars
                })
                animatingRef.current.delete(index)
                return
            }

            const randomChar = scrambleCharsArray[Math.floor(Math.random() * scrambleCharsArray.length)]
            setChars(prev => {
                const newChars = [...prev]
                newChars[index] = randomChar
                return newChars
            })
            iterations++
        }, speed * 100)
    }, [duration, speed, scrambleChars])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        charsRef.current.forEach((el, index) => {
            if (!el) return
            const rect = el.getBoundingClientRect()
            const charCenterX = rect.left + rect.width / 2
            const charCenterY = rect.top + rect.height / 2
            const distance = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY)

            if (distance < radius) {
                scrambleChar(index, originalChars.current[index])
            }
        })
    }, [radius, scrambleChar])

    return (
        <span
            ref={containerRef}
            className={`inline-flex cursor-pointer ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
        >
            {chars.map((char, index) => (
                <span
                    key={index}
                    ref={el => {
                        if (el) charsRef.current[index] = el
                    }}
                    className="inline-block transition-colors duration-100"
                    style={{
                        minWidth: char === ' ' ? '0.3em' : undefined,
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    )
}

export default ScrambledText
