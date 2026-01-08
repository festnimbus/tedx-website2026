'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Footer from '@/components/Footer'
import TiltedCard from '@/components/TiltedCard'

// Team data
const organizers = [
    {
        id: 1,
        name: 'Rahul Prasad',
        designation: 'Organizer',
        image: '/volunteers/rahul.webp',
    },
    {
        id: 2,
        name: 'Sarayu Nallabolu',
        designation: 'Co-Organizer',
        image: '/volunteers/sarayu.webp',
    },
]

const volunteers = [
    {
        id: 1,
        name: 'Agastya',
        image: '/volunteers/agastya.webp',
    },
    {
        id: 2,
        name: 'Ayush',
        image: '/volunteers/ayush.webp',
    },
    {
        id: 3,
        name: 'Dipanshu',
        image: '/volunteers/Dipanshu.webp',
    },
    {
        id: 4,
        name: 'Kunz',
        image: '/volunteers/kunz.webp',
    },
    {
        id: 5,
        name: 'Parthivi',
        image: '/volunteers/parthivi.webp',
    },
    {
        id: 6,
        name: 'Prasi',
        image: '/volunteers/Prasi.webp',
    },
    {
        id: 7,
        name: 'Sanskar',
        image: '/volunteers/Sanskar.webp',
    },
    {
        id: 8,
        name: 'Saurabh',
        image: '/volunteers/saurabh.webp',
    },
    {
        id: 9,
        name: 'Somya',
        image: '/volunteers/Somya Verma.webp',
    },
    {
        id: 10,
        name: 'Suhanee',
        image: '/volunteers/suhanee.webp',
    },
    {
        id: 11,
        name: 'Vaibhav',
        image: '/volunteers/Vaibhav.webp',
    },
    {
        id: 12,
        name: 'Vinay',
        image: '/volunteers/vinay.webp',
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
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                    <TiltedCard
                                        imageSrc={member.image}
                                        altText={member.name}
                                        captionText={member.name}
                                        containerHeight="380px"
                                        containerWidth="280px"
                                        imageHeight="350px"
                                        imageWidth="280px"
                                        rotateAmplitude={12}
                                        scaleOnHover={1.12}
                                        showMobileWarning={false}
                                        showTooltip={false}
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
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
                    >
                        Our Volunteers
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 justify-items-center"
                    >
                        {volunteers.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={itemVariants}
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <TiltedCard
                                    imageSrc={member.image}
                                    altText={member.name}
                                    captionText={member.name}
                                    containerHeight="260px"
                                    containerWidth="180px"
                                    imageHeight="225px"
                                    imageWidth="180px"
                                    rotateAmplitude={10}
                                    scaleOnHover={1.1}
                                    showMobileWarning={false}
                                    showTooltip={false}
                                    displayOverlayContent={true}
                                    overlayContent={
                                        <div className="text-center">
                                            <h3 className="text-base font-bold text-white mb-0.5">
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
