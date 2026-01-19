'use client'

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
    fullScreen?: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ fullScreen = true }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div
            className={`${fullScreen ? 'fixed inset-0' : 'w-full h-full min-h-[400px]'} bg-[#0a0a0c] flex items-center justify-center z-50 overflow-hidden`}
        >
            {/* 3-Dot Pulse Loader with TEDx Theme */}
            <div className="dot-pulse-container">
                <div className={`dot-pulse ${mounted ? 'loaded' : ''}`}></div>
            </div>

            {/* Inline styles for the dot-pulse animation */}
            <style jsx>{`
                .dot-pulse-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 60px;
                    min-height: 20px;
                }

                .dot-pulse {
                    position: relative;
                    left: -9999px;
                    width: 12px;
                    height: 12px;
                    border-radius: 6px;
                    background-color: #eb0028;
                    color: #eb0028;
                    box-shadow: 9999px 0 0 -5px;
                    animation: dot-pulse 1.5s infinite linear;
                    animation-delay: 0.25s;
                }

                .dot-pulse::before,
                .dot-pulse::after {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    width: 12px;
                    height: 12px;
                    border-radius: 6px;
                    background-color: #eb0028;
                    color: #eb0028;
                }

                .dot-pulse::before {
                    box-shadow: 9984px 0 0 -5px;
                    animation: dot-pulse-before 1.5s infinite linear;
                    animation-delay: 0s;
                }

                .dot-pulse::after {
                    box-shadow: 10014px 0 0 -5px;
                    animation: dot-pulse-after 1.5s infinite linear;
                    animation-delay: 0.5s;
                }

                @keyframes dot-pulse-before {
                    0% {
                        box-shadow: 9984px 0 0 -5px #eb0028;
                    }
                    30% {
                        box-shadow: 9984px 0 0 3px #eb0028;
                    }
                    60%, 100% {
                        box-shadow: 9984px 0 0 -5px #eb0028;
                    }
                }

                @keyframes dot-pulse {
                    0% {
                        box-shadow: 9999px 0 0 -5px #eb0028;
                    }
                    30% {
                        box-shadow: 9999px 0 0 3px #eb0028;
                    }
                    60%, 100% {
                        box-shadow: 9999px 0 0 -5px #eb0028;
                    }
                }

                @keyframes dot-pulse-after {
                    0% {
                        box-shadow: 10014px 0 0 -5px #eb0028;
                    }
                    30% {
                        box-shadow: 10014px 0 0 3px #eb0028;
                    }
                    60%, 100% {
                        box-shadow: 10014px 0 0 -5px #eb0028;
                    }
                }

                /* Subtle glow effect */
                .dot-pulse-container {
                    filter: drop-shadow(0 0 8px rgba(235, 0, 40, 0.4));
                }
            `}</style>
        </div>
    )
}

export default LoadingScreen

