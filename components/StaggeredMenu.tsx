'use client'

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'

export interface StaggeredMenuItem {
    label: string
    ariaLabel: string
    link: string
}

export interface StaggeredMenuSocialItem {
    label: string
    link: string
}

export interface StaggeredMenuProps {
    position?: 'left' | 'right'
    items?: StaggeredMenuItem[]
    socialItems?: StaggeredMenuSocialItem[]
    displaySocials?: boolean
    displayItemNumbering?: boolean
    logoUrl?: string
    menuButtonColor?: string
    openMenuButtonColor?: string
    accentColor?: string
    onMenuOpen?: () => void
    onMenuClose?: () => void
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = 'right',
    items = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'About', ariaLabel: 'Learn about TEDx', link: '/about' },
        { label: 'Speakers', ariaLabel: 'View speakers', link: '/speakers' },
        { label: 'Team', ariaLabel: 'Meet the team', link: '/team' },
        { label: 'Sponsors', ariaLabel: 'Our sponsors', link: '/sponsors' },
        { label: 'Contact', ariaLabel: 'Get in touch', link: '/#contact' }
    ],
    socialItems = [
        { label: 'Instagram', link: 'https://www.instagram.com/tedxnithamirpur/' },
        { label: 'LinkedIn', link: 'https://www.linkedin.com/company/tedxnithamirpurofficial/' },
        { label: 'Twitter', link: 'https://x.com/TEDx' },
        { label: 'YouTube', link: 'https://www.youtube.com/user/TEDxTalks' }
    ],
    displaySocials = true,
    displayItemNumbering = true,
    logoUrl = '/tedx-logo.png',
    menuButtonColor = '#fff',
    openMenuButtonColor = '#ffffff',
    accentColor = '#EB0028',
    onMenuOpen,
    onMenuClose
}) => {
    const [open, setOpen] = useState(false)
    const openRef = useRef(false)

    const panelRef = useRef<HTMLDivElement | null>(null)
    const preLayersRef = useRef<HTMLDivElement | null>(null)
    const preLayerElsRef = useRef<HTMLElement[]>([])

    const plusHRef = useRef<HTMLSpanElement | null>(null)
    const plusVRef = useRef<HTMLSpanElement | null>(null)
    const iconRef = useRef<HTMLSpanElement | null>(null)

    const textInnerRef = useRef<HTMLSpanElement | null>(null)
    const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close'])

    const openTlRef = useRef<gsap.core.Timeline | null>(null)
    const closeTweenRef = useRef<gsap.core.Tween | null>(null)
    const spinTweenRef = useRef<gsap.core.Timeline | null>(null)
    const textCycleAnimRef = useRef<gsap.core.Tween | null>(null)
    const colorTweenRef = useRef<gsap.core.Tween | null>(null)

    const toggleBtnRef = useRef<HTMLButtonElement | null>(null)
    const busyRef = useRef(false)

    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null)

    useLayoutEffect(() => {
        // Small delay to ensure DOM is fully ready before setting initial states
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                const panel = panelRef.current
                const preContainer = preLayersRef.current

                const plusH = plusHRef.current
                const plusV = plusVRef.current
                const icon = iconRef.current
                const textInner = textInnerRef.current

                if (!panel || !plusH || !plusV || !icon || !textInner) return

                let preLayers: HTMLElement[] = []
                if (preContainer) {
                    preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[]
                }
                preLayerElsRef.current = preLayers

                const offscreen = position === 'left' ? -100 : 100
                gsap.set([panel, ...preLayers], { xPercent: offscreen })

                gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 })
                gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 })
                gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })

                gsap.set(textInner, { yPercent: 0 })

                if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor })
            })
            return () => ctx.revert()
        }, 50) // Small delay to ensure proper initialization

        return () => clearTimeout(timer)
    }, [menuButtonColor, position])

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current
        const layers = preLayerElsRef.current
        if (!panel) return null

        openTlRef.current?.kill()
        if (closeTweenRef.current) {
            closeTweenRef.current.kill()
            closeTweenRef.current = null
        }
        itemEntranceTweenRef.current?.kill()

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
        const numberEls = Array.from(
            panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[]
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[]

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }))
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'))

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 })
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

        const tl = gsap.timeline({ paused: true })

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07)
        })

        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0)
        const panelDuration = 0.65

        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        )

        if (itemEls.length) {
            const itemsStartRatio = 0.15
            const itemsStart = panelInsertTime + panelDuration * itemsStartRatio

            tl.to(
                itemEls,
                { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
                itemsStart
            )

            if (numberEls.length) {
                tl.to(
                    numberEls,
                    { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as string]: 1, stagger: { each: 0.08, from: 'start' } },
                    itemsStart + 0.1
                )
            }
        }

        if (socialTitle || socialLinks.length) {
            const socialsStart = panelInsertTime + panelDuration * 0.4

            if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart)
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: 'power3.out',
                        stagger: { each: 0.08, from: 'start' },
                        onComplete: () => {
                            gsap.set(socialLinks, { clearProps: 'opacity' })
                        }
                    },
                    socialsStart + 0.04
                )
            }
        }

        openTlRef.current = tl
        return tl
    }, [])

    const playOpen = useCallback(() => {
        if (busyRef.current) return
        busyRef.current = true
        const tl = buildOpenTimeline()
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false
            })
            tl.play(0)
        } else {
            busyRef.current = false
        }
    }, [buildOpenTimeline])

    const playClose = useCallback(() => {
        openTlRef.current?.kill()
        openTlRef.current = null
        itemEntranceTweenRef.current?.kill()

        const panel = panelRef.current
        const layers = preLayerElsRef.current
        if (!panel) return

        const all: HTMLElement[] = [...layers, panel]
        closeTweenRef.current?.kill()

        const offscreen = position === 'left' ? -100 : 100

        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
                if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })

                const numberEls = Array.from(
                    panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
                ) as HTMLElement[]
                if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 })

                const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null
                const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[]
                if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
                if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

                busyRef.current = false
            }
        })
    }, [position])

    const animateIcon = useCallback((opening: boolean) => {
        const icon = iconRef.current
        const h = plusHRef.current
        const v = plusVRef.current
        if (!icon || !h || !v) return

        spinTweenRef.current?.kill()

        if (opening) {
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })
            spinTweenRef.current = gsap
                .timeline({ defaults: { ease: 'power4.out' } })
                .to(h, { rotate: 45, duration: 0.5 }, 0)
                .to(v, { rotate: -45, duration: 0.5 }, 0)
        } else {
            spinTweenRef.current = gsap
                .timeline({ defaults: { ease: 'power3.inOut' } })
                .to(h, { rotate: 0, duration: 0.35 }, 0)
                .to(v, { rotate: 90, duration: 0.35 }, 0)
                .to(icon, { rotate: 0, duration: 0.001 }, 0)
        }
    }, [])

    const animateColor = useCallback(
        (opening: boolean) => {
            const btn = toggleBtnRef.current
            if (!btn) return
            colorTweenRef.current?.kill()
            const targetColor = opening ? openMenuButtonColor : menuButtonColor
            colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' })
        },
        [openMenuButtonColor, menuButtonColor]
    )

    const animateText = useCallback((opening: boolean) => {
        const inner = textInnerRef.current
        if (!inner) return

        textCycleAnimRef.current?.kill()

        const currentLabel = opening ? 'Menu' : 'Close'
        const targetLabel = opening ? 'Close' : 'Menu'
        const cycles = 3

        const seq: string[] = [currentLabel]
        let last = currentLabel
        for (let i = 0; i < cycles; i++) {
            last = last === 'Menu' ? 'Close' : 'Menu'
            seq.push(last)
        }
        if (last !== targetLabel) seq.push(targetLabel)
        seq.push(targetLabel)

        setTextLines(seq)
        gsap.set(inner, { yPercent: 0 })

        const lineCount = seq.length
        const finalShift = ((lineCount - 1) / lineCount) * 100

        textCycleAnimRef.current = gsap.to(inner, {
            yPercent: -finalShift,
            duration: 0.5 + lineCount * 0.07,
            ease: 'power4.out'
        })
    }, [])

    const toggleMenu = useCallback(() => {
        const target = !openRef.current
        openRef.current = target
        setOpen(target)

        if (target) {
            onMenuOpen?.()
            playOpen()
        } else {
            onMenuClose?.()
            playClose()
        }

        animateIcon(target)
        animateColor(target)
        animateText(target)
    }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose])

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false
            setOpen(false)
            onMenuClose?.()
            playClose()
            animateIcon(false)
            animateColor(false)
            animateText(false)
        }
    }, [playClose, animateIcon, animateColor, animateText, onMenuClose])

    // Close on click outside
    useEffect(() => {
        if (!open) return

        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                toggleBtnRef.current &&
                !toggleBtnRef.current.contains(event.target as Node)
            ) {
                closeMenu()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open, closeMenu])

    return (
        <div className="sm-scope fixed top-0 left-0 w-screen h-0 overflow-visible z-50">
            <div
                className="staggered-menu-wrapper relative w-full h-full z-50"
                style={{ ['--sm-accent' as string]: accentColor } as React.CSSProperties}
                data-position={position}
                data-open={open || undefined}
            >
                {/* Pre-layers for animation */}
                <div
                    ref={preLayersRef}
                    className="sm-prelayers fixed top-0 right-0 bottom-0 pointer-events-none z-[45]"
                    style={{ width: 'clamp(280px, 40vw, 450px)' }}
                    aria-hidden="true"
                >
                    <div
                        className="sm-prelayer absolute top-0 right-0 h-full w-full"
                        style={{ background: 'rgba(235, 0, 40, 0.15)' }}
                    />
                    <div
                        className="sm-prelayer absolute top-0 right-0 h-full w-full"
                        style={{ background: '#1a0a0a' }}
                    />
                </div>

                {/* Header with logo and menu toggle */}
                <header
                    className="staggered-menu-header fixed top-0 left-0 w-full flex items-center justify-between p-5 md:p-8 bg-transparent pointer-events-none z-[60]"
                    aria-label="Main navigation header"
                >
                    {/* Logo */}
                    <Link href="/" className="pointer-events-auto">
                        <div className="relative h-10 md:h-12 w-40 md:w-48 -ml-2">
                            <Image
                                src={logoUrl}
                                alt="TEDx NIT Hamirpur"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Menu Toggle Button */}
                    <button
                        ref={toggleBtnRef}
                        className="sm-toggle relative inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer font-medium text-sm md:text-base leading-none overflow-visible pointer-events-auto"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        aria-controls="staggered-menu-panel"
                        onClick={toggleMenu}
                        type="button"
                    >
                        <span
                            className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap mr-2"
                            aria-hidden="true"
                            style={{ minWidth: '45px' }}
                        >
                            <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                                {textLines.map((l, i) => (
                                    <span className="sm-toggle-line block h-[1em] leading-none" key={i}>
                                        {l}
                                    </span>
                                ))}
                            </span>
                        </span>

                        <span
                            ref={iconRef}
                            className="sm-icon relative w-[16px] h-[16px] shrink-0 inline-flex items-center justify-center"
                            aria-hidden="true"
                        >
                            <span
                                ref={plusHRef}
                                className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
                            />
                            <span
                                ref={plusVRef}
                                className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
                            />
                        </span>
                    </button>
                </header>

                {/* Menu Panel */}
                <aside
                    id="staggered-menu-panel"
                    ref={panelRef}
                    className="staggered-menu-panel fixed top-0 right-0 h-screen bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/10 flex flex-col p-24 pt-28 md:pt-32 overflow-y-auto z-[50]"
                    style={{ width: 'clamp(280px, 40vw, 450px)' }}
                    aria-hidden={!open}
                >
                    <div className="sm-panel-inner flex-1 flex flex-col gap-5">
                        <ul
                            className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
                            role="list"
                            data-numbering={displayItemNumbering || undefined}
                        >
                            {items.map((it, idx) => (
                                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                                    <Link
                                        className="sm-panel-item relative text-white/90 font-bold text-3xl md:text-4xl cursor-pointer leading-none tracking-[-1px] uppercase transition-colors duration-150 inline-block no-underline pr-[1.4em] hover:text-tedx-red"
                                        href={it.link}
                                        aria-label={it.ariaLabel}
                                        data-index={idx + 1}
                                        onClick={closeMenu}
                                    >
                                        <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                                            {it.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {displaySocials && socialItems.length > 0 && (
                            <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                                <h3 className="sm-socials-title m-0 text-base font-medium text-tedx-red">Follow Us</h3>
                                <ul
                                    className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                                    role="list"
                                >
                                    {socialItems.map((s, i) => (
                                        <li key={s.label + i} className="sm-socials-item">
                                            <a
                                                href={s.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="sm-socials-link text-base font-medium text-white/70 no-underline relative inline-block py-[2px] transition-colors duration-300 hover:text-tedx-red"
                                            >
                                                {s.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            <style jsx>{`
        .sm-panel-list[data-numbering] {
          counter-reset: smItem;
        }
        .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.1em;
          right: 0;
          font-size: 14px;
          font-weight: 400;
          color: var(--sm-accent, #EB0028);
          letter-spacing: 0;
          pointer-events: none;
          user-select: none;
          opacity: var(--sm-num-opacity, 0);
        }
        @media (max-width: 768px) {
          .staggered-menu-panel {
            width: 100% !important;
            left: 0;
            right: 0;
          }
          .sm-prelayers {
            width: 100% !important;
          }
        }
      `}</style>
        </div>
    )
}

export default StaggeredMenu
