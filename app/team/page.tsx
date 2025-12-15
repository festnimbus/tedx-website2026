'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Footer from '@/components/Footer'

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
        name: 'Somya Verma',
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
        name: 'Arjun Singh',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    },
    {
        id: 9,
        name: 'Sneha Gupta',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
        id: 10,
        name: 'Rahul Verma',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    },
    {
        id: 11,
        name: 'Anita Roy',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    },
    {
        id: 12,
        name: 'Vikram Das',
        image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop',
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
                        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                            {organizers.map((member) => (
                                <motion.div
                                    key={member.id}
                                    variants={itemVariants}
                                    className="flex flex-col items-center group cursor-pointer"
                                >
                                    {/* Image Container with Red Glow Border */}
                                    <div className="relative mb-5">
                                        {/* Outer glow ring */}
                                        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-tedx-red via-red-600 to-tedx-red opacity-70 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300" />

                                        {/* Border ring */}
                                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-tedx-red via-red-500 to-tedx-red" />

                                        {/* Image */}
                                        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-zinc-900 group-hover:scale-105 transition-transform duration-300">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-tedx-red transition-colors duration-300">
                                        {member.name}
                                    </h3>

                                    {/* Designation */}
                                    <p className="text-tedx-red text-sm md:text-base uppercase tracking-wider font-medium">
                                        {member.designation}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Volunteers Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
                    >
                        {volunteers.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={itemVariants}
                                className="flex flex-col items-center group cursor-pointer"
                            >
                                {/* Image Container with Red Glow Border */}
                                <div className="relative mb-4">
                                    {/* Outer glow ring */}
                                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-tedx-red via-red-600 to-tedx-red opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300" />

                                    {/* Border ring */}
                                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-tedx-red via-red-500 to-tedx-red" />

                                    {/* Image */}
                                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-zinc-900 group-hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Name */}
                                <h3 className="text-base md:text-lg font-bold text-white mb-0.5 text-center group-hover:text-tedx-red transition-colors duration-300">
                                    {member.name}
                                </h3>

                                {/* Designation */}
                                <p className="text-tedx-red text-xs md:text-sm uppercase tracking-wider font-medium">
                                    Volunteer
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
