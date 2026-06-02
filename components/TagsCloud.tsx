import { TagData } from '../lib/types'
import { SlugItem } from './SlugItem'

export const TagsCloud = ({ tags }: { tags: TagData[] }) => (
  <div style={{ marginBottom: '1rem' }}>
    {tags.slice(0, 6).map(({ id, postCount }, i) => (
      <SlugItem key={i} href={`/tag/${id}`} text={`${id} ${postCount}`} />
    ))}
    <SlugItem href={`/tags`} text="more..." />
  </div>
)
