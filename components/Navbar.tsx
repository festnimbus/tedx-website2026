'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="text-3xl font-black tracking-tighter text-white">TEDx</span>
            <span className="text-xs font-bold text-tedx-red tracking-widest group-hover:text-white transition-colors duration-300">NITHamirpur</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-tedx-red transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <button className="px-6 py-2 rounded-full font-bold text-white bg-tedx-red border-2 border-tedx-red hover:bg-transparent hover:text-tedx-red transition-all duration-300 shadow-[0_4px_14px_0_rgba(235,0,40,0.39)] hover:shadow-[0_6px_20px_rgba(235,0,40,0.23)] hover:-translate-y-0.5">
              Get Tickets
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
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
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-white hover:text-tedx-red transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full px-6 py-2 rounded-full font-bold text-white bg-tedx-red border-2 border-tedx-red hover:bg-transparent hover:text-tedx-red transition-all duration-300 shadow-[0_4px_14px_0_rgba(235,0,40,0.39)] hover:shadow-[0_6px_20px_rgba(235,0,40,0.23)] mt-4">
              Get Tickets
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
