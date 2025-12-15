import Hero from '@/components/Hero'
import About from '@/components/About'
import Speakers from '@/components/Speakers'
import Events from '@/components/Events'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Speakers />
      <Events />
      <Footer />
    </main>
  )
}

