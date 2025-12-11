'use client'

import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

const events = [
  {
    id: 1,
    time: '09:00 AM',
    title: 'Registration & Welcome Coffee',
    description: 'Meet fellow attendees and grab some refreshments',
    type: 'general',
  },
  {
    id: 2,
    time: '10:00 AM',
    title: 'Opening Ceremony',
    description: 'Welcome address and introduction to the theme',
    type: 'ceremony',
  },
  {
    id: 3,
    time: '10:30 AM',
    title: 'Session 1: Technology & Innovation',
    description: 'Three speakers sharing groundbreaking tech ideas',
    type: 'talk',
  },
  {
    id: 4,
    time: '12:00 PM',
    title: 'Networking Lunch',
    description: 'Connect with speakers and attendees over lunch',
    type: 'break',
  },
  {
    id: 5,
    time: '01:30 PM',
    title: 'Session 2: Social Impact',
    description: 'Stories of change-makers and social entrepreneurs',
    type: 'talk',
  },
  {
    id: 6,
    time: '03:00 PM',
    title: 'Coffee Break & Interactive Activities',
    description: 'Refreshments and engaging activities',
    type: 'break',
  },
  {
    id: 7,
    time: '03:30 PM',
    title: 'Session 3: Science & Future',
    description: 'Exploring the frontiers of science and innovation',
    type: 'talk',
  },
  {
    id: 8,
    time: '05:00 PM',
    title: 'Closing Ceremony & Performance',
    description: 'Final thoughts and special cultural performance',
    type: 'ceremony',
  },
]

export default function Events() {
  const { ref, isInView } = useInView()

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'talk':
        return '🎤'
      case 'break':
        return '☕'
      case 'ceremony':
        return '🎭'
      default:
        return '📋'
    }
  }

  return (
    <section id="events" className="py-20 md:py-32 bg-black text-white">
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
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A full day of inspiring talks, networking opportunities, and unforgettable experiences
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-tedx-red via-tedx-red to-transparent" />

          {/* Events */}
          <div className="space-y-20">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div
                      whileHover={{ scale: 1.03, translateY: -8 }}
                      transition={{ duration: 0.3 }}
                      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 border-2 border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden group"
                    >
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-tedx-red/5 via-transparent to-tedx-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Accent bar */}
                      <div className={`absolute ${isLeft ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 bg-gradient-to-b from-tedx-red via-tedx-red/50 to-transparent`} />
                      
                      <div className="relative z-10">
                        {/* Time Badge */}
                        <div className="inline-flex items-center gap-3 bg-tedx-red/20 px-5 py-2 rounded-full mb-4 border border-tedx-red/30">
                          <span className="text-2xl">{getEventIcon(event.type)}</span>
                          <span className="text-tedx-red font-bold text-lg">{event.time}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-tedx-red transition-colors duration-300">
                          {event.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-400 leading-relaxed text-base mb-4">
                          {event.description}
                        </p>
                        
                        {/* Bottom decoration */}
                        <div className="flex items-center gap-2 mt-6 opacity-50 group-hover:opacity-100 transition-opacity">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-tedx-red to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Dot on Event Side */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className={`absolute ${isLeft ? 'left-[41.666%]' : 'right-[41.666%]'} z-10 hidden md:block`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-tedx-red rounded-full border-4 border-black shadow-lg shadow-tedx-red/50" />
                      <div className="absolute inset-0 w-8 h-8 bg-tedx-red rounded-full animate-ping opacity-75" />
                    </div>
                  </motion.div>

                  {/* Connector Line from center to dot */}
                  <div className={`hidden md:block absolute top-1/2 ${isLeft ? 'left-1/2 right-[58.333%]' : 'right-1/2 left-[58.333%]'} h-0.5 bg-gradient-to-${isLeft ? 'r' : 'l'} from-tedx-red to-tedx-red`} />
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-tedx-red/20 blur-3xl rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-gradient-to-r from-tedx-red/10 via-tedx-red/20 to-tedx-red/10 border-2 border-tedx-red rounded-2xl p-10 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 uppercase">Save the Date</h3>
            <p className="text-5xl md:text-6xl font-bold text-tedx-red mb-2">February 13, 2026</p>
            <p className="text-xl text-gray-300 mb-8">NIT Hamirpur Campus | 9:00 AM - 6:00 PM</p>
            <button className="bg-tedx-red hover:bg-tedx-red-dark text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-tedx-red/50">
              Add to Calendar
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
