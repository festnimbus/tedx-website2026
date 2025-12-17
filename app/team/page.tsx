'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Footer from '@/components/Footer'
import TiltedCard from '@/components/TiltedCard'

// Team data
const organizers = [
    {
        id: 1,
        name: 'Rajit Sneh',
        designation: 'Organizer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
        id: 2,
        name: 'Mohit Soni',
        designation: 'Co-Organizer',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    },
]

const volunteers = [
    {
        id: 1,
        name: 'Dipanshu',
        image: '/volunteers/Dipanshu.webp',
    },
    {
        id: 2,
        name: 'Sanskar',
        image: '/volunteers/Sanskar.webp',
    },
    {
        id: 3,
        name: 'Somya',
        image: '/volunteers/Somya Verma.webp',
    },
    {
        id: 4,
        name: 'Vaibhav',
        image: '/volunteers/Vaibhav.webp',
    },
    {
        id: 5,
        name: 'Ayush',
        image: '/volunteers/ayush.webp',
    },
    {
        id: 6,
        name: 'Parthivi',
        image: '/volunteers/parthivi.webp',
    },
    {
        id: 7,
        name: 'Saurabh',
        image: '/volunteers/saurabh.webp',
    },
    {
        id: 8,
        name: 'Vinay',
        image: '/volunteers/vinay.webp',
    },
    {
        id: 9,
        name: 'Suhanee',
        image: '/volunteers/suhanee.webp',
    },
    {
        id: 10,
        name: 'Kunz',
        image: '/volunteers/kunz.webp',
    },
    {
        id: 11,
        name: 'Agastya',
        image: '/volunteers/agastya.webp',
    },
    {
        id: 12,
        name: 'Prasi',
        image: '/volunteers/Prasi.webp',
    },
]

export default function TeamPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    }

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
                            MEET OUR TEAM
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            The passionate individuals behind TEDxNIT Hamirpur
                        </p>
                    </motion.div>

                    {/* Decorative X marks */}
                    <div className="hidden lg:block">
                        <span className="fixed top-32 right-10 text-tedx-red text-4xl font-bold opacity-60">X</span>
                        <span className="fixed bottom-40 left-10 text-tedx-red text-4xl font-bold opacity-60">X</span>
                    </div>

                    {/* Organizers Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-20"
                    >
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {organizers.map((member) => (
                                <motion.div
                                    key={member.id}
                                    variants={itemVariants}
                                    className="flex flex-col items-center"
                                >
                                    <TiltedCard
                                        imageSrc={member.image}
                                        altText={member.name}
                                        captionText={member.name}
                                        containerHeight="360px"
                                        containerWidth="280px"
                                        imageHeight="280px"
                                        imageWidth="280px"
                                        rotateAmplitude={12}
                                        scaleOnHover={1.12}
                                        showMobileWarning={false}
                                        showTooltip={true}
                                        displayOverlayContent={true}
                                        overlayContent={
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {member.name}
                                                </h3>
                                                <p className="text-tedx-red text-sm uppercase tracking-wider font-semibold">
                                                    {member.designation}
                                                </p>
                                            </div>
                                        }
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Volunteers Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10"
                    >
                        {volunteers.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={itemVariants}
                                className="flex flex-col items-center"
                            >
                                <TiltedCard
                                    imageSrc={member.image}
                                    altText={member.name}
                                    captionText={member.name}
                                    containerHeight="300px"
                                    containerWidth="220px"
                                    imageHeight="220px"
                                    imageWidth="220px"
                                    rotateAmplitude={10}
                                    scaleOnHover={1.1}
                                    showMobileWarning={false}
                                    showTooltip={true}
                                    displayOverlayContent={true}
                                    overlayContent={
                                        <div className="text-center">
                                            <h3 className="text-lg font-bold text-white mb-0.5">
                                                {member.name}
                                            </h3>
                                            <p className="text-tedx-red text-xs uppercase tracking-wider font-semibold">
                                                Volunteer
                                            </p>
                                        </div>
                                    }
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
