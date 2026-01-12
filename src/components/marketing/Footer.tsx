import { siteConfig } from '../../config/site'

export default function Footer() {
  return (
    <footer class="py-6 px-4 md:px-6 border-t border-slate-800 bg-slate-900 text-gray-400">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-200">{siteConfig.name}</span>
          <span class="hidden md:inline text-gray-600">|</span>
          <p class="text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav class="flex gap-4 text-sm font-medium">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            class="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            class="hover:text-white transition-colors"
          >
            Twitter
          </a>
        </nav>
      </div>
    </footer>
  )
}
