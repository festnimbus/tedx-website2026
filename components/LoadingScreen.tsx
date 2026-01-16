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
            {/* Dual-ring rotating loader */}
            <div className="loader-circle-container">
                <div className={`loader-circle-2 ${mounted ? 'loaded' : ''}`}></div>
            </div>

            {/* Inline styles for the loader animation */}
            <style jsx>{`
                .loader-circle-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .loader-circle-2 {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    display: inline-block;
                }

                .loader-circle-2::before,
                .loader-circle-2::after {
                    content: "";
                    display: block;
                    position: absolute;
                    border-width: 5px;
                    border-style: solid;
                    border-radius: 50%;
                    box-sizing: border-box;
                }

                /* Outer ring - TEDx Red with 80% opacity */
                .loader-circle-2::before {
                    width: 80px;
                    height: 80px;
                    border-bottom-color: rgba(235, 0, 40, 0.8);
                    border-right-color: rgba(235, 0, 40, 0.8);
                    border-top-color: transparent;
                    border-left-color: transparent;
                    animation: loader-circle-2-animation-2 1s linear infinite;
                    box-shadow: 
                        0 0 20px rgba(235, 0, 40, 0.4),
                        0 0 40px rgba(235, 0, 40, 0.2);
                }

                /* Inner ring - White */
                .loader-circle-2::after {
                    width: 50px;
                    height: 50px;
                    border-bottom-color: #ffffff;
                    border-right-color: #ffffff;
                    border-top-color: transparent;
                    border-left-color: transparent;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: loader-circle-2-animation 0.85s linear infinite;
                    box-shadow: 
                        0 0 15px rgba(255, 255, 255, 0.3),
                        0 0 30px rgba(255, 255, 255, 0.15);
                }

                @keyframes loader-circle-2-animation {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(-360deg);
                    }
                }

                @keyframes loader-circle-2-animation-2 {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                /* Subtle pulse effect on container */
                .loader-circle-container {
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        filter: brightness(1);
                    }
                    50% {
                        filter: brightness(1.2);
                    }
                }
            `}</style>
        </div>
    )
}

export default LoadingScreen
