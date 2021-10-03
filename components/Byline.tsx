import { PostMetadata } from '../lib/types'
import Date from './Date'
import { SlugItem } from './SlugItem'

export const Byline = ({ date, tags, expanded = false }: { date: PostMetadata['date'], tags: PostMetadata['tags'], expanded?: boolean }): JSX.Element => (
  <div style={expanded ? {} : { fontSize: '85%' }}>
    <Date dateString={date} />
    { tags && (
      <span style={{ paddingLeft: '0.5em' }}>
        {tags.map((tag, i) => <SlugItem key={i} href={`/tag/${tag}`} text={tag} />)}
      </span>
    )}
  </div>
)
