'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const interestOptions = [
        'General Inquiry',
        'Sponsorship',
        'Speaker Application',
        'Other'
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        // Simulate API call / form submission
        try {
            // Create mailto link with form data
            const subject = `TEDxNIT Hamirpur - ${formData.interest || 'Contact Form'}`
            const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone || 'Not provided'}%0D%0AInterest: ${formData.interest || 'Not specified'}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`

            // Open mailto in new window so user stays on page
            window.open(`mailto:voices@tedxnithamirpur.com?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank')

            // Show success message
            setTimeout(() => {
                setIsSubmitting(false)
                setIsSubmitted(true)

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    interest: '',
                    message: ''
                })
            }, 500)
        } catch (error) {
            setIsSubmitting(false)
            console.error('Error submitting form:', error)
        }
    }


    return (
        <main className="min-h-screen bg-[#080808]">
            {/* Hero Spacer for fixed header */}
            <div className="h-24" />

            {/* Contact Section */}
            <section className="py-16 md:py-24 flex items-center justify-center min-h-[80vh]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    {/* Centered Box Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 md:p-12 lg:p-16"
                        style={{ boxShadow: '0 0 40px rgba(235, 0, 40, 0.05)' }}
                    >
                        {/* Header */}
                        <div className="text-center mb-12">
                            <p className="text-gray-400 text-sm uppercase tracking-[0.3em] mb-4">
                                TEDxNIT Hamirpur
                            </p>
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
                                CONTACT <span className="text-tedx-red">US</span>
                            </h1>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                            {/* Left Column - Online Inquiry Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-lg text-tedx-red uppercase tracking-[0.2em] mb-10 font-medium">
                                    Inquiry
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Name *"
                                            className={`w-full bg-transparent border-b py-3 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 ${errors.name ? 'border-red-500' : 'border-gray-600 focus:border-tedx-red'
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email *"
                                            className={`w-full bg-transparent border-b py-3 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-tedx-red'
                                                }`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone Input */}
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Phone"
                                            className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-tedx-red transition-colors duration-300"
                                        />
                                    </div>

                                    {/* Interest Select */}
                                    <div className="relative">
                                        <select
                                            id="interest"
                                            name="interest"
                                            value={formData.interest}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-500 focus:outline-none focus:border-tedx-red transition-colors duration-300 cursor-pointer appearance-none"
                                            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                                        >
                                            <option value="" className="bg-[#080808] text-gray-500">Select An Interest</option>
                                            {interestOptions.map((option) => (
                                                <option key={option} value={option} className="bg-[#080808] text-white">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {/* Dropdown Arrow */}
                                        <svg
                                            className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Message *"
                                            rows={4}
                                            className={`w-full bg-transparent border-b py-3 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 resize-none ${errors.message ? 'border-red-500' : 'border-gray-600 focus:border-tedx-red'
                                                }`}
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <AnimatePresence mode="wait">
                                            {isSubmitted ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="flex items-center gap-3 text-tedx-red font-medium"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="uppercase tracking-wider">Inquiry Sent!</span>
                                                </motion.div>
                                            ) : (
                                                <motion.button
                                                    key="button"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="group inline-flex items-center gap-3 text-tedx-red font-medium uppercase tracking-wider hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    whileHover={{ x: isSubmitting ? 0 : 5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                            <span>Sending...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Send Message</span>
                                                            <svg
                                                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </>
                                                    )}
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </form>
                            </motion.div>

                            {/* Right Column - Contact Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <h2 className="text-lg uppercase tracking-[0.2em] text-white mb-10 font-medium">
                                    Details
                                </h2>

                                <div className="space-y-10">
                                    {/* Email & Phone */}
                                    <div className="space-y-3">
                                        <a
                                            href="mailto:voices@tedxnithamirpur.com"
                                            className="block text-tedx-red hover:text-tedx-red transition-colors duration-300"
                                        >
                                            voices@tedxnithamirpur.com
                                        </a>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <p className="text-gray-400 leading-relaxed">
                                            National Institute of Technology<br />
                                            Hamirpur, Himachal Pradesh<br />
                                            177005, India
                                        </p>
                                    </div>

                                    {/* Social Links */}
                                    <div>
                                        <h3 className="text-tedx-red font-semibold mb-4">Follow Us</h3>
                                        <div className="flex gap-4">
                                            <a
                                                href="https://www.instagram.com/tedxnithamirpur/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-tedx-red hover:text-tedx-red transition-colors duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/company/tedxnithamirpurofficial/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-tedx-red hover:text-tedx-red transition-colors duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://youtube.com/@tedxnithamirpur?si=RGu1vvsFRGgZ-Ngb"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-tedx-red hover:text-tedx-red transition-colors duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
