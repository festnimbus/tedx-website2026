import type { Metadata } from 'next'
import './globals.css'
import StaggeredMenu from '@/components/StaggeredMenu'

export const metadata: Metadata = {
  title: 'TEDxNIT Hamirpur',
  description: 'TEDx event at National Institute of Technology, Hamirpur. Join us for inspiring talks and innovative ideas.',
  keywords: 'TEDx, NIT Hamirpur, Technology, Innovation, Ideas, Conference',
  icons: {
    icon: '/site-logo.webp',
    shortcut: '/site-logo.webp',
    apple: '/site-logo.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* TEDx Amsterdam style gradient borders */}
        <div className="tedx-border-left" />
        <div className="tedx-border-right" />
        {/* Staggered Menu Navigation */}
        <StaggeredMenu />
        {children}
      </body>
    </html>
  )
}

