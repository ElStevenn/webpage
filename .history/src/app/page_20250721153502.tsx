import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ProjectsSection from '@/components/ProjectsSection'

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <HeroSection />
      <AboutSection />

    </main>
  )
}
