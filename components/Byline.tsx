import { PostMetadata } from '../lib/types'
import Date from './Date'
import { SlugItem } from './SlugItem'

export const Byline = ({
  date,
  tags,
  linkTags = true,
  expanded = false
}: {
  date: PostMetadata['date'],
  tags: PostMetadata['tags'],
  linkTags?: boolean
  expanded?: boolean
}): JSX.Element => (
  <span style={expanded ? {} : { fontSize: '85%' }}>
    <Date dateString={date} />
    { tags && (
      <span style={{ paddingLeft: '0.5em' }}>
        {tags.map((tag, i) => <SlugItem key={i} href={linkTags ? `/tag/${tag}` : undefined} text={tag} />)}
      </span>
    )}
  </span>
)
