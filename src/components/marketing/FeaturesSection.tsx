import { For } from 'solid-js'
import { marketingConfig } from '../../config/marketing'

export default function FeaturesSection() {
  const { features } = marketingConfig

  return (
    <section class="py-16 px-6 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <For each={features}>
          {(feature) => (
            <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <div class="mb-4">
                <feature.icon class="w-12 h-12 text-cyan-400" />
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p class="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
