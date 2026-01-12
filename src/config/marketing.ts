import {
    Zap,
    Server,
    Route as RouteIcon,
    Shield,
    Waves,
    Sparkles,
} from 'lucide-solid'

export const marketingConfig = {
    hero: {
        title: 'TANSTACK START',
        subtitle: 'The framework for next generation AI applications',
        description:
            'Full-stack framework powered by TanStack Router for React and Solid. Build modern applications with server functions, streaming, and type safety.',
        actions: [
            {
                text: 'Documentation',
                href: 'https://tanstack.com/start',
                variant: 'primary',
            },
        ],
    },
    features: [
        {
            icon: Zap,
            title: 'Powerful Server Functions',
            description:
                'Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.',
        },
        {
            icon: Server,
            title: 'Flexible Server Side Rendering',
            description:
                'Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.',
        },
        {
            icon: RouteIcon,
            title: 'API Routes',
            description:
                'Build type-safe API endpoints alongside your application. No separate backend needed.',
        },
        {
            icon: Shield,
            title: 'Strongly Typed Everything',
            description:
                'End-to-end type safety from server to client. Catch errors before they reach production.',
        },
        {
            icon: Waves,
            title: 'Full Streaming Support',
            description:
                'Stream data from server to client progressively. Perfect for AI applications and real-time updates.',
        },
        {
            icon: Sparkles,
            title: 'Next Generation Ready',
            description:
                'Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.',
        },
    ],
}
