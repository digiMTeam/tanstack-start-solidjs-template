import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'

import '@fontsource/inter'

import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'

import Header from '../components/Header'
import Footer from '../components/marketing/Footer'
import { siteConfig } from '../config/site'

import styleCss from '../styles.css?url'

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [{ rel: 'stylesheet', href: styleCss }],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteConfig.name,
      },
      {
        name: 'description',
        content: siteConfig.description,
      },
      {
        property: 'og:title',
        content: siteConfig.name,
      },
      {
        property: 'og:description',
        content: siteConfig.description,
      },
      {
        property: 'og:image',
        content: siteConfig.ogImage,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:creator',
        content: siteConfig.links.twitter,
      },
      {
        name: 'twitter:title',
        content: siteConfig.name,
      },
      {
        name: 'twitter:description',
        content: siteConfig.description,
      },
      {
        name: 'twitter:image',
        content: siteConfig.ogImage,
      },
    ],
  }),
  shellComponent: RootComponent,
})

import { JsonLd } from '../components/seo/JsonLd'

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HydrationScript />
        <HeadContent />
        <JsonLd
          item={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          }}
        />
      </head>
      <body>
        <Suspense>
          <div class="min-h-screen flex flex-col">
            <Header />
            <main class="flex-1">
              <Outlet />
            </main>
            <Footer />
            <TanStackRouterDevtools />
          </div>
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}
