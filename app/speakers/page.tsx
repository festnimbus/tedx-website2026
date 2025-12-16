'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import ChromaGrid, { SpeakerItem } from '@/components/ChromaGrid'

const currentSpeakers: SpeakerItem[] = [
    {
        id: 1,
        name: 'Dr. Priya Sharma',
        designation: 'AI Ethics Researcher',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        designation: 'Social Entrepreneur & TEDx Speaker',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
    {
        id: 3,
        name: 'Ananya Gupta',
        designation: 'Climate Scientist & Author',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
    },
    {
        id: 4,
        name: 'Vikram Mehta',
        designation: 'Tech Innovator & Founder',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
    {
        id: 5,
        name: 'Dr. Neha Singh',
        designation: 'Neuroscientist & Professor',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
    },
    {
        id: 6,
        name: 'Arjun Patel',
        designation: 'Startup Founder & Investor',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
]

const previousSpeakers: SpeakerItem[] = [
    {
        id: 101,
        name: 'Dr. Arun Menon',
        designation: 'Space Research Scientist',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
    {
        id: 102,
        name: 'Kavita Reddy',
        designation: 'Sustainability Expert',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
    },
    {
        id: 103,
        name: 'Sanjay Verma',
        designation: 'Digital Transformation Leader',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
    {
        id: 104,
        name: 'Dr. Meera Iyer',
        designation: 'Public Health Advocate',
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
    },
    {
        id: 105,
        name: 'Rahul Kapoor',
        designation: 'Education Innovator',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
]

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

                    {/* Speaker Cards with Animation */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={showPreviousSpeakers ? 'previous' : 'current'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ChromaGrid
                                items={showPreviousSpeakers ? previousSpeakers : currentSpeakers}
                                radius={400}
                                damping={0.4}
                                fadeOut={0.5}
                            />
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
