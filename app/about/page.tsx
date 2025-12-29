'use client'

import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import Masonry, { MasonryItem } from '@/components/Masonry'
import ImageLoop from '@/components/ImageLoop'

// Gallery items for the Masonry grid using local images from public/gallery
const galleryItems: MasonryItem[] = [
    { id: '1', img: '/gallery/1.webp', height: 500 },
    { id: '2', img: '/gallery/2.webp', height: 350 },
    { id: '3', img: '/gallery/3.webp', height: 450 },
    { id: '4', img: '/gallery/4.webp', height: 300 },
    { id: '5', img: '/gallery/5.webp', height: 480 },
    { id: '6', img: '/gallery/6.webp', height: 380 },
    { id: '7', img: '/gallery/7.webp', height: 360 },
    { id: '8', img: '/gallery/8.webp', height: 420 },
]

export default function AboutPage() {
    const fadeInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 }
    }

    const fadeInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 }
    }

    return (
        <main className="min-h-screen bg-[#080808]">
            {/* Hero Spacer for fixed header */}
            <div className="h-24" />

            {/* Section 1: What is TEDx? + TEDx NIT Hamirpur  |  About TED */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Left Column: What is TEDx? + TEDx NIT Hamirpur */}
                        <div className="space-y-16">
                            {/* What is TEDx? */}
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

                            {/* TEDx NIT Hamirpur */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                variants={fadeInLeft}
                            >
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tedx-red mb-2">
                                    TEDx
                                </h2>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
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

                        {/* Right Column: About TED */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            variants={fadeInRight}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                                ABOUT <span className="text-tedx-red">TED</span>
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                TED is a nonprofit, nonpartisan organization dedicated to discovering, debating and spreading ideas that spark conversation, deepen understanding and drive meaningful change. Our organization is devoted to curiosity, reason, wonder and the pursuit of knowledge — without an agenda. We welcome people from every discipline and culture who seek a deeper understanding of the world and connection with others, and we invite everyone to engage with ideas and activate them in your community.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                TED began in 1984 as a conference where Technology, Entertainment and Design converged, but today it spans a multitude of worldwide communities and initiatives exploring everything from science and business to education, arts and global issues. In addition to the TED Talks curated from our annual conferences and published on TED.com, we produce original podcasts, short video series, animated educational lessons (TED-Ed) and TV programs that are translated into more than 100 languages and distributed via partnerships around the world. Each year, thousands of independently run TEDx events. Through the Audacious Project, TED has helped catalyze $6.6 billion in funding for projects that support bold solutions to the world&apos;s most urgent challenges — working to make the world more beautiful, sustainable and just. In 2020, TED launched Countdown, an initiative to accelerate solutions to the climate crisis and mobilize a movement for a net-zero future, and in 2023 TED launched TED Democracy to spark a new kind of conversation focused on realistic pathways towards a more vibrant and equitable future. View a full list of TED&apos;s many programs and initiatives.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: Theme - Inchoation */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Theme Content - Centered */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        variants={fadeInLeft}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="text-tedx-red text-2xl md:text-3xl font-bold uppercase tracking-wider">
                            THEME:
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-2 leading-tight">
                            INCHOATION
                        </h2>
                        <p className="text-2xl md:text-3xl text-tedx-red/80 font-semibold mb-8" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                            अंतः अस्ति आरंभ
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Inchoation marks the moment something begins to take shape, a thought awakening, an idea forming. अंतः अस्ति आरंभ means "within lies the beginning," a reminder that every transformation starts from within before it ever reaches the world. This theme celebrates the quiet sparks: the decisions made in silence, the inner struggles that fuel breakthroughs. Through stories of resilience and discovery, we explore how what begins inside us becomes the ideas worth spreading.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section - Masonry Grid for Desktop */}
            <section className="py-16 md:py-24 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Masonry
                        items={galleryItems}
                        animateFrom="bottom"
                        stagger={0.05}
                        scaleOnHover={true}
                        hoverScale={0.95}
                        blurToFocus={true}
                    />
                </div>
            </section>

            {/* Gallery Section - Infinite Scroll for Mobile */}
            <section className="py-12 md:hidden">
                <div className="space-y-4">
                    {/* First row - scrolling left */}
                    <ImageLoop
                        images={galleryItems.slice(0, 4).map(item => ({ src: item.img, alt: `Gallery image ${item.id}` }))}
                        speed={60}
                        direction="left"
                        imageHeight={160}
                        gap={12}
                        pauseOnHover={true}
                    />
                    {/* Second row - scrolling right */}
                    <ImageLoop
                        images={galleryItems.slice(4, 8).map(item => ({ src: item.img, alt: `Gallery image ${item.id}` }))}
                        speed={50}
                        direction="right"
                        imageHeight={160}
                        gap={12}
                        pauseOnHover={true}
                    />
                </div>
            </section>

            <Footer />
        </main>
    )
}
