import HeroSection from '@/components/HeroSection'
import SkillsSection from '@/components/SkillsSection'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import AutomationPipelineSection from '@/components/AutomationPipelineSection'


export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <HeroSection />
      <AutomationPipelineSection /> 
      <SkillsSection />
    </main>
  )
}
