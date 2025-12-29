'use client'

import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

export default function SponsorsPage() {
    return (
        <main className="min-h-screen bg-[#080808]">
            {/* Hero Spacer for fixed header */}
            <div className="h-24" />

            {/* Coming Soon Section */}
            <section className="py-20 md:py-32 flex items-center justify-center min-h-[70vh]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                    >
                        <span className="text-tedx-red">SPONSORS</span>
                    </motion.h1>

                    {/* Coming Soon Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                            Coming Soon
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            We're working on bringing amazing partners onboard. Our sponsors will be announced very soon. Stay tuned!
                        </p>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex justify-center gap-4 mb-12"
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 rounded-full bg-tedx-red"
                                animate={{
                                    y: [-5, 5, -5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-700/50"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                            Interested in Sponsoring?
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Partner with TEDxNIT Hamirpur and be part of something extraordinary. Reach out to us for sponsorship opportunities.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-tedx-red hover:bg-tedx-red-dark text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-tedx-red/30"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact Us
                        </a>
                    </motion.div>

                    {/* Background decorations */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-1/4 left-10 w-64 h-64 bg-tedx-red/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-tedx-red/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
