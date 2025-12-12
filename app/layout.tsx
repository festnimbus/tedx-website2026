import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TEDxNITHamirpur - Ideas Worth Spreading',
  description: 'TEDx event at National Institute of Technology, Hamirpur. Join us for inspiring talks and innovative ideas.',
  keywords: 'TEDx, NIT Hamirpur, Technology, Innovation, Ideas, Conference',
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
        {children}
      </body>
    </html>
  )
}
