import { Link } from '@tanstack/solid-router'
import { createSignal, For } from 'solid-js'
import {
  Home,
  Menu,
  X,
} from 'lucide-solid'
import TanStackQueryHeaderUser from '../integrations/tanstack-query/header-user.tsx'
import { siteConfig } from '../config/site'

export default function Header() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <header class="p-4 flex items-center bg-gray-800 text-white shadow-lg sticky top-0 z-40">
        <button
          onClick={() => setIsOpen(true)}
          class="p-2 hover:bg-gray-700 rounded-lg transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 class="ml-4 text-xl font-semibold">
          <Link to="/">
            <img
              src="/tanstack-word-logo-white.svg"
              alt="TanStack Logo"
              class="h-10"
            />
          </Link>
        </h1>
        <nav class="hidden md:flex items-center gap-6 ml-auto">
             <For each={siteConfig.mainNav}>
                {(item) => (
                  <Link
                    to={item.href}
                    class="text-sm font-medium hover:text-cyan-400 transition-colors"
                    activeProps={{ class: 'text-cyan-400' }}
                  >
                    {item.title}
                  </Link>
                )}
             </For>
        </nav>
      </header>

      <aside
        class={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen() ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 class="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            class="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav class="flex-1 p-4 overflow-y-auto">
          <For each={siteConfig.mainNav}>
            {(item) => (
              <Link
                to={item.href}
                onClick={() => setIsOpen(false)}
                class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  class:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                  {/* TODO: Add icons support to config if needed */}
                <Home size={20} />
                <span class="font-medium">{item.title}</span>
              </Link>
            )}
          </For>

          <div class="my-4 border-t border-gray-700"></div>

          {/* Demo Links - Keeping them for now in mobile menu or moving to config?
              For now let's just use what's in siteConfig which has the demos
          */}

        </nav>

        <div class="p-4 border-t border-gray-700 bg-gray-800 flex flex-col gap-2">
          <TanStackQueryHeaderUser />
        </div>
      </aside>
    </>
  )
}
