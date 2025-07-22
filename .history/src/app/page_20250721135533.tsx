import HeroSection from '@/components/HeroSection'
import SkillsSection from '@/components/SkillsSection'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import AutomationStorySection    from '@/components/AutomationStorySection'

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <HeroSection />
      <AutomationStorySection /> 
      <SkillsSection />
    </main>
  )
}
