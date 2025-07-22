import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <HeroSection />
      <AboutSection />

    </main>
  )
}
