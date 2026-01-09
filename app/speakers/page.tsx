'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import ChromaGrid, { SpeakerItem } from '@/components/ChromaGrid'
import FuzzyText from '@/components/FuzzyText'

/* ============================================
   CURRENT SPEAKERS - COMMENTED OUT FOR NOW
   Uncomment when speakers are announced
   ============================================ */
// const currentSpeakers: SpeakerItem[] = [
//     {
//         id: 1,
//         name: 'Dr. Priya Sharma',
//         designation: 'AI Ethics Researcher',
//         image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
//         linkedin: 'https://linkedin.com',
//         instagram: 'https://instagram.com',
//     },
//     {
//         id: 2,
//         name: 'Rajesh Kumar',
//         designation: 'Social Entrepreneur & TEDx Speaker',
//         image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//     },
//     {
//         id: 3,
//         name: 'Ananya Gupta',
//         designation: 'Climate Scientist & Author',
//         image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
//         linkedin: 'https://linkedin.com',
//         instagram: 'https://instagram.com',
//     },
//     {
//         id: 4,
//         name: 'Vikram Mehta',
//         designation: 'Tech Innovator & Founder',
//         image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//     },
//     {
//         id: 5,
//         name: 'Dr. Neha Singh',
//         designation: 'Neuroscientist & Professor',
//         image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
//         linkedin: 'https://linkedin.com',
//         instagram: 'https://instagram.com',
//     },
//     {
//         id: 6,
//         name: 'Arjun Patel',
//         designation: 'Startup Founder & Investor',
//         image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//     },
// ]

const previousSpeakers: SpeakerItem[] = [
    {
        id: 101,
        name: 'Manu Arora',
        designation: 'Founder, Acerternity UI',
        image: '/prev_speakers/1.webp',
        linkedin: 'https://www.linkedin.com/in/manuarora28/',
        instagram: 'https://www.instagram.com/mannupaaji/',
        twitter: 'https://x.com/mannupaaji?lang=en',
    },
    {
        id: 102,
        name: 'Yash Garg',
        designation: 'Founder, College Setu & Ed-tech Entrepreneur',
        image: '/prev_speakers/3.webp',
        linkedin: 'https://www.linkedin.com/in/yashgargdl/',
        instagram: 'https://www.instagram.com/yashgargdl/',
        twitter: 'https://x.com/yashgargdl',
    },
    {
        id: 103,
        name: 'Col. Ashokan K.',
        designation: 'Indian Army Veteran & Security Expert',
        image: '/prev_speakers/2.webp',
        instagram: 'https://www.instagram.com/colonel_ashokan_k/',
    },
    {
        id: 104,
        name: 'Yatin Pandit',
        designation: 'Historian & Researcher',
        image: '/prev_speakers/4.webp',
        instagram: 'https://www.instagram.com/dev_sons_kriti/',
    },
    {
        id: 105,
        name: 'Jagdeep Singh',
        designation: 'Civil Servant & Advocate',
        image: '/prev_speakers/5.webp',
        linkedin: 'https://www.linkedin.com/in/jagdeepsinghkas/',
        instagram: 'https://www.instagram.com/jagdeep_kas19/',
        twitter: 'https://x.com/jagdeep_kas19',
    },
]

// Coming Soon Component with FuzzyText effect
function ComingSoonDisplay() {
    // Improved responsive sizing that works better across all devices
    const fontSize = "clamp(3.5rem, 12vw, 8rem)" // min 56px, max 128px

    return (
        <div className="flex flex-col items-center justify-center gap-2 py-16 md:py-24">
            <FuzzyText
                fontSize={fontSize}
                fontWeight={900}
                color="#eb0028"
                enableHover={true}
                baseIntensity={0.15}
                hoverIntensity={0.6}
            >
                COMING
            </FuzzyText>
            <FuzzyText
                fontSize={fontSize}
                fontWeight={900}
                color="#ffffff"
                enableHover={true}
                baseIntensity={0.15}
                hoverIntensity={0.6}
            >
                SOON
            </FuzzyText>
        </div>
    )
}

export default function SpeakersPage() {
    const [showPreviousSpeakers, setShowPreviousSpeakers] = useState(false)

    return (
        <main className="min-h-screen bg-[#080808]">
            {/* Hero Spacer for fixed header */}
            <div className="h-24" />

            {/* Page Header */}
            <section className="py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-tedx-red mb-6 tracking-tight">
                            {showPreviousSpeakers ? 'PREVIOUS SPEAKERS' : 'SPEAKERS'}
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            {showPreviousSpeakers
                                ? 'Meet the inspiring voices who graced our previous TEDxNIT Hamirpur events'
                                : 'Meet the visionary minds who will share ideas worth spreading at TEDxNIT Hamirpur'
                            }
                        </p>
                    </motion.div>

                    {/* Speaker Cards / Coming Soon with Animation */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={showPreviousSpeakers ? 'previous' : 'current'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {showPreviousSpeakers ? (
                                <ChromaGrid
                                    items={previousSpeakers}
                                    radius={400}
                                    damping={0.4}
                                    fadeOut={0.5}
                                />
                            ) : (
                                <ComingSoonDisplay />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mt-16"
                    >
                        <button
                            onClick={() => setShowPreviousSpeakers(!showPreviousSpeakers)}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-tedx-red text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-tedx-red/30"
                        >
                            <span className="relative z-10">
                                {showPreviousSpeakers ? '← Current Speakers' : 'Our Previous Speakers →'}
                            </span>
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
