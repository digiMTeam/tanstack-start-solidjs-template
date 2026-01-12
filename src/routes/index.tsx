import { createFileRoute } from '@tanstack/solid-router'
import HeroSection from '~/components/marketing/HeroSection'
import FeaturesSection from '~/components/marketing/FeaturesSection'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}
