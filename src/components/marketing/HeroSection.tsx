import { marketingConfig } from '../../config/marketing'

export default function HeroSection() {
  const { hero } = marketingConfig

  return (
    <section class="relative py-20 px-6 text-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div class="relative max-w-5xl mx-auto">
        <div class="flex items-center justify-center gap-6 mb-6">
          <img
            src="/tanstack-circle-logo.png"
            alt="TanStack Logo"
            class="w-24 h-24 md:w-32 md:h-32"
          />
          <h1 class="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
            <span class="text-gray-300">{hero.title.split(' ')[0]}</span>{' '}
            <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {hero.title.split(' ')[1]}
            </span>
          </h1>
        </div>
        <p class="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          {hero.subtitle}
        </p>
        <p class="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
          {hero.description}
        </p>
        <div class="flex flex-col items-center gap-4">
          <div class="flex gap-4">
            {hero.actions.map((action) => (
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                class={`px-8 py-3 font-semibold rounded-lg transition-colors shadow-lg ${
                  action.variant === 'primary'
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/50'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {action.text}
              </a>
            ))}
          </div>
          <p class="text-gray-400 text-sm mt-2">
            Begin your TanStack Start journey by editing{' '}
            <code class="px-2 py-1 bg-slate-700 rounded text-cyan-400">
              /src/routes/index.tsx
            </code>
          </p>
        </div>
      </div>
    </section>
  )
}
