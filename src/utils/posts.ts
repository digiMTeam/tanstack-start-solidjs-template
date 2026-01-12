import { notFound } from '@tanstack/solid-router' // Ensure this import is correct based on package usage usually it's from router or start
import { createServerFn } from '@tanstack/solid-start' // Assuming we might want to wrap these too, but for now just plain functions as per snippet, actually snippet says 'fetchPosts' is imported from utils.

// In a real app these would likely be server functions or fetching from an API
// For static generation we can just return data
export type Post = {
    id: string
    title: string
    body: string
}

const posts: Post[] = [
    { id: '1', title: 'First Post', body: 'This is the first post' },
    { id: '2', title: 'Second Post', body: 'This is the second post' },
    { id: '3', title: 'Third Post', body: 'This is the third post' },
]

export const fetchPosts = async () => {
    // simulate delay
    await new Promise((r) => setTimeout(r, 500))
    return posts
}

export const fetchPost = async (id: string) => {
    await new Promise((r) => setTimeout(r, 500))
    const post = posts.find((p) => p.id === id)
    if (!post) {
        throw notFound()
    }
    return post
}
