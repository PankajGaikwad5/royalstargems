import Navbar from './components/Navbar'
import HeroSectionNew from './components/HeroSectionNew'
import PressSection from './components/PressSection'
import FeaturedFavourites from './components/FeaturedFavourites'
import WeddingBanner from './components/WeddingBanner'
import CollectionsSection from './components/CollectionsSection'
import TestimonialsSection from './components/TestimonialsSection'
import Newsletter from './components/NewsLetter'
import Footer from './components/Footer'
import ScrollExperience from './components/ScrollExperience'
import HeroSection from './components/HeroSection'

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-black">
      <ScrollExperience />
      <Navbar />
      <div id="page-content" className="overflow-x-hidden will-change-transform">
        <HeroSection/>
        <PressSection />
        <FeaturedFavourites />
        <WeddingBanner />
        <CollectionsSection />
        <TestimonialsSection />
        <Newsletter />
        <Footer />
      </div>
    </main>
  )
}
