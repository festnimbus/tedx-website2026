'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Events', href: '/#events' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#171717]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative h-12 w-48 group">
            <Image
              src="/tedx-logo.png"
              alt="TEDx NIT Hamirpur"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-white/80 hover:text-white text-sm font-semibold uppercase tracking-wider transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-tedx-red group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
            <button className="ml-4 relative px-7 py-2.5 rounded-full font-bold text-sm uppercase tracking-wide overflow-hidden group">
              <span className="absolute inset-0 bg-tedx-red transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-r from-tedx-red via-red-500 to-tedx-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 border-2 border-tedx-red rounded-full" />
              <span className="relative text-white">Get Tickets</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#171717]/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-semibold uppercase tracking-wider text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full mt-4 px-6 py-3 rounded-full font-bold text-white bg-tedx-red uppercase tracking-wide text-sm hover:bg-red-600 transition-colors duration-300">
              Get Tickets
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

