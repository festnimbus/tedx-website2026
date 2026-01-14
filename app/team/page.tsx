'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Footer from '@/components/Footer'
import TiltedCard from '@/components/TiltedCard'
import Link from 'next/link'

// Instagram Icon Component
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)

// LinkedIn Icon Component
const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)

// Social Links Component
const SocialLinks = ({ instagram, linkedin }: { instagram?: string; linkedin?: string }) => (
    <div className="flex items-center justify-center gap-4 mt-3">
        {instagram && (
            <Link
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-tedx-red transition-all duration-300 hover:scale-110 transform"
            >
                <InstagramIcon />
            </Link>
        )}
        {linkedin && (
            <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-tedx-red transition-all duration-300 hover:scale-110 transform"
            >
                <LinkedInIcon />
            </Link>
        )}
    </div>
)

// Team data
const organizers = [
    {
        id: 1,
        name: 'Rahul Prasad',
        designation: 'Organizer',
        image: '/volunteers/rahul.webp',
        instagram: 'https://www.instagram.com/rahulxprasad/',
        linkedin: 'https://www.linkedin.com/in/rahul-prasad-0224b225a/',
    },
    {
        id: 2,
        name: 'Sarayu Nallabolu',
        designation: 'Co-Organizer',
        image: '/volunteers/sarayu.webp',
        instagram: 'https://www.instagram.com/sarayu_.n/',
        linkedin: 'https://www.linkedin.com/in/sarayu-nallabolu-3271b525a/',
    },
]

const volunteers = [
    {
        id: 1,
        name: 'Agastya',
        image: '/volunteers/agastya.webp',
        instagram: 'https://www.instagram.com/_agstya04_/',
        linkedin: 'https://www.linkedin.com/in/agastya-gautam-b2201a322?',
    },
    {
        id: 2,
        name: 'Ayush',
        image: '/volunteers/ayush.webp',
        instagram: 'https://www.instagram.com/mai_ak_hoon/',
        linkedin: 'https://www.linkedin.com/in/ayush-ksharma/',
    },
    {
        id: 3,
        name: 'Dipanshu',
        image: '/volunteers/Dipanshu.webp',
        instagram: 'https://www.instagram.com/dipanshuyadav091?igsh=MWI4NGhqY2w5czVqZQ==',
        linkedin: 'https://www.linkedin.com/in/dipanshu-yadav-434116392',
    },
    {
        id: 4,
        name: 'Kunz',
        image: '/volunteers/kunz.webp',
        instagram: 'https://www.instagram.com/kunzsharma_/',
        linkedin: 'https://www.linkedin.com/in/kunz-sharma-975877334/',
    },
    {
        id: 5,
        name: 'Parthivi',
        image: '/volunteers/parthivi.webp',
        instagram: 'https://www.instagram.com/parthivi_pradhan/',
        linkedin: 'https://www.linkedin.com/in/parthivi-pradhan-aba260322/',
    },
    {
        id: 6,
        name: 'Prasi',
        image: '/volunteers/Prasi.webp',
        instagram: 'https://www.instagram.com/prasi_.paris/',
        linkedin: 'https://www.linkedin.com/in/prasi-mishra-a80028326/',
    },
    {
        id: 7,
        name: 'Sanskar',
        image: '/volunteers/Sanskar.webp',
        instagram: 'https://www.instagram.com/sanskar_057/',
        linkedin: 'https://www.linkedin.com/in/sanskar-bhangalia-19658032a/',
    },
    {
        id: 8,
        name: 'Saurabh',
        image: '/volunteers/saurabh.webp',
        instagram: 'https://www.instagram.com/__1saurabh__/',
        linkedin: 'https://www.linkedin.com/in/saurabh-chauhan-a96413323/',
    },
    {
        id: 9,
        name: 'Somya',
        image: '/volunteers/Somya Verma.webp',
        instagram: 'https://www.instagram.com/somya.ve',
        linkedin: 'https://www.linkedin.com/in/somya-verma-nith/',
    },
    {
        id: 10,
        name: 'Shubham',
        image: '/volunteers/suhanee.webp',
        instagram: 'https://www.instagram.com/whoisshubhamm_/',
        linkedin: 'https://www.linkedin.com/in/shubham-pathak-41b4a732b/',
    },
    {
        id: 11,
        name: 'Vaibhav',
        image: '/volunteers/Vaibhav.webp',
        instagram: 'https://www.instagram.com/vaibhav.pandey_75/',
        linkedin: 'https://www.linkedin.com/in/vaibhav-pandey-562055314/',
    },
    {
        id: 12,
        name: 'Vinay',
        image: '/volunteers/vinay.webp',
        instagram: 'https://www.instagram.com/vinnay_206?igsh=ZWNpY3djYWY2Mnhk',
        linkedin: 'https://www.linkedin.com/in/vinay-kumar-b25024333/',
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
                                    <SocialLinks instagram={member.instagram} linkedin={member.linkedin} />
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
                                <SocialLinks instagram={member.instagram} linkedin={member.linkedin} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
