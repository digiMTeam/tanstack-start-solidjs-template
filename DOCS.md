### Define TanStack Solid Router Root Route with Convex Auth and RootDocument Shell Component

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-convex-better-auth

This TypeScript/Solid.js code defines the root route for a TanStack Solid Router application. It configures a `beforeLoad` function to fetch authentication session and token using `fetchAuth` from `~/library/server`, integrates Convex through `AppConvexProvider`, and sets up `RootDocument` as the shell component for hydration and rendering. It also includes styling via `appCss` and enables TanStack Router Devtools.

```tsx
/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from '@tanstack/solid-router'
import { HydrationScript, Suspense } from 'solid-js/web'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import type * as Solid from 'solid-js'
import appCss from '~/styles/app.css?url'
import AppConvexProvider from '~/providers/convex'
import { fetchAuth } from '~/library/server'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  beforeLoad: async () => {
    const { session, token } = await fetchAuth()
    return { session, token }
  },
  shellComponent: RootDocument,
})

function RootDocument(props: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Suspense>
          <AppConvexProvider>{props.children}</AppConvexProvider>
        </Suspense>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Configure Root Route with TanStack Router in Solid.js

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-solid-query

This code defines the root route (`__root.tsx`) for a Solid.js application using TanStack Router. It sets up global head content (meta tags, links, SEO), defines error and not-found components, and structures the main application layout with a navigation bar and an outlet for child routes. It also integrates TanStack Router and Solid Query Devtools for development and debugging.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { HydrationScript } from 'solid-js/web'
import type * as Solid from 'solid-js'
import type { QueryClient } from '@tanstack/solid-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <SolidQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Create Root Route with Head Configuration in TanStack Solid Router

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-cloudflare

Defines the root route for a TanStack Solid Router application with comprehensive head metadata including charset, viewport, SEO tags, stylesheets, favicon assets, and custom scripts. The route exports a RootDocument component that wraps the application shell with hydration and navigation links. Includes error and not-found component handlers.

```typescript
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { HydrationScript } from 'solid-js/web'
import type * as Solid from 'solid-js'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Define Root Route with TanStack Solid Router

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic

This `tsx` snippet defines the root route of a TanStack Start application using `createRootRoute` from `@tanstack/solid-router`. It configures global head content (meta tags, SEO, links), specifies `DefaultCatchBoundary` for error handling, `NotFound` for 404 pages, and uses `RootDocument` as the main shell component. The `RootDocument` function sets up the basic HTML structure, includes necessary scripts for hydration and devtools, and provides navigation links for the application.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { HydrationScript } from 'solid-js/web'
import type * as Solid from 'solid-js'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Configure Main Application Root Route with TanStack Solid Router

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-auth

This code block establishes the primary application route using `createRootRoute`. It integrates a `beforeLoad` hook to pre-fetch user data, defines global `<head>` content for SEO (meta tags, links), and specifies custom components for error and not-found pages. The `component` property links to `RootComponent` to render the overall application layout.

```tsx
export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})
```

--------------------------------

### Root Document Component with Navigation - Solid.js JSX

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-nitro

A Solid.js shell component that renders the HTML document structure with head content, hydration scripts, navigation links, and router devtools. It includes a navigation bar with links to home, posts, users, pathless layout, and deferred routes, with active link styling.

```typescript
function RootDocument({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Create Root Route with Head Metadata - TanStack Solid Router

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-nitro

Defines the root route for a TanStack Start application using Solid.js, configuring head metadata including charset, viewport, SEO tags, stylesheets, favicons, and custom scripts. The route exports a root route with error and not-found components, and a shell component that wraps the application.

```typescript
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { HydrationScript } from 'solid-js/web'
import type * as Solid from 'solid-js'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})
```

--------------------------------

### Create Base HTML Document Layout with Navigation in SolidJS

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-supabase-basic

This SolidJS component defines the fundamental HTML document structure, encompassing the `<head>` and `<body>` elements. It integrates navigation links using `Link` from TanStack Router, displays user authentication status, and includes essential scripts like `HydrationScript` and `Scripts` for client-side hydration and functionality, along with `TanStackRouterDevtools` for development.

```typescript
function RootDocument({ children }: { children: Solid.JSX.Element }) {
  const { user } = Route.useRouteContext()()

  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div class="ml-auto">
            {user ? (
              <>
                <span class="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Create Root Document Component with Navigation in Solid.js

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-cloudflare

Defines the RootDocument shell component that renders the HTML structure with head metadata, hydration script, and navigation links using TanStack Router Link components. Includes active state styling for navigation items and renders the TanStackRouterDevtools for development. The component accepts children JSX elements for page content.

```typescript
function RootDocument({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>
          <Link
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Create Root Shell Document Component in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic

Defines the RootDocument component that wraps the entire application with HTML structure, hydration scripts, and navigation. Includes head content rendering, a navigation bar with reactive Link components showing active states, and the TanStack Router devtools for development. The component accepts children as Solid.JSX.Element and returns the complete HTML document structure.

```typescript
function RootDocument({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Define Base HTML Document and Global Navigation in Solid.js

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-auth

This snippet provides the core Solid.js components, `RootComponent` and `RootDocument`, responsible for rendering the application's foundational HTML structure (`<html>`, `<head>`, `<body>`). It includes essential scripts like `HydrationScript`, renders dynamic head content, and implements a global navigation bar with conditional links (Home, Posts, Login/Logout) based on the current user's authentication status, using `Link` from `@tanstack/solid-router`.

```tsx
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: Solid.JSX.Element }) {
  const routeContext = Route.useRouteContext()

  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div class="ml-auto">
            {routeContext().user ? (
              <>
                <span class="mr-2">{routeContext().user?.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Configure TanStack Start Application Root and SEO with SolidJS

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-supabase-basic

This snippet defines the root configuration for a TanStack Start application, setting up critical meta tags for SEO (viewport, title, description), linking external stylesheets and favicons, and assigning custom error and not-found components. It integrates an `seo` utility function and references SolidJS components for the application's structure.

```typescript
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack Solid Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack Solid framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
```

--------------------------------

### Create Root Route with Head Configuration in TanStack Solid Router

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-static

Creates a root route using TanStack Solid Router with comprehensive head metadata including charset, viewport settings, SEO tags, and favicon links. The route includes error and not-found components with a main RootComponent that renders child routes via Outlet.

```TypeScript
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { HydrationScript } from 'solid-js/web'
import type * as Solid from 'solid-js'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}

function RootLayout({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Define Meta and Icon Tags in SolidStart/TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-static

This code defines an array of meta tags for an application, specifying various favicon sizes, types, and a web manifest. These tags are typically included in the head configuration of a web application to control how the site appears across different devices and browsers.

```typescript
      {
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' }
```

--------------------------------

### Configure TanStack Solid.js Root Route with Auth.js Session Management

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-authjs

This Solid.js code defines the application's root route (`__root.tsx`) using TanStack Router, integrating server-side authentication with `start-authjs`. It leverages `createServerFn` to fetch the user's session before loading, making authentication status accessible globally. The root component renders the base HTML structure, including a navigation bar that dynamically displays sign-in/sign-out options based on the active user session.

```tsx
/// <reference types="vite/client" />
import type { AuthSession } from 'start-authjs'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { createServerFn } from '@tanstack/solid-start'
import { getRequest } from '@tanstack/solid-start/server'
import { HydrationScript } from 'solid-js/web'
import { Show } from 'solid-js'
import { getSession } from 'start-authjs'
import type { JSX } from 'solid-js'
import { authConfig } from '~/utils/auth'
import appCss from '~/styles/app.css?url'

interface RouterContext {
  session: AuthSession | null
}

const fetchSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest()
  const session = await getSession(request, authConfig)
  return session
})

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const session = await fetchSession()
    return {
      session,
    }
  },
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Auth Example',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <NavBar />
        <main class="p-4">{children}</main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

function NavBar() {
  const routeContext = Route.useRouteContext()

  return (
    <nav class="p-4 flex gap-4 items-center bg-gray-100">
      <Link
        to="/"
        activeProps={{ class: 'font-bold' }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
      <Link to="/protected" activeProps={{ class: 'font-bold' }}>
        Protected
      </Link>
      <div class="ml-auto flex items-center gap-4">
        <Show
          when={routeContext().session}
          fallback={
            <Link
              to="/login"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </Link>
          }
        >
          <span class="text-gray-600">
            {routeContext().session?.user?.name ||
              routeContext().session?.user?.email}
          </span>
          <a
            href="/api/auth/signout"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </a>
        </Show>
      </div>
    </nav>
  )
}

```

--------------------------------

### Implement Client-Side and Server-Side Error Handling in Solid

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This snippet demonstrates robust error handling strategies for a Solid application. It includes a client-side `ErrorBoundary` component using `solid-error-boundary` to catch and display UI errors gracefully. Additionally, it shows how to catch and log errors in server functions (`createServerFn`) to ensure server-side operations are handled, logged, and return user-friendly messages.

```tsx
// Client-side error boundary
import { ErrorBoundary } from 'solid-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: any) {
  // Log client errors
  console.error('[CLIENT ERROR]:', error)

  // Could also send to external service
  // sendErrorToService(error)

  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router />
    </ErrorBoundary>
  )
}

// Server function error handling
const riskyOperation = createServerFn().handler(async () => {
  try {
    return await performOperation()
  } catch (error) {
    // Log server errors with context
    console.error('[SERVER ERROR]:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      // Add request context if available
    })

    // Return user-friendly error
    throw new Error('Operation failed. Please try again.')
  }
})
```

--------------------------------

### Define TanStack Start Root Route Component with Solid

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/routing

This Solid.js example defines the top-level root route for a TanStack Start application in `src/routes/__root.tsx`. It uses `createRootRoute` to configure head content (meta tags) and a `RootComponent` that renders `HeadContent`, `Outlet`, and `Scripts` for the document shell.

```tsx
// src/routes/__root.tsx
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/solid-router'
import type { solidNode } from 'solid'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: Solid.JSX.Element }>) {
  return (
    <>
      <HeadContent />
      {children}
      <Scripts />
    </>
  )
}
```

--------------------------------

### Implement Root Layout with Navigation for Solid.js and TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-static

This `RootLayout` component provides the foundational HTML structure for a Solid.js application, including `<head>` and `<body>` elements. It integrates `HydrationScript` and `Scripts` for SolidStart's SSR, `HeadContent` for dynamic head management, and a navigation bar with `Link` components from TanStack Router, demonstrating active link styling and a router devtools component.

```typescript
function RootLayout({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              class: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Root Layout with TanStack Router Devtools - TSX

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-authjs

Root layout component that renders children content with TanStack Router development tools. Includes main content area with padding and Scripts component for hydration. Used as the top-level layout wrapper for all pages in a TanStack Start application.

```typescript
<main class="p-4">{children}</main>
<TanStackRouterDevtools position="bottom-right" />
<Scripts />
```

--------------------------------

### Implement Server-side User Session Fetching with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-auth

This snippet defines `fetchUser`, a server-side function using `createServerFn` from `@tanstack/solid-start`. It securely retrieves the authenticated user's email from the session, which is accessible only on the server, ensuring secure data handling. The function returns the user's email if available, otherwise `null`. It depends on `useAppSession` and `createServerFn`.

```tsx
const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  const session = await useAppSession()

  if (!session.data.userEmail) {
    return null
  }

  return {
    email: session.data.userEmail,
  }
})
```

--------------------------------

### Configure TanStack Router Instance with Solid

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/routing

This Solid.js example demonstrates how to create and export a router instance in TanStack Start's `src/router.tsx` file. It uses `createRouter` from `@tanstack/solid-router` with a generated `routeTree` and enables scroll restoration.

```tsx
// src/router.tsx
import { createRouter } from '@tanstack/solid-router'
import { routeTree } from './routeTree.gen'

// You must export a getRouter function that
// returns a new router instance each time
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

--------------------------------

### Configure Root Route with Supabase Authentication in TanStack Start (TSX)

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-supabase-basic

This code defines the root route (`__root.tsx`) for a TanStack Start application built with Solid.js. It sets up a server function to fetch user data from Supabase before loading the route, providing authentication context to the application. The route also configures global head content (meta tags, stylesheets, favicons), error boundaries, and a base document component for layout, including dynamic navigation links for authenticated and unauthenticated users.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { createServerFn } from '@tanstack/solid-start'
import { HydrationScript } from 'solid-js/web'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
import { getSupabaseServerClient } from '../utils/supabase'
import type * as Solid from 'solid-js'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient()
  const { data, error: _error } = await supabase.auth.getUser()

  if (!data.user?.email) {
    return null
  }

  return {
    email: data.user.email,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack Solid Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack Solid framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: Solid.JSX.Element }) {
  const { user } = Route.useRouteContext()()

  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div class="ml-auto">
            {user ? (
              <>
                <span class="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Implement Root HTML Document Structure with Navigation and User Context

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-auth

This component (`RootDocument`) defines the fundamental HTML page structure, including `<head>` and `<body>` tags. It incorporates client-side hydration scripts, dynamic head content, a navigation bar with `Link` components, and displays user information (email) or a login link based on `routeContext`. It also renders its children and includes development tools and scripts.

```javascript
function RootDocument({ children }: { children: Solid.JSX.Element }) {
  const routeContext = Route.useRouteContext();

  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              class: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              class: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div class="ml-auto">
            {routeContext().user ? (
              <>
                <span class="mr-2">{routeContext().user?.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
```

--------------------------------

### Configure Favicon and Manifest Tags in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic

Sets up multiple favicon sizes and web manifest configuration for the application head. This object defines favicon references (16x16 PNG, ICO format) and a manifest file with brand color, which are injected into the HTML head element during application initialization.

```typescript
{
  rel: 'icon',
  type: 'image/png',
  sizes: '16x16',
  href: '/favicon-16x16.png',
},
{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
{ rel: 'icon', href: '/favicon.ico' }
```

--------------------------------

### Manage login form loading state with server function

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Manages loading state during login form submission using Solid signals and server function mutations. Disables submit button while loading and shows loading text. Implements try-catch-finally pattern for error handling and cleanup.

```typescript
function LoginForm() {
  const [isLoading, setIsLoading] = createSignal(false)
  const loginMutation = useServerFn(loginFn)

  const handleSubmit = async (data: LoginData) => {
    setIsLoading(true)
    try {
      await loginMutation.mutate(data)
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading()}>
        {isLoading() ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

--------------------------------

### Define TanStack Start Application Configuration Properties

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-auth

This code block presents a set of properties typically found within the main configuration object of a TanStack Start application. It includes an asynchronous loader function for fetching user data, dynamic generation of SEO-related meta tags and links for the document head, and custom components for error handling (`errorComponent`), not-found pages (`notFoundComponent`), and the main application entry point (`component`).

```javascript
loader: async () => {
  const user = await fetchUser();
  return {
    user,
  };
},
head: () => ({
  meta: [
    {
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    ...seo({
      title:
        'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
      description: `TanStack Start is a type-safe, client-first, full-Stack React framework. `,
    }),
  ],
  links: [
    { rel: 'stylesheet', href: appCss },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
    { rel: 'icon', href: '/favicon.ico' },
  ],
}),
errorComponent: (props) => {
  return (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  );
},
notFoundComponent: () => <NotFound />,
component: RootComponent,
```

--------------------------------

### Configure Vite with TanStack Start and Solid Plugins (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This `vite.config.ts` file configures Vite, setting the development server port to 3000 and integrating several plugins. It includes `vite-tsconfig-paths` for `tsconfig` alias resolution, `@tanstack/solid-start/plugin/vite` for TanStack Start's build process, and `vite-plugin-solid` with SSR enabled, ensuring SolidJS components are rendered correctly.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import viteSolid from 'vite-plugin-solid'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    // solid's vite plugin must come after start's vite plugin
    viteSolid({ ssr: true }),
  ],
})
```

--------------------------------

### Override Per-Route Error Boundary (TanStack Solid Router)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/error-boundaries

This snippet illustrates how to define a specific error component for an individual route in TanStack Solid Router, thereby overriding the globally configured default. It utilizes the `errorComponent` property within `createFileRoute` to handle errors unique to that particular route, allowing for tailored error recovery strategies.

```tsx
import { createFileRoute, ErrorComponent } from '@tanstack/solid-router'
import type { ErrorComponentProps } from '@tanstack/solid-router'

function PostError(props: ErrorComponentProps) {
  return <ErrorComponent error={props.error} />
}

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
  errorComponent: PostError,
})
```

--------------------------------

### Apply Route-Level Middleware to All Handlers in TanStack Solid Router

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-routes

This example illustrates how to define middleware that applies to all HTTP handlers within a server route in TanStack Solid Router. The `authMiddleware` and `loggerMiddleware` are executed for both GET and POST requests defined in this route.

```tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/hello')({
  server: {
    middleware: [authMiddleware, loggerMiddleware], // Applies to all handlers
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World! from ' + request.url)
      },
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(`Hello, ${body.name}!`)
      },
    },
  },
})
```

--------------------------------

### Define Root React Component with Outlet in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-auth

This functional React component (`RootComponent`) serves as the top-level container for the application's main content. It renders the `RootDocument` component, which likely provides the HTML shell, and includes an `<Outlet />`, a common pattern in routing libraries (like TanStack Router) to render the matched child route's content.

```javascript
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
```

--------------------------------

### Configure Favicon and Icon Metadata for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-cloudflare

Sets up multiple favicon and icon link tags for different devices and sizes (apple-touch-icon, 32x32 png, 16x16 png, and standard favicon.ico). Includes manifest file reference and custom styling color. These head links are registered in the TanStack Start application configuration.

```typescript
{
  rel: 'apple-touch-icon',
  sizes: '180x180',
  href: '/apple-touch-icon.png',
},
{
  rel: 'icon',
  type: 'image/png',
  sizes: '32x32',
  href: '/favicon-32x32.png',
},
{
  rel: 'icon',
  type: 'image/png',
  sizes: '16x16',
  href: '/favicon-16x16.png',
},
{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
{ rel: 'icon', href: '/favicon.ico' }
```

--------------------------------

### Inject Custom Script in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-cloudflare

Registers a custom JavaScript file to be loaded in the application. The script is configured with type 'text/javascript' and loaded from the public assets directory. This enables custom functionality outside the framework's component system.

```typescript
scripts: [
  {
    src: '/customScript.js',
    type: 'text/javascript',
  },
]
```

--------------------------------

### Navigation Bar with Conditional Authentication - TSX

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-authjs

NavBar component that displays navigation links and user authentication status using TanStack Router's Link component with active state styling. Conditionally renders Sign In or Sign Out buttons and user information based on session context. Uses Show component for conditional rendering of authenticated vs. unauthenticated UI.

```typescript
function NavBar() {
  const routeContext = Route.useRouteContext()

  return (
    <nav class="p-4 flex gap-4 items-center bg-gray-100">
      <Link
        to="/"
        activeProps={{ class: 'font-bold' }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
      <Link to="/protected" activeProps={{ class: 'font-bold' }}>
        Protected
      </Link>
      <div class="ml-auto flex items-center gap-4">
        <Show
          when={routeContext().session}
          fallback={
            <Link
              to="/login"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </Link>
          }
        >
          <span class="text-gray-600">
            {routeContext().session?.user?.name ||
              routeContext().session?.user?.email}
          </span>
          <a
            href="/api/auth/signout"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </a>
        </Show>
      </div>
    </nav>
  )
}
```

--------------------------------

### Configure Default Route Error Boundary (TanStack Solid Router)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/error-boundaries

This snippet demonstrates how to set a global error boundary for all routes in a TanStack Solid Router application. It uses the `defaultErrorComponent` option in `createRouter` to provide a fallback UI when errors occur during route loading or rendering across the application.

```tsx
import { createRouter, ErrorComponent } from '@tanstack/solid-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
  })
  return router
}
```

--------------------------------

### Configure TanStack Router Error, Not Found, and Root Components

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-static

This snippet illustrates how to configure error, not-found, and the main application components within a TanStack Router setup. It maps specific Solid.js components like `DefaultCatchBoundary` and `NotFound` to handle routing errors and missing routes, and designates `RootComponent` as the primary entry point.

```typescript
  errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
```

--------------------------------

### Configure Router with Error and Not Found Handlers in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic

Sets up the TanStack Start router with custom error boundary component, not found handler, and root document shell. The configuration specifies DefaultCatchBoundary for error handling and NotFound component for missing routes, with RootDocument as the outer shell wrapping all application content.

```typescript
errorComponent: DefaultCatchBoundary,
notFoundComponent: () => <NotFound />,
shellComponent: RootDocument,
```

--------------------------------

### Configure TanStack Start Root Route with Error Handling

Source: https://tanstack.com/start/latest/docs/framework/solid/examples/start-basic-cloudflare

Sets up the root route configuration for TanStack Start with error and not-found boundary components, custom shell component, and head metadata. The errorComponent handles errors with DefaultCatchBoundary, notFoundComponent renders a custom NotFound component, and shellComponent uses the RootDocument component for wrapping all routes.

```typescript
{
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
}
```

--------------------------------

### Define Dynamic Route with createFileRoute (Solid.js)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/routing

Demonstrates how to define a dynamic route for a Solid.js application using `createFileRoute` from `@tanstack/solid-router`. This snippet exports a `Route` constant that maps the `/posts/:postId` path to a `PostComponent`, enabling dynamic content loading based on the `postId` parameter. The path string is automatically managed by the TanStack Router Bundler Plugin or CLI.

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})
```

--------------------------------

### Building a Progressively Enhanced Search Form with React/Solid.js

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/execution-model

Demonstrates creating a search form that provides a functional experience without JavaScript for basic submission, and then enhances it with client-side interactivity using a `ClientOnly` component for dynamic search functionality. This ensures accessibility and a better user experience even with JS disabled.

```tsx
function SearchForm() {
  const [query, setQuery] = createSignal('')

  return (
    <form action="/search" method="get">
      <input
        name="q"
        value={query()}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ClientOnly fallback={<button type="submit">Search</button>}>
        <SearchButton onSearch={() => search(query())} />
      </ClientOnly>
    </form>
  )
}
```

--------------------------------

### Install SolidJS and Vite Plugin for TanStack Start (npm)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This command adds `solid-js`, the reactive UI library, and `vite-plugin-solid`, its integration for Vite, to the project. These are crucial for developing the user interface with SolidJS within the TanStack Start ecosystem.

```shell
npm i solid-js vite-plugin-solid
```

--------------------------------

### Define TanStack SolidStart Route with Server Functions (TypeScript/TSX)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This code defines a SolidStart route, including server functions for reading and updating a count from a file (`count.txt`) using Node.js `fs` module. It also sets up a SolidJS component (`Home`) that displays the count and allows incrementing it via a server action, invalidating the router cache upon completion. Dependencies include `@tanstack/solid-router` and `@tanstack/solid-start`.

```tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/solid-router'
import { createServerFn } from '@tanstack/solid-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .inputValidator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate()
        })
      }}
    >
      Add 1 to {state()}?
    </button>
  )
}
```

--------------------------------

### Validate Input Data in Server Function Middleware with TanStack SolidStart

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

Demonstrates the `inputValidator` method in server function middleware, used to modify and validate the data object before it's passed to subsequent middleware and the server function. This example integrates `zod` for schema-based validation.

```tsx
import { createMiddleware } from '@tanstack/solid-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const mySchema = z.object({
  workspaceId: z.string(),
})

const workspaceMiddleware = createMiddleware({ type: 'function' })
  .inputValidator(zodValidator(mySchema))
  .server(({ next, data }) => {
    console.log('Workspace ID:', data.workspaceId)
    return next()
  })
```

--------------------------------

### Render Components Client-Only to Avoid Hydration Mismatch

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hydration-errors

Uses ClientOnly wrapper and NoHydration component from Solid.js to skip server-side rendering and hydration for inherently dynamic content. Provides fallback UI during initial SSR to prevent layout shift.

```typescript
import { ClientOnly } from '@tanstack/solid-router'
import { NoHydration } from 'solid-js/web'

<ClientOnly fallback={<span>—</span>}>
  <RelativeTime ts={someTs} />
</ClientOnly>

<NoHydration>
  <time>{new Date().toLocaleString()}</time>
</NoHydration>
```

--------------------------------

### Define client-only logic within an isomorphic function with TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-functions

This example illustrates creating an isomorphic function with `createIsomorphicFn` that includes only a client-side implementation. The function returns 'client' when run on the client, and is a no-op (returns `undefined`) when run on the server, ensuring client-specific logic is executed only where intended.

```tsx
import { createIsomorphicFn } from '@tanstack/solid-start'

const clientImplementationOnly = createIsomorphicFn().client(() => 'client')

const client = clientImplementationOnly()
```

--------------------------------

### Define Client-Side Logic for Server Function Middleware with TanStack SolidStart

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

Illustrates the usage of the `.client` method for server function middleware. This method defines client-side logic that wraps the execution and result of the RPC call to the server, allowing code to run both before and after the server function execution.

```tsx
import { createMiddleware } from '@tanstack/solid-start'

const loggingMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next, context, request }) => {
    const result = await next() // <-- This will execute the next middleware in the chain and eventually, the RPC to the server
    return result
  },
)
```

--------------------------------

### Define a server-only function with TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-functions

This example uses `createServerOnlyFn` to create a function `foo` that can only be executed on the server. If called on the client, it will throw an error, ensuring server-specific logic is confined to its intended environment and preventing accidental client-side execution.

```tsx
import { createServerOnlyFn } from '@tanstack/solid-start'

const foo = createServerOnlyFn(() => 'bar')

foo()
```

--------------------------------

### Define Static Server Function with Middleware in TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/static-server-functions

This example demonstrates how to define a static server function in TanStack Solid-Start by applying the `staticFunctionMiddleware` to `createServerFn`. The function will execute at build time, and its result will be cached as a static asset. Ensure `staticFunctionMiddleware` is the last middleware in the chain to function correctly.

```tsx
import { createServerFn } from '@tanstack/solid-start'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

--------------------------------

### Hydrating TanStack Start Client with SolidJS

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/client-entry-point

This code snippet demonstrates the default client entry point setup for TanStack Start using SolidJS. It imports `hydrate` from 'solid-js/web' and `StartClient`, `hydrateStart` from '@tanstack/solid-start/client' to initialize the client-side router and hydrate the application root.

```tsx
// src/client.tsx
import { hydrate } from 'solid-js/web'
import { StartClient, hydrateStart } from '@tanstack/solid-start/client'

hydrateStart().then((router) => {
  hydrate(() => <StartClient router={router} />, document)
})
```

--------------------------------

### Pass Context Between Middleware in TanStack SolidStart

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

This snippet illustrates how to pass context between middleware functions using the `next` function in `createMiddleware`. Properties within the `context` object passed to `next` are merged and made available to subsequent middleware layers in the server.

```tsx
import { createMiddleware } from '@tanstack/solid-start'

const awesomeMiddleware = createMiddleware({ type: 'function' }).server(
  ({ next }) => {
    return next({
      context: {
        isAwesome: Math.random() > 0.5,
      },
    })
  },
)

const loggingMiddleware = createMiddleware({ type: 'function' })
  .middleware([awesomeMiddleware])
  .server(async ({ next, context }) => {
    console.log('Is awesome?', context.isAwesome)
    return next()
  })
```

--------------------------------

### Define a client-only function with TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-functions

This snippet demonstrates `createClientOnlyFn` to create a function `foo` that is restricted to execution on the client. Attempting to call it on the server will result in an error, enforcing client-side logic boundaries and preventing server-side execution of client-specific operations.

```tsx
import { createClientOnlyFn } from '@tanstack/solid-start'

const foo = createClientOnlyFn(() => 'bar')

foo()
```

--------------------------------

### Augment Request Context Types for Server-Side Data

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-entry-point

This code demonstrates how to augment the `Register` interface from `@tanstack/solid-start` to add custom, typed request context data. By defining a `server.requestContext` property, developers can pass additional data (like authenticated user info or database connections) to the server `fetch` handler. This custom context becomes available across the entire server-side middleware chain, ensuring type safety and easy access to per-request data.

```tsx
import handler, { createServerEntry } from '@tanstack/solid-start/server-entry'

type MyRequestContext = {
  hello: string
  foo: number
}

declare module '@tanstack/solid-start' {
  interface Register {
    server: {
      requestContext: MyRequestContext
    }
  }
}

export default createServerEntry({
  async fetch(request) {
    return handler.fetch(request, { context: { hello: 'world', foo: 123 } })
  }
})
```

--------------------------------

### Define a complete isomorphic function with TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-functions

This example demonstrates how to create an isomorphic function using `createIsomorphicFn` that provides distinct implementations for both server and client environments. The function `getEnv` returns 'server' when executed on the server and 'client' when executed on the client, allowing shared logic with environment-specific behavior.

```tsx
import { createIsomorphicFn } from '@tanstack/solid-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
```

--------------------------------

### Integration test authentication flow with routing

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Integration tests for authentication flow using SolidJS testing library, testing redirect to login when accessing protected routes. Uses memory history to simulate navigation and waitFor to verify async state changes.

```typescript
// __tests__/auth-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@solidjs/testing-library'
import { RouterProvider, createMemoryHistory } from '@tanstack/solid-router'
import { router } from '../router'

describe('Authentication Flow', () => {
  it('should redirect to login when accessing protected route', async () => {
    const history = createMemoryHistory()
    history.push('/dashboard') // Protected route

    render(<RouterProvider router={router} history={history} />)

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })
})
```

--------------------------------

### Create an isomorphic no-op function with TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-functions

This snippet demonstrates creating an isomorphic function using `createIsomorphicFn` without any environment-specific implementations. The resulting function `noImplementation` acts as a no-op, returning `undefined` on both client and server, useful for placeholders or optional functionality.

```tsx
import { createIsomorphicFn } from '@tanstack/solid-start'

const noImplementation = createIsomorphicFn()

const noop = noImplementation()
```

--------------------------------

### Define a Type-Safe Server Function with TanStack Start (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

This snippet demonstrates creating a robust and type-safe server function in TanStack Start. It specifies the HTTP method, integrates input validation using Zod schemas, allows for middleware application (e.g., authentication), and provides a handler function with fully typed `data` and `context` arguments. The server function can then be called from anywhere in the application with full type safety, simplifying data retrieval from the database.

```tsx
export const getTodos = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(z.object({ userId: z.string() })))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    // Fully typed data and context
    return db.todos.findMany({ where: { userId: data.userId } })
  })

// Call from anywhere with full type safety
const todos = await getTodos({ data: { userId: '123' } })
```

--------------------------------

### Dynamically Apply CSS Classes for Loading State in React/JSX

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

This JSX snippet illustrates how to use a ternary operator within a template literal to conditionally apply CSS utility classes (like Tailwind CSS opacity and delay classes) to a `div` element. This pattern is commonly used in React components to visually indicate a loading state or to transition elements in and out of view. The `Loader` component would typically be rendered within this conditionally styled container.

```jsx
<div
  className={`${isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`}`}
>
  <Loader />
</div>
```

--------------------------------

### Create TanStack Start Authentication Context for Global State

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

This Solid.js context (`AuthContext`) and provider (`AuthProvider`) enable sharing user authentication state across the entire TanStack Start application. It leverages a server function (`getCurrentUserFn`) to fetch user data and exposes the `user` object, `isLoading` state, and a `refetch` function via the `useAuth` hook for easy consumption.

```tsx
// contexts/auth.tsx
import { createContext, useContext } from 'solid-js'
import { useServerFn } from '@tanstack/solid-start'
import { getCurrentUserFn } from '../server/auth'

type User = {
  id: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider(props) {
  const { data: user, isLoading, refetch } = useServerFn(getCurrentUserFn)

  return (
    <AuthContext.Provider value={{ user, isLoading, refetch }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

--------------------------------

### Understand SSR Parameter and Search Validation Structure

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

The `params` and `search` arguments passed to the `ssr` function are discriminated unions that indicate validation status. Each can either have a 'success' status containing the validated value, or an 'error' status containing validation failure details. This allows safe runtime checks before making SSR decisions.

```tsx
params:
    | { status: 'success'; value: Expand<ResolveAllParamsFromParent<TParentRoute, TParams>> }
    | { status: 'error'; error: unknown }
search:
    | { status: 'success'; value: Expand<ResolveFullSearchSchema<TParentRoute, TSearchValidator>> }
    | { status: 'error'; error: unknown }
```

--------------------------------

### Add JSON-LD Structured Data to TanStack Start Pages

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

This example shows how to embed JSON-LD structured data directly into the page's head using a script tag, enhancing search engine understanding of content. Loader data is used to dynamically populate the schema.org Article properties for a blog post.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData.post.title }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: loaderData.post.title,
          description: loaderData.post.excerpt,
          image: loaderData.post.coverImage,
          author: {
            '@type': 'Person',
            name: loaderData.post.author.name,
          },
          datePublished: loaderData.post.publishedAt,
        }),
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Validate API Input with Zod in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Demonstrates robust input validation for server functions using the `zod` library. A `zod` schema defines the expected structure and constraints for input data (e.g., email and password), which is then applied within a `createServerFn` to ensure data integrity before further processing.

```tsx
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
})

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    // data is now validated
  })
```

--------------------------------

### Implement JSON-LD Structured Data for Rich Results

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Embed JSON-LD structured data scripts in the document head to help search engines understand content semantics and enable rich search results. This example creates Article schema markup with author, publication date, and image metadata.

```typescript
export const Route = createFileRoute('/posts/$postId')({\n  loader: async ({ params }) => {\n    const post = await fetchPost(params.postId)\n    return { post }\n  },\n  head: ({ loaderData }) => ({\n    meta: [{ title: loaderData.post.title }],\n    scripts: [\n      {\n        type: 'application/ld+json',\n        children: JSON.stringify({\n          '@context': 'https://schema.org',\n          '@type': 'Article',\n          headline: loaderData.post.title,\n          description: loaderData.post.excerpt,\n          image: loaderData.post.coverImage,\n          author: {\n            '@type': 'Person',\n            name: loaderData.post.author.name,\n          },\n          datePublished: loaderData.post.publishedAt,\n        }),\n      },\n    ],\n  }),\n  component: PostPage,\n})
```

--------------------------------

### Analyze Client Bundle for Server-Only Code (Shell)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Provides a shell command sequence to perform a bundle analysis, specifically to verify that server-only code is not accidentally included in the client-side JavaScript bundles. This is a crucial step for security and performance optimization.

```bash
npm run build
# Check dist/client for any server-only imports
```

--------------------------------

### Validate and Transform Server Function Input with Zod

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Use the `.inputValidator` method to validate and optionally modify input data before it reaches nested middleware and the server function. This example demonstrates validation using Zod schema validation library.

```typescript
import { createMiddleware } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const mySchema = z.object({
  workspaceId: z.string(),
})

const workspaceMiddleware = createMiddleware({ type: 'function' })
  .inputValidator(zodValidator(mySchema))
  .server(({ next, data }) => {
    console.log('Workspace ID:', data.workspaceId)
    return next()
  })
```

--------------------------------

### Create TanStack Solid-Router Health Check Endpoint

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This example shows how to define a server-side health check endpoint using TanStack Solid-Router. The GET handler returns a JSON response containing system status, timestamp, uptime, memory usage, database connection status, and application version. A `checkDatabase` helper function is included to simulate a database connection test.

```tsx
// routes/health.ts
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/health')({
  server: {
    handlers: {
      GET: async () => {
        const checks = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          database: await checkDatabase(),
          version: process.env.npm_package_version,
        }

        return Response.json(checks)
      },
    },
  },
})

async function checkDatabase() {
  try {
    await db.raw('SELECT 1')
    return { status: 'connected', latency: 0 }
  } catch (error) {
    return { status: 'error', error: error.message }
  }
}
```

--------------------------------

### Hash Passwords Securely with `bcryptjs` in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Demonstrates how to use the `bcryptjs` library to securely hash user passwords. It includes setting a configurable number of salt rounds to enhance security against brute-force attacks, ensuring sensitive user data is protected.

```tsx
// Use strong hashing (bcrypt, scrypt, or argon2)
import bcrypt from 'bcryptjs'

const saltRounds = 12 // Adjust based on your security needs
const hashedPassword = await bcrypt.hash(password, saltRounds)
```

--------------------------------

### Install TanStack Start and Core Router Dependencies (npm)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This command installs the primary dependencies for a TanStack Start application, including `@tanstack/solid-start` for the framework, `@tanstack/solid-router` for routing capabilities, and `vite` as the build tool. These packages are fundamental for building a web application with TanStack Start.

```shell
npm i @tanstack/solid-start @tanstack/solid-router vite
```

--------------------------------

### Define Server-Side Request Middleware with TanStack SolidStart

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

Illustrates how to create server-side request middleware using `createMiddleware().server()`. This middleware executes logic before any nested middleware and provides its result to the subsequent middleware, receiving `next`, `context`, and `request` as parameters.

```tsx
import { createMiddleware } from '@tanstack/solid-start'

const loggingMiddleware = createMiddleware().server(
  ({ next, context, request }) => {
    return next()
  },
)
```

--------------------------------

### Distinguish Environment Variables with `VITE_` Prefix

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This snippet demonstrates the convention for naming environment variables to distinguish between server-only and client-safe values. Variables without a prefix (e.g., `DATABASE_URL`) are treated as server-only, never exposed to the client. Variables prefixed with `VITE_` (e.g., `VITE_APP_NAME`) are safe for client-side exposure, typically processed by build tools like Vite.

```bash
# ✅ Server-only (no prefix)
DATABASE_URL=postgresql://...
JWT_SECRET=super-secret-key
STRIPE_SECRET_KEY=sk_live_...

# ✅ Client-safe (VITE_ prefix)
VITE_APP_NAME=My App
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=https://...
```

--------------------------------

### Apply Request Middleware to All Server Route Methods in TanStack SolidStart

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

Demonstrates applying a request middleware to all HTTP methods (e.g., GET, POST) of a server route. The middleware is passed as an array to the `middleware` property within the `server` configuration of the route builder.

```tsx
import { createMiddleware } from '@tanstack/solid-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

export const Route = createFileRoute('/foo')({
  server: {
    middleware: [loggingMiddleware],
    handlers: {
      GET: () => {
        //...
      },
      POST: () => {
        //...
      },
    },
  },
})
```

--------------------------------

### Create execution boundary functions in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/code-execution-patterns

Import and initialize server functions, server-only utilities, client-only utilities, and isomorphic functions from @tanstack/solid-start. These functions control where code executes and provide different implementations per environment. Server functions create RPC calls, while server-only and client-only functions throw errors if called in the wrong environment.

```typescript
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/solid-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()
  .server((msg) => console.log(`[SERVER]: ${msg}`))
  .client((msg) => console.log(`[CLIENT]: ${msg}`))
```

--------------------------------

### Create Server Function Middleware in TanStack SolidStart

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

Explains how to initialize a server function middleware by calling `createMiddleware` with the `type` property set to 'function'. This enables extra functionality specific to server functions, such as input validation and client/server-side logic execution.

```tsx
import { createMiddleware } from '@tanstack/solid-start'

const loggingMiddleware = createMiddleware({ type: 'function' })
  .client(() => {
    //...
  })
  .server(() => {
    //...
  })
```

--------------------------------

### Implement TanStack Start Server Functions for User Authentication

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

This code defines server functions (`loginFn`, `logoutFn`, `getCurrentUserFn`) using `@tanstack/solid-start` to manage secure authentication logic on the server. It includes input validation, placeholder logic for credential verification, session updates, and redirects, ensuring sensitive operations are handled securely.

```tsx
import { createServerFn } from '@tanstack/solid-start'
import { redirect } from '@tanstack/solid-router'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id,
      email: user.email,
    })

    // Redirect to protected area
    throw redirect({ to: '/dashboard' })
  })

// Logout server function
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})

// Get current user
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const userId = session.get('userId')

    if (!userId) {
      return null
    }

    return await getUserById(userId)
  },
)
```

--------------------------------

### Avoiding Hydration Mismatches with Client-Side State

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/execution-model

Illustrates how displaying dynamic content like `new Date().toLocaleString()` directly can cause hydration mismatches between server-rendered and client-rendered HTML. It shows a corrected pattern using client-side state management (`createSignal` and `createEffect`) to ensure consistent content after hydration.

```tsx
// ❌ Different content server vs client
function CurrentTime() {
  return <div>{new Date().toLocaleString()}</div>
}

// ✅ Consistent rendering
function CurrentTime() {
  const [time, setTime] = createSignal<string>()

  createEffect(() => {
    setTime(new Date().toLocaleString())
  })

  return <div>{time() || 'Loading...'}</div>
}
```

--------------------------------

### Validate Client-Sent Context with Zod

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates runtime validation of dynamic client-sent context data using Zod validator before using it in server-side middleware. This pattern addresses security concerns when transmitting user-generated data from client to server through context.

```typescript
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const requestLogger = createMiddleware({ type: 'function' })
  .client(async ({ next, context }) => {
    return next({
      sendContext: {
        workspaceId: context.workspaceId,
      },
    })
  })
  .server(async ({ next, data, context }) => {
    // Validate the workspace ID before using it
    const workspaceId = zodValidator(z.number()).parse(context.workspaceId)
    console.log('Workspace ID:', workspaceId)
    return next()
  })
```

--------------------------------

### Install UUID Package for ID Generation

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Add the uuid package to the project for generating unique identifiers for jokes and other data entities. This is a required dependency for the DevJokes app.

```bash
pnpm add uuid
```

--------------------------------

### Create Shiki Utility for Code Block Syntax Highlighting (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This TypeScript utility function, `highlightCode`, integrates the Shiki library to provide server-side or build-time syntax highlighting. It asynchronously converts raw code strings into HTML, applying specified themes for light and dark modes. This function is designed to be called by a Markdown processing pipeline to enrich code blocks with visual styling.

```tsx
// src/utils/markdown.ts
import { codeToHtml } from 'shiki'

// Process code blocks after parsing
export async function highlightCode(
  code: string,
  language: string,
): Promise<string> {
  return codeToHtml(code, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'tokyo-night',
    },
  })
}
```

--------------------------------

### Build Progressively Enhanced Search Form (React/TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates creating a search form that functions without JavaScript via standard HTML form submission, then enhances it with client-side React state and a 'ClientOnly' component for dynamic search interactions. It uses `useState` for controlled input and `ClientOnly` for conditional client-side rendering.

```tsx
function SearchForm() {
  const [query, setQuery] = useState('')

  return (
    <form action="/search" method="get">
      <input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ClientOnly fallback={<button type="submit">Search</button>}>
        <SearchButton onSearch={() => search(query)} />
      </ClientOnly>
    </form>
  )
}
```

--------------------------------

### Apply Middleware to a TanStack SolidStart Server Function

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

This example demonstrates how to integrate a middleware array, such as `loggingMiddleware`, into a server function using `createServerFn` in TanStack SolidStart. The middleware wraps the server function's execution, allowing for pre-processing or post-processing logic.

```tsx
import { createServerFn } from '@tanstack/solid-start'
import { loggingMiddleware } from './middleware'

const fn = createServerFn()
  .middleware([loggingMiddleware])
  .handler(async () => {
    //...
  })
```

--------------------------------

### Install content-collections for Static Markdown

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This command installs the core and Vite integration packages for `content-collections`. This library is designed for processing static Markdown files at build-time, making it ideal for content like blog posts that are part of your repository. It enables type-safe access to your content within a TanStack Start application.

```bash
npm install @content-collections/core @content-collections/vite
```

--------------------------------

### Hash passwords using bcryptjs

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Securely hash passwords using bcryptjs with configurable salt rounds for enhanced security. Requires bcryptjs dependency. Higher salt rounds (12+) provide better security but slower hashing. Must be used in server-side functions only.

```typescript
import bcrypt from 'bcryptjs'

const saltRounds = 12 // Adjust based on your security needs
const hashedPassword = await bcrypt.hash(password, saltRounds)
```

--------------------------------

### Implement Progressive Enhancement with ClientOnly Component

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Create a search form that works without JavaScript and is progressively enhanced with client-side interactivity. The ClientOnly wrapper conditionally renders the enhanced SearchButton component with a fallback submit button, enabling graceful degradation and improved user experience.

```typescript
function SearchForm() {
  const [query, setQuery] = useState('')

  return (
    <form action="/search" method="get">
      <input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ClientOnly fallback={<button type="submit">Search</button>}>
        <SearchButton onSearch={() => search(query)} />
      </ClientOnly>
    </form>
  )
}
```

--------------------------------

### Track TanStack Solid-Router Route Loading Performance (Client & Server)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This snippet demonstrates how to measure route loading performance on both the server-side (SSR) and client-side within a TanStack Solid-Router application. It uses `Date.now()` for server-side loader timing and `performance.now()` with `Solid.createEffect` for client-side rendering timing. Error handling is also included within the loader to track duration even on failure.

```tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/dashboard')({
  loader: async ({ context }) => {
    const startTime = Date.now()

    try {
      const data = await loadDashboardData()
      const duration = Date.now() - startTime

      // Log server-side performance
      if (typeof window === 'undefined') {
        console.log(`[SSR] Dashboard loaded in ${duration}ms`)
      }

      return data
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(`[LOADER] Dashboard error after ${duration}ms:`, error)
      throw error
    }
  },
  component: Dashboard,
})

function Dashboard() {
  const data = Route.useLoaderData()

  // Track client-side render time
  Solid.createEffect(() => {
    const renderTime = performance.now()
    console.log(`[CLIENT] Dashboard rendered in ${renderTime}ms`)
  })

  return <div>Dashboard content</div>
}
```

--------------------------------

### Perform Runtime Validation of Environment Variables using Zod

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This TypeScript snippet demonstrates using Zod for runtime validation of environment variables. It defines separate schemas (`envSchema` and `clientEnvSchema`) for server-side (`process.env`) and client-side (`import.meta.env`) variables. Calling `.parse()` ensures that all required variables are present and conform to their defined types at application startup, throwing an error if validation fails.

```typescript
// src/config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

const clientEnvSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_API_URL: z.string().url(),
  VITE_AUTH0_DOMAIN: z.string(),
  VITE_AUTH0_CLIENT_ID: z.string(),
})

// Validate server environment
export const serverEnv = envSchema.parse(process.env)

// Validate client environment
export const clientEnv = clientEnvSchema.parse(import.meta.env)
```

--------------------------------

### Environment-aware storage with isomorphic functions

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/code-execution-patterns

Create a storage abstraction that uses file-based caching on the server and localStorage on the client. The createIsomorphicFn allows different implementations for the same function based on the execution environment, enabling seamless storage access across both contexts.

```typescript
const storage = createIsomorphicFn()
  .server((key: string) => {
    // Server: File-based cache
    const fs = require('node:fs')
    return JSON.parse(fs.readFileSync('.cache', 'utf-8'))[key]
  })
  .client((key: string) => {
    // Client: localStorage
    return JSON.parse(localStorage.getItem(key) || 'null')
  })
```

--------------------------------

### Define RootDocument React Component with Global Navigation

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic

This React functional component, `RootDocument`, serves as the main HTML shell for the application, typically used as the `shellComponent` in TanStack Router. It renders the fundamental `<html>`, `<head>` (including a `HeadContent` component), and `<body>` tags. Inside the body, it creates a navigation bar using TanStack Router's `Link` components, providing links to various routes and demonstrating `activeProps` for styling active links.

```typescript
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Implement Environment-Aware Storage with createIsomorphicFn (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Illustrates how to define an environment-aware storage mechanism using `createIsomorphicFn`. This approach allows using a file-based cache on the server (via `node:fs`) and `localStorage` on the client, ensuring the correct storage is accessed based on the execution environment.

```tsx
const storage = createIsomorphicFn()
  .server((key: string) => {
    // Server: File-based cache
    const fs = require('node:fs')
    return JSON.parse(fs.readFileSync('.cache', 'utf-8'))[key]
  })
  .client((key: string) => {
    // Client: localStorage
    return JSON.parse(localStorage.getItem(key) || 'null')
  })
```

--------------------------------

### Implement Article JSON-LD Schema with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/llmo

This snippet demonstrates how to add 'Article' structured data using JSON-LD within a TanStack Start route's `head` configuration. It dynamically populates article details like `headline`, `description`, `image`, `author`, `publisher`, and `datePublished` from `loaderData`, making the content machine-readable for AI systems.

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData.post.title }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: loaderData.post.title,
          description: loaderData.post.excerpt,
          image: loaderData.post.coverImage,
          author: {
            '@type': 'Person',
            name: loaderData.post.author.name,
            url: loaderData.post.author.url,
          },
          publisher: {
            '@type': 'Organization',
            name: 'My Company',
            logo: {
              '@type': 'ImageObject',
              url: 'https://myapp.com/logo.png',
            },
          },
          datePublished: loaderData.post.publishedAt,
          dateModified: loaderData.post.updatedAt,
        }),
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Validate Server Function Input with Zod Schema

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-functions

Demonstrates robust input validation using the Zod schema library in a server function. The UserSchema defines validation rules for name and age fields, ensuring data is fully typed and validated before the handler executes.

```typescript
import { createServerFn } from '@tanstack/solid-start'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
})

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    // data is fully typed and validated
    return `Created user: ${data.name}, age ${data.age}`
  })
```

--------------------------------

### Implement Typed ReadableStream in TanStack Start Server Function

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

This server function demonstrates how to create and return a `ReadableStream` that sends type-safe `Message` objects in chunks to the client. It uses `createServerFn().handler()` to define the server function, where messages are asynchronously enqueued into the stream, ensuring each chunk is typed.

```typescript
type Message = {
  content: string
}

/**
  This server function returns a `ReadableStream`
  that streams `Message` chunks to the client.
*/
const streamingResponseFn = createServerFn().handler(async () => {
  // These are the messages that you want to send as chunks to the client
  const messages: Message[] = generateMessages()

  // This `ReadableStream` is typed, so each
  // will be of type `Message`.
  const stream = new ReadableStream<Message>({
    async start(controller) {
      for (const message of messages) {
        // Send the message
        controller.enqueue(message)
      }
      controller.close()
    },
  })

  return stream
})
```

--------------------------------

### Distinguish RPC (createServerFn) from Server-Only Functions (createServerOnlyFn) (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Explains the difference between `createServerFn` (for RPC-like server functions callable from the client, resulting in a network request) and `createServerOnlyFn` (for functions strictly executed on the server, which crash if invoked client-side). It demonstrates their usage patterns and implications for client-server communication.

```tsx
// createServerFn: RPC pattern - server execution, client callable
const fetchUser = createServerFn().handler(async () => await db.users.find())

// Usage from client component:
const user = await fetchUser() // ✅ Network request

// createServerOnlyFn: Crashes if called from client
const getSecret = createServerOnlyFn(() => process.env.SECRET)

// Usage from client:
const secret = getSecret() // ❌ Throws error
```

--------------------------------

### Set Cache Headers for Blog Post Pages

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Configure Cache-Control headers on a dynamic blog post route to enable ISR. The headers specify 1-hour CDN caching with stale-while-revalidate for up to 24 hours, allowing background regeneration while serving cached content. The loader fetches post data dynamically.

```typescript
// routes/blog/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  headers: () => ({
    // Cache at CDN for 1 hour, allow stale content for up to 1 day
    'Cache-Control':
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  }),
})

export default function BlogPost() {
  const { post } = Route.useLoaderData()
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}
```

--------------------------------

### Resolve Hydration Mismatches with Client-Side State (React/TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Addresses the anti-pattern of rendering different content on the server and client (e.g., `new Date().toLocaleString()`) which causes hydration mismatches. The corrected example shows how to achieve consistent rendering by initially providing a placeholder or empty state, then updating the content client-side using `useState` and `useEffect`.

```tsx
// ❌ Different content server vs client
function CurrentTime() {
  return <div>{new Date().toLocaleString()}</div>
}

// ✅ Consistent rendering
function CurrentTime() {
  const [time, setTime] = useState<string>()

  useEffect(() => {
    setTime(new Date().toLocaleString())
  }, [])

  return <div>{time || 'Loading...'}</div>
}
```

--------------------------------

### Configure Content Collections with TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This TypeScript configuration defines a 'posts' collection for markdown files located in './src/blog'. It utilizes 'gray-matter' to extract front matter and content, applies a Zod schema for validation, and transforms the data to include a slug, excerpt, description, and header image based on the content.

```tsx
// content-collections.ts
import { defineCollection, defineConfig } from '@content-collections/core'
import matter from 'gray-matter'

function extractFrontMatter(content: string) {
  const { data, content: body, excerpt } = matter(content, { excerpt: true })
  return { data, body, excerpt: excerpt || '' }
}

const posts = defineCollection({
  name: 'posts',
  directory: './src/blog', // Directory containing your .md files
  include: '*.md',
  schema: (z) => ({
    title: z.string(),
    published: z.string().date(),
    description: z.string().optional(),
    authors: z.string().array(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content)

    // Extract header image (first image in the document)
    const headerImageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/)
    const headerImage = headerImageMatch ? headerImageMatch[2] : undefined

    return {
      ...post,
      slug: post._meta.path,
      excerpt: frontMatter.excerpt,
      description: frontMatter.data.description,
      headerImage,
      content: frontMatter.body,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
```

--------------------------------

### Configure Environment-Specific Logging with TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This snippet demonstrates implementing isomorphic logging using `@tanstack/solid-start`'s `createIsomorphicFn`. It configures distinct logging strategies for development (detailed console logs) and production (structured JSON logs on the server, optional analytics tracking on the client) to adapt based on the environment. The `logger` function can be used throughout the application to log messages with different levels and associated data.

```typescript
// utils/logger.ts
import { createIsomorphicFn } from '@tanstack/solid-start'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const logger = createIsomorphicFn()
  .server((level: LogLevel, message: string, data?: any) => {
    const timestamp = new Date().toISOString()

    if (process.env.NODE_ENV === 'development') {
      // Development: Detailed console logging
      console[level](`[${timestamp}] [${level.toUpperCase()}]`, message, data)
    } else {
      // Production: Structured JSON logging
      console.log(
        JSON.stringify({
          timestamp,
          level,
          message,
          data,
          service: 'tanstack-start',
          environment: process.env.NODE_ENV,
        }),
      )
    }
  })
  .client((level: LogLevel, message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console[level](`[CLIENT] [${level.toUpperCase()}]`, message, data)
    } else {
      // Production: Send to analytics service
      // analytics.track('client_log', { level, message, data })
    }
  })

// Usage anywhere in your app
export { logger }

// Example usage
const fetchUserData = createServerFn().handler(async ({ data: userId }) => {
  logger('info', 'Fetching user data', { userId })

  try {
    const user = await db.users.findUnique({ where: { id: userId } })
    logger('info', 'User data fetched successfully', { userId })
    return user
  } catch (error) {
    logger('error', 'Failed to fetch user data', {
      userId,
      error: error.message,
    })
    throw error
  }
})
```

--------------------------------

### Validate Server Function Input with Zod Schema (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Illustrates how to leverage the Zod library for robust input validation within server functions. By defining a Zod schema, incoming data is automatically typed and validated, ensuring data integrity and consistency before server-side processing.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
})

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    // data is fully typed and validated
    return `Created user: ${data.name}, age ${data.age}`
  })
```

--------------------------------

### Implement a Server Action in Next.js (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

This example illustrates how to define a basic Server Action in Next.js using the `'use server'` directive. This function executes exclusively on the server, allowing direct database access or other server-side operations. It can be called directly from client components, providing a mechanism to bridge client-side interactivity with server-side logic.

```tsx
'use server'
export async function getTodos(userId: string) {
  // Runs on server, called from client
  return db.todos.findMany({ where: { userId } })
}

// Call from client component
const todos = await getTodos('123')
```

--------------------------------

### Configure TypeScript for TanStack Start (JSON)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This `tsconfig.json` configuration sets up the TypeScript compiler for a TanStack Start project, enabling JSX preservation, specifying SolidJS as the JSX import source, and defining modern module resolution and target settings. It ensures compatibility and type checking for the application.

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ES2022",
    "skipLibCheck": true,
    "strictNullChecks": true
  }
}
```

--------------------------------

### Provide Context via Next Function

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Shows how to pass context through middleware layers using the `next` function with a `context` property. Properties passed to context are merged into the parent context and available to subsequent middleware in the chain.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const awesomeMiddleware = createMiddleware({ type: 'function' }).server(
  ({ next }) => {
    return next({
      context: {
        isAwesome: Math.random() > 0.5,
      },
    })
  },
)

const loggingMiddleware = createMiddleware({ type: 'function' })
  .middleware([awesomeMiddleware])
  .server(async ({ next, context }) => {
    console.log('Is awesome?', context.isAwesome)
    return next()
  })
```

--------------------------------

### Implementing Environment-Aware Error Boundaries

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/execution-model

Demonstrates an `ErrorBoundary` component that logs errors differently based on the execution environment (server or client). This allows for context-specific error handling and debugging, improving observability in isomorphic applications.

```tsx
function ErrorBoundary(props) {
  return (
    <ErrorBoundaryComponent
      fallback={<div>Something went wrong</div>}
      onError={(error) => {
        if (typeof window === 'undefined') {
          console.error('[SERVER ERROR]:', error)
        } else {
          console.error('[CLIENT ERROR]:', error)
        }
      }}
    >
      {props.children}
    </ErrorBoundaryComponent>
  )
}
```

--------------------------------

### Create Base HTML Document Structure with Global Layout in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

This React component defines the foundational HTML '<html>' and '<body>' structure for the application. It includes the '<head>' content managed by 'HeadContent', a global header with navigation links and a 'LoadingIndicator', and a main content area for 'children'. It also integrates 'Toaster', 'ReactQueryDevtools', and 'TanStackRouterDevtools' for global utilities and debugging.

```jsx
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              {/* <label
                htmlFor="countries"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Delay
              </label>
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  // setExtraDelay(Number(event.currentTarget.value))
                }}
                defaultValue="0"
              >
                <option value="0">None</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="2000">2000</option>
              </select> */}
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Configure Conservative Cache-Control Headers for Gradual Optimization

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This example demonstrates a best practice for Cache-Control headers: starting with conservative values and gradually increasing them. It shows an initial 'max-age' of 5 minutes and 'stale-while-revalidate' of 10 minutes, which can then be extended to 1 hour and 24 hours respectively as content stability is understood.

```plaintext
// Start here
'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'

// Then move to
'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
```

--------------------------------

### Generate Dynamic Meta Tags from Loader Data

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Create page-specific meta tags using data fetched in the route loader. This enables SEO optimization for dynamic content like blog posts, product pages, or user profiles by pulling title and description from content data.

```typescript
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({\n  loader: async ({ params }) => {\n    const post = await fetchPost(params.postId)\n    return { post }\n  },\n  head: ({ loaderData }) => ({\n    meta: [\n      { title: loaderData.post.title },\n      { name: 'description', content: loaderData.post.excerpt },\n    ],\n  }),\n  component: PostPage,\n})
```

--------------------------------

### TanStack Start Environment-Specific Function Implementations (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Explains how to use `createIsomorphicFn` to provide distinct implementations for a function based on whether it's executing in the server or client environment, allowing for environment-specific logic within a single function definition.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

// Different implementation per environment
const getDeviceInfo = createIsomorphicFn()
  .server(() => ({ type: 'server', platform: process.platform }))
  .client(() => ({ type: 'client', userAgent: navigator.userAgent }))
```

--------------------------------

### Root Route with Disabled Component SSR and Shell Wrapper - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/selective-ssr

Shows how to disable server-side rendering for the root route component while maintaining server rendering of the HTML shell. The `shellComponent` wraps around the root component, error component, or notFound component and is always server-rendered. This setup uses Solid.js and includes `HeadContent` and `Scripts` components for proper hydration.

```tsx
import * as Solid from 'solid-js'

import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/solid-router'

export const Route = createRootRoute({
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not found</div>,
  ssr: false,
})

function RootShell(props) {
  return (
    <HeadContent />
    {props.children}
    <Scripts />
  )
}

function RootComponent() {
  return (
    <div>
      <h1>This component will be rendered on the client</h1>
      <Outlet />
    </div>
  )
}
```

--------------------------------

### Root Document Layout with Navigation and Authentication UI

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

Renders the HTML document structure with head/body tags and contains the application navigation bar with Home and Posts links. Conditionally displays user authentication UI (UserButton for signed-in users, SignInButton for guests) and includes TanStack Router devtools in development mode.

```typescript
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold'
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold'
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Install TypeScript and Type Definitions

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Install TypeScript and type definitions for React, Node.js, and Vite configuration path resolution.

```shell
npm i -D typescript @types/react @types/react-dom @types/node vite-tsconfig-paths
```

--------------------------------

### Server function for deterministic date formatting

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Creates a server function that retrieves locale and timezone from cookies and formats the current date/time using Intl.DateTimeFormat with consistent parameters. This ensures the server and client render identical output, preventing hydration mismatches when displaying timestamps.

```typescript
// src/routes/index.tsx (example)
import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export const getServerNow = createServerFn().handler(async () => {
  const locale = getCookie('locale') || 'en-US'
  const timeZone = getCookie('tz') || 'UTC'
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date())
})

export const Route = createFileRoute('/')(
  {
    loader: () => getServerNow(),
    component: () => {
      const serverNow = Route.useLoaderData() as string
      return <time dateTime={serverNow}>{serverNow}</time>
    },
  }
)
```

--------------------------------

### Consume Typed ReadableStream from TanStack Start Client

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

This client-side code shows how to consume a `ReadableStream` returned by a TanStack Start server function. It uses `reader.read()` in a loop to process `Message` chunks, demonstrating how type safety is maintained when accessing `value.content` and appending it to a state variable.

```typescript
const [message, setMessage] = useState('')

const getTypedReadableStreamResponse = useCallback(async () => {
  const response = await streamingResponseFn()

  if (!response) {
    return
  }

  const reader = response.getReader()
  let done = false
  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    if (value) {
      // Notice how we know the value of `chunk` (`Message | undefined`)
      // here, because it's coming from the typed `ReadableStream`
      const chunk = value.content
      setMessage((prev) => prev + chunk)
    }
  }
}, [])
```

--------------------------------

### Conditionally Render UI Based on TanStack Router Shell Status

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This example illustrates how to use the `isShell()` function, available on the router instance, to conditionally render different UI elements. It's useful for customizing the HTML output of the SPA shell, providing generic head tags, or custom pending fallback components before hydration.

```tsx
// src/routes/root.tsx
export default function Root() {
  const isShell = useRouter().isShell()

  if (isShell) console.log('Rendering the shell!')
}
```

--------------------------------

### Set Cache Headers for Page Routes Using Headers Property

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Simplify cache header configuration for page routes using the headers property directly on the route definition. This approach is cleaner than middleware for page-level caching and supports ISR with stale-while-revalidate for background regeneration.

```typescript
// routes/blog/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  }),
})
```

--------------------------------

### Root Component with Clerk Authentication Provider

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

Main root component that wraps the entire application with ClerkProvider for authentication context and RootDocument for layout structure. Uses Outlet to render child routes, enabling authentication state management throughout the application.

```typescript
function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  )
}
```

--------------------------------

### Define Root Route and Layout with TanStack Router in React (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

This TypeScript React code defines the application's root route using `@tanstack/react-router`. It configures global HTML head elements, meta tags, and stylesheets for SEO and branding. The route also specifies `errorComponent` and `notFoundComponent` for comprehensive error handling, and orchestrates the main application layout through `RootComponent` and `RootDocument`, rendering nested routes via `Outlet` and integrating development tools.

```tsx
/// <reference types="vite/client" />
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              {/* <label
                htmlFor="countries"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Delay
              </label>
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  // setExtraDelay(Number(event.currentTarget.value))
                }}
                defaultValue="0"
              >
                <option value="0">None</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="2000">2000</option>
              </select> */}
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Configure package.json for Vite Scripts (JSON)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This `package.json` snippet sets the project type to `module` for ES module syntax and defines `dev` and `build` scripts using the Vite CLI. These scripts are used to start the development server and build the production bundle, respectively.

```json
{
  // ...
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  }
}
```

--------------------------------

### Define Root TanStack Router Route with Context, SEO, and Error Handling

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

This code exports the root route configuration for a TanStack Start application, using 'createRootRouteWithContext' to provide a 'queryClient'. It defines dynamic head content (meta tags, links, SEO), custom error and not-found components ('DefaultCatchBoundary', 'NotFound'), and specifies the 'RootComponent' for the main layout. This centralizes global application settings and error handling.

```typescript
/// <reference types="vite/client" />
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})
```

--------------------------------

### Validate Server Function Parameters with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-functions

Shows how to add input validation to server functions using the inputValidator method. The validator receives data, validates it, and returns a typed data object. This ensures type safety and runtime correctness when crossing the network boundary.

```typescript
import { createServerFn } from '@tanstack/solid-start'

export const greetUser = createServerFn({ method: 'GET' })
  .inputValidator((data: { name: string }) => data)
  .handler(async ({ data }) => {
    return `Hello, ${data.name}!`
  })

await greetUser({ data: { name: 'John' } })
```

--------------------------------

### Load Dynamic Data into TanStack Start SPA Shell

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This snippet shows how to integrate dynamic data into your prerendered SPA shell by using a `loader` on the root route. The data returned by the loader is available during the prerendering process and can be accessed within the root component using `useLoaderData()`, allowing for dynamic content in the initial shell HTML.

```tsx
// src/routes/__root.tsx

export const RootRoute = createRootRoute({
  loader: async () => {
    return {
      name: 'Tanner'
    }
  },
  component: Root
})

export default function Root() {
  const { name } = useLoaderData()

  return (
    <html>
      <body>
        <h1>Hello, {name}!</h1>
        <Outlet />
      </body>
    </html>
  )
}
```

--------------------------------

### Example: Importing with Path Alias vs. Relative Path

Source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

This example demonstrates the usage of the configured path alias `~` to import a component. It shows how `import { Input } from '~/components/ui/input'` replaces the longer, relative `import { Input } from '../../../components/ui/input'`, simplifying module paths.

```ts
// app/routes/posts/$postId/edit.tsx
import { Input } from '~/components/ui/input'

// instead of

import { Input } from '../../../components/ui/input'
```

--------------------------------

### Progressive enhancement with ClientOnly wrapper

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/code-execution-patterns

Implement a search form that works without JavaScript using native form submission, then enhances with client-side JavaScript interactivity. The ClientOnly component provides a fallback button for server rendering and an enhanced SearchButton for client environments.

```typescript
function SearchForm() {
  const [query, setQuery] = createSignal('')

  return (
    <form action="/search" method="get">
      <input
        name="q"
        value={query()}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ClientOnly fallback={<button type="submit">Search</button>}>
        <SearchButton onSearch={() => search(query())} />
      </ClientOnly>
    </form>
  )
}
```

--------------------------------

### Wrap dynamic UI in ClientOnly to avoid SSR

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Uses the ClientOnly component from TanStack Router to render inherently dynamic content only on the client side, skipping server rendering entirely. This prevents hydration mismatches for components that cannot produce stable server output.

```typescript
import { ClientOnly } from '@tanstack/react-router'
;<ClientOnly fallback={<span>—</span>}>
  <RelativeTime ts={someTs} />
</ClientOnly>
```

--------------------------------

### Configure TanStack Start Static Prerendering in Vite (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/static-prerendering

This configuration snippet demonstrates how to enable and customize static prerendering for a TanStack Start application within `vite.config.ts`. It showcases various options such as `enabled`, `autoSubfolderIndex`, `crawlLinks`, and a `filter` function, along with an example of specifying prerender settings for individual pages. It requires dependencies like `@tanstack/solid-start/plugin/vite` and `vite-plugin-solid` to function correctly.

```typescript
// vite.config.ts

import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import viteSolid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // If disabled, only the root path or the paths defined in the pages config will be prerendered
        autoStaticPathsDiscovery: true,

        // How many prerender jobs to run at once
        concurrency: 14,

        // Whether to extract links from the HTML and prerender them also
        crawlLinks: true,

        // Filter function takes the page object and returns whether it should prerender
        filter: ({ path }) => !path.startsWith('/do-not-render-me'),

        // Number of times to retry a failed prerender job
        retryCount: 2,

        // Delay between retries in milliseconds
        retryDelay: 1000,

        // Maximum number of redirects to follow during prerendering
        maxRedirects: 5,

        // Fail if an error occurs during prerendering
        failOnError: true,

        // Callback when page is successfully rendered
        onSuccess: ({ page }) => {
          console.log(`Rendered ${page.path}!`);
        },
      },
      // Optional configuration for specific pages
      // Note: When autoStaticPathsDiscovery is enabled (default), discovered static
      // routes will be merged with the pages specified below
      pages: [
        {
          path: '/my-page',
          prerender: { enabled: true, outputPath: '/my-page/index.html' },
        },
      ],
    }),
    viteSolid({ ssr: true }),
  ],
})
```

--------------------------------

### Install and Configure Fonts with Fontsource and Tailwind CSS (Shell/CSS)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Guides on installing variable fonts using Fontsource via npm and integrating them into a TanStack Start project with Tailwind CSS. This approach leverages CSS `@import` rules and Tailwind's theme configuration for a CSS-first font management strategy, replacing Next.js's font loading utilities.

```sh
npm i -D @fontsource-variable/dm-sans @fontsource-variable/jetbrains-mono
```

```css
@import 'tailwindcss';

@import '@fontsource-variable/dm-sans';
@import '@fontsource-variable/jetbrains-mono';

@theme inline {
  --font-sans: 'DM Sans Variable', sans-serif;
  --font-mono: 'JetBrains Mono Variable', monospace;
  /* ... */
}

/* ... */
```

--------------------------------

### Install TypeScript Development Dependencies (npm)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This command installs development-specific dependencies, including `typescript` for type checking, `@types/node` for Node.js type definitions, and `vite-tsconfig-paths` for resolving paths defined in `tsconfig.json` within Vite. These are essential for a robust TypeScript development workflow.

```shell
npm i -D typescript @types/node vite-tsconfig-paths
```

--------------------------------

### TanStack Start Server-Only Functions (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Illustrates how to define functions that execute exclusively on the server. `createServerFn` enables RPC calls from the client to the server, while `createServerOnlyFn` creates utility functions that will throw an error if inadvertently called on the client.

```tsx
import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'

// RPC: Server execution, callable from client
const updateUser = createServerFn({ method: 'POST' })
  .inputValidator((data: UserData) => data)
  .handler(async ({ data }) => {
    // Only runs on server, but client can call it
    return await db.users.update(data)
  })

// Utility: Server-only, client crashes if called
const getEnvVar = createServerOnlyFn(() => process.env.DATABASE_URL)
```

--------------------------------

### TanStack Start useHydrated Hook for Client-Side Control (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates using the `useHydrated` hook to gain granular control over hydration-dependent behavior. It returns `true` only after the client has fully hydrated, allowing conditional rendering or execution of code based on client-side data with a server-side fallback.

```tsx
import { useHydrated } from '@tanstack/react-router'

function TimeZoneDisplay() {
  const hydrated = useHydrated()
  const timeZone = hydrated
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : 'UTC'

  return <div>Your timezone: {timeZone}</div>
}
```

--------------------------------

### Define Server Function with Basic Input Validation (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Explains how to add basic input validation to server functions using the `.inputValidator()` method. This ensures that the single `data` parameter passed across the network boundary conforms to expected types, enhancing type safety and runtime correctness.

```tsx
import { createServerFn } from '@tanstack/react-start'

export const greetUser = createServerFn({ method: 'GET' })
  .inputValidator((data: { name: string }) => data)
  .handler(async ({ data }) => {
    return `Hello, ${data.name}!`
  })

await greetUser({ data: { name: 'John' } })
```

--------------------------------

### Conditional Rendering for Development Mode in TanStack Start Client

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/client-entry-point

This snippet shows how to introduce environment-specific behavior within the client entry point, such as displaying a 'Development Mode' indicator. It leverages `import.meta.env.DEV` to conditionally render elements, allowing different logic or UI to be active based on whether the application is in development or production.

```tsx
// src/client.tsx
import { StartClient } from '@tanstack/solid-start/client'
import { hydrate } from 'solid-js/web'

const App = (
  <>
    {import.meta.env.DEV && <div>Development Mode</div>}
    <StartClient />
  </>
)

hydrate(() => <App />, document.body)
```

--------------------------------

### Create Type-Safe Server Entry Point with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-entry-point

This example demonstrates how to create a type-safe server entry point using `createServerEntry` from `@tanstack/solid-start/server-entry`. This approach is recommended for defining the main server logic, ensuring type correctness and leveraging TanStack Start's abstractions. The `src/server.ts` file acts as the entry for all SSR-related work and server-side request handling.

```tsx
// src/server.ts
import handler, { createServerEntry } from '@tanstack/solid-start/server-entry'

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request)
  }
})
```

--------------------------------

### Define client-side environment variables and build with Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This example illustrates the correct way to declare environment variables for client-side access in a Vite project by using the `VITE_` prefix. It contrasts non-prefixed variables, which are not exposed to the client, and shows how to include client-accessible variables during the build process for production deployments.

```bash
# ❌ Won't work in client code
API_KEY=abc123

# ✅ Works in client code
VITE_API_KEY=abc123

# ❌ Won't bundle the variable (assuming it is not set in the environment of the build)
npm run build

# ✅ Works in client code and will bundle the variable for production
VITE_API_KEY=abc123 npm run build
```

--------------------------------

### React Component to Display Jokes List (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This TypeScript React component, `JokesList`, is responsible for rendering an array of `Joke` objects passed as props. It conditionally displays a 'No jokes found' message if the input array is empty or null. Each joke is rendered within a styled `div` showcasing its question and answer, utilizing basic Tailwind CSS classes for presentation.

```tsx
// src/components/JokesList.tsx
import { Joke } from '../types'

interface JokesListProps {
  jokes: Joke[]
}

export function JokesList({ jokes }: JokesListProps) {
  if (!jokes || jokes.length === 0) {
    return <p className="text-gray-500 italic">No jokes found. Add some!</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Jokes Collection</h2>
      {jokes.map((joke) => (
        <div
          key={joke.id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <p className="font-bold text-lg mb-2">{joke.question}</p>
          <p className="text-gray-700">{joke.answer}</p>
        </div>
      ))}
    </div>
  )
}
```

--------------------------------

### Basic JavaScript no-op function definition

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-functions

This is a basic JavaScript function that performs no operation (no-op) and implicitly returns `undefined`. It serves as a fundamental example of a function that does nothing when executed, often used as a default or placeholder.

```javascript
function noop() {}
```

--------------------------------

### Generate Dynamic Meta Tags with Loader Data in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

This snippet illustrates how to create dynamic meta tags for content-specific pages, such as post details, by leveraging loader data. The route's `head` property accesses data fetched by the `loader` function to populate `title` and `description` meta tags.

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.post.title },
      { name: 'description', content: loaderData.post.excerpt },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Implement Loading Indicator with TanStack Router State in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

This React component displays a visual loading indicator based on the 'isLoading' state from 'useRouterState' in TanStack Router. It uses Tailwind CSS classes for conditional styling, showing or hiding the 'Loader' component with a smooth transition, providing user feedback during route transitions.

```jsx
function LoadingIndicator() {
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  return (
    <div
      className={`h-12 transition-all duration-300 ${
        isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`
      }`}
    >
      <Loader />
    </div>
  )
}
```

--------------------------------

### Generate Dynamic robots.txt with Server Route

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

Creates a dynamic robots.txt endpoint using a server route for environment-specific rules. Useful for complex scenarios where different robots rules apply to different environments or configurations.

```ts
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const robots = `User-agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml`

        return new Response(robots, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      },
    },
  },
})
```

--------------------------------

### Correctly Handle Server-Only Operations in Route Loaders (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Illustrates the anti-pattern of assuming a route loader is server-only, leading to exposure of sensitive data like `process.env.SECRET` to the client. It then demonstrates the correct pattern by encapsulating server-only logic within a `createServerFn` and calling it from the loader, ensuring secure data fetching.

```tsx
// ❌ Assuming loader is server-only
export const Route = createFileRoute('/users')({
  loader: () => {
    // This runs on BOTH server and client!
    const secret = process.env.SECRET // Exposed to client
    return fetch(`/api/users?key=${secret}`)
  },
})

// ✅ Use server function for server-only operations
const getUsersSecurely = createServerFn().handler(() => {
  const secret = process.env.SECRET // Server-only
  return fetch(`/api/users?key=${secret}`)
})

export const Route = createFileRoute('/users')({
  loader: () => getUsersSecurely(), // Isomorphic call to server function
})
```

--------------------------------

### Implement ISR Caching Pattern for Marketing Landing Pages with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript example demonstrates an ISR caching pattern for stable marketing landing pages. It utilizes a long 'max-age' of 24 hours for CDN caching and 'stale-while-revalidate' for 7 days, paired with a 1-hour client-side 'staleTime' to ensure content freshness while minimizing revalidation.

```TypeScript
export const Route = createFileRoute('/landing/$campaign')({
  loader: async ({ params }) => fetchCampaign(params.campaign),
  headers: () => ({
    // Long cache for stable content
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
  }),
  staleTime: 60 * 60_000, // 1 hour client-side
})
```

--------------------------------

### TanStack Start Client-Only Functions and Components (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Shows how to create functions and components that run or render only in the client environment. `createClientOnlyFn` defines utilities for browser-specific APIs, and the `<ClientOnly>` component conditionally renders its children after client-side hydration.

```tsx
import { createClientOnlyFn } from '@tanstack/react-start'
import { ClientOnly } from '@tanstack/react-router'

// Utility: Client-only, server crashes if called
const saveToStorage = createClientOnlyFn((key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
})

// Component: Only renders children after hydration
function Analytics() {
  return (
    <ClientOnly fallback={null}>
      <GoogleAnalyticsScript />
    </ClientOnly>
  )
}
```

--------------------------------

### Send Client Context to Server

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Illustrates how to transmit client context to the server using the `sendContext` property in the `next` function call. Client context is not sent by default to prevent unintended large payloads; explicit `sendContext` configuration is required to merge and serialize client data for server-side middleware access.

```typescript
const requestLogger = createMiddleware({ type: 'function' })
  .client(async ({ next, context }) => {
    return next({
      sendContext: {
        // Send the workspace ID to the server
        workspaceId: context.workspaceId,
      },
    })
  })
  .server(async ({ next, data, context }) => {
    // Woah! We have the workspace ID from the client!
    console.log('Workspace ID:', context.workspaceId)
    return next()
  })
```

--------------------------------

### Display Product Details with Clear, Factual Statements in React/TSX

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This React component illustrates a best practice for content structure by rendering product details with clear and explicit factual statements. It ensures key information like product name, category, brand, price, and colors are easily extractable by AI systems.

```tsx
// Good: Clear, extractable facts
function ProductDetails({ product }) {
  return (
    <article>
      <h1>{product.name}</h1>
      <p>
        {product.name} is a {product.category} made by {product.brand}. It costs
        ${product.price} and is available in {product.colors.join(', ')}.
      </p>
    </article>
  )
}
```

--------------------------------

### Implement a Basic No-Operation Function (JavaScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Provides a fundamental JavaScript example of a 'no-op' function. This function performs no operations and returns `undefined`, illustrating the concept behind functions that have no side effects or specific return values when called.

```javascript
function noop() {}
```

--------------------------------

### Format Server Date with Deterministic Locale and Timezone

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hydration-errors

Uses createServerFn to format dates on the server with locale and timezone from cookies, ensuring consistent formatting between server render and client hydration. Returns formatted date string for display in client component.

```typescript
import { createFileRoute } from '@tanstack/solid-router'
import { createServerFn } from '@tanstack/solid-start'
import { getCookie } from '@tanstack/solid-start/server'

export const getServerNow = createServerFn().handler(async () => {
  const locale = getCookie('locale') || 'en-US'
  const timeZone = getCookie('tz') || 'UTC'
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date())
})

export const Route = createFileRoute('/')( {
  loader: () => getServerNow(),
  component: () => {
    const serverNow = Route.useLoaderData() as string
    return <time dateTime={serverNow}>{serverNow}</time>
  },
})
```

--------------------------------

### Create Environment-Aware Storage with Isomorphic Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Implement storage that adapts to the execution environment using createIsomorphicFn. The server implementation uses file-based caching with Node.js fs module, while the client uses browser localStorage. This pattern enables seamless data persistence across server and client contexts.

```typescript
const storage = createIsomorphicFn()
  .server((key: string) => {
    // Server: File-based cache
    const fs = require('node:fs')
    return JSON.parse(fs.readFileSync('.cache', 'utf-8'))[key]
  })
  .client((key: string) => {
    // Client: localStorage
    return JSON.parse(localStorage.getItem(key) || 'null')
  })
```

--------------------------------

### Create a Client and Server Middleware in TanStack Start (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

This snippet showcases TanStack Start's composable middleware architecture by defining an `authMiddleware` that operates differently on the client and server. The client-side logic can, for example, attach an authorization token to outgoing requests, while the server-side logic can validate this token, fetch user details, and enrich the request context. This dual-sided approach allows for flexible and secure handling of authentication across the application.

```tsx
const authMiddleware = createMiddleware({ type: 'function' })
  .client(async ({ next }) => {
    // Run auth checks on client
    return next({
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  })
  .server(async ({ next }) => {
    // Validate auth on server
    return next({ context: { user: await getUser() } })
  })
```

--------------------------------

### TanStack Start Isomorphic Code Execution (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates the default isomorphic behavior in TanStack Start where code, including utility functions and route loaders, runs on both the server (during SSR) and the client (during navigation or after hydration).

```tsx
// ✅ This runs on BOTH server and client
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/products')({
  loader: async () => {
    // This runs on server during SSR AND on client during navigation
    const response = await fetch('/api/products')
    return response.json()
  },
})
```

--------------------------------

### Combine CDN and Client-Side Caching with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript example demonstrates a multi-tier caching strategy combining CDN caching (via HTTP headers) and client-side caching (via TanStack Router's 'staleTime' and 'gcTime' options). It fetches post data and configures both server-side and client-side cache durations for optimized performance.

```TypeScript
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
  // CDN caching (via headers)
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  }),
  // Client-side caching (via TanStack Router)
  staleTime: 60_000, // Consider data fresh for 60 seconds on client
  gcTime: 5 * 60_000, // Keep in memory for 5 minutes
})
```

--------------------------------

### GET /users/{id}

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Retrieves a user's ID using a dynamic path parameter. This demonstrates how to define a route that captures a single dynamic segment.

```APIDOC
## GET /users/{id}

### Description
Retrieves a user's ID using a dynamic path parameter.

### Method
GET

### Endpoint
/users/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The unique identifier of the user.

### Request Example
N/A

### Response
#### Success Response (200)
- **body** (string) - The user ID prefixed with 'User ID: '.

#### Response Example
```
User ID: 123
```
```

--------------------------------

### Create a base HTML document structure with RootDocument component (React/TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-workos

This TypeScript/React functional component, `RootDocument`, establishes the fundamental HTML page structure. It accepts `children` as a prop and renders them within the `<body>` tags, ensuring that shared components like `HeadContent` (for meta tags, title) and `Scripts` (for JavaScript bundles) are consistently included across the application. This component acts as a wrapper for the entire application's React tree.

```tsx
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

--------------------------------

### Implement Basic In-Memory Error Reporting in TanStack Solid-Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This code provides a simple, in-memory error reporting mechanism for a TanStack Solid-Start application. It stores unique errors with their occurrences, last-seen timestamps, and original error details, logging them to the console immediately upon reporting. Additionally, it exposes an API endpoint via `createFileRoute` to retrieve the collected errors, useful for basic administrative monitoring without external dependencies.

```typescript
// utils/error-reporter.ts
const errorStore = new Map<
  string,
  { count: number; lastSeen: Date; error: any }
>()

export function reportError(error: Error, context?: any) {
  const key = `${error.name}:${error.message}`
  const existing = errorStore.get(key)

  if (existing) {
    existing.count++
    existing.lastSeen = new Date()
  } else {
    errorStore.set(key, {
      count: 1,
      lastSeen: new Date(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
      },
    })
  }

  // Log immediately
  console.error('[ERROR REPORTED]:', {
    error: error.message,
    count: existing ? existing.count : 1,
    context,
  })
}

// Error reporting endpoint
// routes/errors.ts
export const Route = createFileRoute('/admin/errors')(ंचल{
  server: {
    handlers: {
      GET: async () => {
        const errors = Array.from(errorStore.entries()).map(([key, data]) => ({
          id: key,
          ...data,
        }))

        return Response.json({ errors })
      },
    },
  },
})
```

--------------------------------

### Render a Single Blog Post with TanStack Router Loader

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This TanStack Router route defines a loader function to retrieve a specific post based on its slug from the 'allPosts' collection, throwing a 'notFound' error if the post doesn't exist. The 'BlogPost' component then receives this post data and renders its title, authors, publication date, and the main markdown content using a custom 'Markdown' component.

```tsx
// src/routes/blog.$slug.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { Markdown } from '~/components/Markdown'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) {
      throw notFound()
    }
    return post
  },
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <p>
          By {post.authors.join(', ')} on {post.published}
        </p>
      </header>
      <Markdown content={post.content} className="prose" />
    </article>
  )
}
```

--------------------------------

### Configure Static Prerendering in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

Configures Vite plugin to enable static prerendering with link crawling for build-time HTML generation. This optimizes performance by pre-generating HTML for static or mostly-static content, making pages load faster and easily crawlable.

```ts
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
  ],
})
```

--------------------------------

### Configure Built-in Client-Side Caching in TanStack Start Loader (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

This snippet demonstrates how to configure built-in SWR (stale-while-revalidate) caching directly within a TanStack Start route loader. It sets a `staleTime` of 10 seconds, meaning data is considered fresh for this duration, and a `gcTime` of 5 minutes, dictating how long cached data remains in memory after it's no longer actively used. This setup provides out-of-the-box performance optimization for route-level data fetching.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  staleTime: 10_000, // Consider fresh for 10 seconds
  gcTime: 5 * 60_000, // Keep in memory for 5 minutes
})
```

--------------------------------

### Implement Environment-Aware Error Boundaries (React/TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates how to create a React Error Boundary component that logs errors differently based on the execution environment. This allows for specific error handling and debugging messages, distinguishing between server-side and client-side errors.

```tsx
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallback={<div>Something went wrong</div>}
      onError={(error) => {
        if (typeof window === 'undefined') {
          console.error('[SERVER ERROR]:', error)
        } else {
          console.error('[CLIENT ERROR]:', error)
        }
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
```

--------------------------------

### Create Root Component with Outlet - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-auth

Root component that renders the RootDocument wrapper with an Outlet for nested route content. This component serves as the main layout container for all child routes.

```TypeScript
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}
```

--------------------------------

### Create Global Root Layout Component for React Application

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

This React component (`RootLayout`) defines the overarching HTML structure for the entire application. It includes the `head` section (with `HeadContent`), a navigation bar using TanStack Router `Link` components, a content area for children, TanStack Router Devtools, and script injections. It's designed to provide a consistent UI wrapper for all pages.

```typescript
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold'
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold'
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold'
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold'
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold'
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold'
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Implement ISR Caching Pattern for E-commerce Product Pages with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript code provides an ISR caching pattern suitable for e-commerce product pages. Due to potential inventory changes, it uses a shorter 'max-age' of 5 minutes for CDN caching, with 'stale-while-revalidate' for 1 hour, and a 30-second client-side 'staleTime'.

```TypeScript
export const Route = createFileRoute('/products/$id')({
  loader: async ({ params }) => fetchProduct(params.id),
  headers: () => ({
    // Shorter cache due to inventory changes
    'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
  }),
  staleTime: 30_000, // 30 seconds client-side
})
```

--------------------------------

### Define TypeScript Types for Joke Data

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Create TypeScript interfaces in src/types/index.ts to define the structure of individual Joke objects and the JokesData array. Provides type safety for data handling throughout the application.

```typescript
// src/types/index.ts
export interface Joke {
  id: string
  question: string
  answer: string
}

export type JokesData = Joke[]
```

--------------------------------

### Validate Required Environment Variables at Application Startup

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-variables

This TypeScript code provides a mechanism to validate the presence of crucial server-side and client-side environment variables upon application startup or build time. It throws an error if any required variable is missing, preventing the application from running with incomplete configuration.

```typescript
const requiredServerEnv = ['DATABASE_URL', 'JWT_SECRET'] as const

const requiredClientEnv = ['VITE_APP_NAME', 'VITE_API_URL'] as const

// Validate on server startup
for (const key of requiredServerEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

// Validate client environment at build time
for (const key of requiredClientEnv) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}
```

--------------------------------

### Configure CDN Cache-Control Headers for Vercel Edge Network in TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript code demonstrates how to set Cache-Control headers tailored for Vercel's Edge Network. It uses 's-maxage' for shared cache control and 'stale-while-revalidate' to serve stale content while revalidating in the background, ensuring optimal performance on Vercel.

```TypeScript
export const Route = createFileRoute('/posts/$id')({
  headers: () => ({
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  }),
})
```

--------------------------------

### Create Static robots.txt File

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

Places a static robots.txt file in the public directory to control search engine crawler behavior. Specifies crawl rules and sitemap location. This is the simplest and most common approach for most websites.

```txt
User-agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml
```

--------------------------------

### Bypass CDN Cache for Revalidation Testing using curl

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Demonstrates how to force a cache bypass using `curl` by sending a `Cache-Control: no-cache` header. This technique is essential for testing Incremental Static Regeneration (ISR) to ensure that content revalidation and regeneration mechanisms are functioning correctly without interference from cached responses, and mentions CDN-specific purge APIs as an alternative.

```bash
# Cloudflare: Bypass cache
curl -H "Cache-Control: no-cache" https://yoursite.com/page

# Or use CDN-specific cache purge APIs
```

--------------------------------

### Control Hydration-Dependent Behavior in TanStack Start with useHydrated Hook

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/execution-model

Demonstrates using the `useHydrated` hook for granular control over hydration-dependent behavior in TanStack Start applications. This hook returns a signal indicating if the client has been hydrated, allowing conditional rendering or execution of client-specific logic while providing a sensible fallback for server rendering.

```tsx
import { useHydrated } from '@tanstack/solid-router'

function TimeZoneDisplay() {
  const hydrated = useHydrated()
  const timeZone = () =>
    hydrated() ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC'

  return <div>Your timezone: {timeZone()}</div>
}
```

--------------------------------

### Display Clear and Factual Product Details with React/TSX

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/llmo

This React/TSX component renders product details using clear, explicit, and factual statements. By presenting information such as product name, category, brand, price, and available colors directly in the text, it makes it easier for AI systems and LLMs to extract key facts accurately. This approach improves the content's readability and machine-understandability.

```tsx
// Good: Clear, extractable facts
function ProductDetails(props) {
  return (
    <article>
      <h1>{props.product.name}</h1>
      <p>
        {props.product.name} is a {props.product.category} made by{' '}
        {props.product.brand}. It costs ${props.product.price} and is available
        in {props.product.colors.join(', ')}.
      </p>
    </article>
  )
}
```

--------------------------------

### Root Component with Layout and Outlet - TanStack React Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

Defines the RootComponent that wraps the Outlet (where child routes render) with RootLayout. The RootLayout component renders HTML structure with HeadContent for metadata injection, navigation Links to various routes (Home, Posts, Users, Pathless Layout, Deferred), TanStackRouterDevtools for debugging, and Scripts for hydration.

```typescript
function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Clone Starter Template Repository

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Use gitpick to clone a Next.js starter template from the awesome-templates repository. This provides a baseline Next.js project structure to follow along with the migration guide.

```shell
npx gitpick nrjdalal/awesome-templates/tree/main/next.js-apps/next.js-start next.js-start-er
```

--------------------------------

### Compare Manual vs API-Driven Environment Detection (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Compares two approaches for environment detection: a manual method using `typeof window === 'undefined'` to differentiate server from client, and an API-driven method utilizing `createIsomorphicFn`. The API approach abstracts environment checks, providing dedicated server and client implementations for a cleaner codebase.

```tsx
// Manual: You handle the logic
function logMessage(msg: string) {
  if (typeof window === 'undefined') {
    console.log(`[SERVER]: ${msg}`)
  } else {
    console.log(`[CLIENT]: ${msg}`)
  }
}

// API: Framework handles it
const logMessage = createIsomorphicFn()
  .server((msg) => console.log(`[SERVER]: ${msg}`))
  .client((msg) => console.log(`[CLIENT]: ${msg}`))
```

--------------------------------

### Define Client-Only Isomorphic Function (TanStack Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Shows an example of `createIsomorphicFn` with an implementation only for the client. The function returns 'client' when run on the client, but acts as a no-op returning `undefined` if invoked on the server, ensuring client-side logic is isolated.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const clientImplementationOnly = createIsomorphicFn().client(() => 'client')

const client = clientImplementationOnly()
```

--------------------------------

### Create Markdown Blog Posts for Content Collections

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This example illustrates the structure of a markdown file that will be processed by 'content-collections'. It includes a front matter section with metadata like title, publication date, authors, and description, followed by the main body content which can contain images, headings, and code blocks.

```markdown
## <!-- src/blog/hello-world.md -->

title: Hello World
published: 2024-01-15
authors:

- Jane Doe
  description: My first blog post

---

![Hero Image](/images/hero.jpg)

Welcome to my blog! This is my first post.

## Getting Started

Here's some content with **bold** and _italic_ text.

```javascript
console.log('Hello, world!')
```
```

--------------------------------

### Provide Environment-Specific Implementations in TanStack Start with createIsomorphicFn

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/execution-model

Explains how to provide different function implementations for server and client environments using TanStack Start's `createIsomorphicFn`. This API allows defining distinct logic for each environment, such as accessing `process.platform` on the server and `navigator.userAgent` on the client, within a single function interface.

```tsx
import { createIsomorphicFn } from '@tanstack/solid-start'

// Different implementation per environment
const getDeviceInfo = createIsomorphicFn()
  .server(() => ({ type: 'server', platform: process.platform }))
  .client(() => ({ type: 'client', userAgent: navigator.userAgent }))
```

--------------------------------

### Define TanStack Start Application Root Component (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This `src/routes/__root.tsx` file creates the root route component for the TanStack Start application using `createRootRoute`. It defines global head metadata, renders an `Outlet` for child routes, and wraps the entire application in an `html` structure including `HydrationScript`, `HeadContent`, and `Scripts` for proper SSR and client-side hydration.

```typescript
// src/routes/__root.tsx
/// <reference types="vite/client" />
import * as Solid from 'solid-js'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/solid-router'
import { HydrationScript } from 'solid-js/web'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: Solid.JSX.Element }>) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Solid.Suspense>{children}</Solid.Suspense>
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Configure Open Graph and Twitter Card Tags

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Add Open Graph and Twitter Card meta tags to control how content appears when shared on social media platforms. These tags define title, description, images, and content type for rich preview generation across social networks.

```typescript
export const Route = createFileRoute('/posts/$postId')({\n  loader: async ({ params }) => {\n    const post = await fetchPost(params.postId)\n    return { post }\n  },\n  head: ({ loaderData }) => ({\n    meta: [\n      { title: loaderData.post.title },\n      { name: 'description', content: loaderData.post.excerpt },\n      // Open Graph\n      { property: 'og:title', content: loaderData.post.title },\n      { property: 'og:description', content: loaderData.post.excerpt },\n      { property: 'og:image', content: loaderData.post.coverImage },\n      { property: 'og:type', content: 'article' },\n      // Twitter Card\n      { name: 'twitter:card', content: 'summary_large_image' },\n      { name: 'twitter:title', content: loaderData.post.title },\n      { name: 'twitter:description', content: loaderData.post.excerpt },\n      { name: 'twitter:image', content: loaderData.post.coverImage },\n    ],\n  }),\n  component: PostPage,\n})
```

--------------------------------

### Define main application layout with navigation, routing, and devtools (React/JSX)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-workos

This React/JSX snippet illustrates the primary application layout, including a header with navigation links ('/', '/account'), a Suspense boundary for lazy loading, and a 'SignInButton' component. It integrates TanStack Router's 'Outlet' for dynamic content and wraps the entire structure in UI components like 'Flex', 'Card', 'Box', 'Container', 'Theme', and 'TanStackRouterDevtools'. This code block is typically placed within a main application component, serving as the children for a 'RootDocument'.

```jsx
                  <Flex asChild justify="between">
                    <header>
                      <Flex gap="4">
                        <Button asChild variant="soft">
                          <Link to="/">Home</Link>
                        </Button>

                        <Button asChild variant="soft">
                          <Link to="/account">Account</Link>
                        </Button>
                      </Flex>

                      <Suspense fallback={<div>Loading...</div>}>
                        <SignInButton user={user} url={url} />
                      </Suspense>
                    </header>
                  </Flex>

                  <Flex flexGrow="1" align="center" justify="center">
                    <main>
                      <Outlet />
                    </main>
                  </Flex>
                </Flex>
              </Card>
            </Box>
            <Footer />
          </Flex>
        </Container>
      </Theme>
      <TanStackRouterDevtools position="bottom-right" />
```

--------------------------------

### Configure TanStack Start Client for Development and Production (TypeScript/TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point

This snippet illustrates how to conditionally render components or apply configurations based on the environment (development vs. production) within the client entry point. It uses `import.meta.env.DEV` to check the environment, applying `StrictMode` only in development and showing a debug message, providing flexibility for environment-specific behaviors.

```tsx
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

const App = (
  <>
    {import.meta.env.DEV && <div>Development Mode</div>}
    <StartClient />
  </>
)

hydrateRoot(
  document,
  import.meta.env.DEV ? <StrictMode>{App}</StrictMode> : App,
)
```

--------------------------------

### Implement ISR Caching Pattern for Blog Posts with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript snippet shows an ISR pattern for blog post pages. It sets a 'Cache-Control' header for public caching with a 'max-age' of 1 hour and 'stale-while-revalidate' for 7 days, allowing for long CDN caching while keeping client-side data fresh for 5 minutes.

```TypeScript
export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => fetchPost(params.slug),
  headers: () => ({
    // Cache for 1 hour, allow stale for 7 days
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=604800',
  }),
  staleTime: 5 * 60_000, // 5 minutes client-side
})
```

--------------------------------

### Configure CDN Cache-Control Headers for Netlify using _headers file

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This plaintext example illustrates how to configure caching for Netlify deployments using a '_headers' file. It specifies Cache-Control directives like 'max-age' and 'stale-while-revalidate' for different path patterns, optimizing cache behavior for blog posts and API routes.

```plaintext
/blog/*
  Cache-Control: public, max-age=3600, stale-while-revalidate=86400

/api/*
  Cache-Control: public, max-age=300
```

--------------------------------

### Disable SSR on Root Route with Shell Component in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

To disable SSR on the root route component while maintaining the HTML shell rendering on the server, use the `shellComponent` property which wraps the root component and is always server-rendered. The shell receives `children` as a prop and should include `HeadContent` and `Scripts` components. Set `ssr: false` on the route to skip rendering the root component on the server.

```tsx
import * as React from 'react'

import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

export const Route = createRootRoute({
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not found</div>,
  ssr: false,
})

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <div>
      <h1>This component will be rendered on the client</h1>
      <Outlet />
    </div>
  )
}
```

--------------------------------

### Define a wildcard/splat parameter in TanStack Router server route (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-routes

This code illustrates how to use a wildcard parameter, denoted by `$` at the end of a route path, to capture the remainder of the URL. The wildcard value is accessible via `_splat` in the `params` object of the GET handler.

```ts
// routes/file/$.ts
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/file/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { _splat } = params
        return new Response(`File: ${_splat}`)
      },
    },
  },
})
```

--------------------------------

### Implement Open Graph and Twitter Card Meta Tags in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

This example shows how to configure Open Graph and Twitter Card meta tags to control social media previews for shared content. It uses loader data to dynamically set properties like title, description, and image URL for better social sharing presentation.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.post.title },
      { name: 'description', content: loaderData.post.excerpt },
      // Open Graph
      { property: 'og:title', content: loaderData.post.title },
      { property: 'og:description', content: loaderData.post.excerpt },
      { property: 'og:image', content: loaderData.post.coverImage },
      { property: 'og:type', content: 'article' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: loaderData.post.title },
      { name: 'twitter:description', content: loaderData.post.excerpt },
      { name: 'twitter:image', content: loaderData.post.coverImage },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Create Root Layout Component with Navigation in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query

Defines the main RootComponent that renders the application layout with the Outlet for nested routes. Also includes the RootDocument wrapper component that provides the HTML structure, head content, navigation bar with typed routing links, and developer tools integration.

```typescript
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Define Server-Only Isomorphic Function (TanStack Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Illustrates how to use `createIsomorphicFn` with only a server-side implementation. When called on the server, it returns 'server', but on the client, it acts as a no-op and returns `undefined`, preventing client-side execution of server-specific logic.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const serverImplementationOnly = createIsomorphicFn().server(() => 'server')

const server = serverImplementationOnly()
```

--------------------------------

### Set Canonical URLs for SEO in TanStack Start Routes

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

This snippet demonstrates how to add a canonical URL link tag to a route's head, which helps prevent duplicate content issues for search engines. The `href` attribute is dynamically generated based on route parameters.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  head: ({ params }) => ({
    links: [
      {
        rel: 'canonical',
        href: `https://myapp.com/posts/${params.postId}`,
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Implement In-Memory Rate Limiting in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Provides an example of a basic in-memory rate limiter for login attempts, designed to mitigate brute-force attacks. It tracks attempt counts and reset times per IP address, advising the use of a persistent store like Redis for production environments.

```tsx
// Simple in-memory rate limiting (use Redis in production)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

export const rateLimitLogin = (ip: string): boolean => {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)

  if (!attempts || now > attempts.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 min
    return true
  }

  if (attempts.count >= 5) {
    return false // Too many attempts
  }

  attempts.count++
  return true
}
```

--------------------------------

### Unit Test Server Authentication Functions with Vitest

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Illustrates how to write unit tests for server-side authentication functions using Vitest. The example covers testing successful login with valid credentials and verifying that invalid credentials are correctly rejected, including setup for a test database.

```tsx
// __tests__/auth.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { loginFn } from '../server/auth'

describe('Authentication', () => {
  beforeEach(async () => {
    await setupTestDatabase()
  })

  it('should login with valid credentials', async () => {
    const result = await loginFn({
      data: { email: 'test@example.com', password: 'password123' },
    })

    expect(result.error).toBeUndefined()
    expect(result.user).toBeDefined()
  })

  it('should reject invalid credentials', async () => {
    const result = await loginFn({
      data: { email: 'test@example.com', password: 'wrongpassword' },
    })

    expect(result.error).toBe('Invalid credentials')
  })
})
```

--------------------------------

### Include Dynamic Data in TanStack Start SPA Shell with Root Loader (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/spa-mode

This snippet demonstrates how to fetch and embed dynamic data directly into the prerendered SPA shell using a `loader` defined on the `RootRoute` in TanStack Start. Any data returned by the loader will be available in the shell's HTML during the prerendering process, allowing for pre-populated content before hydration.

```tsx
// src/routes/__root.tsx

export const RootRoute = createRootRoute({
  loader: async () => {
    return {
      name: 'Tanner',
    }
  },
  component: Root,
})

export default function Root() {
  const { name } = useLoaderData()

  return (
    <html>
      <body>
        <h1>Hello, {name}!</h1>
        <Outlet />
      </body>
    </html>
  )
}
```

--------------------------------

### Define Isomorphic Function with No Implementation (TanStack Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Explores `createIsomorphicFn` when no `.server()` or `.client()` implementations are provided. In this scenario, the function becomes a no-op on both client and server, consistently returning `undefined` for any call.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const noImplementation = createIsomorphicFn()

const noop = noImplementation()
```

--------------------------------

### Secure Environment Variables with Server-Only Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Protect sensitive environment variables from client bundle exposure by wrapping them in createServerOnlyFn. This prevents accidental leakage of secrets like API keys to the client-side JavaScript bundle and ensures secure server-only access.

```typescript
// ❌ Exposes to client bundle
const apiKey = process.env.SECRET_KEY

// ✅ Server-only access
const apiKey = createServerOnlyFn(() => process.env.SECRET_KEY)
```

--------------------------------

### Create JSON File with Sample Jokes Data

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Initialize a jokes.json file in the src/data directory containing an array of joke objects with id, question, and answer properties. This serves as the file-based storage for the DevJokes application.

```bash
touch src/data/jokes.json
```

```json
[
  {
    "id": "1",
    "question": "Why don't keyboards sleep?",
    "answer": "Because they have two shifts"
  },
  {
    "id": "2",
    "question": "Are you a RESTful API?",
    "answer": "Because you GET my attention, PUT some love, POST the cutest smile, and DELETE my bad day"
  },
  {
    "id": "3",
    "question": "I used to know a joke about Java",
    "answer": "But I ran out of memory."
  },
  {
    "id": "4",
    "question": "Why do Front-End Developers eat lunch alone?",
    "answer": "Because, they don't know how to join tables."
  },
  {
    "id": "5",
    "question": "I am declaring a war.",
    "answer": "var war;"
  }
]
```

--------------------------------

### Implementing Error Boundary in TanStack Start Client

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/client-entry-point

This example illustrates how to wrap the TanStack Start client entry point with an error boundary. By using an `ErrorBoundary` component, client-side errors can be gracefully handled, preventing the entire application from crashing and providing a better user experience.

```tsx
// src/client.tsx
import { StartClient } from '@tanstack/solid-start/client'
import { hydrate } from 'solid-js/web'
import { ErrorBoundary } from './components/ErrorBoundary'

hydrate(
  () => (
    <ErrorBoundary>
      <StartClient />
    </ErrorBoundary>
  ),
  document.body,
)
```

--------------------------------

### Configure TanStack Start Prerendering in Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Set up Vite configuration with TanStack Start plugin to enable prerendering of static routes. Specify routes to prerender and enable link crawling to automatically discover additional pages. This is the foundation for ISR implementation.

```typescript
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        routes: ['/blog', '/blog/posts/*'],
        crawlLinks: true,
      },
    }),
  ],
})
```

--------------------------------

### Create Server Function Middleware with Client and Server Logic

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Define server function middleware with type 'function' to enable both client-side and server-side logic execution around RPC calls. This middleware type supports input validation and wraps function execution on both client and server.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware({ type: 'function' })
  .client(() => {
    //...
  })
  .server(() => {
    //...
  })
```

--------------------------------

### Create POST Server Function with File Write in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Creates a server function using TanStack Start's createServerFn with POST method to validate joke input data and write new jokes to a JSON file. Includes input validation, UUID generation for unique IDs, and error handling for file operations.

```typescript
// src/serverActions/jokesActions.ts
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { v4 as uuidv4 } from 'uuid'
import type { Joke, JokesData } from '../types'

const JOKES_FILE = 'src/data/jokes.json'

export const getJokes = createServerFn({ method: 'GET' }).handler(async () => {
  const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
  return JSON.parse(jokes) as JokesData
})

export const addJoke = createServerFn({ method: 'POST' })
  .inputValidator((data: { question: string; answer: string }) => {
    if (!data.question || !data.question.trim()) {
      throw new Error('Joke question is required')
    }
    if (!data.answer || !data.answer.trim()) {
      throw new Error('Joke answer is required')
    }
    return data
  })
  .handler(async ({ data }) => {
    try {
      const jokesData = await getJokes()
      const newJoke: Joke = {
        id: uuidv4(),
        question: data.question,
        answer: data.answer
      }
      const updatedJokes = [...jokesData, newJoke]
      await fs.promises.writeFile(
        JOKES_FILE,
        JSON.stringify(updatedJokes, null, 2),
        'utf-8'
      )
      return newJoke
    } catch (error) {
      console.error('Failed to add joke:', error)
      throw new Error('Failed to add joke')
    }
  })
```

--------------------------------

### Remove Next.js Font Imports (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Shows the code to remove when migrating from Next.js's built-in font optimization, specifically `next/font/google` imports and their usage for applying font classes to components. This indicates a shift towards a different font management strategy.

```tsx
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function Page() {
  return <p className={inter.className}>Font Sans</p>
}
```

--------------------------------

### Prevent Client-Side Environment Variable Exposure (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Highlights the anti-pattern of directly accessing `process.env.SECRET_KEY`, which inadvertently exposes sensitive environment variables to the client bundle. It then provides the correct, secure approach using `createServerOnlyFn` to ensure `process.env` access is restricted to the server environment.

```tsx
// ❌ Exposes to client bundle
const apiKey = process.env.SECRET_KEY

// ✅ Server-only access
const apiKey = createServerOnlyFn(() => process.env.SECRET_KEY)
```

--------------------------------

### Generate Dynamic Sitemap with Server Route

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

Creates a dynamic sitemap.xml endpoint using a server route that fetches all posts and generates XML. Ideal for sites with dynamic content that can't be discovered at build time. Recommend caching at CDN for performance optimization.

```ts
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const posts = await fetchAllPosts()

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myapp.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>https://myapp.com/posts/${post.id}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join('')}
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
      },
    },
  },
})
```

--------------------------------

### Integrate TanStack Query for Advanced Client-Side Caching in TanStack Start (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

This example shows how to integrate TanStack Query for advanced client-side caching within a TanStack Start application. It defines `queryOptions` to encapsulate query keys and data fetching logic, then uses `context.queryClient.ensureQueryData` within the route loader to pre-fetch and cache data. The component then uses `useQuery` with the same `queryOptions` to automatically access the cached data from the loader, avoiding re-fetching and enhancing user experience.

```tsx
import { queryOptions } from '@tanstack/react-query'

const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  })

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(postQueryOptions(params.postId)),
})

function Post() {
  const { postId } = Route.useParams()
  const { data } = useQuery(postQueryOptions(postId))
  // Automatically uses cached data from loader
}
```

--------------------------------

### Implement Article Schema with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

Create a blog post route with Article schema.org structured data using TanStack Start's createFileRoute and head management. This enables AI systems to understand and cite article metadata including title, author, publication date, and images. Requires fetching post data in the loader and embedding JSON-LD schema in the page head.

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData.post.title }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: loaderData.post.title,
          description: loaderData.post.excerpt,
          image: loaderData.post.coverImage,
          author: {
            '@type': 'Person',
            name: loaderData.post.author.name,
            url: loaderData.post.author.url,
          },
          publisher: {
            '@type': 'Organization',
            name: 'My Company',
            logo: {
              '@type': 'ImageObject',
              url: 'https://myapp.com/logo.png',
            },
          },
          datePublished: loaderData.post.publishedAt,
          dateModified: loaderData.post.updatedAt,
        }),
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Organize Content with Hierarchical Headings in React/TSX

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This React component demonstrates the use of proper HTML heading hierarchy (H1, H2, H3) to structure content. This hierarchical organization is crucial for AI systems to understand the logical flow and importance of different sections within a document.

```tsx
function DocumentationPage() {
  return (
    <article>
      <h1>Getting Started with TanStack Start</h1>

      <section>
        <h2>Installation</h2>
        <p>Install TanStack Start using npm...</p>

        <h3>Prerequisites</h3>
        <p>You'll need Node.js 18 or later...</p>
      </section>

      <section>
        <h2>Configuration</h2>
        <p>Configure your app in vite.config.ts...</p>
      </section>
    </article>
  )
}
```

--------------------------------

### Progress Middleware Chain with Next Function

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

Shows how to use the next function in middleware to progress through the middleware chain. The next function allows you to execute subsequent middleware, access results, short-circuit the chain, and pass context to wrapping middleware.

```typescript
import { createMiddleware } from '@tanstack/solid-start'

const loggingMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next() // <-- This will execute the next middleware in the chain
  return result
})
```

--------------------------------

### Add Canonical URL Links to Prevent Duplicate Content

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Set canonical URL links in the route head configuration to indicate the preferred version of a page. This prevents search engine indexing issues when the same content is accessible via multiple URLs.

```typescript
export const Route = createFileRoute('/posts/$postId')({\n  head: ({ params }) => ({\n    links: [\n      {\n        rel: 'canonical',\n        href: `https://myapp.com/posts/${params.postId}`,\n      },\n    ],\n  }),\n  component: PostPage,\n})
```

--------------------------------

### Install Vite and Build Tools

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Install Vite as a dev dependency along with React and the Vite React plugin for development and building the application.

```shell
npm i -D vite
npm i react react-dom
npm i -D @vitejs/plugin-react
```

--------------------------------

### Build Root Document with Navigation and Auth UI - React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-auth

Root document component that renders the HTML structure with navigation links, conditional authentication UI, and dev tools. Uses Route context to access user data and conditionally displays login/logout options based on authentication state.

```TypeScript
function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Complex SSR Inheritance Chain with Multiple Levels - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/selective-ssr

Demonstrates a more complex SSR inheritance scenario with four route levels, showing how `data-only` mode propagates down and how restrictive overrides work at each level. The `details` route successfully overrides inherited `data-only` with `false` because `false` is more restrictive.

```tsx
root { ssr: undefined }
  posts { ssr: 'data-only' }
     $postId { ssr: true }
       details { ssr: false }

// Result:
// - root defaults to ssr: true
// - posts sets ssr: 'data-only' (server executes beforeLoad/loader only)
// - $postId inherits ssr: 'data-only' (ssr: true has no effect)
// - details sets ssr: false and successfully overrides (more restrictive)
```

--------------------------------

### Create a Static Sitemap for Simple Sites in TanStack Start (public/sitemap.xml)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

For simple websites with a stable and predictable structure, a static `sitemap.xml` file can be placed directly in the `public` directory. This straightforward approach allows you to manually define site URLs and their properties, providing search engines with a clear map of your site's pages without dynamic generation.

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myapp.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://myapp.com/about</loc>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

--------------------------------

### Build Movie Card Component with Tailwind Styling

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Creates a reusable MovieCard component that displays individual movie information with poster image, title, overview, release date, and rating. Features responsive design with Tailwind CSS, backdrop blur effects, hover animations, and accessibility attributes (aria-label, role) for semantic HTML.

```typescript
const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div
      className="bg-white/10 border border-white/20 rounded-lg overflow-hidden backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
      aria-label={`Movie: ${movie.title}`}
      role="group"
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-4">
        <MovieDetails movie={movie} />
      </div>
    </div>
  )
}
```

--------------------------------

### Implement Client-Side Error Boundary in TanStack Start (TypeScript/TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point

This example shows how to integrate an error boundary into the client entry point of a TanStack Start application. By wrapping `StartClient` with a custom `ErrorBoundary` component, client-side rendering errors can be gracefully caught and handled, improving user experience.

```tsx
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary'

hydrateRoot(
  document,
  <StrictMode>
    <ErrorBoundary>
      <StartClient />
    </ErrorBoundary>
  </StrictMode>,
)
```

--------------------------------

### GET /users/{id}/posts/{postId}

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Retrieves a specific post for a given user, showcasing the use of multiple dynamic path parameters within a single route.

```APIDOC
## GET /users/{id}/posts/{postId}

### Description
Retrieves a specific post for a given user using multiple dynamic path parameters.

### Method
GET

### Endpoint
/users/{id}/posts/{postId}

### Parameters
#### Path Parameters
- **id** (string) - Required - The unique identifier of the user.
- **postId** (string) - Required - The unique identifier of the post.

### Request Example
N/A

### Response
#### Success Response (200)
- **body** (string) - The user and post IDs prefixed with 'User ID: ' and 'Post ID: '.

#### Response Example
```
User ID: 123, Post ID: 456
```
```

--------------------------------

### Build React Form Component with Server Function Integration

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Creates a React form component that collects joke question and answer inputs, manages form state with useState, and submits data to the TanStack Start server function. Includes error handling, loading states, and responsive layout with Tailwind CSS styling.

```typescript
// src/components/JokeForm.tsx
import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { addJoke } from '../serverActions/jokesActions'

export function JokeForm() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          id="question"
          type="text"
          placeholder="Enter joke question"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          id="answer"
          type="text"
          placeholder="Enter joke answer"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded disabled:opacity-50 px-4"
        >
          {isSubmitting ? 'Adding...' : 'Add Joke'}
        </button>
      </div>
    </form>
  )
}
```

--------------------------------

### Configure Functional SSR Property in TanStack Start Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Use the functional form of the `ssr` property to conditionally enable or disable server-side rendering at runtime based on route parameters and search values. The function receives validated params and search as discriminated unions and can return false (no SSR), 'data-only' (server data fetching only), or undefined/true (full SSR). The function executes only on the server during initial requests and is stripped from the client bundle.

```tsx
export const Route = createFileRoute('/docs/$docType/$docId')({
  validateSearch: z.object({ details: z.boolean().optional() }),
  ssr: ({ params, search }) => {
    if (params.status === 'success' && params.value.docType === 'sheet') {
      return false
    }
    if (search.status === 'success' && search.value.details) {
      return 'data-only'
    }
  },
  beforeLoad: () => {
    console.log('Executes on the server depending on the result of ssr()')
  },
  loader: () => {
    console.log('Executes on the server depending on the result of ssr()')
  },
  component: () => <div>This component is rendered on the client</div>,
})
```

--------------------------------

### Customize Function ID Generation in TanStack Start Vite Plugin

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-functions

Configure custom function ID generation for server functions in TanStack Start using the Vite plugin. This example demonstrates how to override the default SHA256 hashing with a custom SHA1 hash combining filename and function name. IDs must be deterministic to maintain stability between builds.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      serverFns: {
        generateFunctionId: ({ filename, functionName }) => {
          // Return a custom ID string
          return crypto
            .createHash('sha1')
            .update(`${filename}--${functionName}`)
            .digest('hex')

          // If you return undefined, the default is used
          // return undefined
        },
      },
    }),
    react(),
  ],
})
```

--------------------------------

### Vary Cache by Query Parameters in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Demonstrates how to configure HTTP headers within a TanStack Start route to include query parameters in the cache key. This ensures that different content based on query parameters is cached separately, enhancing cache specificity and avoiding stale content.

```tsx
export const Route = createFileRoute('/search')({
  headers: () => ({
    'Cache-Control': 'public, max-age=300',
    Vary: 'Accept, Accept-Encoding',
  }),
})
```

--------------------------------

### Import Components Using Path Aliases in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/path-aliases

This TypeScript example demonstrates how to use the configured path alias `~` to import a component. It shows the cleaner import path compared to a long relative path, improving readability and maintainability.

```ts
// app/routes/posts/$postId/edit.tsx
import { Input } from '~/components/ui/input'

// instead of

import { Input } from '../../../components/ui/input'
```

--------------------------------

### Create Server Function to Fetch Remote Markdown Content

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This utility defines a 'createServerFn' using '@tanstack/react-start' to asynchronously fetch markdown content from a specified GitHub repository, branch, and file path. It includes input validation, handles HTTP requests, and uses 'gray-matter' to parse the raw content into frontmatter and body, making it suitable for dynamic content loading.

```tsx
// src/utils/docs.server.ts
import { createServerFn } from '@tanstack/react-start'
import matter from 'gray-matter'

type FetchDocsParams = {
  repo: string // e.g., 'tanstack/router'
  branch: string // e.g., 'main'
  filePath: string // e.g., 'docs/guide/getting-started.md'
}

export const fetchDocs = createServerFn({ method: 'GET' })
  .inputValidator((params: FetchDocsParams) => params)
  .handler(async ({ data: { repo, branch, filePath } }) => {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`

    const response = await fetch(url, {
      headers: {
        // Add GitHub token for private repos or higher rate limits
        // Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const rawContent = await response.text()
    const { data: frontmatter, content } = matter(rawContent)

    return {
      frontmatter,
      content,
      filePath,
    }
  })
```

--------------------------------

### Upgrade React Packages for Bun Deployment

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This `sh` command, `bun install react@19 react-dom@19`, upgrades the `react` and `react-dom` packages to version 19 or higher. This upgrade is specifically required for TanStack Start applications targeting Bun deployment, as current Bun guidelines only support React 19+. Ensure Bun is installed before running this command.

```sh
bun install react@19 react-dom@19
```

--------------------------------

### Prevent Hydration Mismatches with State-Based Rendering

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Avoid rendering differences between server and client by using useState and useEffect hooks. Initialize state empty on the server, then populate it client-side after hydration. This ensures consistent initial HTML and prevents hydration mismatch errors when displaying dynamic content like timestamps.

```typescript
// ❌ Different content server vs client
function CurrentTime() {
  return <div>{new Date().toLocaleString()}</div>
}

// ✅ Consistent rendering
function CurrentTime() {
  const [time, setTime] = useState<string>()

  useEffect(() => {
    setTime(new Date().toLocaleString())
  }, [])

  return <div>{time || 'Loading...'}</div>
}
```

--------------------------------

### Create React Component for Markdown Rendering

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This React component (`src/components/Markdown.tsx`) is designed to render Markdown content dynamically within a TanStack Start application. It asynchronously processes the input Markdown using the `renderMarkdown` utility and then utilizes `html-react-parser` to convert the resulting HTML string into interactive React elements. The component includes custom replacement logic to enhance specific HTML elements, such as transforming internal `<a>` tags into router `Link` components and adding lazy loading and styling to `<img>` tags, providing a flexible and powerful way to display rich text.

```tsx
// src/components/Markdown.tsx
import parse, { type HTMLReactParserOptions, Element } from 'html-react-parser'
import { renderMarkdown, type MarkdownResult } from '~/utils/markdown'

type MarkdownProps = {
  content: string
  className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
  const [result, setResult] = useState<MarkdownResult | null>(null)

  useEffect(() => {
    renderMarkdown(content).then(setResult)
  }, [content])

  if (!result) {
    return <div className={className}>Loading...</div>
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // Customize rendering of specific elements
        if (domNode.name === 'a') {
          // Handle links
          const href = domNode.attribs.href
          if (href?.startsWith('/')) {
            // Internal link - use your router's Link component
            return (
              <Link to={href}>{domToReact(domNode.children, options)}</Link>
            )
          }
        }

        if (domNode.name === 'img') {
          // Add lazy loading to images
          return (
            <img
              {...domNode.attribs}
              loading="lazy"
              className="rounded-lg shadow-md"
            />
          )
        }
      }
    }
  }

  return <div className={className}>{parse(result.markup, options)}</div>
}
```

--------------------------------

### Add Development Debug Headers to Responses with TanStack Solid-Start Middleware

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This snippet creates a TanStack Solid-Start middleware that conditionally adds debug information to HTTP response headers. By checking `process.env.NODE_ENV`, it ensures that headers like `X-Debug-Timestamp`, `X-Debug-Node-Version`, and `X-Debug-Uptime` are only set in development environments, aiding in debugging server-side requests without exposing sensitive info in production.

```tsx
import { createMiddleware } from '@tanstack/solid-start'

const debugMiddleware = createMiddleware().handler(async ({ next }) => {
  const response = await next()

  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Debug-Timestamp', new Date().toISOString())
    response.headers.set('X-Debug-Node-Version', process.version)
    response.headers.set('X-Debug-Uptime', process.uptime().toString())
  }

  return response
})
```

--------------------------------

### Configure Root Component with Error and NotFound Handlers

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

Defines the root route configuration for a TanStack Start application including manifest/favicon metadata, custom error boundary component, not-found page handler, and the main root component. The error component wraps exceptions in RootDocument context while notFoundComponent handles 404 routes.

```typescript
{
  head: createServerFn()
    .handler(() => {
      return [
        { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent
}
```

--------------------------------

### Implement Product Schema with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

Create an e-commerce product route with Product schema.org structured data in TanStack Start for accurate AI assistant product information. Includes product metadata, pricing, availability, brand information, and aggregate ratings. The JSON-LD schema is embedded in the page head using the createFileRoute head configuration.

```tsx
export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params }) => {
    const product = await fetchProduct(params.productId)
    return { product }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData.product.name }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: loaderData.product.name,
          description: loaderData.product.description,
          image: loaderData.product.images,
          brand: {
            '@type': 'Brand',
            name: loaderData.product.brand,
          },
          offers: {
            '@type': 'Offer',
            price: loaderData.product.price,
            priceCurrency: 'USD',
            availability: loaderData.product.inStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          },
          aggregateRating: loaderData.product.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: loaderData.product.rating,
                reviewCount: loaderData.product.reviewCount,
              }
            : undefined,
        }),
      },
    ],
  }),
  component: ProductPage,
})
```

--------------------------------

### Process FormData in Server Functions (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates handling `FormData` submissions within a server function's `inputValidator`. This allows for extracting and processing fields from form data, ensuring that the expected `FormData` instance is received and its contents are correctly parsed.

```tsx
export const submitForm = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error('Expected FormData')
    }

    return {
      name: data.get('name')?.toString() || '',
      email: data.get('email')?.toString() || '',
    }
  })
  .handler(async ({ data }) => {
    // Process form data
    return { success: true }
  })
```

--------------------------------

### Enable Data-Only SSR for a Route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

This hybrid option configures a route to perform 'data-only' SSR, where `beforeLoad` and `loader` functions execute on the server to pre-fetch data. However, the component rendering itself is disabled on the server and instead takes place on the client. This is useful for routes that need server-provided data but have components relying on browser-only APIs.

```tsx
// src/routes/posts/$postId.tsx
export const Route = createFileRoute('/posts/$postId')({
  ssr: 'data-only',
  beforeLoad: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  loader: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  component: () => <div>This component is rendered on the client</div>,
})
```

--------------------------------

### Interact with Database using TanStack Start Server Functions (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/databases

This example demonstrates how to integrate and interact with a database using TanStack Start's server functions. It shows defining server-side functions (getUser, createUser) that utilize an abstract database client to perform read and write operations, highlighting the framework's flexibility with any database provider.

```tsx
import { createServerFn } from '@tanstack/solid-start'

const db = createMyDatabaseClient()

export const getUser = createServerFn().handler(async ({ context }) => {
  const user = await db.getUser(context.userId)
  return user
})

export const createUser = createServerFn({ method: 'POST' }).handler(
  async ({ data }) => {
    const user = await db.createUser(data)
    return user
  },
)
```

--------------------------------

### Implement ETag Generation Middleware for Efficient CDN Revalidation in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript code demonstrates how to create a middleware in '@tanstack/react-start' to generate and set ETag headers. It computes an MD5 hash of the response data to create a unique identifier, which helps CDNs efficiently revalidate content by only fetching new data if the ETag has changed.

```TypeScript
import { createMiddleware } from '@tanstack/react-start'
import crypto from 'crypto'

const etagMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next()

  // Generate ETag from response content
  const etag = crypto
    .createHash('md5')
    .update(JSON.stringify(result.data))
    .digest('hex')

  result.response.headers.set('ETag', `"${etag}"`)

  return result
})
```

--------------------------------

### Ensure Type Safety with Global Middleware in TanStack Start Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

This code demonstrates how to ensure type safety for context provided by global middleware within specific server functions. By explicitly adding the global `authMiddleware` to a server function's middleware array, the function's `context` will correctly infer the types provided by the global middleware.

```tsx
import { authMiddleware } from './authMiddleware'

const fn = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    console.log(context.user) // <-- Now this will be typed!
    // ...
  })
```

--------------------------------

### Create TanStack Start Markdown Processor Utility

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This TypeScript utility (`src/utils/markdown.ts`) defines a comprehensive markdown-to-HTML conversion process using the `unified` library with various plugins. It parses Markdown, supports GitHub Flavored Markdown, converts to HTML, processes raw HTML, adds IDs and autolinks to headings, and extracts heading information for table of contents generation. The `renderMarkdown` function returns both the processed HTML markup and a structured array of headings.

```tsx
// src/utils/markdown.ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'

export type MarkdownHeading = {
  id: string
  text: string
  level: number
}

export type MarkdownResult = {
  markup: string
  headings: Array<MarkdownHeading>
}

export async function renderMarkdown(content: string): Promise<MarkdownResult> {
  const headings: Array<MarkdownHeading> = []

  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
    .use(rehypeRaw) // Process raw HTML in markdown
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['anchor'] }
    })
    .use(() => (tree) => {
      // Extract headings for table of contents
      const { visit } = require('unist-util-visit')
      const { toString } = require('hast-util-to-string')

      visit(tree, 'element', (node: any) => {
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
          headings.push({
            id: node.properties?.id || '',
            text: toString(node),
            level: parseInt(node.tagName.charAt(1), 10)
          })
        }
      })
    })
    .use(rehypeStringify) // Serialize to HTML string
    .process(content)

  return {
    markup: String(result),
    headings
  }
}
```

--------------------------------

### Integrate TanStack Router Form with Server Action to Add Joke (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This code snippet demonstrates a React component (`JokeForm`) that uses `useState` for form input and submission state, `useRouter` from `@tanstack/react-router` for data invalidation, and calls a server-side `addJoke` function. It includes client-side validation, asynchronous submission handling with loading and error states, and clears the form upon successful submission.

```tsx
import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { addJoke } from '../serverActions/jokesActions'

export function JokeForm() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!question || !answer || isSubmitting) return
    try {
      setIsSubmitting(true)
      await addJoke({
        data: { question, answer },
      })

      // Clear form
      setQuestion('')
      setAnswer('')

      // Refresh data
      router.invalidate()
    } catch (error) {
      console.error('Failed to add joke:', error)
      setError('Failed to add joke')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          id="question"
          type="text"
          placeholder="Enter joke question"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          id="answer"
          type="text"
          placeholder="Enter joke answer"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded disabled:opacity-50 px-4"
        >
          {isSubmitting ? 'Adding...' : 'Add Joke'}
        </button>
      </div>
    </form>
  )
}
```

--------------------------------

### Configure Basic Meta Tags in TanStack Start Routes

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

This example demonstrates how to set static page titles and descriptions using the `head` property on a TanStack Start route. It uses `createFileRoute` to define a route and its associated head metadata.

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'My App - Home' },
      {
        name: 'description',
        content: 'Welcome to My App, a platform for...',
      },
    ],
  }),
  component: HomePage,
})
```

--------------------------------

### Set Cache Headers for API Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Configure Cache-Control headers for API endpoints using server functions. Demonstrates setting both standard cache headers and CDN-specific headers (Cloudflare). The endpoint fetches product data and returns it with appropriate cache directives.

```typescript
// routes/api/products/$productId.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products/$productId')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const product = await db.products.findById(params.productId)

        return Response.json(
          { product },
          {
            headers: {
              'Cache-Control':
                'public, max-age=300, stale-while-revalidate=600',
              'CDN-Cache-Control': 'max-age=3600', // Cloudflare-specific
            },
          },
        )
      },
    },
  },
})
```

--------------------------------

### Configure Root Route with Clerk Authentication in TanStack React Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

This TypeScript/React snippet defines the root route (`__root.tsx`) for a TanStack React Start application. It integrates Clerk for user authentication by fetching user data server-side before route loading. The route also configures essential HTML head elements, error/not-found components, and a primary layout (`RootDocument`) that wraps child routes, provides navigation, and displays Clerk's authentication UI components.

```tsx
/// <reference types="vite/client" />
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/tanstack-react-start'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import * as React from 'react'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { NotFound } from '~/components/NotFound.js'
import appCss from '~/styles/app.css?url'

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()

  return {
    userId,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth()

    return {
      userId,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Define TanStack Router Root Component in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

The `RootComponent` serves as the primary entry point for rendering application routes within the TanStack Router context. It wraps the router's `Outlet` (where nested routes are displayed) with the global `RootLayout` component, ensuring consistent page structure.

```typescript
function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}
```

--------------------------------

### Create Root Route with QueryClient Context in TypeScript/React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

Establishes the root route using TanStack Router's createRootRouteWithContext function, passing a QueryClient instance through context. This enables query management across the entire application routing structure. Returns a route object with head metadata, error/not-found handlers, and the main component.

```typescript
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})
```

--------------------------------

### Implement Caching Pattern for User-Specific Pages with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript snippet illustrates a caching strategy for user-specific pages, such as a dashboard. It uses a 'private' Cache-Control directive with a short 'max-age' of 60 seconds to prevent CDN caching and ensures data freshness with a 30-second client-side 'staleTime'.

```TypeScript
export const Route = createFileRoute('/dashboard')({
  loader: async () => fetchUserData(),
  headers: () => ({
    // Private cache, no CDN caching
    'Cache-Control': 'private, max-age=60',
  }),
  staleTime: 30_000,
})
```

--------------------------------

### Ensure Required Environment Variables Are Set at Application Startup

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This TypeScript snippet provides a mechanism to validate the presence of required environment variables for both server-side (`process.env`) and client-side (`import.meta.env`). It iterates through predefined lists of keys (`requiredServerEnv`, `requiredClientEnv`) and throws an error if any essential variable is missing, preventing runtime failures and ensuring a robust application startup.

```typescript
// src/config/validation.ts
const requiredServerEnv = ['DATABASE_URL', 'JWT_SECRET'] as const

const requiredClientEnv = ['VITE_APP_NAME', 'VITE_API_URL'] as const

// Validate on server startup
for (const key of requiredServerEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

// Validate client environment at build time
for (const key of requiredClientEnv) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}
```

--------------------------------

### Define Build and Start Scripts for Node.js Deployment

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This JSON snippet illustrates the necessary `build` and `start` scripts to include in your `package.json` for deploying TanStack Start to Node.js environments like Railway or Docker. The `build` script uses `vite build` to compile the application, and the `start` script runs the server from the output directory. These scripts are crucial for managing the application's lifecycle.

```json
"build": "vite build",
    "start": "node .output/server/index.mjs"
```

--------------------------------

### Access Dynamic Route Parameters in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Retrieve dynamic route parameters using the Route.useParams() hook instead of Next.js async params. This approach works for standard dynamic routes and catch-all routes, where catch-all parameters are accessed via the _splat property.

```typescript
export const Route = createFileRoute('/app/posts/$slug')({
  component: Page,
})

function Page() {
  const { slug } = Route.useParams()
  return <div>My Post: {slug}</div>
}
```

--------------------------------

### Implement Dynamic Markdown Routing in TanStack Router (React/TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This example shows how to set up a dynamic route (`/docs/$path`) using `createFileRoute` in TanStack Router to fetch and display Markdown content. The `loader` function asynchronously retrieves document data based on the URL parameter, while the `DocsPage` component renders the fetched `frontmatter` and `content` using a custom `Markdown` component. This pattern is ideal for building dynamic documentation sites where content paths are resolved at runtime.

```tsx
// src/routes/docs.$path.tsx
import { createFileRoute } from '@tanstack/react-router'
import { fetchDocs } from '~/utils/docs.server'
import { Markdown } from '~/components/Markdown'

export const Route = createFileRoute('/docs/$path')({
  loader: async ({ params }) => {
    return fetchDocs({
      data: {
        repo: 'your-org/your-repo',
        branch: 'main',
        filePath: `docs/${params.path}.md`,
      },
    })
  },
  component: DocsPage,
})

function DocsPage() {
  const { frontmatter, content } = Route.useLoaderData()

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <Markdown content={content} className="prose" />
    </article>
  )
}
```

--------------------------------

### Define Static Server Function with Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/static-server-functions

This code snippet demonstrates how to define a static server function in a TanStack React Start project. It uses `createServerFn` to create a server function and applies `staticFunctionMiddleware` to ensure it's executed at build time and its result is cached. The middleware must be the final one in the chain to function correctly.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

--------------------------------

### Render Root Layout with Navigation in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-authjs

Creates the root document component that wraps the application with HTML structure, includes a navigation bar, main content outlet, and TanStack Router devtools. Displays children components within the main element.

```typescript
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <NavBar />
        <main className="p-4">{children}</main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Handle Not Found Errors in Server Functions

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-functions

Demonstrates how to throw not-found errors when resources are not found in server functions. The notFound function from TanStack Router is thrown when a post with the given ID cannot be found in the database.

```typescript
import { createServerFn } from '@tanstack/solid-start'
import { notFound } from '@tanstack/solid-router'

export const getPost = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const post = await db.findPost(data.id)

    if (!post) {
      throw notFound()
    }

    return post
  })
```

--------------------------------

### Add Type Safety for Environment Variables with TypeScript Declaration File

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This `env.d.ts` TypeScript declaration file provides type safety for both client-side (`ImportMetaEnv`) and server-side (`ProcessEnv`) environment variables. It ensures that `import.meta.env` and `process.env` properties have defined types, preventing typos and providing autocompletion in development. The `VITE_` prefix distinguishes client-safe variables.

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_ENABLE_NEW_DASHBOARD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string
      readonly REDIS_URL: string
      readonly JWT_SECRET: string
      readonly AUTH0_CLIENT_SECRET: string
      readonly STRIPE_SECRET_KEY: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}
```

--------------------------------

### Create Client-Only Function (TanStack Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Illustrates `createClientOnlyFn` from `@tanstack/react-start`, used to define functions that must only run on the client. When invoked on the client, it returns 'bar', but any attempt to call it on the server results in a runtime error, enforcing strict client-side execution.

```tsx
import { createClientOnlyFn } from '@tanstack/react-start'

const foo = createClientOnlyFn(() => 'bar')

foo()
```

--------------------------------

### Use Server Functions for Secure Loader Operations

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Prevent environment variable exposure in route loaders by wrapping server-only operations in createServerFn. Loaders execute on both server and client, so sensitive logic must be isolated in server functions to avoid exposing secrets to the client bundle.

```typescript
// ❌ Assuming loader is server-only
export const Route = createFileRoute('/users')({
  loader: () => {
    // This runs on BOTH server and client!
    const secret = process.env.SECRET // Exposed to client
    return fetch(`/api/users?key=${secret}`)
  },
})

// ✅ Use server function for server-only operations
const getUsersSecurely = createServerFn().handler(() => {
  const secret = process.env.SECRET // Server-only
  return fetch(`/api/users?key=${secret}`)
})

export const Route = createFileRoute('/users')({
  loader: () => getUsersSecurely(), // Isomorphic call to server function
})
```

--------------------------------

### Configure Netlify Deployment with netlify.toml

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This TOML snippet provides an example `netlify.toml` file for manually configuring Netlify's build and development settings. It specifies `vite build` as the build command, `dist/client` as the publish directory, and `vite dev` for local development on port `3000`. This file should be placed in your project's root directory.

```toml
[build]
  command = "vite build"
  publish = "dist/client"
[dev]
  command = "vite dev"
  port = 3000
```

--------------------------------

### Conditionally Render Components based on Feature Flags

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-variables

This example shows how to use the defined `featureFlags` object to conditionally render different versions of a component, such as a dashboard. This pattern enables easy A/B testing or gradual rollout of new features.

```typescript
export function Dashboard() {
  if (featureFlags.enableNewDashboard) {
    return <NewDashboard />
  }

  return <LegacyDashboard />
}
```

--------------------------------

### Configure TanStack Start Application Metadata and Root Components

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-supabase-basic

This code snippet defines core application-wide configurations for a TanStack Start project. It includes an array of 'links' for SEO and PWA manifest, specifies 'errorComponent' and 'notFoundComponent' for global error handling, and sets the main 'component' for the application's root. This configuration helps manage document metadata and defines the entry points for different application states.

```javascript
links: [
  { rel: 'stylesheet', href: appCss },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
  { rel: 'icon', href: '/favicon.ico' },
],
errorComponent: (props) => {
  return (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  )
},
notFoundComponent: () => <NotFound />,
component: RootComponent,
```

--------------------------------

### Role-Based Access Control (RBAC) - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Implements hierarchical role-based access control with three role levels (USER, MODERATOR, ADMIN) using a numeric hierarchy system. Provides permission checking function and demonstrates protected route implementation that redirects users lacking required permissions to an unauthorized page.

```typescript
// utils/auth.ts
export const roles = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const

type Role = (typeof roles)[keyof typeof roles]

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const hierarchy = {
    [roles.USER]: 0,
    [roles.MODERATOR]: 1,
    [roles.ADMIN]: 2,
  }

  return hierarchy[userRole] >= hierarchy[requiredRole]
}

// Protected route with role check
export const Route = createFileRoute('/_authed/admin/')( {
  beforeLoad: async ({ context }) => {
    if (!hasPermission(context.user.role, roles.ADMIN)) {
      throw redirect({ to: '/unauthorized' })
    }
  },
})
```

--------------------------------

### Define TanStack Start Root Route with Supabase User Authentication

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-supabase-basic

This snippet defines the root route (`__root.tsx`) for a TanStack Start application. It integrates Supabase to fetch and manage user authentication state server-side using `createServerFn`. The route also configures global head metadata for SEO, handles error and not-found components, and provides the base HTML document structure with navigation links that dynamically update based on the user's authentication status.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
import { getSupabaseServerClient } from '../utils/supabase'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient()
  const { data, error: _error } = await supabase.auth.getUser()

  if (!data.user?.email) {
    return null
  }

  return {
    email: data.user.email,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Integrate Syntax Highlighted Code Blocks into a Markdown Component (React/TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This code demonstrates how to process `pre` and `code` HTML elements within a React Markdown component's rendering logic to incorporate syntax highlighting. It parses the class names to extract the code language, extracts the code content, and then renders it using a hypothetical `CodeBlock` component. This `CodeBlock` component would typically utilize a utility like `highlightCode` (shown previously) to apply the actual syntax highlighting.

```tsx
// In your Markdown component's replace function
if (domNode.name === 'pre') {
  const codeElement = domNode.children.find(
    (child) => child instanceof Element && child.name === 'code',
  )
  if (codeElement) {
    const className = codeElement.attribs.class || ''
    const language = className.replace('language-', '') || 'text'
    const code = getText(codeElement)

    return <CodeBlock code={code} language={language} />
  }
}
```

--------------------------------

### Prevent hydration mismatches with deferred state updates

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/code-execution-patterns

Demonstrates how directly rendering time in JSX causes hydration mismatches between server and client renders. The solution uses createSignal with createEffect to defer rendering until after hydration, ensuring consistent content across server and client with a loading placeholder.

```typescript
// ❌ Different content server vs client
function CurrentTime() {
  return <div>{new Date().toLocaleString()}</div>
}

// ✅ Consistent rendering
function CurrentTime() {
  const [time, setTime] = createSignal<string>()

  createEffect(() => {
    setTime(new Date().toLocaleString())
  })

  return <div>{time() || 'Loading...'}</div>
}
```

--------------------------------

### Augment TanStack Start Request Context Type

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

This example illustrates how to augment the `Register` interface from `@tanstack/react-start` to add a custom typed request context. It defines `MyRequestContext` and passes an object matching this type to the `handler.fetch` method's `context` option, making typed data available throughout the server-side middleware chain.

```tsx
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

type MyRequestContext = {
  hello: string
  foo: number
}

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: MyRequestContext
    }
  }
}

export default createServerEntry({
  async fetch(request) {
    return handler.fetch(request, { context: { hello: 'world', foo: 123 } })
  },
})
```

--------------------------------

### Set Basic Meta Tags with TanStack Start Routes

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Configure static page title and meta description tags using the head property on TanStack Start routes. This is the foundational approach for SEO, setting page-level metadata that search engines and social platforms read.

```typescript
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({\n  head: () => ({\n    meta: [\n      { title: 'My App - Home' },\n      {\n        name: 'description',\n        content: 'Welcome to My App, a platform for...',\n      },\n    ],\n  }),\n  component: HomePage,\n})
```

--------------------------------

### Enable Full Server-Side Rendering (SSR) for a Route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

This example shows how to explicitly enable full Server-Side Rendering for a specific route by setting `ssr: true`. In this mode, both the `beforeLoad` and `loader` functions, as well as the route component itself, will execute on the server during the initial request, with the resulting HTML and data sent to the client.

```tsx
// src/routes/posts/$postId.tsx
export const Route = createFileRoute('/posts/$postId')({
  ssr: true,
  beforeLoad: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  loader: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  component: () => <div>This component is rendered on the server</div>,
})
```

--------------------------------

### Create Movie Details Component for Display Content

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Implements a MovieDetails sub-component that renders movie metadata including title, overview description, release date, and vote average rating. Uses Tailwind's line-clamp utility for text truncation and conditional formatting to ensure consistent layout regardless of content length.

```typescript
const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
      <p className="text-sm text-gray-300 mb-3 line-clamp-3 h-10">
        {movie.overview}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{movie.release_date}</span>
        <span className="flex items-center">
          ⭐️ {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </>
  )
}
```

--------------------------------

### Define TanStack Router Server Route with Wildcard/Splat Parameter

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript example demonstrates how to create a TanStack Router server route with a wildcard (splat) parameter. The `$` in the route path allows matching any trailing segment, which is then accessible via `_splat` in the `params` object within the GET handler.

```ts
// routes/file/$.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/file/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { _splat } = params
        return new Response(`File: ${_splat}`)
      },
    },
  },
})
```

--------------------------------

### Define Isomorphic Function for Client and Server (TanStack Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Demonstrates the complete implementation of `createIsomorphicFn` from `@tanstack/react-start`. This function adapts its behavior to return 'server' when executed on the server and 'client' when executed on the client, facilitating shared logic with environment-specific handling.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
```

--------------------------------

### Create Server Functions for Login, Logout, and Get Current User

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Implements three core server functions using TanStack Start's createServerFn: loginFn handles credential verification and session creation with redirect, logoutFn clears the session, and getCurrentUserFn retrieves the authenticated user from session data. These functions encapsulate sensitive authentication logic on the server side and handle input validation.

```typescript
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id,
      email: user.email,
    })

    // Redirect to protected area
    throw redirect({ to: '/dashboard' })
  })

// Logout server function
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})

// Get current user
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const userId = session.data.userId

    if (!userId) {
      return null
    }

    return await getUserById(userId)
  },
)
```

--------------------------------

### Configure Secure Sessions in TypeScript using `useSession`

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Illustrates the configuration of secure session cookies for an application using a `useSession` hook. Key security settings include `secure: true` for HTTPS-only, `sameSite: 'lax'` for CSRF protection, `httpOnly: true` to prevent XSS, and `maxAge` to control session duration.

```tsx
// Use secure session configuration
export function useAppSession() {
  return useSession({
    name: 'app-session',
    password: process.env.SESSION_SECRET!, // 32+ characters
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      httpOnly: true, // XSS protection
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
  })
}
```

--------------------------------

### Implement a Dynamic Sitemap using Server Routes in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

For sites with dynamic content that cannot be discovered during build time, a dynamic sitemap can be generated using a server route. This route programmatically fetches real-time data, constructs the sitemap XML, and serves it, making it suitable for content that changes frequently. Caching this route at your CDN is recommended for optimal performance.

```ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const posts = await fetchAllPosts()

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myapp.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>https://myapp.com/posts/${post.id}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join('')}
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
      },
    },
  },
})
```

--------------------------------

### Disable Server-Side Rendering for Specific Routes

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

Selectively disables SSR for routes that don't require SEO indexing, such as protected dashboards. Use cautiously as this may negatively impact SEO for those pages. Useful for reducing server load on dynamic, user-specific content.

```tsx
export const Route = createFileRoute('/dashboard')({
  ssr: false,
  component: DashboardPage,
})
```

--------------------------------

### Deploy TanStack Start App using Netlify CLI

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Executes the `npx netlify deploy` command to initiate the deployment of your TanStack Start application to Netlify. This command streamlines the deployment process, automatically configuring build settings if it's a new Netlify project. It requires the Netlify CLI to be installed or available via npx.

```bash
npx netlify deploy
```

--------------------------------

### Progress Middleware Chain with Next Function - TypeScript/TSX

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to use the next function to progress through the middleware chain. This pattern allows short-circuiting the chain, passing data between middleware, accessing results from subsequent middleware, and providing context to wrapping middleware.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next() // <-- This will execute the next middleware in the chain
  return result
})
```

--------------------------------

### Setup locale/timezone middleware in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Creates a middleware that reads locale from cookies or Accept-Language header and timezone from cookies, providing deterministic values to both server and client to prevent hydration mismatches. The middleware persists locale in cookies for subsequent requests and uses UTC as the default timezone until the client sends its actual timezone.

```typescript
// src/start.ts
import { createStart, createMiddleware } from '@tanstack/react-start'
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader('accept-language')
  const headerLocale = header?.split(',')[0] || 'en-US'
  const cookieLocale = getCookie('locale')
  const cookieTz = getCookie('tz') // set by client later (see Strategy 2)

  const locale = cookieLocale || headerLocale
  const timeZone = cookieTz || 'UTC' // deterministic until client sends tz

  // Persist locale for subsequent requests (optional)
  setCookie('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })

  return next({ context: { locale, timeZone } })
})

export const startInstance = createStart(() => ({
  requestMiddleware: [localeTzMiddleware],
}))
```

--------------------------------

### Configure secure session with HTTP-only cookies

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Set up secure session management with HTTP-only cookies, CSRF protection via SameSite attribute, and HTTPS enforcement in production. Requires SESSION_SECRET environment variable (32+ characters). Implements XSS and CSRF protections with 7-day session expiration.

```typescript
export function useAppSession() {
  return useSession({
    name: 'app-session',
    password: process.env.SESSION_SECRET!, // 32+ characters
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      httpOnly: true, // XSS protection
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
  })
}
```

--------------------------------

### Implement Basic Email/Password Authentication using createServerFn and bcrypt

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

This snippet provides backend implementations for user registration and authentication. It uses `createServerFn` from `@tanstack/react-start` to handle API calls, `bcryptjs` for secure password hashing, and manages user sessions. It includes input validation and error handling for existing users.

```tsx
// server/auth.ts
import bcrypt from 'bcryptjs'
import { createServerFn } from '@tanstack/react-start'

// User registration
export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { email: string; password: string; name: string }) => data,
  )
  .handler(async ({ data }) => {
    // Check if user exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return { error: 'User already exists' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Create user
    const user = await createUser({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    })

    // Create session
    const session = await useAppSession()
    await session.update({ userId: user.id })

    return { success: true, user: { id: user.id, email: user.email } }
  })

async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}
```

--------------------------------

### Implement a Dynamic robots.txt using Server Routes in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

For more complex scenarios, such as requiring different `robots.txt` rules per environment or other dynamic conditions, a server route can be used to generate the `robots.txt` file. This allows the server to programmatically construct and serve the content, offering greater flexibility than a static file.

```ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const robots = `User-agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml`

        return new Response(robots, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      },
    },
  },
})
```

--------------------------------

### Clone and Deploy Custom TanStack Example

Source: https://tanstack.com/start/latest/docs/framework/react/quick-start

Manually clone any TanStack example by replacing EXAMPLE_SLUG with the desired example identifier, then install dependencies and run the development server. This approach allows flexibility in choosing any available example from the TanStack repository.

```bash
npx gitpick TanStack/router/tree/main/examples/react/EXAMPLE_SLUG my-new-project
cd my-new-project
npm install
npm run dev
```

--------------------------------

### Configure Locale/Timezone Middleware in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hydration-errors

Creates a server middleware that reads locale and timezone from cookies or Accept-Language header, sets deterministic values, and hydrates them as initial context. This ensures server and client render with identical locale/timezone values, preventing hydration mismatches.

```typescript
import { createStart, createMiddleware } from '@tanstack/solid-start'
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from '@tanstack/solid-start/server'

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader('accept-language')
  const headerLocale = header?.split(',')[0] || 'en-US'
  const cookieLocale = getCookie('locale')
  const cookieTz = getCookie('tz') // set by client later (see Strategy 2)

  const locale = cookieLocale || headerLocale
  const timeZone = cookieTz || 'UTC'

  setCookie('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })

  return next({ context: { locale, timeZone } })
})

export const startInstance = createStart(() => ({
  requestMiddleware: [localeTzMiddleware],
}))
```

--------------------------------

### Create Server Function to Read File with TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This TypeScript snippet demonstrates creating a server function `getJokes` using `@tanstack/react-start`'s `createServerFn`. It defines a GET handler that asynchronously reads a JSON file (`jokes.json`) using Node.js's `fs.promises.readFile` and parses its content into a `JokesData` type. This function allows server-side data fetching accessible from the client.

```tsx
// src/serverActions/jokesActions.ts
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import type { JokesData } from '../types'

const JOKES_FILE = 'src/data/jokes.json'

export const getJokes = createServerFn({ method: 'GET' }).handler(async () => {
  const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
  return JSON.parse(jokes) as JokesData
})
```

--------------------------------

### Install Development Dependencies for Vite and Tailwind

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Install development dependencies including Vite, React plugin, Tailwind CSS Vite integration, and TypeScript path resolution. These tools enable the build system and styling capabilities for TanStack Start.

```shell
npm i -D vite @vitejs/plugin-react @tailwindcss/vite tailwindcss vite-tsconfig-paths
```

--------------------------------

### Configure package.json Scripts and Module Type

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Update package.json to set module type to ES modules and configure Vite CLI scripts for development and production builds.

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  }
}
```

--------------------------------

### Inspect HTTP Cache Headers using curl

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Provides a `curl` command to perform an HTTP HEAD request and inspect the response headers. This is a crucial debugging step to verify caching behavior, checking headers like `Cache-Control`, `Age` (time in cache), and `X-Cache` (CDN status like HIT/MISS).

```bash
curl -I https://yoursite.com/blog/my-post

# Look for:
# Cache-Control: public, max-age=3600, stale-while-revalidate=86400
# Age: 1234 (time in cache)
# X-Cache: HIT (from CDN)
```

--------------------------------

### Consume Async Generator from TanStack Start Client

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

This client-side code demonstrates how to consume data streamed from a TanStack Start server function using an async generator. It leverages a `for await...of` loop to asynchronously iterate over the yielded `Message` objects, maintaining type safety when accessing `msg.content` and updating state.

```typescript
const getResponseFromTheAsyncGenerator = useCallback(async () => {
  for await (const msg of await streamingWithAnAsyncGeneratorFn()) {
    const chunk = msg.content
    setMessages((prev) => prev + chunk)
  }
}, [])
```

--------------------------------

### Implement Async Generator in TanStack Start Server Function

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

This server function illustrates a cleaner approach to streaming data using an async generator function. It defines a server function with `createServerFn().handler(async function* ())` that yields `Message` objects, ensuring type safety for streamed chunks after an artificial delay.

```typescript
const streamingWithAnAsyncGeneratorFn = createServerFn().handler(
  async function* () {
    const messages: Message[] = generateMessages()
    for (const msg of messages) {
      await sleep(500)
      // The streamed chunks are still typed as `Message`
      yield msg
    }
  },
)
```

--------------------------------

### Install Markdown Processor Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This command installs all necessary npm packages for setting up the Markdown processing pipeline in a TanStack Start project. It includes `unified` and its ecosystem plugins for parsing, transforming, and stringifying Markdown to HTML, along with `shiki` for code highlighting, `html-react-parser` for React integration, and `gray-matter` for front matter parsing.

```bash
npm install unified remark-parse remark-gfm remark-rehype rehype-raw rehype-slug rehype-autolink-headings rehype-stringify shiki html-react-parser gray-matter
```

--------------------------------

### Implement rate limiting for login attempts

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Simple in-memory rate limiting using Map to track login attempts by IP address with 15-minute reset window. Limits login attempts to 5 per IP. Note: Use Redis in production for distributed systems and better performance.

```typescript
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

export const rateLimitLogin = (ip: string): boolean => {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)

  if (!attempts || now > attempts.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 min
    return true
  }

  if (attempts.count >= 5) {
    return false // Too many attempts
  }

  attempts.count++
  return true
}
```

--------------------------------

### Initialize TanStack Start Client with React Hydration (TypeScript/TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point

This snippet demonstrates the default client entry point for a TanStack Start application. It uses `hydrateRoot` from `react-dom/client` to hydrate the React application, wrapping `StartClient` within `StrictMode` for development best practices. This setup enables client-side routing after initial server-side rendering.

```tsx
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
```

--------------------------------

### Monitor CDN Cache Status with TanStack Start Middleware

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Illustrates how to create a server-side middleware in TanStack Start to log and monitor CDN cache statuses. By inspecting headers like 'cf-cache-status' from the response, developers can gain insights into cache hit rates and CDN performance.

```tsx
const cacheMonitoringMiddleware = createMiddleware().server(
  async ({ next }) => {
    const result = await next()

    // Log cache status (from CDN headers)
    console.log('Cache Status:', result.response.headers.get('cf-cache-status'))

    return result
  },
)
```

--------------------------------

### Define TanStack Router Server Route with Multiple Dynamic Path Parameters

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript example illustrates defining a TanStack Router server route that accepts multiple dynamic path parameters. The `createFileRoute` function sets up a GET handler to extract `id` and `postId` from `params` and use them to construct the response.

```ts
// routes/users/$id/posts/$postId.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$id/posts/$postId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id, postId } = params
        return new Response(`User ID: ${id}, Post ID: ${postId}`)
      },
    },
  },
})
```

--------------------------------

### Create Server-Only Function (TanStack Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Demonstrates `createServerOnlyFn` from `@tanstack/react-start`, which creates a function intended solely for server-side execution. Calling this function on the server returns 'bar', but attempting to call it on the client will throw a descriptive runtime error, preventing unintended cross-environment usage.

```tsx
import { createServerOnlyFn } from '@tanstack/react-start'

const foo = createServerOnlyFn(() => 'bar')

foo() 
```

--------------------------------

### Execute NPM Build Script

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This `sh` command, `npm run build`, executes the `build` script defined in your `package.json`. Its primary purpose is to compile the TanStack Start application for production, generating the necessary output files. This command is a prerequisite before starting the application in a production environment.

```sh
npm run build
```

--------------------------------

### Define Client-Side Middleware Logic with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Implement client-side middleware using the `.client` method to wrap RPC execution and handle results before and after server function calls. The method receives next, context, and request parameters.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next, context, request }) => {
    const result = await next() // <-- This will execute the next middleware in the chain and eventually, the RPC to the server
    return result
  },
)
```

--------------------------------

### Define Root Route with Authentication and Layout in TanStack Start (TypeScript React)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-workos

This code defines the root route for a TanStack Start application. It leverages `createRootRoute` to set up global configurations, including asynchronous authentication checks via `getAuth` and `getSignInUrl` from WorkOS AuthKit in `beforeLoad` and `loader` functions. The `RootComponent` then renders the main application layout using Radix UI components, incorporating navigation links, a sign-in button, and an `Outlet` for child routes. The `RootDocument` component provides the basic HTML structure.

```tsx
import { Box, Button, Card, Container, Flex, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense } from 'react';
import { getAuth, getSignInUrl } from '../authkit/serverFunctions';
import Footer from '../components/footer';
import SignInButton from '../components/sign-in-button';
import type { ReactNode } from 'react';

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { user } = await getAuth();

    return { user };
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'AuthKit Example in TanStack Start',
      },
    ],
  }),
  loader: async ({ context }) => {
    const { user } = context;
    const url = await getSignInUrl();
    return {
      user,
      url,
    };
  },
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootComponent() {
  const { user, url } = Route.useLoaderData();
  return (
    <RootDocument>
      <Theme accentColor="iris" panelBackground="solid" style={{ backgroundColor: 'var(--gray-1)' }}>
        <Container style={{ backgroundColor: 'var(--gray-1)' }}>
          <Flex direction="column" gap="5" p="5" height="100vh">
            <Box asChild flexGrow="1">
              <Card size="4">
                <Flex direction="column" height="100%">
                  <Flex asChild justify="between">
                    <header>
                      <Flex gap="4">
                        <Button asChild variant="soft">
                          <Link to="/">Home</Link>
                        </Button>

                        <Button asChild variant="soft">
                          <Link to="/account">Account</Link>
                        </Button>
                      </Flex>

                      <Suspense fallback={<div>Loading...</div>}>
                        <SignInButton user={user} url={url} />
                      </Suspense>
                    </header>
                  </Flex>

                  <Flex flexGrow="1" align="center" justify="center">
                    <main>
                      <Outlet />
                    </main>
                  </Flex>
                </Flex>
              </Card>
            </Box>
            <Footer />
          </Flex>
        </Container>
      </Theme>
      <TanStackRouterDevtools position="bottom-right" />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

--------------------------------

### Create Root Route with Authentication Session Context in TanStack React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-authjs

Sets up a root route with authentication context using TanStack React Router. Fetches user session on initial load via a server function and provides it to all child routes. Configures HTML head metadata and renders the root layout component.

```typescript
/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import type { AuthSession } from 'start-authjs'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { getSession } from 'start-authjs'
import { authConfig } from '~/utils/auth'
import appCss from '~/styles/app.css?url'

interface RouterContext {
  session: AuthSession | null
}

const fetchSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest()
  const session = await getSession(request, authConfig)
  return session
})

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const session = await fetchSession()
    return {
      session,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Auth Example',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})
```

--------------------------------

### Configure Static Prerendering in TanStack Start with Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering

This configuration demonstrates how to enable and customize static prerendering for a TanStack Start application within the `vite.config.ts` file. It includes options for automatic subfolder indexing, static path discovery, concurrency, link crawling, page filtering, retry mechanisms, and page-specific prerendering settings.

```typescript
// vite.config.ts

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // If disabled, only the root path or the paths defined in the pages config will be prerendered
        autoStaticPathsDiscovery: true,

        // How many prerender jobs to run at once
        concurrency: 14,

        // Whether to extract links from the HTML and prerender them also
        crawlLinks: true,

        // Filter function takes the page object and returns whether it should prerender
        filter: ({ path }) => !path.startsWith('/do-not-render-me'),

        // Number of times to retry a failed prerender job
        retryCount: 2,

        // Delay between retries in milliseconds
        retryDelay: 1000,

        // Maximum number of redirects to follow during prerendering
        maxRedirects: 5,

        // Fail if an error occurs during prerendering
        failOnError: true,

        // Callback when page is successfully rendered
        onSuccess: ({ page }) => {
          console.log(`Rendered ${page.path}!`);
        },
      },
      // Optional configuration for specific pages
      // Note: When autoStaticPathsDiscovery is enabled (default), discovered static
      // routes will be merged with the pages specified below
      pages: [
        {
          path: '/my-page',
          prerender: { enabled: true, outputPath: '/my-page/index.html' },
        },
      ],
    }),
    viteReact(),
  ],
})
```

--------------------------------

### GET /file/{splat}

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Retrieves a resource using a wildcard or 'splat' parameter, capturing the remainder of the path after '/file/'.

```APIDOC
## GET /file/{splat}

### Description
Retrieves a file using a wildcard/splat parameter at the end of the path.

### Method
GET

### Endpoint
/file/{splat}

### Parameters
#### Path Parameters
- **splat** (string) - Required - The wildcard parameter capturing the rest of the path segments.

### Request Example
N/A

### Response
#### Success Response (200)
- **body** (string) - The captured splat parameter prefixed with 'File: '.

#### Response Example
```
File: hello.txt
```
```

--------------------------------

### Configure Root Route Metadata and Links - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-auth

Sets up SEO metadata, viewport configuration, and resource links (stylesheets, favicons, manifest) for the root route. Includes title, description, and apple-touch-icon configuration alongside error and not-found component handlers.

```TypeScript
{
  name: 'viewport',
  content: 'width=device-width, initial-scale=1',
},
...seo({
  title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
  description: 'TanStack Start is a type-safe, client-first, full-stack React framework.',
}),
links: [
  { rel: 'stylesheet', href: appCss },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
  { rel: 'icon', href: '/favicon.ico' },
]
```

--------------------------------

### Email/Password Authentication with Bcrypt - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Implements user registration and authentication using bcrypt for password hashing and TanStack Start server functions. Includes user existence validation, secure password hashing with salt rounds of 12, session creation, and password verification using bcrypt comparison.

```typescript
// server/auth.ts
import bcrypt from 'bcryptjs'
import { createServerFn } from '@tanstack/solid-start'

// User registration
export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { email: string; password: string; name: string }) => data,
  )
  .handler(async ({ data }) => {
    // Check if user exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return { error: 'User already exists' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Create user
    const user = await createUser({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    })

    // Create session
    const session = await useAppSession()
    await session.update({ userId: user.id })

    return { success: true, user: { id: user.id, email: user.email } }
  })

async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}
```

--------------------------------

### Build Authentication Navigation Bar in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-authjs

Creates a responsive navigation bar that displays home and protected route links, user information when authenticated, and conditional sign-in/sign-out buttons. Uses TanStack Router's Link component with active state styling.

```typescript
function NavBar() {
  const routeContext = Route.useRouteContext()

  return (
    <nav className="p-4 flex gap-4 items-center bg-gray-100">
      <Link
        to="/"
        activeProps={{ className: 'font-bold' }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
      <Link to="/protected" activeProps={{ className: 'font-bold' }}>
        Protected
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {routeContext.session ? (
          <>
            <span className="text-gray-600">
              {routeContext.session?.user?.name ||
                routeContext.session?.user?.email}
            </span>
            <a
              href="/api/auth/signout"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </a>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
```

--------------------------------

### Access public environment variables in TanStack Start client components

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This example shows how client-side code accesses public environment variables prefixed with `VITE_` using `import.meta.env`. It also highlights that non-prefixed variables (e.g., `DATABASE_URL`) are intentionally undefined in the client for security, preventing sensitive data exposure.

```typescript
// Client configuration
export function ApiProvider({ children }: { children: React.ReactNode }) {
  const apiUrl = import.meta.env.VITE_API_URL     // ✅ Public
  const apiKey = import.meta.env.VITE_PUBLIC_KEY  // ✅ Public

  // This would be undefined (security feature):
  // const secret = import.meta.env.DATABASE_URL   // ❌ Undefined

  return (
    <ApiContext.Provider value={{ apiUrl, apiKey }}>
      {children}
    </ApiContext.Provider>
  )
}

// Feature flags
export function FeatureGatedComponent() {
  const enableNewFeature = import.meta.env.VITE_ENABLE_NEW_FEATURE === 'true'

  if (!enableNewFeature) return null

  return <NewFeature />
}
```

--------------------------------

### Configure database connection using TanStack Start server environment variables

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This TypeScript snippet demonstrates how a server function can retrieve database configuration details, such as the connection URL, maximum connections, and SSL settings, directly from environment variables. This pattern centralizes database configuration and keeps sensitive details server-side.

```typescript
// src/lib/database.ts
import { createServerFn } from '@tanstack/react-start'

const getDatabaseConnection = createServerFn().handler(async () => {
  const config = {
    url: process.env.DATABASE_URL,
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
    ssl: process.env.NODE_ENV === 'production'
  }

  return createConnection(config)
})
```

--------------------------------

### Update package.json Scripts for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Replace Next.js scripts with Vite-based commands for development, build, and production start. Sets the module type to ES modules and configures commands for dev server, production build, and server startup.

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node .output/server/index.mjs"
  }
}
```

--------------------------------

### Import application CSS with `?url` in TanStack Start root

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

This TypeScript React (TSX) code imports the main application CSS file into the `__root.tsx` file of a TanStack Start project. It uses the `?url` query parameter for Vite to treat the import as a URL, and correctly links the stylesheet in the document's `<head>` section.

```tsx
// src/routes/__root.tsx
/// <reference types="vite/client" />
// other imports...

import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      // your meta tags and site config
    ],
    links: [{ rel: 'stylesheet', href: appCss }]
    // other head config
  }),
  component: RootComponent
})
```

--------------------------------

### Apply Tailwind CSS Classes in TanStack Start Component

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/tailwind-integration

This TSX example shows how to use Tailwind CSS utility classes directly within a Solid.js component in a TanStack Start project. It defines a simple `Home` component that renders a `div` with styling provided by Tailwind CSS classes.

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <div className="bg-red-500 text-white p-4">Hello World</div>
}
```

--------------------------------

### Use Unpic for Optimized Images in TanStack Start (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Explains how to replace Next.js's `next/image` component with `@unpic/react` for optimized image handling in TanStack Start. The `Image` component from Unpic offers similar functionality and props like `src`, `alt`, `width`, and `height` for responsive image delivery.

```tsx
import { Image } from '@unpic/react'
function Component() {
  return (
    <Image
      src="/path/to/image.jpg"
      alt="Description"
      width={600}
      height={400}
    />
  )
}
```

--------------------------------

### SSR Inheritance with Restrictive Override - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/selective-ssr

Illustrates how child routes inherit SSR configuration from parent routes, where inherited values can only be changed to more restrictive settings (`true` → `data-only` → `false`). Shows a three-level route hierarchy where a child route attempts to enable SSR but remains constrained by the parent's restrictive setting.

```tsx
root { ssr: undefined }
  posts { ssr: false }
     $postId { ssr: true }

// Result:
// - root defaults to ssr: true
// - posts sets ssr: false (no server execution)
// - $postId sets ssr: true but inherits ssr: false from parent
// - Inherited ssr: false remains (cannot be less restrictive)
```

--------------------------------

### Define Error and Not Found Components - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-auth

Configures error boundary and 404 not found fallback components for the root route. The error component wraps the DefaultCatchBoundary within RootDocument, while notFoundComponent displays a NotFound page.

```TypeScript
errorComponent: (props) => {
  return (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  )
},
notFoundComponent: () => <NotFound />,
component: RootComponent
```

--------------------------------

### Define TanStack Router Server Route with Single Dynamic Path Parameter

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript example demonstrates how to create a TanStack Router server route with a single dynamic path parameter. The `createFileRoute` function is used to define a GET handler that extracts the `id` from `params` and returns it in the response.

```ts
// routes/users/$id.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id } = params
        return new Response(`User ID: ${id}`)
      },
    },
  },
})
```

--------------------------------

### Implement 'Remember Me' for Session Persistence in TanStack Applications

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Extends a `createServerFn` to incorporate 'Remember Me' functionality, allowing users to choose between standard and extended session durations. It conditionally updates the session's `maxAge` based on the `rememberMe` flag provided in the login data, enhancing user convenience.

```tsx
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { email: string; password: string; rememberMe?: boolean }) => data,
  )
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)
    if (!user) return { error: 'Invalid credentials' }

    const session = await useAppSession()
    await session.update(
      { userId: user.id },
      {
        // Extend session if remember me is checked
        maxAge: data.rememberMe ? 30 * 24 * 60 * 60 : undefined, // 30 days vs session
      },
    )

    return { success: true }
  })
```

--------------------------------

### Create Static Sitemap XML File

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

Places a static sitemap.xml file in the public directory for manual route listing. Works well for sites with known, unchanging structure. Search engines automatically discover this file at /sitemap.xml when properly configured.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myapp.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://myapp.com/about</loc>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

--------------------------------

### Root HTML Document Structure with TanStack Devtools in TypeScript/React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

Creates the RootDocument layout component containing the full HTML structure, navigation header with branding, content area with child routes, and footer devtools. Integrates React Query Devtools and TanStack Router Devtools for development debugging. Uses Tailwind CSS for responsive styling with a dark theme navbar and flexbox layout.

```typescript
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Compose Middleware with Dependencies - TypeScript/TSX

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Shows how to create composable middleware where one middleware can depend on another. The authMiddleware depends on loggingMiddleware, creating a chain where loggingMiddleware executes first. This pattern allows building complex middleware hierarchies.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

--------------------------------

### Disable Server-Side Rendering (SSR) for Specific Routes in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

For routes where SEO is not a primary concern, Server-Side Rendering (SSR) can be selectively disabled within the route definition. This can be beneficial for internal dashboards or pages that do not need to be indexed, potentially optimizing build times or server load for those specific routes.

```tsx
export const Route = createFileRoute('/dashboard')({
  ssr: false, // Dashboard doesn't need to be indexed
  component: DashboardPage,
})
```

--------------------------------

### Server Route Handler Context

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-routes

Details the properties available within the handler function for each HTTP method. Understanding these parameters is crucial for building robust server-side logic, accessing request data, and handling dynamic route segments.

```APIDOC
## Server Route Handler Context

### Description
This section details the parameters available within the handler function for each HTTP method. Understanding these parameters is crucial for building robust server-side logic, accessing request data, and handling dynamic route segments.

### Method
Applies to all HTTP methods (GET, POST, PUT, DELETE, etc.)

### Endpoint
N/A (These are parameters passed to the handler function, not an endpoint itself)

### Parameters
#### Handler Context Object
- **request** (Request) - The standard Web Fetch API `Request` object. Provides access to HTTP headers, body, method, URL, etc.
- **params** (object) - An object containing dynamic path parameters extracted from the route. For a route like `/users/$id` with a request to `/users/123`, `params` would be `{ id: '123' }`.
- **context** (object) - An object for passing data between middleware and the handler. Its contents can be populated by preceding middleware functions.

### Request Example
N/A (This describes the input *to* the handler function)

### Response
N/A (This describes the input *to* the handler function)
```

--------------------------------

### Configure Head Metadata, Scripts, and Root Components in TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic

This code snippet demonstrates a partial configuration object for `createRouter` in a TanStack Router application. It defines an array of head elements (like favicons and a web manifest) and external JavaScript files to be loaded globally. Additionally, it specifies `errorComponent`, `notFoundComponent`, and `shellComponent` which are crucial for global error handling and defining the application's root layout.

```typescript
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})
```

--------------------------------

### Define Server Functions in TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Demonstrates defining server-side functions in TanStack Start using `createServerFn` from `@tanstack/react-start`. This pattern replaces Next.js's `'use server'` directive, providing a structured way to encapsulate and expose server logic to the client.

```tsx
import { createServerFn } from "@tanstack/react-start"

export const create = createServerFn().handler(async () => {
  return true
})
```

--------------------------------

### Integrate Nitro Plugin into Vite Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This TypeScript code adds the `nitro()` plugin to your `vite.config.ts` file, enabling Nitro as an agnostic deployment layer for your TanStack Start application. Nitro integrates with Vite's Environments API and allows deployment to a wide range of hosting providers. It requires the `nitro/vite` package to be installed.

```tsx
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), nitro(), viteReact()],
  nitro: {},
})
```

--------------------------------

### Apply Cache Headers via Middleware for API Routes

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Use middleware to centrally manage cache headers for API routes. The middleware intercepts responses and adds Cache-Control headers before returning. This approach is useful for applying consistent caching policies across multiple endpoints.

```typescript
// routes/api/products/$productId.ts
import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

const cacheMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next()

  // Add cache headers to the response
  result.response.headers.set(
    'Cache-Control',
    'public, max-age=3600, stale-while-revalidate=86400',
  )

  return result
})

export const Route = createFileRoute('/api/products/$productId')({
  server: {
    middleware: [cacheMiddleware],
    handlers: {
      GET: async ({ params }) => {
        const product = await db.products.findById(params.productId)
        return Response.json({ product })
      },
    },
  },
})
```

--------------------------------

### Configure Root Router with SEO and Metadata in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query

Sets up the root router configuration for a TanStack Start application with SEO metadata, viewport settings, favicon links, stylesheet, error handling components, and not-found page. The configuration includes title, description, and multiple icon/manifest links for multi-platform support.

```typescript
const rootRoute = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})
```

--------------------------------

### Create a Static robots.txt File in TanStack Start (public/robots.txt)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

The simplest method for managing web crawler access to your site is to place a static `robots.txt` file directly in the `public` directory. This file will be automatically served at `/robots.txt` and allows you to specify rules for web robots, including disallowed paths and the location of your sitemap, which is the most common approach for most sites.

```txt
// public/robots.txt
User-agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml
```

--------------------------------

### Implement On-Demand Revalidation with TanStack Router API Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript code demonstrates how to set up an API route for on-demand revalidation. It expects a POST request with a 'path' and a 'secret' token to securely trigger a CDN cache purge, specifically targeting Cloudflare's API. This allows immediate invalidation of cached content when updates occur.

```TypeScript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/revalidate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { path, secret } = await request.json()

        // Verify secret token
        if (secret !== process.env.REVALIDATE_SECRET) {
          return Response.json({ error: 'Invalid token' }, { status: 401 })
        }

        // Trigger CDN purge via your CDN's API
        await fetch(
          `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${CF_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              files: [`https://yoursite.com${path}`],
            }),
          },
        )

        return Response.json({ revalidated: true })
      },
    },
  },
})
```

--------------------------------

### Implement Role-Based Access Control (RBAC) for TanStack Router Routes

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

This snippet provides a utility function (`hasPermission`) to check user roles against required roles, defining a hierarchy for different access levels. It then integrates this RBAC logic into a TanStack Router `beforeLoad` function to restrict access to specific routes based on the authenticated user's role.

```tsx
// utils/auth.ts
export const roles = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const

type Role = (typeof roles)[keyof typeof roles]

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const hierarchy = {
    [roles.USER]: 0,
    [roles.MODERATOR]: 1,
    [roles.ADMIN]: 2,
  }

  return hierarchy[userRole] >= hierarchy[requiredRole]
}

// Protected route with role check
export const Route = createFileRoute('/_authed/admin/')({
  beforeLoad: async ({ context }) => {
    if (!hasPermission(context.user.role, roles.ADMIN)) {
      throw redirect({ to: '/unauthorized' })
    }
  },
})
```

--------------------------------

### Create and Compose Middleware in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/middleware

Demonstrates how to create basic middleware using createMiddleware and compose multiple middleware together by declaring dependencies. Middleware composition allows one middleware to depend on another middleware to create a chain of operations.

```typescript
import { createMiddleware } from '@tanstack/solid-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

--------------------------------

### Setup Execution Boundaries with TanStack Start Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Initialize various function types to control code execution context. Includes server functions for RPC calls, server-only utilities that crash on client, client-only utilities for browser APIs, and isomorphic functions with environment-specific implementations. These functions form the foundation for managing execution boundaries.

```typescript
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/react-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()
  .server((msg) => console.log(`[SERVER]: ${msg}`))
  .client((msg) => console.log(`[CLIENT]: ${msg}`))
```

--------------------------------

### Implement SSR Inheritance with Restrictive Override in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Child routes inherit the SSR configuration from their parent routes, but can only override to more restrictive settings. For example, a parent with `ssr: false` cannot be changed to `ssr: true` by a child; the child's more permissive setting is ignored. This ensures consistent server-side behavior across route hierarchies.

```tsx
root { ssr: undefined }
  posts { ssr: false }
     $postId { ssr: true }

// root defaults to ssr: true
// posts sets ssr: false (no server execution)
// $postId attempts ssr: true but inherits ssr: false from parent (no effect)
```

```tsx
root { ssr: undefined }
  posts { ssr: 'data-only' }
     $postId { ssr: true }
       details { ssr: false }

// root defaults to ssr: true
// posts sets ssr: 'data-only' (server data fetch only)
// $postId inherits ssr: 'data-only' from parent
// details sets ssr: false (more restrictive, overrides inherited value)
```

--------------------------------

### Set client timezone cookie without hydration mismatch

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Uses ClientOnly wrapper to safely set a timezone cookie on first client visit without causing hydration mismatches. The server uses UTC as default until the cookie is set, then subsequent requests use the actual client timezone.

```typescript
import * as React from 'react'
import { ClientOnly } from '@tanstack/react-router'

function SetTimeZoneCookie() {
  React.useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    document.cookie = `tz=${tz}; path=/; max-age=31536000`
  }, [])
  return null
}

export function AppBoot() {
  return (
    <ClientOnly fallback={null}>
      <SetTimeZoneCookie />
    </ClientOnly>
  )
}
```

--------------------------------

### Define Server Functions with HTTP Methods in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-functions

Shows how to create server functions with specific HTTP methods (GET and POST). The GET method is the default and used for data retrieval, while POST is used for operations that modify server state. Both functions use the handler method to define the server-side logic.

```typescript
import { createServerFn } from '@tanstack/solid-start'

// GET request (default)
export const getData = createServerFn().handler(async () => {
  return { message: 'Hello from server!' }
})

// POST request
export const saveData = createServerFn({ method: 'POST' }).handler(async () => {
  // Server-only logic
  return { success: true }
})
```

--------------------------------

### Consume Server Function with TanStack Router Loader (JSX)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This JSX code demonstrates how to integrate the `getJokes` server function with TanStack Router within an `index.tsx` route file. It uses `createFileRoute` to define a route with a `loader` function that asynchronously calls `getJokes` to fetch data before rendering the component. The `App` component then retrieves this data using `Route.useLoaderData()` and passes it to the `JokesList` component for display.

```jsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { getJokes } from './serverActions/jokesActions'
import { JokesList } from './JokesList'

export const Route = createFileRoute('/')({
  loader: async () => {
    // Load jokes data when the route is accessed
    return getJokes()
  },
  component: App,
})

const App = () => {
  const jokes = Route.useLoaderData() || []

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-10">DevJokes</h1>
      <JokesList jokes={jokes} />
    </div>
  )
}
```

--------------------------------

### Integrate Netlify Plugin into Vite Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This TypeScript snippet demonstrates how to add the `netlify()` plugin to your `vite.config.ts` file's `plugins` array. Including this plugin activates Netlify-specific build optimizations and features for your TanStack Start project. It assumes you have a standard Vite setup for your application.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start' // ← add this
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart(),
    netlify(), // ← add this (anywhere in the array is fine)
    viteReact(),
  ],
})
```

--------------------------------

### Collect and Expose Application Performance Metrics (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This snippet provides a `MetricsCollector` class to record and calculate statistics for various timings (e.g., average, percentiles, min/max). It also shows how to create a TanStack Router server endpoint to expose these collected application metrics alongside system-level information (uptime, memory). This is useful for detailed performance monitoring, analytics, and integration with dashboarding tools.

```tsx
// utils/metrics.ts
class MetricsCollector {
  private metrics = new Map<string, number[]>()

  recordTiming(name: string, duration: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(duration)
  }

  getStats(name: string) {
    const timings = this.metrics.get(name) || []
    if (timings.length === 0) return null

    const sorted = timings.sort((a, b) => a - b)
    return {
      count: timings.length,
      avg: timings.reduce((a, b) => a + b, 0) / timings.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
    }
  }

  getAllStats() {
    const stats: Record<string, any> = {}
    for (const [name] of this.metrics) {
      stats[name] = this.getStats(name)
    }
    return stats
  }
}

export const metrics = new MetricsCollector()
```

```tsx
// Metrics endpoint
// routes/metrics.ts
export const Route = createFileRoute('/metrics')({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          system: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString(),
          },
          application: metrics.getAllStats(),
        })
      },
    },
  },
})
```

--------------------------------

### Create Root Route with Material UI and Emotion Providers

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-material-ui

Establishes the root route component for a TanStack Start application with Material UI theming and Emotion CSS caching. Integrates HeadContent for SSR, applies Roboto font stylesheet, and wraps the app with necessary providers (CacheProvider, ThemeProvider, CssBaseline). Includes TanStackRouterDevtools for debugging routing in development.

```typescript
/// <reference types="vite/client" />
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { CacheProvider } from '@emotion/react'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import createCache from '@emotion/cache'
import fontsourceVariableRobotoCss from '@fontsource-variable/roboto?url'
import React from 'react'
import { theme } from '~/setup/theme'
import { Header } from '~/components/Header'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: fontsourceVariableRobotoCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({ key: 'css' })

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Header />

          <Container component="main" sx={{ paddingBlock: 4 }}>
            {children}
          </Container>
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Create Authentication Context Provider with User State

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Implements a React Context for sharing authentication state across the application using TanStack Start's useServerFn hook. Provides a custom useAuth hook that manages user data, loading state, and refetch functionality, requiring the AuthProvider wrapper to ensure proper context initialization and error handling.

```typescript
// contexts/auth.tsx
import { createContext, useContext, ReactNode } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getCurrentUserFn } from '../server/auth'

type User = {
  id: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, refetch } = useServerFn(getCurrentUserFn)

  return (
    <AuthContext.Provider value={{ user, isLoading, refetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

--------------------------------

### Collect and Expose Application Performance Metrics

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This code defines a `MetricsCollector` class for recording and summarizing performance timings (count, average, percentiles, min, max) for various operations. It then demonstrates how to expose these application-specific metrics, along with system metrics (uptime, memory usage), via a dedicated TanStack Solid-Router server-side GET endpoint for external monitoring.

```tsx
// utils/metrics.ts
class MetricsCollector {
  private metrics = new Map<string, number[]>()

  recordTiming(name: string, duration: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(duration)
  }

  getStats(name: string) {
    const timings = this.metrics.get(name) || []
    if (timings.length === 0) return null

    const sorted = timings.sort((a, b) => a - b)
    return {
      count: timings.length,
      avg: timings.reduce((a, b) => a + b, 0) / timings.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
    }
  }

  getAllStats() {
    const stats: Record<string, any> = {}
    for (const [name] of this.metrics) {
      stats[name] = this.getStats(name)
    }
    return stats
  }
}

export const metrics = new MetricsCollector()

// Metrics endpoint
// routes/metrics.ts
export const Route = createFileRoute('/metrics')({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          system: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString(),
          },
          application: metrics.getAllStats(),
        })
      },
    },
  },
})
```

--------------------------------

### Define TanStack Router Root Route with Context and Head Content

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

This snippet defines the root route for a TanStack Router application using `createRootRouteWithContext`. It establishes a global context for `queryClient`, configures the document's `<head>` with meta tags, SEO information, and stylesheets, and specifies custom error and not-found components for global error handling.

```typescript
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `
      })
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' }
    ]
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent
})
```

--------------------------------

### Disable Server-Side Rendering (SSR) for a Route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

This configuration demonstrates disabling all Server-Side Rendering for a specific route by setting `ssr: false`. When `ssr` is false, neither the `beforeLoad` nor `loader` functions, nor the route component, will execute on the server. Instead, all these operations will be deferred to the client during the hydration phase.

```tsx
// src/routes/posts/$postId.tsx
export const Route = createFileRoute('/posts/$postId')({
  ssr: false,
  beforeLoad: () => {
    console.log('Executes on the client during hydration')
  },
  loader: () => {
    console.log('Executes on the client during hydration')
  },
  component: () => <div>This component is rendered on the client</div>,
})
```

--------------------------------

### Disable SSR for specific routes in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Configures a route with selective SSR settings to prevent server-side rendering of components that cannot produce deterministic output. Use 'data-only' to render only server data without the component, or false to completely disable SSR for the route.

```typescript
export const Route = createFileRoute('/unstable')({
  ssr: 'data-only', // or false
  component: () => <ExpensiveViz />,
})
```

--------------------------------

### Implement Feature Flags with Environment Variables in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This TypeScript snippet demonstrates how to define and use feature flags based on client-side environment variables (`import.meta.env`). The `featureFlags` object maps environment variable strings to boolean values. The `Dashboard` component then conditionally renders different UI based on these flags, allowing for easy toggling of features without code changes.

```typescript
// src/config/features.ts
export const featureFlags = {
  enableNewDashboard: import.meta.env.VITE_ENABLE_NEW_DASHBOARD === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
}

// Usage in components
export function Dashboard() {
  if (featureFlags.enableNewDashboard) {
    return <NewDashboard />
  }

  return <LegacyDashboard />
}
```

--------------------------------

### Resolve TypeScript errors for VITE_ environment variables

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

To prevent TypeScript errors like `Property 'VITE_MY_VAR' does not exist on type 'ImportMetaEnv'`, this snippet provides a type declaration. Adding this interface to a `src/env.d.ts` file ensures that custom `VITE_` prefixed environment variables are correctly recognized by TypeScript.

```typescript
interface ImportMetaEnv {
  readonly VITE_MY_VAR: string
}
```

--------------------------------

### Fetch GitHub Repository Directory Contents with TanStack Router Server Functions (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This `createServerFn` (`fetchRepoContents`) demonstrates fetching a list of files and directories from a specified GitHub repository path. It uses the GitHub API to retrieve content, filters for Markdown files, and transforms the data into a simpler format suitable for generating navigation menus. This function is crucial for dynamically building navigation structures for documentation sites directly from a GitHub source.

```tsx
// src/utils/docs.server.ts
type GitHubContent = {
  name: string
  path: string
  type: 'file' | 'dir'
}

export const fetchRepoContents = createServerFn({ method: 'GET' })
  .inputValidator(
    (params: { repo: string; branch: string; path: string }) => params,
  )
  .handler(async ({ data: { repo, branch, path } }) => {
    const url = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch contents: ${response.status}`)
    }

    const contents: Array<GitHubContent> = await response.json()

    return contents
      .filter((item) => item.type === 'file' && item.name.endsWith('.md'))
      .map((item) => ({
        name: item.name.replace('.md', ''),
        path: item.path,
      }))
  })
```

--------------------------------

### Replace Next.js Link with TanStack Router Link

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Migrate from Next.js Link component to TanStack Router's Link component. The primary change is replacing the 'href' prop with 'to' prop for navigation targets.

```typescript
import { Link } from "@tanstack/react-router"

function Component() {
  return <Link to="/dashboard">Dashboard</Link>
}
```

--------------------------------

### Build and Start TanStack Application via npm

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hosting

These Bash commands execute the defined `build` and `start` scripts from the `package.json` file. `npm run build` compiles the application, and `npm run start` launches the application server, typically for Node.js-based deployments.

```bash
npm run build
```

```bash
npm run start
```

--------------------------------

### Install TanStack React Router and Start Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Install core TanStack dependencies (@tanstack/react-router and @tanstack/react-start) required for the migration. These packages provide routing and framework functionality for TanStack Start projects.

```shell
npm i @tanstack/react-router @tanstack/react-start
```

--------------------------------

### Configure TypeScript Path Aliases in tsconfig.json

Source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

This JSON configuration block defines path aliases within a TypeScript project. It sets the `baseUrl` to the current directory and maps the `~/*` alias to the `./src/*` directory, allowing for simplified imports from the `src` folder.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

--------------------------------

### Configure Static Prerendering in TanStack Start via vite.config.ts

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Implement static prerendering in TanStack Start using the Vite plugin to generate HTML at build time. Enabling the `prerender` option with `crawlLinks` ensures optimal performance and easy crawlability for content that doesn't change frequently, by generating static files for all discovered pages.

```ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
  ],
})
```

--------------------------------

### Integrate vite-tsconfig-paths in vite.config.ts

Source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

This `vite.config.ts` configuration integrates the `vite-tsconfig-paths` plugin into your Vite build process. It enables Vite to resolve TypeScript path aliases defined in your `tsconfig.json` by specifying the `tsconfig.json` file to use.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json']
      })
    ]
  }
})
```

--------------------------------

### Configure CDN Cache-Control Headers for Cloudflare Workers in TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This TypeScript snippet shows how to set Cache-Control headers for pages deployed with Cloudflare Workers. It uses standard 'max-age' and 'public' directives, along with a Cloudflare-specific 'CDN-Cache-Control' header for more granular caching duration control.

```TypeScript
export const Route = createFileRoute('/products/$id')({
  headers: () => ({
    'Cache-Control': 'public, max-age=3600',
    // Cloudflare-specific header for finer control
    'CDN-Cache-Control': 'max-age=7200',
  }),
})
```

--------------------------------

### Configure authentication providers using TanStack Start environment variables

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This example shows how to configure an authentication provider (Auth0) by segregating environment variables. Server-side code handles sensitive secrets (`AUTH_SECRET`, `AUTH0_CLIENT_SECRET`) via `process.env`, while client-side components only access public keys (`VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`) via `import.meta.env` for secure integration.

```typescript
// src/lib/auth.ts (Server)
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  providers: {
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET // Server-only
    }
  }
}

// src/components/AuthProvider.tsx (Client)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      // No client secret here - it stays on the server
    >
      {children}
    </Auth0Provider>
  )
}
```

--------------------------------

### Run Development Server for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Start the development server using npm run dev command. After execution, access the application at http://localhost:3000 to verify the migration was successful and the welcome page displays correctly.

```shell
npm run dev
```

--------------------------------

### Configure environment variables in TanStack Start .env files

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This snippet demonstrates the basic structure of a `.env` file for a TanStack Start application. It shows how to define server-only variables (e.g., `DATABASE_URL`) and client-safe variables (prefixed with `VITE_`, e.g., `VITE_APP_NAME`). These variables are automatically loaded by the application.

```bash
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
VITE_APP_NAME=My TanStack Start App
```

--------------------------------

### Install Dependencies and Start Development Server

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

After creating the project, install all necessary dependencies using pnpm and then start the development server to run the application locally.

```bash
pnpm i
pnpm dev
```

--------------------------------

### Manage Form Loading States in React with `useState`

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Provides a React functional component example illustrating how to manage loading states during form submissions. It utilizes the `useState` hook to control a loading indicator and disable the submit button, preventing multiple submissions and improving user experience during asynchronous operations.

```tsx
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const loginMutation = useServerFn(loginFn)

  const handleSubmit = async (data: LoginData) => {
    setIsLoading(true)
    try {
      await loginMutation.mutate(data)
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

--------------------------------

### Implement New Relic Server Handler Callback in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Create a custom handler callback that integrates New Relic monitoring into TanStack Start's SSR server. Groups transactions by route ID instead of unique URLs and adds custom attributes for HTTP method and path. Requires newrelic import as first module import.

```typescript
// server.tsx
import newrelic from 'newrelic' // Make sure this is the first import
import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from '@tanstack/react-start/server'
import type { ServerEntry } from '@tanstack/react-start/server-entry'

const customHandler = defineHandlerCallback(async (ctx) => {
  // We do this so that transactions are grouped under the route ID instead of unique URLs
  const matches = ctx.router?.state?.matches ?? []
  const leaf = matches[matches.length - 1]
  const routeId = leaf?.routeId ?? new URL(ctx.request.url).pathname

  newrelic.setControllerName(routeId, ctx.request.method ?? 'GET')
  newrelic.addCustomAttributes({
    'route.id': routeId,
    'http.method': ctx.request.method,
    'http.path': new URL(ctx.request.url).pathname,
    // Any other custom attributes you want to add
  })

  return defaultStreamHandler(ctx)
})

export default {
  fetch(request) {
    const handler = createStartHandler(customHandler)
    return handler(request)
  },
} satisfies ServerEntry
```

--------------------------------

### Create Root Route with Head Metadata and Layout - TanStack React Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

Establishes the root route configuration using createRootRoute from TanStack React Router. Configures HTML head metadata including charset, viewport, SEO tags, favicon links, and stylesheet imports. Defines error and not-found components wrapped in RootLayout, plus the main RootComponent that renders child routes via Outlet.

```typescript
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})
```

--------------------------------

### Pass Runtime Variables from Server to Client using createServerFn

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-variables

To make runtime environment variables available on the client, create a server function that retrieves the variable from process.env and passes it to the client through the route loader. This approach works because server functions execute on the server where process.env is accessible.

```tsx
const getRuntimeVar = createServerFn({ method: 'GET' }).handler(() => {
  return process.env.MY_RUNTIME_VAR // notice `process.env` on the server, and no `VITE_` prefix
})

export const Route = createFileRoute('/')( {
  loader: async () => {
    const foo = await getRuntimeVar()
    return { foo }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { foo } = Route.useLoaderData()
  // ... use your variable however you want
}
```

--------------------------------

### Configure TanStack Router Root Route in TypeScript React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query

This code defines the root route (`__root.tsx`) for a TanStack Router application, integrating React Query. It sets up global `head` content (meta tags, links for SEO and styling), custom error and not-found components, and a `RootComponent` that renders the main application layout with navigation links and development tools. It utilizes `createRootRouteWithContext` to pass `QueryClient` to the route context.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Define TypeScript Interfaces for Movie Data and TMDB Response

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Create TypeScript interfaces for the 'Movie' object and the 'TMDBResponse' structure. These interfaces provide type safety and clarity when handling data fetched from the TMDB API.

```typescript
// src/types/movie.ts
export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  popularity: number
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
```

--------------------------------

### Create Secure Server Function for TMDB API Fetch

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Implements a server-only function using TanStack Start's createServerFn() to securely fetch popular movies from TMDB API. The server function protects API credentials by executing only on the server and never exposing the TMDB_AUTH_TOKEN to the client. It includes error handling and type-safe responses using TypeScript interfaces.

```typescript
import { createFileRoute } from '@tanstack/react-router'
import type { Movie, TMDBResponse } from '../types/movie'
import { createServerFn } from '@tanstack/react-start'

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

const fetchPopularMovies = createServerFn().handler(
  async (): Promise<TMDBResponse> => {
    const response = await fetch(API_URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`)
    }

    return response.json()
  },
)
```

--------------------------------

### HTTP Response Handler with Content-Type Header

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

Returns a Response object with plain text content and appropriate Content-Type header. This pattern is commonly used in server-side handlers to serve text content with proper MIME type specification.

```javascript
return new Response(content, {
  headers: {
    'Content-Type': 'text/plain',
  },
})
```

--------------------------------

### Initialize Project Directory with npm

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Create a new project directory and initialize a Node.js project with npm. This sets up the basic project structure and creates a package.json file.

```shell
mkdir myApp
cd myApp
npm init -y
```

--------------------------------

### Integrate Content Collections with Vite in TanStack React Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This configuration demonstrates how to add the '@content-collections/vite' plugin to your Vite setup within a TanStack React Start application. This integration enables the automatic processing and generation of content collections during the development and build processes.

```tsx
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
import contentCollections from '@content-collections/vite'

export default defineConfig({
  vite: {
    plugins: [contentCollections()],
  },
})
```

--------------------------------

### Generic Observability Tool Integration Pattern

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Demonstrates a reusable pattern for integrating any observability tool with TanStack Start. Initializes the tool with DSN and environment configuration, then wraps server functions with tracing and error capture middleware.

```TypeScript
// Initialize in app entry point
import { initObservabilityTool } from 'your-tool'

initObservabilityTool({
  dsn: import.meta.env.VITE_TOOL_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server function middleware
const observabilityMiddleware = createMiddleware().handler(async ({ next }) => {
  return yourTool.withTracing('server-function', async () => {
    try {
      return await next()
    } catch (error) {
      yourTool.captureException(error)
      throw error
    }
  })
})
```

--------------------------------

### Create Root Route with Server-Side User Fetch in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-auth

Establishes the root route configuration for a TanStack Start application with beforeLoad handler that fetches authenticated user data server-side using secure cookies. The route sets up metadata, error boundaries, and renders the root component with authenticated context available to child routes.

```typescript
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { NotFound } from '~/components/NotFound.js'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo.js'
import { useAppSession } from '~/utils/session.js'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  const session = await useAppSession()

  if (!session.data.userEmail) {
    return null
  }

  return {
    email: session.data.userEmail,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Implement Redirects in Server Functions (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Illustrates how to perform redirects from within a server function, typically used for authentication or navigation control. By throwing a `redirect` object from `@tanstack/react-router`, the client is instructed to navigate to a new URL.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

export const requireAuth = createServerFn().handler(async () => {
  const user = await getCurrentUser()

  if (!user) {
    throw redirect({ to: '/login' })
  }

  return user
})
```

--------------------------------

### Implement a POST server route with React component in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This snippet illustrates how to define a server-side POST endpoint that processes JSON request bodies and integrates with a React component, all within the same file. The route is defined using `createFileRoute` with both a `POST` handler and a `component` property. The `HelloComponent` fetches data from this POST route, demonstrating client-server interaction for a dynamic user experience.

```tsx
// routes/hello.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(JSON.stringify({ message: `Hello, ${body.name}!` }))
      },
    },
  },
  component: HelloComponent,
})

function HelloComponent() {
  const [reply, setReply] = useState('')

  return (
    <div>
      <button
        onClick={() => {
          fetch('/hello', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'Tanner' }),
          })
            .then((res) => res.json())
            .then((data) => setReply(data.message))
        }}
      >
        Say Hello
      </button>
    </div>
  )
}
```

--------------------------------

### Enable Automatic Server-Side Rendering (SSR) in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

TanStack Start automatically performs Server-Side Rendering (SSR) for routes by default, ensuring search engine crawlers receive fully rendered HTML content. This behavior is crucial for SEO and typically requires no explicit configuration for standard pages.

```tsx
export const Route = createFileRoute('/about')({
  component: AboutPage,
})
```

--------------------------------

### Integration Test Authentication Flow with Testing Library and TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Demonstrates integration testing for an authentication flow in a React application. It uses `@testing-library/react` and `TanStack Router` to simulate navigation to a protected route and verifies that the user is correctly redirected to the login page.

```tsx
// __tests__/auth-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { router } from '../router'

describe('Authentication Flow', () => {
  it('should redirect to login when accessing protected route', async () => {
    const history = createMemoryHistory()
    history.push('/dashboard') // Protected route

    render(<RouterProvider router={router} history={history} />)

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })
})
```

--------------------------------

### Create TanStack Start Project with pnpm

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Initialize a new TanStack Start project and install dependencies. This command scaffolds a complete full-stack application structure with routing, configuration, and optional add-ons like Shadcn, Clerk, or TanStack Query.

```bash
pnpm create @tanstack/start@latest devjokes
cd devjokes
pnpm i
pnpm dev
```

--------------------------------

### Return JSON Response Manually in TanStack Router Server Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript example demonstrates how to manually construct a JSON response in a TanStack Router server route. The `JSON.stringify()` method is used to serialize the object, and the `Content-Type` header is explicitly set to `application/json` for proper client-side interpretation.

```ts
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(JSON.stringify({ message: 'Hello, World!' }), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    }
  }
})
```

--------------------------------

### Define TanStack Start Root Route with Server Functions (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

This TypeScript code defines the root route (`/`) for a TanStack Start application. It includes server functions (`getCount`, `updateCount`) for reading and writing a counter value to a file, and a React component (`Home`) that displays the counter and allows incrementing it using the server functions, invalidating the router cache on update.

```tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .inputValidator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate()
        })
      }}
    >
      Add 1 to {state}?
    </button>
  )
}
```

--------------------------------

### Create Server Functions with GET and POST Methods (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Illustrates how to define server functions with specified HTTP methods. By default, `createServerFn()` uses GET, while the method can be explicitly set to POST for actions like data saving. These functions encapsulate server-only operations and return data or status.

```tsx
import { createServerFn } from '@tanstack/react-start'

// GET request (default)
export const getData = createServerFn().handler(async () => {
  return { message: 'Hello from server!' }
})

// POST request
export const saveData = createServerFn({ method: 'POST' }).handler(async () => {
  // Server-only logic
  return { success: true }
})
```

--------------------------------

### Define Dynamic Route with createFileRoute in TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/routing

Creates a dynamic route handler for a specific path parameter using the createFileRoute function from TanStack React Router. This example demonstrates defining a route for '/posts/:postId' that renders a PostComponent. The path is automatically managed by the TanStack Router Bundler Plugin or CLI.

```typescript
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})
```

--------------------------------

### Define TanStack Router Configuration (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This `src/router.tsx` file defines and exports a function to create a TanStack Router instance. It imports the generated `routeTree` and enables scroll restoration, setting up the core routing mechanism for the application.

```typescript
// src/router.tsx
import { createRouter } from '@tanstack/solid-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

--------------------------------

### Implement Basic SPA Redirects with Netlify (_redirects)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This example provides a basic Netlify `_redirects` configuration to ensure all 404 requests are rewritten to the SPA shell. This is a common pattern for deploying purely client-side SPAs to hosting providers or CDNs to handle client-side routing.

```plaintext
# Catch all other 404 requests and rewrite them to the SPA shell
/* /_shell.html 200
```

--------------------------------

### Implement FAQPage Schema for TanStack Start Routes

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This example shows how to integrate FAQPage structured data into a specific route (e.g., '/faq') within a TanStack Start application. It fetches FAQ data asynchronously and maps it into Schema.org Question and Answer entities, making Q&A content easily digestible by AI systems.

```tsx
export const Route = createFileRoute('/faq')({
  loader: async () => {
    const faqs = await fetchFAQs()
    return { faqs }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: 'Frequently Asked Questions' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: loaderData.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
})
```

--------------------------------

### Access environment variables in TanStack Start server functions and client code

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This example illustrates the distinct ways to access environment variables based on context. Server functions can access any variable using `process.env`, while client components are restricted to variables prefixed with `VITE_` via `import.meta.env` for security.

```typescript
// Server function - can access any environment variable
const getUser = createServerFn().handler(async () => {
  const db = await connect(process.env.DATABASE_URL) // ✅ Server-only
  return db.user.findFirst()
})

// Client component - only VITE_ prefixed variables
export function AppHeader() {
  return <h1>{import.meta.env.VITE_APP_NAME}</h1> // ✅ Client-safe
}
```

--------------------------------

### Redirect from Server Functions in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-functions

Shows how to use redirects in server functions for authentication and navigation flows. The redirect function from TanStack Router is thrown to automatically redirect the client to the specified route when the condition is not met.

```typescript
import { createServerFn } from '@tanstack/solid-start'
import { redirect } from '@tanstack/solid-router'

export const requireAuth = createServerFn().handler(async () => {
  const user = await getCurrentUser()

  if (!user) {
    throw redirect({ to: '/login' })
  }

  return user
})
```

--------------------------------

### Migrate Next.js layout.tsx to TanStack __root.tsx

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Convert Next.js layout.tsx to TanStack Start's __root.tsx using createRootRoute, Outlet, HeadContent, and Scripts components. Replaces Next.js metadata with TanStack's head configuration approach and updates the component structure to use TanStack Router's root layout pattern.

```typescript
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router"
import appCss from "./globals.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Integrate Server-Side API with Tanstack Start createServerFn

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-variables

This snippet demonstrates how to define a server-side API call using `createServerFn` in a Tanstack Start project. It utilizes `zod` for input validation and securely accesses environment variables for API URL and authorization headers, ensuring secrets are not exposed client-side.

```typescript
import { createServerFn } from '@tanstack/solid-start'

// Server-side API calls (can use secret keys)
const fetchUserData = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const response = await fetch(
      `${process.env.EXTERNAL_API_URL}/users/${data.userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXTERNAL_API_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.json()
  })
```

--------------------------------

### Clone and Run TanStack Start Basic Example

Source: https://tanstack.com/start/latest/docs/framework/solid/quick-start

Clone the Basic example from TanStack router repository, install dependencies, and start the development server. This provides a working foundation to learn TanStack Start routing and features.

```bash
npx gitpick TanStack/router/tree/main/examples/solid/start-basic start-basic
cd start-basic
npm install
npm run dev
```

--------------------------------

### Install TanStack Start and Router Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Install core dependencies for TanStack Start including the start framework and router packages. These are required for the application to function.

```shell
npm i @tanstack/react-start @tanstack/react-router
```

--------------------------------

### Configure TypeScript Path Aliases in tsconfig.json

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/path-aliases

This JSON configuration updates the `compilerOptions` in `tsconfig.json` to define a path alias `~/*` mapping to the `./src/*` directory. This allows for shorter, absolute-like imports within the project.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

--------------------------------

### Import TanStack and React Libraries in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

Declares imports for TanStack Router components (createRootRouteWithContext, HeadContent, Link, Outlet, Scripts), React Query devtools, React Query types, and custom application components. Includes Vite client type reference for proper module resolution in Vite bundler environments.

```typescript
/// <reference types="vite/client" />
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'
```

--------------------------------

### Prevent Client-Side Exposure of Sensitive API Keys

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This TypeScript example illustrates the critical security practice of never exposing sensitive API keys to the client bundle. The incorrect example shows direct access via `import.meta.env`, which is compiled into the client. The correct approach uses a server-side function (`createServerFn`) to access `process.env.SECRET_API_KEY`, ensuring secrets remain on the server and are not accessible to the browser.

```typescript
// ❌ WRONG - Secret exposed to client bundle
const config = {
  apiKey: import.meta.env.VITE_SECRET_API_KEY, // This will be in your JS bundle!
}

// ✅ CORRECT - Keep secrets on server
const getApiData = createServerFn().handler(async () => {
  const response = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${process.env.SECRET_API_KEY}` },
  })
  return response.json()
})
```

--------------------------------

### Environment-Specific Observability Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Defines different observability strategies for development and production environments. Development emphasizes debugging with detailed logs and tracing, while production enables metrics and alerting while minimizing noise.

```TypeScript
// Different strategies per environment
const observabilityConfig = {
  development: {
    logLevel: 'debug',
    enableTracing: true,
    enableMetrics: false, // Too noisy in dev
  },
  production: {
    logLevel: 'warn',
    enableTracing: true,
    enableMetrics: true,
    enableAlerting: true,
  },
}
```

--------------------------------

### Add Deployment Script to package.json for Cloudflare Workers

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hosting

Updates the `scripts` section in `package.json` to include a `deploy` command. This script automates the build process of the TanStack Start application and then uses `wrangler deploy` to publish it to Cloudflare Workers.

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build && tsc --noEmit",
    "start": "node .output/server/index.mjs",
    "deploy": "npm run build && wrangler deploy"
  }
}
```

--------------------------------

### Configure Vite for Nitro Deployment with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hosting

This TypeScript code snippet integrates the Nitro plugin into the Vite configuration for a TanStack Start application. It imports `nitro/vite` and adds it to the `plugins` array, enabling deployment to a wide range of hostings supported by Nitro.

```typescript
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteSolid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [tanstackStart(), nitro(), viteSolid({ ssr: true })],
  nitro: {},
})
```

--------------------------------

### Throw Not Found Errors from Server Functions (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates how to throw a `notFound` error from `@tanstack/react-router` within a server function when a requested resource cannot be found. This provides a standardized way to signal missing resources, resulting in an appropriate client-side response, such as a 404 page.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'

export const getPost = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const post = await db.findPost(data.id)

    if (!post) {
      throw notFound()
    }

    return post
  })
```

--------------------------------

### POST /hello

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This endpoint showcases a POST request that accepts a JSON body with a 'name' field and returns a personalized greeting. It demonstrates how to handle request bodies and dynamic responses in a server route, which can be defined alongside a UI component in the same file.

```APIDOC
## POST /hello

### Description
This endpoint accepts a JSON body with a 'name' and returns a personalized greeting. It can be used from a client-side component to interact with the server.

### Method
POST

### Endpoint
/hello

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **name** (string) - Required - The name to include in the greeting message.

### Request Example
```json
{
  "name": "Tanner"
}
```

### Response
#### Success Response (200)
- **message** (string) - A personalized greeting message.

#### Response Example
```json
{
  "message": "Hello, Tanner!"
}
```
```

--------------------------------

### Enable Automatic Sitemap Generation in Vite Config

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/seo

Enables automatic sitemap generation with prerendering and link crawling enabled. The sitemap is generated at build time by crawling all discoverable pages from routes. Recommended for static or mostly-static sites with known structure.

```ts
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: 'https://myapp.com',
      },
    }),
  ],
})
```

--------------------------------

### Add Authorization Header to Client Request using Middleware (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

This TypeScript example demonstrates how to add an `Authorization` header to client-side requests using a middleware's `client` method. It defines an `authMiddleware` that intercepts the request, obtains an authentication token using `getToken()` from `my-auth-library`, and then injects a 'Bearer' token into the request headers before calling `next()`.

```typescript
import { getToken } from 'my-auth-library'

const authMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    return next({
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  },
)
```

--------------------------------

### Create Server Function with Middleware Array

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to attach middleware to a server function using the `middleware` property of `createServerFn`. The middleware wraps the handler and processes requests/responses through the defined middleware chain.

```typescript
import { createServerFn } from '@tanstack/react-start'
import { loggingMiddleware } from './middleware'

const fn = createServerFn()
  .middleware([loggingMiddleware])
  .handler(async () => {
    //...
  })
```

--------------------------------

### Render React Loader Component (JSX)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

This snippet illustrates the use of a `Loader` component within a React functional component's return statement. It typically indicates a loading state to the user, and is part of a larger component's JSX structure.

```jsx
      <Loader />
    </div>
  )
}
```

--------------------------------

### Display All Posts from Content Collections in TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This React component demonstrates how to access and display all posts from the 'content-collections' generated 'allPosts' array. It sorts the posts by publication date in descending order and renders them as a list, providing links to individual post pages using TanStack Router's 'Link' component.

```tsx
// src/routes/blog.index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
})

function BlogIndex() {
  // Posts are sorted by published date
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {sortedPosts.map((post) => (
          <li key={post.slug}>
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span>{post.published}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

--------------------------------

### Create Basic Server Middleware with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Define server-side middleware logic using the `.server` method which receives the next method, context, and request object. The middleware executes before nested middleware and passes results to the next handler in the chain.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(
  ({ next, context, request }) => {
    return next()
  },
)
```

--------------------------------

### Deploy TanStack Start application to Cloudflare Workers

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This command executes the `deploy` script defined in `package.json`, which builds the application and then uses Wrangler to deploy it to Cloudflare Workers. This is the final step for publishing the application.

```bash
pnpm run deploy
```

--------------------------------

### Clone and Run TanStack Start Basic Example

Source: https://tanstack.com/start/latest/docs/framework/react/quick-start

Clone the Basic example repository and set up the project locally. Uses gitpick to extract the specific example from the TanStack Router repository, then installs dependencies and starts the development server.

```bash
npx gitpick TanStack/router/tree/main/examples/react/start-basic start-basic
cd start-basic
npm install
npm run dev
```

--------------------------------

### Create File Route with Server-Side Loader

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Defines a TanStack router file route at /fetch-movies with a server-side loader that executes before page rendering. The loader calls the secure server function to fetch movie data and handles errors gracefully, always returning a valid data structure with either populated movies or an empty array with error message.

```typescript
export const Route = createFileRoute('/fetch-movies')({
  component: MoviesPage,
  loader: async (): Promise<{ movies: Movie[]; error: string | null }> => {
    try {
      const moviesData = await fetchPopularMovies()
      return { movies: moviesData.results, error: null }
    } catch (error) {
      console.error('Error fetching movies:', error)
      return { movies: [], error: 'Failed to load movies' }
    }
  },
})
```

--------------------------------

### Configure Cache Headers for TanStack Router Server Functions (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This snippet demonstrates how to apply `Cache-Control` and `CDN-Cache-Control` headers within a `createServerFn` handler in TanStack Router. Setting appropriate cache headers is crucial for optimizing content delivery network (CDN) caching and improving performance for server-side rendered data. It ensures that content is cached effectively while allowing for immediate revalidation when necessary.

```tsx
export const fetchDocs = createServerFn({ method: 'GET' })
  .inputValidator((params: FetchDocsParams) => params)
  .handler(async ({ data: { repo, branch, filePath }, context }) => {
    // Set cache headers for CDN caching
    context.response.headers.set(
      'Cache-Control',
      'public, max-age=0, must-revalidate',
    )
    context.response.headers.set(
      'CDN-Cache-Control',
      'max-age=300, stale-while-revalidate=300',
    )

    // ... fetch logic
  })
```

--------------------------------

### Execute NPM Start Script

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This `sh` command, `npm run start`, runs the `start` script defined in your `package.json`. It is used to launch the compiled TanStack Start application server, typically after the build process has completed. This allows your application to serve requests in a production-like environment.

```sh
npm run start
```

--------------------------------

### Create and Call Basic Server Function with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-functions

Demonstrates how to create a basic server function using createServerFn() that runs only on the server and can be called from anywhere in the application. The function returns server-only data like the current time using JavaScript's Date API.

```typescript
import { createServerFn } from '@tanstack/solid-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

--------------------------------

### Configure Organization and Website Schema in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This code snippet demonstrates how to add Schema.org Organization and WebSite structured data to the root route of a TanStack Start application. It includes metadata for the page's head, defining the application's name, URL, publisher details, and social media links for SEO and LLM optimization.

```tsx
// src/routes/__root.tsx
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'My App',
          url: 'https://myapp.com',
          publisher: {
            '@type': 'Organization',
            name: 'My Company',
            url: 'https://myapp.com',
            logo: 'https://myapp.com/logo.png',
            sameAs: [
              'https://twitter.com/mycompany',
              'https://github.com/mycompany',
            ],
          },
        }),
      },
    ],
  }),
  component: RootComponent,
})
```

--------------------------------

### Database Integration with TanStack Start Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/databases

Demonstrates how to create and use server functions to interact with any database provider. Shows examples of reading and writing data using TanStack Start's createServerFn API with a database client. This pattern works with any database provider as long as it can be called from server functions or routes.

```typescript
import { createServerFn } from '@tanstack/react-start'

const db = createMyDatabaseClient()

export const getUser = createServerFn().handler(async ({ context }) => {
  const user = await db.getUser(context.userId)
  return user
})

export const createUser = createServerFn({ method: 'POST' }).handler(
  async ({ data }) => {
    const user = await db.createUser(data)
    return user
  },
)
```

--------------------------------

### Understand Middleware Execution Order in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

This example visualizes the execution order of a complex middleware chain in TanStack Start, starting with global middleware, then dependency-first for nested middleware. The console logs within each middleware demonstrate the sequence of execution.

```tsx
const globalMiddleware1 = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    console.log('globalMiddleware1')
    return next()
  },
)

const globalMiddleware2 = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    console.log('globalMiddleware2')
    return next()
  },
)

const a = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  console.log('a')
  return next()
})

const b = createMiddleware({ type: 'function' })
  .middleware([a])
  .server(async ({ next }) => {
    console.log('b')
    return next()
  })

const c = createMiddleware({ type: 'function' })
  .middleware()
  .server(async ({ next }) => {
    console.log('c')
    return next()
  })

const d = createMiddleware({ type: 'function' })
  .middleware([b, c])
  .server(async () => {
    console.log('d')
  })

const fn = createServerFn()
  .middleware([d])
  .server(async () => {
    console.log('fn')
  })
```

--------------------------------

### Implement Client and Server-Side Error Handling (React/TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This code demonstrates robust error handling for both client and server environments. It uses a React ErrorBoundary component from 'react-error-boundary' for client-side UI error recovery and logging, and implements a try-catch block within a TanStack Router server function to log server errors with context and return user-friendly messages. This improves application resilience and aids in debugging.

```tsx
// Client-side error boundary
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: any) {
  // Log client errors
  console.error('[CLIENT ERROR]:', error)

  // Could also send to external service
  // sendErrorToService(error)

  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router />
    </ErrorBoundary>
  )
}

// Server function error handling
const riskyOperation = createServerFn().handler(async () => {
  try {
    return await performOperation()
  } catch (error) {
    // Log server errors with context
    console.error('[SERVER ERROR]:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      // Add request context if available
    })

    // Return user-friendly error
    throw new Error('Operation failed. Please try again.')
  }
})
```

--------------------------------

### Create Basic Request Middleware - TypeScript/TSX

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to create a simple request middleware using the createMiddleware function. This basic example shows the minimal setup needed to define server-side logic that will be executed for incoming requests.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})
```

--------------------------------

### Configure Environment-Specific Isomorphic Logging with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This snippet demonstrates how to create an isomorphic logger using `@tanstack/react-start`'s `createIsomorphicFn`. It provides different logging behaviors for server and client, and for development versus production environments. In development, it uses standard `console` logging; in production, it logs structured JSON on the server and includes a placeholder for analytics tracking on the client.

```tsx
// utils/logger.ts
import { createIsomorphicFn } from '@tanstack/react-start'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const logger = createIsomorphicFn()
  .server((level: LogLevel, message: string, data?: any) => {
    const timestamp = new Date().toISOString()

    if (process.env.NODE_ENV === 'development') {
      // Development: Detailed console logging
      console[level](`[${timestamp}] [${level.toUpperCase()}]`, message, data)
    } else {
      // Production: Structured JSON logging
      console.log(
        JSON.stringify({
          timestamp,
          level,
          message,
          data,
          service: 'tanstack-start',
          environment: process.env.NODE_ENV,
        }),
      )
    }
  })
  .client((level: LogLevel, message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console[level](`[CLIENT] [${level.toUpperCase()}]`, message, data)
    } else {
      // Production: Send to analytics service
      // analytics.track('client_log', { level, message, data })
    }
  })

// Usage anywhere in your app
export { logger }
```

```tsx
// Example usage
const fetchUserData = createServerFn().handler(async ({ data: userId }) => {
  logger('info', 'Fetching user data', { userId })

  try {
    const user = await db.users.findUnique({ where: { id: userId } })
    logger('info', 'User data fetched successfully', { userId })
    return user
  } catch (error) {
    logger('error', 'Failed to fetch user data', {
      userId,
      error: error.message,
    })
    throw error
  }
})
```

--------------------------------

### Securely access server-only environment variables in TanStack Start server functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This snippet demonstrates how to access sensitive environment variables, such as `DATABASE_URL` and `EXTERNAL_API_SECRET`, within server functions using `process.env`. These variables are never exposed to the client, ensuring data security.

```typescript
import { createServerFn } from '@tanstack/react-start'

// Database connection (server-only)
const connectToDatabase = createServerFn().handler(async () => {
  const connectionString = process.env.DATABASE_URL // No prefix needed
  const apiKey = process.env.EXTERNAL_API_SECRET // Stays on server

  // These variables are never exposed to the client
  return await database.connect(connectionString)
})

// Authentication (server-only)
const authenticateUser = createServerFn()
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const jwtSecret = process.env.JWT_SECRET // Server-only
    return jwt.verify(data.token, jwtSecret)
  })
```

--------------------------------

### Configure Environment Files with Hierarchy

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-variables

Set up environment files following TanStack Start's loading hierarchy (.env.local → .env.production → .env.development → .env). Demonstrates file organization for development, production, and local overrides with proper git exclusions.

```bash
# .env (committed to repository)
# Public configuration
VITE_APP_NAME=My TanStack Start App
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=https://...

# Server configuration templates
DATABASE_URL=postgresql://localhost:5432/myapp_dev
REDIS_URL=redis://localhost:6379
```

```bash
# .env.local (add to .gitignore)
# Override for local development
DATABASE_URL=postgresql://user:password@localhost:5432/myapp_local
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your-local-secret
```

```bash
# .env.production
# Production overrides
VITE_API_URL=https://api.myapp.com
DATABASE_POOL_SIZE=20
```

--------------------------------

### Customize Function ID Generation in TanStack Start Vite Config

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Configure custom function ID generation for server functions in production builds using the tanstackStart Vite plugin. The example uses SHA1 hashing based on filename and function name to create stable, deterministic IDs. Returning undefined falls back to the default SHA256 behavior.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      serverFns: {
        generateFunctionId: ({ filename, functionName }) => {
          // Return a custom ID string
          return crypto
            .createHash('sha1')
            .update(`${filename}--${functionName}`)
            .digest('hex')

          // If you return undefined, the default is used
          // return undefined
        },
      },
    }),
    react(),
  ],
})
```

--------------------------------

### Uninstall Next.js and Remove Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Remove Next.js and its associated configuration files (postcss.config and next.config) from the project. This is the first step in preparing your project for TanStack Start.

```shell
npm uninstall @tailwindcss/postcss next
rm postcss.config.* next.config.*
```

--------------------------------

### Create Server-Side API Function with TanStack React Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This TypeScript snippet demonstrates how to create a server-side function using `@tanstack/react-start`'s `createServerFn`. It safely fetches user data from an external API, protecting sensitive `EXTERNAL_API_SECRET` and `EXTERNAL_API_URL` by keeping them server-only. It uses Zod for input validation and handles API calls securely on the server.

```typescript
// src/lib/external-api.ts
import { createServerFn } from '@tanstack/react-start'

// Server-side API calls (can use secret keys)
const fetchUserData = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const response = await fetch(
      `${process.env.EXTERNAL_API_URL}/users/${data.userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXTERNAL_API_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.json()
  })
```

--------------------------------

### Modify package.json scripts for Cloudflare Workers deployment

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This snippet shows how to update the `scripts` section in `package.json` to include `preview`, `deploy`, and `cf-typegen` commands for Cloudflare Workers. It also removes the default `start` script to align with the deployment process.

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build && tsc --noEmit",
    "start": "node .output/server/index.mjs",
    "preview": "vite preview",
    "deploy": "npm run build && wrangler deploy",
    "cf-typegen": "wrangler types"
  }
}
```

--------------------------------

### GET /hello (Response.json Helper)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Returns a JSON response to the /hello endpoint using the convenient `Response.json` helper function, which automatically handles content-type and serialization.

```APIDOC
## GET /hello

### Description
Returns a JSON response with a 'Hello, World!' message, using the `Response.json` helper for convenience.

### Method
GET

### Endpoint
/hello

### Parameters
N/A

### Request Example
N/A

### Response
#### Success Response (200)
- **message** (string) - A greeting message.

#### Response Example
```json
{
  "message": "Hello, World!"
}
```
```

--------------------------------

### Install vite-tsconfig-paths Plugin

Source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

This command installs the `vite-tsconfig-paths` plugin as a development dependency. This plugin is essential for enabling TypeScript path aliases within a Vite-based project like TanStack Start.

```sh
npm install -D vite-tsconfig-paths
```

--------------------------------

### Handle POST Request Body in TanStack Router Server Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript example shows how to handle POST requests and access their JSON body in a TanStack Router server route. A `POST` handler is defined to asynchronously parse the request body using `request.json()` and then use the extracted data in the response.

```ts
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(`Hello, ${body.name}! வழிப`)
      },
    },
  },
})
```

--------------------------------

### Define TanStack Start Server Entry Interface

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

This TypeScript code block illustrates the expected interface for a server entry point in TanStack Start, adhering to the universal fetch handler format. It defines a default export with a `fetch` method that takes a `Request` and optional `RequestOptions`, returning a `Response` or `Promise<Response>`.

```ts
export default {
  fetch(req: Request, opts?: RequestOptions): Response | Promise<Response> {
    // ...
  },
}
```

--------------------------------

### Define and Call a Basic Server Function (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates creating a basic server function using `createServerFn().handler()` that executes server-side logic to return the current ISO timestamp. This function can be called seamlessly from any part of the application, including client code.

```tsx
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

--------------------------------

### Create TanStack Router Health Check Endpoint (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This snippet defines a server-side route for a health check endpoint using TanStack Router. It returns a JSON response containing system status, timestamp, uptime, memory usage, database connection status, and package version. This is essential for monitoring application health in production environments and can be easily integrated with external monitoring tools.

```tsx
// routes/health.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/health')({
  server: {
    handlers: {
      GET: async () => {
        const checks = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          database: await checkDatabase(),
          version: process.env.npm_package_version,
        }

        return Response.json(checks)
      },
    },
  },
})

async function checkDatabase() {
  try {
    await db.raw('SELECT 1')
    return { status: 'connected', latency: 0 }
  } catch (error) {
    return { status: 'error', error: error.message }
  }
}
```

--------------------------------

### Visualize TanStack Start Data Flow with Mermaid Diagram

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This Mermaid sequence diagram illustrates the complete data fetching and rendering process within a TanStack Start application. It details how user navigation triggers a server-side route loader, which calls an external API (TMDB) for movie data, and how the `MoviesPage` UI component renders based on the loader's response, including successful data or error states. This showcases the benefits of server-side rendering (SSR).

```mermaid
sequenceDiagram
    autonumber
    actor U as User
    participant R as Router (TanStack Start)
    participant L as Route Loader (/fetch-movies)
    participant A as External API (TMDB)
    participant V as MoviesPage (UI)

    U->>R: Navigate to /fetch-movies
    R->>L: Invoke loader (server-side)
    L->>A: GET /movie/popular\nAuthorization: Bearer <TOKEN>
    A-->>L: JSON TMDBResponse
    alt response.ok
        L-->>R: { movies, error: null }
        R->>V: Render SSR with movies
        V-->>U: HTML with movie grid
    else non-ok / error
        L-->>R: { movies: [], error: "Failed to load movies" }
        R->>V: Render SSR with error alert
        V-->>U: HTML with error state
    end

    note over L,V: Loader validates response.ok,\nreturns data or error for initial render
```

--------------------------------

### Apply Middleware to All Server Route Methods

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Configure middleware for all HTTP methods (GET, POST, etc.) in a server route by passing a middleware array to the `middleware` property in the method builder object.

```typescript
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

export const Route = createFileRoute('/foo')({
  server: {
    middleware: [loggingMiddleware],
    handlers: {
      GET: () => {
        //...
      },
      POST: () => {
        //...
      },
    },
  },
})
```

--------------------------------

### Initialize Sentry for Client and Server Error Tracking (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This snippet demonstrates how to initialize Sentry for both client-side React applications and server functions in a TanStack Start project. It shows how to configure the DSN and environment for client-side error reporting and how to capture exceptions within server functions.

```tsx
// Client-side (app.tsx)
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

--------------------------------

### Create .env File for Environment Variables

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Generate a new '.env' file in the project's root directory. This file will be used to store sensitive information such as API keys.

```bash
touch .env
```

--------------------------------

### Fetch Public Client-Side Data with TanStack Query

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This TypeScript function `usePublicData` utilizes TanStack Query (`useQuery`) to fetch public data from a client-accessible API. It uses `import.meta.env.VITE_PUBLIC_API_URL` for the API endpoint, which is prefixed for client-side exposure. This approach is suitable for non-sensitive data that can be exposed in the client bundle.

```typescript
// Client-side API calls (public endpoints only)
export function usePublicData() {
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

  return useQuery({
    queryKey: ['public-data'],
    queryFn: () => fetch(`${apiUrl}/public/stats`).then((r) => r.json()),
  })
}
```

--------------------------------

### Authenticate Wrangler with Cloudflare account

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

These commands initiate the login process for the Wrangler CLI, allowing authentication with a Cloudflare account. It is necessary before deploying applications to Cloudflare Workers, supporting both `npx` and `pnpm dlx` methods.

```bash
npx wrangler login
```

```bash
pnpm dlx wrangler login
```

--------------------------------

### Enable Path Aliases in Vite Config using vite-tsconfig-paths

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/path-aliases

This TypeScript configuration updates `vite.config.ts` to import and register the `viteTsConfigPaths` plugin. It ensures that Vite correctly resolves path aliases defined in the `tsconfig.json` file for the project.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
```

--------------------------------

### Configure Netlify Redirects for Server Functions and Routes

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/spa-mode

This `_redirects` configuration for Netlify allows specific subpaths, such as `/_serverFn/*` for server functions and `/api/*` for server routes, to be routed to the backend. It also includes the essential catch-all redirect for the SPA shell, ensuring both server-side features and client-side routing work correctly.

```plaintext
# Allow requests to /_serverFn/* to be routed through to the server (If you have configured your server function base path to be something other than /_serverFn, use that instead)
/_serverFn/* /_serverFn/:splat 200

# Allow any requests to /api/* to be routed through to the server (Server routes can be created at any path, so you must ensure that any server routes you want to use are under this path, or simply add additional redirects for each server route base you want to expose)
/api/* /api/:splat 200

# Catch all other 404 requests and rewrite them to the SPA shell
/* /_shell.html 200
```

--------------------------------

### Implement Detailed Logging in TanStack Start Server Functions (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This code illustrates how to add custom logging to a TanStack Start server function. It tracks the start and end of an operation, logs success or failure, and measures execution duration, providing basic observability without external tools.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getUser = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const startTime = Date.now()

    try {
      console.log(`[SERVER] Fetching user ${id}`)

      const user = await db.users.findUnique({ where: { id } })

      if (!user) {
        console.log(`[SERVER] User ${id} not found`)
        throw new Error('User not found')
      }

      const duration = Date.now() - startTime
      console.log(`[SERVER] User ${id} fetched in ${duration}ms`)

      return user
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(
        `[SERVER] Error fetching user ${id} after ${duration}ms:`,
        error,
      )
      throw error
    }
  })
```

--------------------------------

### Combine Global and Specific Middleware in TanStack Router Server Routes

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript/TSX example illustrates the combination of route-level and handler-specific middleware in a TanStack Router server route. 'authMiddleware' is applied to all requests at the route level, while 'validationMiddleware' is specifically applied to the POST handler after the route-level middleware. This setup enables layered middleware application, ensuring global policies are enforced before specific handler validations.

```tsx
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    middleware: [authMiddleware], // Runs first for all handlers
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: async ({ request }) => {
          return new Response('Hello, World!')
        },
        POST: {
          middleware: [validationMiddleware], // Runs after authMiddleware, only for POST
          handler: async ({ request }) => {
            const body = await request.json()
            return new Response(`Hello, ${body.name}! `)
          },
        },
      }),
  },
})
```

--------------------------------

### Configure Nitro Plugin with Bun Preset in Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This TypeScript snippet shows how to configure the `nitro()` plugin in `vite.config.ts` with the `preset: 'bun'` option. This specific preset optimizes Nitro's output for deployment on the Bun runtime, ensuring compatibility and performance. It assumes the `nitro/vite` package is installed and you are targeting a Bun environment.

```ts
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), nitro({ preset: 'bun' }), viteReact()],
})
```

--------------------------------

### Implement Server Routes with Handlers in TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Illustrates how to create file-based server routes in TanStack Start, defining API endpoints with specific HTTP method handlers. The `createFileRoute` function combined with `server.handlers` allows for managing server-side request processing, like a GET request returning JSON.

```ts
export const Route = createFileRoute('/api/hello')({
  server: {
     handlers: {
       GET: async () => {
         return Response.json("Hello, World!")
       }
    }
  }
})
```

--------------------------------

### Integrate New Relic React Script in TanStack Start Root Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Add New Relic browser monitoring to TanStack Start SPA by including the integration script in the root route. Supports both inline script content and external file reference from the public folder.

```typescript
// __root.tsx
export const Route = createRootRoute({
  head: () => ({
    scripts: [
      {
        id: 'new-relic',

        // either copy/paste your New Relic integration script here
        children: `...`,

        // or you can create it in your public folder and then reference it here
        src: '/newrelic.js',
      },
    ],
  }),
})
```

--------------------------------

### Define Feature Flags using Environment Variables in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-variables

This snippet illustrates how to define feature flags based on environment variables. It provides a central `featureFlags` object that can be used throughout the application to conditionally render components or enable/disable features.

```typescript
export const featureFlags = {
  enableNewDashboard: import.meta.env.VITE_ENABLE_NEW_DASHBOARD === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
}
```

--------------------------------

### Allow Server Functions and Routes with Netlify Redirects (_redirects)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This snippet expands on basic redirects by demonstrating how to allow-list specific subpaths for server functions and API routes in a Netlify `_redirects` file. It ensures that requests to paths like `/_serverFn/*` and `/api/*` are routed to the server, while all other unmatched requests default to the SPA shell.

```plaintext
# Allow requests to /_serverFn/* to be routed through to the server (If you have configured your server function base path to be something other than /_serverFn, use that instead)
/_serverFn/* /_serverFn/:splat 200

# Allow any requests to /api/* to be routed through to the server (Server routes can be created at any path, so you must ensure that any server routes you want to use are under this path, or simply add additional redirects for each server route base you want to expose)
/api/* /api/:splat 200

# Catch all other 404 requests and rewrite them to the SPA shell
/* /_shell.html 200
```

--------------------------------

### Send Server Context to TanStack Start Client Middleware

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

This snippet demonstrates how to pass data from a server-side middleware to a client-side middleware in TanStack Start. The `serverTimer` middleware sends the current time using `sendContext`, which is then accessed by the `requestLogger` client middleware via `result.context.timeFromServer`.

```tsx
const serverTimer = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    return next({
      sendContext: {
        // Send the current time to the client
        timeFromServer: new Date(),
      },
    })
  },
)

const requestLogger = createMiddleware({ type: 'function' })
  .middleware([serverTimer])
  .client(async ({ next }) => {
    const result = await next()
    // Woah! We have the time from the server!
    console.log('Time from the server:', result.context.timeFromServer)

    return result
  })
```

--------------------------------

### Fetch Data using TanStack Start Loader (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Demonstrates the TanStack Start approach to data fetching by integrating it into a route's `loader` function. Data fetched server-side via the loader is then accessed by the component using `Route.useLoaderData()`, streamlining data provision compared to direct `async` component fetching.

```tsx
export const Route = createFileRoute('/')({
  component: Page,
  loader: async () => {
    const res = await fetch('https://api.vercel.app/blog')
    return res.json()
  },
})

function Page() {
  const posts = Route.useLoaderData()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

--------------------------------

### GET /hello (Manual JSON Response)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Returns a JSON response to the /hello endpoint, demonstrating how to manually set the 'Content-Type' header and stringify the JSON object.

```APIDOC
## GET /hello

### Description
Returns a JSON response with a 'Hello, World!' message, manually setting the Content-Type header.

### Method
GET

### Endpoint
/hello

### Parameters
N/A

### Request Example
N/A

### Response
#### Success Response (200)
- **message** (string) - A greeting message.

#### Response Example
```json
{
  "message": "Hello, World!"
}
```
```

--------------------------------

### Implement Logging in TanStack Start Server Functions (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This example shows how to add detailed logging to a TanStack Start server function. It tracks execution start and end times, logs successful data fetches, and records errors, including duration, for better performance and error monitoring.

```tsx
import { createServerFn } from '@tanstack/solid-start'

const getUser = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const startTime = Date.now()

    try {
      console.log(`[SERVER] Fetching user ${id}`)

      const user = await db.users.findUnique({ where: { id } })

      if (!user) {
        console.log(`[SERVER] User ${id} not found`)
        throw new Error('User not found')
      }

      const duration = Date.now() - startTime
      console.log(`[SERVER] User ${id} fetched in ${duration}ms`)

      return user
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(
        `[SERVER] Error fetching user ${id} after ${duration}ms:`,
        error,
      )
      throw error
    }
  })
```

--------------------------------

### Configure Basic Netlify Redirect for SPA Shell

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/spa-mode

This example shows a basic Netlify `_redirects` file configuration. It sets up a catch-all redirect to ensure that all 404 requests are rewritten to the SPA shell (`/_shell.html`), which is crucial for client-side routing in a static deployment.

```plaintext
# Catch all other 404 requests and rewrite them to the SPA shell
/* /_shell.html 200
```

--------------------------------

### Suppress hydration warnings for known mismatches

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Uses React's suppressHydrationWarning attribute as a last resort for small, known-different nodes. This silences hydration mismatch warnings for elements that will inevitably differ between server and client renders, such as timestamps using Date.now().

```typescript
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>
```

--------------------------------

### Configure Default SSR Behavior with createStart in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

This configuration demonstrates how to set a global default for Server-Side Rendering (SSR) behavior across all routes in your TanStack Start application. By setting `defaultSsr` to `false` within `createStart`, all routes will default to disabling SSR unless explicitly overridden at the route level.

```tsx
// src/start.ts
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  // Disable SSR by default
  defaultSsr: false,
}))
```

--------------------------------

### Access runtime server environment variables on client in TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This solution demonstrates how to securely pass environment variables, which are only available at runtime on the server (e.g., from `process.env`), to the client-side. It utilizes `createServerFn` to create a server-side handler that fetches the variable, and then integrates it into a TanStack Router loader to make it accessible within a React component.

```tsx
const getRuntimeVar = createServerFn({ method: 'GET' }).handler(() => {
  return process.env.MY_RUNTIME_VAR // notice `process.env` on the server, and no `VITE_` prefix
})

export const Route = createFileRoute('/')({
  loader: async () => {
    const foo = await getRuntimeVar()
    return { foo }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { foo } = Route.useLoaderData()
  // ... use your variable however you want
}
```

--------------------------------

### Create New Relic Transaction Middleware for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Middleware component for monitoring server functions and server routes in TanStack Start. Sets controller name and HTTP method for each request to enable transaction tracking. Works in conjunction with the main SSR configuration.

```typescript
// newrelic-middleware.ts
import newrelic from 'newrelic'
import { createMiddleware } from '@tanstack/react-start'

export const nrTransactionMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const reqPath = new URL(request.url).pathname
    newrelic.setControllerName(reqPath, request.method ?? 'GET')
    return await next()
  },
)
```

--------------------------------

### Add Authoritative Attribution to Posts in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This snippet shows how to include author information and publication details in the head metadata of a TanStack Start route. By providing 'author' and 'article:published_time' properties, it adds authority signals for AI systems processing content like blog posts.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.post.title },
      { name: 'author', content: loaderData.post.author.name },
      {
        property: 'article:author',
        content: loaderData.post.author.profileUrl,
      },
      {
        property: 'article:published_time',
        content: loaderData.post.publishedAt,
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Protect Routes with beforeLoad Guards - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/authentication

Implements route protection using beforeLoad hooks to verify user authentication before rendering protected pages. Uses getCurrentUserFn to fetch user data and redirects unauthenticated users to login while preserving the original location. The user context is passed to child routes via return value.

```typescript
// routes/_authed.tsx - Layout route for protected pages
import { createFileRoute, redirect } from '@tanstack/solid-router'
import { getCurrentUserFn } from '../server/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()

    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    // Pass user to child routes
    return { user }
  },
})
```

```typescript
// routes/_authed/dashboard.tsx - Protected route
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/_authed/dashboard')({
  component: DashboardComponent,
})

function DashboardComponent() {
  const context = Route.useRouteContext()

  return (
    <div>
      <h1>Welcome, {context().user.email}!</h1>
      {/* Dashboard content */}
    </div>
  )
}
```

--------------------------------

### Define Basic TanStack Router Server Route with GET Handler

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript snippet demonstrates how to create a basic server route in TanStack Router for the path '/hello'. It defines a simple GET handler that processes the incoming 'request' and returns a 'Hello, World!' 'Response'. This approach is suitable for straightforward API endpoints without complex logic or middleware.

```ts
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World! from ' + request.url)
      },
    },
  },
})
```

--------------------------------

### Apply Global Middleware to All TanStack Router Server Route Handlers

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript/TSX code demonstrates how to apply middleware universally to all handlers defined within a TanStack Router server route. The 'middleware' property at the server level accepts an array of middleware functions, such as 'authMiddleware' and 'loggerMiddleware', which will execute for every incoming GET or POST request to this route. This provides a convenient way to enforce common policies across all route handlers.

```tsx
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    middleware: [authMiddleware, loggerMiddleware], // Applies to all handlers
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World! from ' + request.url)
      },
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(`Hello, ${body.name}! `)
      },
    },
  },
})
```

--------------------------------

### Render MoviesPage Component with TanStack Start Loader Data (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This TypeScript React component (`MoviesPage.tsx`) consumes movie data and potential errors from a TanStack Start route loader using `Route.useLoaderData()`. It dynamically renders a grid of `MovieCard` components, displays a loading indicator, or presents an error message if data retrieval fails. The component leverages Tailwind CSS for styling and includes accessibility attributes.

```tsx
// MoviesPage component
const MoviesPage = () => {
  const { movies, error } = Route.useLoaderData()<{
    movies: Movie[]
    error: string | null
  }>()

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 text-white"
      style={{
        backgroundColor: '#000',
        backgroundImage:
          'radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)',
      }}
      role="main"
      aria-label="Popular Movies Section"
    >
      <div className="w-full max-w-6xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-3xl mb-6 font-bold text-center">Popular Movies</h1>

        {error && (
          <div
            className="text-red-400 text-center mb-4 p-4 bg-red-900/20 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        {movies.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            aria-label="Movie List"
          >
            {movies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center text-gray-400" role="status">
              Loading movies...
            </div>
          )
        )}
      </div>
    </div>
  )
}
```

--------------------------------

### Handle Errors in Server Functions (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Shows how server functions can throw standard JavaScript errors. These errors are serialized and propagated to the client, allowing for client-side `try-catch` blocks to gracefully handle server-side failures and display appropriate messages to the user.

```tsx
import { createServerFn } from '@tanstack/react-start'

export const riskyFunction = createServerFn().handler(async () => {
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong!')
  }
  return { success: true }
})

// Errors are serialized to the client
try {
  await riskyFunction()
} catch (error) {
  console.log(error.message) // "Something went wrong!"
}
```

--------------------------------

### Configure Session Management with HTTP-Only Cookies

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Sets up secure session management using TanStack Start's useSession hook with HTTP-only cookie configuration. Defines a SessionData type containing userId, email, and role, and configures cookie security settings including secure flag for production, sameSite protection, and httpOnly flag to prevent client-side access.

```typescript
// utils/session.ts
import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  userId?: string
  email?: string
  role?: string
}

export function useAppSession() {
  return useSession<SessionData>({
    // Session configuration
    name: 'app-session',
    password: process.env.SESSION_SECRET!, // At least 32 characters
    // Optional: customize cookie settings
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  })
}
```

--------------------------------

### Combine Server Route Handler and UI Component in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-routes

Creates a unified route file that defines both a POST server handler and a UI component. The server handler processes JSON requests from the client, while the component provides a button that fetches data from the server endpoint using the Fetch API.

```typescript
// routes/hello.tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(JSON.stringify({ message: `Hello, ${body.name}!` }))
      },
    },
  },
  component: HelloComponent,
})

function HelloComponent() {
  const [reply, setReply] = createSignal('')

  return (
    <div>
      <button
        onClick={() => {
          fetch('/hello', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'Tanner' }),
          })
            .then((res) => res.json())
            .then((data) => setReply(data.message))
        }}
      >
        Say Hello
      </button>
    </div>
  )
}
```

--------------------------------

### Configure TMDB Authentication Token in .env

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Add your TMDB API bearer token to the '.env' file. Remember to replace 'your_bearer_token_here' with your actual token and ensure '.env' is in '.gitignore' for security.

```dotenv
TMDB_AUTH_TOKEN=your_bearer_token_here
```

--------------------------------

### Configure SPA Shell Mask Path in TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This code demonstrates how to customize the shell mask path in TanStack Start's SPA mode configuration within `vite.config.ts`. The `spa.maskPath` option allows specifying a different pathname for generating the SPA shell, though the default '/' is generally recommended.

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        maskPath: '/app',
      },
    }),
  ],
})
```

--------------------------------

### Add Tailwind CSS v3 base, components, and utilities directives

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

This CSS snippet adds the core Tailwind CSS directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) to the main application stylesheet. These directives are crucial for Tailwind CSS version 3 to inject its generated styles into the CSS bundle.

```css
/* src/styles/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

--------------------------------

### Implement Password Reset Flow with Token Management in TanStack React Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

This snippet demonstrates a complete password reset mechanism. It includes two `createServerFn` handlers: one for requesting a password reset (generating and saving a token, then sending an email) and another for confirming the reset (validating the token, hashing the new password, updating user data, and deleting the token).

```tsx
// Password reset request
export const requestPasswordResetFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const user = await getUserByEmail(data.email)
    if (!user) {
      // Don't reveal if email exists
      return { success: true }
    }

    const token = generateSecureToken()
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await savePasswordResetToken(user.id, token, expires)
    await sendPasswordResetEmail(user.email, token)

    return { success: true }
  })

// Password reset confirmation
export const resetPasswordFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { token: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const resetToken = await getPasswordResetToken(data.token)

    if (!resetToken || resetToken.expires < new Date()) {
      return { error: 'Invalid or expired token' }
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 12)
    await updateUserPassword(resetToken.userId, hashedPassword)
    await deletePasswordResetToken(data.token)

    return { success: true }
  })
```

--------------------------------

### Configure TanStack Router Root Route in React with Vite

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-cloudflare

This TypeScript React (TSX) snippet defines the main root route for a TanStack Start application. It configures critical HTML `head` elements like meta tags for SEO, viewport settings, stylesheets (e.g., `app.css`), favicons, and external scripts. It also establishes the application's error and not-found components, and defines the `RootDocument` shell for consistent page layout and navigation.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Define Root Route Component in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/routing

This TypeScript code defines the root route (`__root.tsx`) for a TanStack Start application. It uses `createRootRoute` to configure document head metadata, renders the `RootComponent` which includes `Outlet` for child routes, and wraps the application in `RootDocument` for basic HTML structure, including `HeadContent` and `Scripts` components.

```tsx
// src/routes/__root.tsx
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Create Root Route Component for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Create src/routes/__root.tsx file that serves as the entry point for all routes in the application. It sets up HTML metadata, wraps all routes with Outlet, and includes necessary TanStack Start components like HeadContent and Scripts.

```typescript
// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### GET /hello

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This endpoint demonstrates a simple GET request to a server route, returning a static 'Hello, World!' message. It illustrates the basic structure for defining a GET handler within a TanStack Start server route.

```APIDOC
## GET /hello

### Description
This endpoint returns a simple 'Hello, World!' message from the server.

### Method
GET

### Endpoint
/hello

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **Body** (string) - A plain text greeting.

#### Response Example
"Hello, World!"
```

--------------------------------

### Configure Automatic Sitemap Generation with Prerendering in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Enable automatic sitemap generation within TanStack Start's Vite configuration by combining prerendering with link crawling. By setting `prerender.crawlLinks` to true and `sitemap.enabled` to true, the framework discovers all linkable pages and generates a comprehensive sitemap.xml file at build time, significantly improving SEO.

```ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true, // Discovers all linkable pages
      },
      sitemap: {
        enabled: true,
        host: 'https://myapp.com',
      },
    }),
  ],
})
```

--------------------------------

### Return JSON Response Using Response.json Helper in TanStack Router Server Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This TypeScript example illustrates using the `Response.json` helper function to simplify returning a JSON response in a TanStack Router server route. This helper automatically sets the `Content-Type` header to `application/json` and serializes the provided object, reducing boilerplate.

```ts
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({ message: 'Hello, World!' })
      }
    }
  }
})
```

--------------------------------

### Define TanStack Start environment variables across different .env files

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This snippet illustrates the hierarchical loading order of `.env` files in TanStack Start: `.env.local`, `.env.production`, `.env.development`, and `.env`. It shows how to define public and server-only variables and how local and production-specific files can override defaults.

```bash
# .env (committed to repository):
# Public configuration
VITE_APP_NAME=My TanStack Start App
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=https://...

# Server configuration templates
DATABASE_URL=postgresql://localhost:5432/myapp_dev
REDIS_URL=redis://localhost:6379
```

```bash
# .env.local (add to .gitignore):
# Override for local development
DATABASE_URL=postgresql://user:password@localhost:5432/myapp_local
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your-local-secret
```

```bash
# .env.production:
# Production overrides
VITE_API_URL=https://api.myapp.com
DATABASE_POOL_SIZE=20
```

--------------------------------

### POST /hello

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Handles POST requests to the /hello endpoint, processing a JSON request body and returning a greeting.

```APIDOC
## POST /hello

### Description
Handles POST requests to the /hello endpoint, processing a JSON request body and returning a greeting.

### Method
POST

### Endpoint
/hello

### Parameters
#### Request Body
- **name** (string) - Required - The name of the person to greet.

### Request Example
```json
{
  "name": "Tanner"
}
```

### Response
#### Success Response (200)
- **body** (string) - A greeting message including the provided name.

#### Response Example
```
Hello, Tanner!
```
```

--------------------------------

### Create Machine-Readable API Endpoint for Product Listings in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This code defines a server-side GET handler for a TanStack Start route that serves product data in a machine-readable Schema.org ItemList format. It allows AI systems and developers to consume product information, supporting filtering by category via URL search parameters.

```ts
// src/routes/api/products.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const category = url.searchParams.get('category')

        const products = await fetchProducts({ category })

        return Response.json({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: product.name,
              description: product.description,
              url: `https://myapp.com/products/${product.id}`,
            },
          })),
        })
      },
    },
  },
})
```

--------------------------------

### General Observability Tool Integration Pattern for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This code illustrates a common pattern for integrating observability tools into a TanStack Start application. It involves initializing the tool at the app's entry point and using a middleware to wrap server functions with tracing and error capturing logic provided by the observability tool.

```tsx
import { initObservabilityTool } from 'your-tool'

initObservabilityTool({
  dsn: import.meta.env.VITE_TOOL_DSN,
  environment: import.meta.env.NODE_ENV,
})

const observabilityMiddleware = createMiddleware().handler(async ({ next }) => {
  return yourTool.withTracing('server-function', async () => {
    try {
      return await next()
    } catch (error) {
      yourTool.captureException(error)
      throw error
    }
  })
})
```

--------------------------------

### Protect TanStack Router Routes with beforeLoad for Authentication

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

This snippet demonstrates how to protect routes in a TanStack React Router application using the `beforeLoad` function. It checks for a current user and redirects to a login page if the user is not authenticated, passing the original `location.href` as a redirect parameter. It also shows how to access the user context in child routes.

```tsx
// routes/_authed.tsx - Layout route for protected pages
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUserFn } from '../server/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()

    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    // Pass user to child routes
    return { user }
  },
})
```

```tsx
// routes/_authed/dashboard.tsx - Protected route
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
  component: DashboardComponent,
})

function DashboardComponent() {
  const { user } = Route.useRouteContext()

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      {/* Dashboard content */}
    </div>
  )
}
```

--------------------------------

### Set Custom HTTP Status Code in TanStack Router Server Handler (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This code snippet demonstrates how to return a specific HTTP status code (e.g., 404 Not Found) from a TanStack Router server-side GET handler. It checks if a user is found and, if not, constructs a new `Response` object with a `status` property set to 404.

```typescript
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const user = await findUser(params.id)
        if (!user) {
          return new Response('User not found', {
            status: 404,
          })
        }
        return Response.json(user)
      }
    }
  }
})
```

--------------------------------

### Configure Sentry for Error Tracking in TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This snippet demonstrates how to initialize Sentry for both client-side and server-side code in a TanStack Start application. It captures exceptions from server functions and provides environment-specific configuration using DSN and environment variables.

```tsx
// Client-side (app.tsx)
import * as Sentry from '@sentry/solid'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

--------------------------------

### Adapt Home Page from Next.js to TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Convert a Next.js page component to TanStack Start format by creating an index.tsx file and using createFileRoute for the root route. The component structure changes from a default export to a named function with route definition.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ 
  component: Home,
})

function Home() {
  return (
    <main className="min-h-dvh w-screen flex items-center justify-center flex-col gap-y-4 p-4">
      <img
        className="max-w-sm w-full"
        src="https://raw.githubusercontent.com/TanStack/tanstack.com/main/public/images/logos/splash-dark.png"
        alt="TanStack Logo"
      />
      <h1>
        <span className="line-through">Next.js</span> TanStack Start
      </h1>
      <a
        className="bg-foreground text-background rounded-full px-4 py-1 hover:opacity-90"
        href="https://tanstack.com/start/latest"
        target="_blank"
      >
        Docs
      </a>
    </main>
  )
}
```

--------------------------------

### Install Wrangler CLI for Cloudflare Workers Deployment

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hosting

Installs the `wrangler` command-line interface as a development dependency. Wrangler is the official tool for developing, managing, and deploying applications to Cloudflare Workers, providing necessary utilities for the deployment workflow.

```bash
pnpm add wrangler -D
```

--------------------------------

### Configure New Relic Agent for TanStack Start SSR

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Initialize New Relic agent configuration for server-side rendering in TanStack Start. This configuration file sets up the Node.js agent with license key, distributed tracing, and span/transaction event tracking. Required as the foundational step for SSR monitoring.

```javascript
// newrelic.js - New Relic agent configuration
exports.config = {
  app_name: ['YourTanStackApp'], // Your application name in New Relic
  license_key: 'YOUR_NEW_RELIC_LICENSE_KEY', // Your New Relic license key
  agent_enabled: true,
  distributed_tracing: { enabled: true },
  span_events: { enabled: true },
  transaction_events: { enabled: true },
  // Additional default settings
}
```

--------------------------------

### Launch TanStack Start Server with New Relic Agent

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Command to start the TanStack Start server with New Relic agent enabled. Uses the -r flag to preload the newrelic module before the application starts.

```bash
node -r newrelic .output/server/index.mjs
```

--------------------------------

### Configure Vite for TanStack Start with Tailwind CSS

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Set up vite.config.ts with TanStack Start plugin, Vite React plugin, TypeScript path resolution, and Tailwind CSS integration. Configures the routes directory as 'app' to match Next.js App Router conventions and sets dev server port to 3000.

```typescript
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: 'src',
      router: {
        routesDirectory: 'app',
      },
    }),
    viteReact(),
  ],
})
```

--------------------------------

### Define a simple GET server route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This example demonstrates how to create a basic server-side GET endpoint in a TanStack Start application. It uses `createFileRoute` to define a route at `/hello` and includes a `GET` handler that returns a simple 'Hello, World!' text response. This route is automatically handled by the TanStack Start server.

```ts
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

--------------------------------

### Create Basic Server Route Handler in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/server-routes

Defines a simple server route using createFileRoute with a GET handler that returns a basic HTTP response. The route is automatically created based on the file location in the routes directory and executes on the server when the corresponding path is accessed.

```typescript
// routes/hello.ts
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

--------------------------------

### Access Environment Variables in Server Functions

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/environment-variables

Demonstrates accessing environment variables in server functions using createServerFn(). Server functions can access any environment variable via process.env without the VITE_ prefix, including sensitive credentials that never reach the client.

```typescript
import { createServerFn } from '@tanstack/solid-start'

// Database connection (server-only)
const connectToDatabase = createServerFn().handler(async () => {
  const connectionString = process.env.DATABASE_URL // No prefix needed
  const apiKey = process.env.EXTERNAL_API_SECRET // Stays on server

  // These variables are never exposed to the client
  return await database.connect(connectionString)
})

// Authentication (server-only)
const authenticateUser = createServerFn()
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const jwtSecret = process.env.JWT_SECRET // Server-only
    return jwt.verify(data.token, jwtSecret)
  })
```

--------------------------------

### Integrate Server Functions into Route Loaders and Components (TanStack React Start)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Shows practical examples of invoking server functions from different parts of a TanStack application. Server functions are ideal for data fetching in route loaders and can be integrated into React components using the `useServerFn()` hook for client-side calls, often paired with `useQuery()`.

```tsx
// In a route loader
export const Route = createFileRoute('/posts')({
  loader: () => getPosts(),
})

// In a component
function PostList() {
  const getPosts = useServerFn(getServerPosts)

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })
}
```

--------------------------------

### Install Netlify Vite Plugin for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

This step installs the `@netlify/vite-plugin-tanstack-start` package as a development dependency. The plugin is crucial for configuring your TanStack Start application's build process specifically for Netlify deployment and enables local Netlify production platform emulation. It requires npm or pnpm.

```bash
npm install --save-dev @netlify/vite-plugin-tanstack-start
```

```bash
pnpm add --save-dev @netlify/vite-plugin-tanstack-start
```

--------------------------------

### Monitor TanStack Router Loader and Render Performance (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This code snippet demonstrates how to track the loading and rendering performance of a route in a TanStack Router application. It logs server-side loader duration and client-side component render time to the console. This is useful for identifying performance bottlenecks in both SSR and client-side rendering.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  loader: async ({ context }) => {
    const startTime = Date.now()

    try {
      const data = await loadDashboardData()
      const duration = Date.now() - startTime

      // Log server-side performance
      if (typeof window === 'undefined') {
        console.log(`[SSR] Dashboard loaded in ${duration}ms`)
      }

      return data
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(`[LOADER] Dashboard error after ${duration}ms:`, error)
      throw error
    }
  },
  component: Dashboard,
})

function Dashboard() {
  const data = Route.useLoaderData()

  // Track client-side render time
  React.useEffect(() => {
    const renderTime = performance.now()
    console.log(`[CLIENT] Dashboard rendered in ${renderTime}ms`)
  }, [])

  return <div>Dashboard content</div>
}
```

--------------------------------

### Install Tailwind CSS v4 and Vite plugin with npm

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

This command installs Tailwind CSS version 4 and its dedicated Vite plugin as project dependencies. These are required for using the latest version of Tailwind CSS with a TanStack Start application.

```shell
npm install tailwindcss @tailwindcss/vite
```

--------------------------------

### Install Cloudflare Vite Plugin for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hosting

Installs the `@cloudflare/vite-plugin` as a development dependency. This plugin is essential for integrating TanStack Start applications with Cloudflare Workers during the build process, enabling server-side rendering and deployment.

```bash
pnpm install @cloudflare/vite-plugin -D
```

--------------------------------

### Generate Tailwind CSS v3 configuration files

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

This command initializes the `tailwind.config.js` and `postcss.config.js` files for Tailwind CSS version 3. The `-p` flag ensures that PostCSS configuration is also set up, providing the necessary environment for Tailwind v3.

```shell
npx tailwindcss init -p
```

--------------------------------

### Override Error Boundary per Route in TanStack Router (TSX)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/error-boundaries

This snippet shows how to define a custom error component for a specific route in TanStack Router, overriding the global default. It uses the `errorComponent` property within `createFileRoute` to assign a `PostError` component, providing fine-grained error handling for individual routes.

```tsx
// src/routes/posts.$postId.tsx
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

function PostError({ error, reset }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
  errorComponent: PostError,
})
```

--------------------------------

### Initialize TanStack Router with Configuration and Components

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

This snippet demonstrates how to configure a TanStack Router instance. It includes definitions for head metadata (like favicons), custom error and not-found components, and specifies the main application component (`RootComponent`) to be used by the router.

```typescript
  errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})
```

--------------------------------

### Configure TypeScript for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Create a tsconfig.json file with recommended compiler options for TanStack Start development. These settings enable JSX support, ES2022 target, and strict null checking.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ES2022",
    "skipLibCheck": true,
    "strictNullChecks": true
  }
}
```

--------------------------------

### Apply New Relic Middleware to TanStack Start Instance

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Configure TanStack Start application to use New Relic transaction middleware. Integrates the middleware into the request lifecycle for monitoring server functions and routes.

```typescript
// start.ts
import { createStart } from '@tanstack/react-start'
import { nrTransactionMiddleware } from './newrelic-middleware'

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [nrTransactionMiddleware],
  }
})
```

--------------------------------

### Create Type-Safe TanStack Start Server Entry

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

This example demonstrates how to create a type-safe server entry point in TanStack Start using `createServerEntry`. It imports a default handler and wraps its `fetch` method, typically residing in `src/server.ts`, to ensure proper server-side rendering and request handling.

```tsx
// src/server.ts
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request)
  },
})
```

--------------------------------

### Implement Basic In-Memory Error Reporting and Admin Route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This snippet provides a basic, dependency-free error reporting mechanism that stores errors in an in-memory `Map`. It tracks error occurrences and their last seen timestamp. It also defines a server-side route for `/admin/errors` to expose the collected error data via a JSON endpoint.

```tsx
// utils/error-reporter.ts
const errorStore = new Map<
  string,
  { count: number; lastSeen: Date; error: any }
>()

export function reportError(error: Error, context?: any) {
  const key = `${error.name}:${error.message}`
  const existing = errorStore.get(key)

  if (existing) {
    existing.count++
    existing.lastSeen = new Date()
  } else {
    errorStore.set(key, {
      count: 1,
      lastSeen: new Date(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
      },
    })
  }

  // Log immediately
  console.error('[ERROR REPORTED]:', {
    error: error.message,
    count: existing ? existing.count : 1,
    context,
  })
}
```

```tsx
// Error reporting endpoint
// routes/errors.ts
export const Route = createFileRoute('/admin/errors')({
  server: {
    handlers: {
      GET: async () => {
        const errors = Array.from(errorStore.entries()).map(([key, data]) => ({
          id: key,
          ...data,
        }))

        return Response.json({ errors })
      }
    }
  }
})
```

--------------------------------

### Configure Observability Settings for Different Environments

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This configuration object shows how to define different observability strategies for development and production environments. It specifies distinct `logLevel`, `enableTracing`, `enableMetrics`, and `enableAlerting` settings to optimize monitoring for each stage.

```tsx
const observabilityConfig = {
  development: {
    logLevel: 'debug',
    enableTracing: true,
    enableMetrics: false,
  },
  production: {
    logLevel: 'warn',
    enableTracing: true,
    enableMetrics: true,
    enableAlerting: true,
  },
}
```

--------------------------------

### Create OpenTelemetry Tracing Middleware for HTTP Requests

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Implements middleware-level tracing for automatic HTTP request instrumentation. Captures HTTP method, URL, route path, and response status codes, with error handling and exception recording for all server requests.

```TypeScript
// Middleware for automatic tracing
import { createMiddleware } from '@tanstack/react-start'
import { trace, SpanStatusCode } from '@opentelemetry/api'

const tracer = trace.getTracer('tanstack-start')

const tracingMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const url = new URL(request.url)

    return tracer.startActiveSpan(
      `${request.method} ${url.pathname}`,
      async (span) => {
        span.setAttributes({
          'http.method': request.method,
          'http.url': request.url,
          'http.route': url.pathname,
        })

        try {
          const result = await next()
          span.setAttribute('http.status_code', result.response.status)
          span.setStatus({ code: SpanStatusCode.OK })
          return result
        } catch (error) {
          span.recordException(error)
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message,
          })
          throw error
        } finally {
          span.end()
        }
      },
    )
  },
)
```

--------------------------------

### Set HTTP Headers in TanStack Router Server Handler (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This example illustrates how to add custom HTTP headers to a response within a TanStack Router server handler. It uses the `headers` property in the second argument of the `Response` constructor to set a `Content-Type` header to 'text/plain'.

```typescript
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!', {
          headers: {
            'Content-Type': 'text/plain'
          }
        })
      }
    }
  }
})
```

--------------------------------

### Create Global Request/Response Logger Middleware for TanStack Start (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

This example demonstrates building a server-side middleware in TanStack Start to log all incoming requests and outgoing responses. It captures method, URL, status, and duration, and also logs errors, offering a comprehensive view of server traffic.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const requestLogger = createMiddleware().server(async ({ request, next }) => {
  const startTime = Date.now()
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] ${request.method} ${request.url} - Starting`)

  try {
    const result = await next()
    const duration = Date.now() - startTime

    console.log(
      `[${timestamp}] ${request.method} ${request.url} - ${result.response.status} (${duration}ms)`,
    )

    return result
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(
      `[${timestamp}] ${request.method} ${request.url} - Error (${duration}ms):`,
      error,
    )
    throw error
  }
})

// Apply to all server routes
export const Route = createFileRoute('/api/users')({
  server: {
    middleware: [requestLogger],
    handlers: {
      GET: async () => {
        return Response.json({ users: await getUsers() })
      },
    },
  },
})
```

--------------------------------

### Add OpenTelemetry Tracing to Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Implements manual tracing for server functions using OpenTelemetry API to track execution, set span attributes, and handle errors. Records user ID and operation type as span metadata and captures exceptions with appropriate status codes.

```TypeScript
// Server function tracing
import { trace, SpanStatusCode } from '@opentelemetry/api'

const tracer = trace.getTracer('tanstack-start')

const getUserWithTracing = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    return tracer.startActiveSpan('get-user', async (span) => {
      span.setAttributes({
        'user.id': id,
        operation: 'database.query',
      })

      try {
        const user = await db.users.findUnique({ where: { id } })
        span.setStatus({ code: SpanStatusCode.OK })
        return user
      } catch (error) {
        span.recordException(error)
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        })
        throw error
      } finally {
        span.end()
      }
    })
  })
```

--------------------------------

### Create Request/Response Logging Middleware in TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/observability

This snippet defines a middleware for TanStack Start that logs incoming requests and outgoing responses, including method, URL, status, and duration. It also catches and logs any errors during the request-response cycle, and shows how to apply it to server routes.

```tsx
import { createMiddleware } from '@tanstack/solid-start'

const requestLogger = createMiddleware().handler(async ({ next }) => {
  const startTime = Date.now()
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] ${request.method} ${request.url} - Starting`)

  try {
    const response = await next()
    const duration = Date.now() - startTime

    console.log(
      `[${timestamp}] ${request.method} ${request.url} - ${response.status} (${duration}ms)`,
    )

    return response
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(
      `[${timestamp}] ${request.method} ${request.url} - Error (${duration}ms):`,
      error,
    )
    throw error
  }
})

// Apply to all server routes
export const Route = createFileRoute('/api/users')({
  server: {
    middleware: [requestLogger],
    handlers: {
      GET: async () => {
        return Response.json({ users: await getUsers() })
      },
    },
  },
})
```

--------------------------------

### Install Tailwind CSS v3 and PostCSS dependencies with npm

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

This command installs Tailwind CSS version 3 along with its peer dependencies, PostCSS and Autoprefixer, as development dependencies. These packages are essential for using Tailwind CSS v3 in a project that relies on PostCSS for CSS processing.

```shell
npm install -D tailwindcss@3 postcss autoprefixer
```
