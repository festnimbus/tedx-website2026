'use client'

import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

const events = [
  {
    id: 1,
    title: 'Call for Speakers',
    description: 'Submit your proposals for the TEDx event',
  },
  {
    id: 2,
    title: 'Speakers Announcement',
    description: 'Announcement of speakers',
  },
  {
    id: 3,
    title: 'Opening Ceremony',
    description: 'Welcome address and introduction to the theme',
  },
  {
    id: 4,
    title: 'TEDx Talks by Speakers',
    description: 'Main talk by the speaker',
  },
  {
    id: 5,
    title: 'Q&A Session',
    description: 'Questions and answers with the speaker',
  },
  {
    id: 6,
    title: 'Closing Ceremony',
    description: 'Closing remarks and thank you',
  },
]

export default function Events() {
  const { ref, isInView } = useInView()

  return (
    <section id="events" className="py-20 md:py-32 bg-[#080808] text-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">
            Event <span className="text-tedx-red">Schedule</span>
          </h2>
          <div className="w-24 h-1 bg-tedx-red mx-auto mb-8" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line - subtle glowing effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-tedx-red/80 via-tedx-red/40 to-transparent" />
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-4 bg-gradient-to-b from-tedx-red/10 via-tedx-red/5 to-transparent blur-sm" />

          {/* Events */}
          <div className="space-y-8 md:space-y-0">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className={`relative flex items-center py-4 md:py-8 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ x: isLeft ? -8 : 8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative group cursor-pointer"
                    >
                      {/* Card Background with layered effect */}
                      <div className="absolute inset-0 bg-tedx-red/5 rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
                      <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-zinc-800/50 group-hover:border-tedx-red/30 transition-all duration-300">

                        {/* Event number indicator */}
                        <div className={`absolute top-0 ${isLeft ? '-right-2 sm:-right-3 md:-right-6' : '-left-2 sm:-left-3 md:-left-6'} transform -translate-y-1/2`}>
                          <span className="text-tedx-red/20 text-3xl sm:text-5xl md:text-6xl font-black select-none">
                            {String(event.id).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white/90 group-hover:text-white transition-colors duration-300 leading-tight">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 group-hover:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed transition-colors duration-300">
                          {event.description}
                        </p>

                        {/* Subtle bottom accent */}
                        <div className="mt-3 sm:mt-5 h-px bg-gradient-to-r from-tedx-red/0 via-tedx-red/40 to-tedx-red/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.08 + 0.2 }}
                    viewport={{ once: false }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-tedx-red rounded-full shadow-lg shadow-tedx-red/40" />
                    <div className="absolute w-6 h-6 border border-tedx-red/30 rounded-full animate-pulse" />
                  </motion.div>

                  {/* Connector Line */}
                  <div className={`hidden md:block absolute top-1/2 h-px w-[4%] bg-tedx-red/30 ${isLeft ? 'left-[46%]' : 'right-[46%]'}`} />
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mt-24 text-center bg-[#080808] rounded-2xl p-10 relative overflow-hidden border border-tedx-red/40 shadow-[0_0_30px_rgba(235,0,40,0.15),inset_0_0_60px_rgba(235,0,40,0.05)]"
        >
          {/* Glowing red outline effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-tedx-red/20 pointer-events-none" />
          <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-tedx-red/10 via-transparent to-tedx-red/10 pointer-events-none blur-sm" />

          {/* Corner glow accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-tedx-red/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-tedx-red/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* Subtle corner frame accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-tedx-red/50 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-tedx-red/50 rounded-br-2xl" />

          {/* Ambient center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-tedx-red/8 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="text-4xl md:text-6xl font-bold text-tedx-red mb-2">February 14, 2026</p>
            <p className="text-lg md:text-xl text-gray-400">NIT Hamirpur Auditorium | 2:00 PM - 5:00 PM</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
