import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { FeaturesSection } from '../components/FeaturesSection'
import { PlanesSection } from '../components/PlanesSection'
import { FAQ } from '../components/FAQ'
import { Footer } from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <Hero />
      <FeaturesSection />
      <PlanesSection />
      <FAQ />
      <Footer />
    </div>
  )
}
