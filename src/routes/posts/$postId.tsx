import { createFileRoute } from '@tanstack/solid-router'
import { fetchPost } from '../../utils/posts'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})

function PostComponent() {
  const post = Route.useLoaderData()

  return (
    <div class="p-2 space-y-2">
      <h3 class="text-xl font-bold">{post().title}</h3>
      <div class="text-sm">{post().body}</div>
    </div>
  )
}
