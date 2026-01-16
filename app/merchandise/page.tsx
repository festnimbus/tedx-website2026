'use client'

import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import FuzzyText from '@/components/FuzzyText'

export default function MerchandisePage() {
    return (
        <main className="min-h-screen bg-[#080808] relative overflow-hidden">
            {/* Hero Spacer for fixed header */}
            <div className="h-24" />

            {/* Main Content Section */}
            <section className="min-h-[calc(100vh-6rem)] flex items-center relative">
                {/* Background glow effect */}
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(235, 0, 40, 0.3) 0%, rgba(235, 0, 40, 0.1) 40%, transparent 70%)',
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-tedx-red mb-2 leading-tight">
                                TEDx
                            </h1>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                                Merchandise
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg">
                                Wear Your Ideas.
                            </p>
                        </motion.div>

                        {/* Right Column: Blurred Hoodie with Coming Soon */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex items-center justify-center relative"
                        >
                            {/* Hoodie Container */}
                            <div className="relative w-full max-w-md">
                                {/* Blurred Hoodie Image */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    className="relative"
                                >
                                    <img
                                        src="/hoodie.webp"
                                        alt="TEDx Merchandise Hoodie"
                                        className="w-full h-auto blur-md opacity-50"
                                    />

                                    {/* Coming Soon Overlay */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.7, duration: 0.5 }}
                                            className="text-center flex flex-col items-center"
                                        >
                                            <FuzzyText
                                                fontSize="clamp(3rem, 8vw, 6rem)"
                                                fontWeight={900}
                                                color="#EB0028"
                                                enableHover={true}
                                                baseIntensity={0.18}
                                                hoverIntensity={0.5}
                                            >
                                                COMING
                                            </FuzzyText>
                                            <FuzzyText
                                                fontSize="clamp(3rem, 8vw, 6rem)"
                                                fontWeight={900}
                                                color="#ffffff"
                                                enableHover={true}
                                                baseIntensity={0.18}
                                                hoverIntensity={0.5}
                                            >
                                                SOON
                                            </FuzzyText>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
