'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    }

    const fadeInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 }
    }

    const fadeInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 }
    }

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Spacer for fixed navbar */}
            <div className="h-20" />

            {/* Section 1: What is TEDx? */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            variants={fadeInLeft}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                                WHAT IS <span className="text-tedx-red">TEDx</span>?
                            </h1>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                In the spirit of discovering and spreading ideas, TEDx is a program of
                                local, self-organized events that bring people together to share a TED-like
                                experience. At a TEDx event, TED Talks video and live speakers
                                combine to spark deep discussion and connection. These local, self-organized
                                events are branded TEDx, where x = independently organized
                                TED event. The TED Conference provides general guidance for the TEDx
                                program, but individual TEDx events are self-organized. (Subject to
                                certain rules and regulations.)
                            </p>
                        </motion.div>

                        {/* Right: Large X Graphic */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            variants={fadeInRight}
                            className="flex justify-center items-center"
                        >
                            <div className="relative">
                                <span className="text-[200px] md:text-[280px] lg:text-[350px] font-bold text-tedx-red select-none leading-none">
                                    X
                                </span>
                                {/* Glow effect */}
                                <div className="absolute inset-0 text-[200px] md:text-[280px] lg:text-[350px] font-bold text-tedx-red blur-3xl opacity-30 select-none leading-none">
                                    X
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: TEDx NIT Hamirpur */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: NIT Campus Image */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            variants={fadeInLeft}
                            className="relative group"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border-4 border-tedx-red">
                                <Image
                                    src="/campus2.webp"
                                    alt="NIT Hamirpur Campus"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                {/* Label */}
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white text-xl md:text-2xl font-bold">
                                        NIT Campus
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            variants={fadeInRight}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                                TEDx
                            </h2>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tedx-red mb-8">
                                NIT HAMIRPUR
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                TEDx NIT Hamirpur is an independently organized TED event hosted at
                                the National Institute of Technology, Hamirpur. Our event brings together
                                innovative thinkers, visionary leaders, and passionate changemakers to
                                share ideas worth spreading. Through carefully curated talks and
                                immersive experiences, we aim to inspire our community, foster
                                meaningful connections, and spark conversations that drive positive change.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 3: Theme - An Eye for a New Dawn */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Theme Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            variants={fadeInLeft}
                        >
                            <span className="text-tedx-red text-2xl md:text-3xl font-bold uppercase tracking-wider">
                                THEME:
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-8 leading-tight">
                                "AN EYE FOR A<br />NEW DAWN"
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                TEDx NIT Hamirpur embraces the theme "An Eye for a New Dawn" —
                                a call to look ahead with fresh perspectives, embrace innovation,
                                and usher in a new era of possibilities. This theme celebrates the
                                visionaries who see beyond the horizon and the dreamers who dare
                                to reimagine our world.
                            </p>
                        </motion.div>

                        {/* Right: City Sunrise Placeholder */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            variants={fadeInRight}
                            className="relative group"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-tedx-red flex items-center justify-center">
                                {/* Decorative gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-tedx-red via-red-600 to-orange-500 opacity-90" />

                                {/* Animated sunrise effect */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-400/50 to-transparent" />

                                {/* Sun circle */}
                                <motion.div
                                    className="absolute bottom-8 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-t from-yellow-400 to-orange-300 rounded-full blur-sm"
                                    animate={{ y: [10, -5, 10] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />

                                {/* Label */}
                                <span className="relative z-10 text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                                    City Sunrise
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
