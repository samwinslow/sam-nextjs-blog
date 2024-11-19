import Link from 'next/link'
import { Heading } from './Heading'
import { Byline } from './Byline'
import { PostMetadata } from '../lib/types'

const PostList = ({ posts }: { posts: PostMetadata[] }) => (
  <ul className="list">
    {posts.map(({ id, date, title, image, tags, copy }) => (
      <li key={id}>
        <Link href={`/post/${id}`}>
          <span className="list-link-content">
            <Heading.Md style={{ display: 'inline-block', marginRight: '0.5em' }}>
              {title}
            </Heading.Md>
            <Byline date={date} tags={tags} linkTags={false} />
            <span className="list-subtitle">
              {copy}
            </span>
          </span>
        </Link>
      </li>
    ))}
  </ul>
)

export default PostList
