export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: 'TanStack Start Template',
    description: 'A reusable marketing site template built with TanStack Start and SolidJS.',
    url: 'https://tanstack.com', // TODO: Update with actual URL
    ogImage: 'https://tanstack.com/og.png', // TODO: Update with actual OG image
    links: {
        twitter: 'https://twitter.com/tanstack',
        github: 'https://github.com/tanstack',
    },
    mainNav: [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Start',
            href: '/demo/start/server-funcs',
        },
        {
            title: 'Form',
            href: '/demo/form',
        },
    ],
}
