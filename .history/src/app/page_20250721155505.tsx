import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ProjectsSection  from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </main>
  )
}
