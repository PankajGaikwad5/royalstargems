import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PressSection from './components/PressSection'
import FeaturedFavourites from './components/FeaturedFavourites'
import WeddingBanner from './components/WeddingBanner'
import CollectionsSection from './components/CollectionsSection'
import TestimonialsSection from './components/TestimonialsSection'
import Newsletter from './components/NewsLetter'
import Footer from './components/Footer'
import ScrollExperience from './components/ScrollExperience'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <ScrollExperience />
      <Navbar />
      <HeroSection />
      <PressSection />
      <FeaturedFavourites />
      <WeddingBanner />
      <CollectionsSection />
      <TestimonialsSection />
      <Newsletter />
      <Footer />
    </main>
  )
}
