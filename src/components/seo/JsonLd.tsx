import type { WithContext, Thing } from 'schema-dts'

export function JsonLd<T extends Thing>(props: { item: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      innerHTML={JSON.stringify(props.item, null, 2)}
    />
  )
}
