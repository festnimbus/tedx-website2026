'use client'

import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'
import { useState, useEffect } from 'react'

export default function About() {
  const { ref, isInView } = useInView()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2026-02-13T00:00:00').getTime()
    
    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-20 md:py-32 bg-black text-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Side - About TEDx */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              ABOUT <span className="text-tedx-red">TEDx</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-base leading-relaxed">
              <p>
                In the spirit of discovering and spreading ideas, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
              </p>
              <p>
                Our event is called TEDxNIT Hamirpur, where x = independently organized TED event. At our TEDxNIT Hamirpur event, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group.
              </p>
              <p>
                The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Theme and Countdown */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tight">
              INNOVISION
            </h2>
            <p className="text-tedx-red text-xl md:text-2xl font-semibold mb-12">
              ज्ञानं परमं बलम्
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg p-6 mb-3 w-full">
                  <div className="text-4xl md:text-5xl font-bold">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                </div>
                <span className="bg-tedx-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Days
                </span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg p-6 mb-3 w-full">
                  <div className="text-4xl md:text-5xl font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                </div>
                <span className="bg-tedx-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Hours
                </span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg p-6 mb-3 w-full">
                  <div className="text-4xl md:text-5xl font-bold">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                </div>
                <span className="bg-tedx-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Minutes
                </span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg p-6 mb-3 w-full">
                  <div className="text-4xl md:text-5xl font-bold">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
                <span className="bg-tedx-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Seconds
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
