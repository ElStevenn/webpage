import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ProjectsSection  from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  return (
    <main>
      <ScrollProgressBar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
    </main>
  )
}
