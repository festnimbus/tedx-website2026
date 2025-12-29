'use client'

import { motion } from 'framer-motion'

interface ComingSoonDisplayProps {
    isMobile?: boolean
}

export default function ComingSoonDisplay({ isMobile = false }: ComingSoonDisplayProps) {
    // Responsive font size that works well across all devices
    const fontSize = isMobile
        ? "text-[clamp(2.5rem,15vw,4rem)]"
        : "text-[clamp(3.5rem,12vw,8rem)]"

    return (
        <div className="flex flex-col items-center justify-center gap-0 py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                <h2
                    className={`${fontSize} font-black uppercase tracking-tight leading-none text-center fuzzy-text-red`}
                    style={{
                        fontFamily: 'inherit',
                        textShadow: '0 0 40px rgba(235, 0, 40, 0.4), 0 0 20px rgba(235, 0, 40, 0.3)',
                    }}
                >
                    COMING
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
            >
                <h2
                    className={`${fontSize} font-black uppercase tracking-tight leading-none text-center fuzzy-text-white`}
                    style={{
                        fontFamily: 'inherit',
                        textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)',
                    }}
                >
                    SOON
                </h2>
            </motion.div>

            <style jsx>{`
        @keyframes subtle-glitch-red {
          0%, 100% {
            text-shadow: 
              0 0 40px rgba(235, 0, 40, 0.4),
              0 0 20px rgba(235, 0, 40, 0.3),
              1px 0 2px rgba(235, 0, 40, 0.5);
          }
          50% {
            text-shadow: 
              0 0 40px rgba(235, 0, 40, 0.5),
              0 0 20px rgba(235, 0, 40, 0.4),
              -1px 0 2px rgba(235, 0, 40, 0.6);
          }
        }

        @keyframes subtle-glitch-white {
          0%, 100% {
            text-shadow: 
              0 0 40px rgba(255, 255, 255, 0.3),
              0 0 20px rgba(255, 255, 255, 0.2),
              1px 0 2px rgba(255, 255, 255, 0.4);
          }
          50% {
            text-shadow: 
              0 0 40px rgba(255, 255, 255, 0.4),
              0 0 20px rgba(255, 255, 255, 0.3),
              -1px 0 2px rgba(255, 255, 255, 0.5);
          }
        }

        .fuzzy-text-red {
          color: #eb0028;
          animation: subtle-glitch-red 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .fuzzy-text-red:hover {
          animation: subtle-glitch-red 0.5s ease-in-out infinite;
          text-shadow: 
            0 0 60px rgba(235, 0, 40, 0.6),
            0 0 30px rgba(235, 0, 40, 0.5),
            2px 0 4px rgba(235, 0, 40, 0.7);
        }

        .fuzzy-text-white {
          color: #ffffff;
          animation: subtle-glitch-white 3.5s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .fuzzy-text-white:hover {
          animation: subtle-glitch-white 0.5s ease-in-out infinite;
          text-shadow: 
            0 0 60px rgba(255, 255, 255, 0.5),
            0 0 30px rgba(255, 255, 255, 0.4),
            2px 0 4px rgba(255, 255, 255, 0.6);
        }
      `}</style>
        </div>
    )
}
