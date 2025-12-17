'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Stepper, { Step } from '@/components/Stepper'
import Footer from '@/components/Footer'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <main className="min-h-screen bg-[#080808]">
            {/* Hero Spacer for fixed header */}
            <div className="h-24" />

            {/* Page Header */}
            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-tedx-red mb-6 tracking-tight">
                            GET IN TOUCH
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you soon.
                        </p>
                    </motion.div>

                    {/* Decorative X marks */}
                    <div className="hidden lg:block">
                        <span className="fixed top-32 right-10 text-tedx-red text-4xl font-bold opacity-60">X</span>
                        <span className="fixed bottom-40 left-10 text-tedx-red text-4xl font-bold opacity-60">X</span>
                    </div>

                    {/* Contact Form Stepper */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-xl mx-auto"
                    >
                        <Stepper
                            initialStep={1}
                            onStepChange={(step) => console.log('Step:', step)}
                            onFinalStepCompleted={() => console.log('Form completed!')}
                            backButtonText="Previous"
                            nextButtonText="Next"
                        >
                            {/* Step 1: Welcome / Contact Us */}
                            <Step>
                                <div className="text-center py-6">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-tedx-red/20 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-tedx-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
                                    <p className="text-gray-400 mb-6">
                                        Have questions about TEDxNIT Hamirpur? Want to collaborate or sponsor?
                                        We&apos;re here to help!
                                    </p>
                                    <div className="flex justify-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-tedx-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>Email Support</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-tedx-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span>Quick Response</span>
                                        </div>
                                    </div>
                                </div>
                            </Step>

                            {/* Step 2: Name Input */}
                            <Step>
                                <div className="py-6">
                                    <h2 className="text-2xl font-bold text-white mb-2 text-center">What&apos;s your name?</h2>
                                    <p className="text-gray-400 text-center mb-8">Let us know who we&apos;re speaking with</p>
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:border-tedx-red focus:ring-1 focus:ring-tedx-red transition-colors"
                                        />
                                    </div>
                                </div>
                            </Step>

                            {/* Step 3: Email & Phone */}
                            <Step>
                                <div className="py-6">
                                    <h2 className="text-2xl font-bold text-white mb-2 text-center">How can we reach you?</h2>
                                    <p className="text-gray-400 text-center mb-8">Your contact information</p>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:border-tedx-red focus:ring-1 focus:ring-tedx-red transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:border-tedx-red focus:ring-1 focus:ring-tedx-red transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Step>

                            {/* Step 4: Completion */}
                            <Step>
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', duration: 0.5 }}
                                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-tedx-red/20 flex items-center justify-center"
                                    >
                                        <svg className="w-12 h-12 text-tedx-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Thank You!</h2>
                                    <p className="text-gray-400 mb-4">
                                        We&apos;ve received your information. Our team will get back to you shortly.
                                    </p>
                                    {formData.name && (
                                        <p className="text-tedx-red font-medium">
                                            See you soon, {formData.name}! 🎉
                                        </p>
                                    )}
                                </div>
                            </Step>
                        </Stepper>
                    </motion.div>

                    {/* Additional Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-gray-500 mb-4">Or reach us directly at</p>
                        <a
                            href="mailto:voices@tedxnithamirpur.com"
                            className="text-tedx-red hover:text-red-400 transition-colors text-lg font-medium"
                        >
                            voices@tedxnithamirpur.com
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
