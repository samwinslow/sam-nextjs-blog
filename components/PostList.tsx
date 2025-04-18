import Link from 'next/link'
import { Heading } from './Heading'
import { Byline } from './Byline'
import { PostMetadata } from '../lib/types'
import Image from 'next/image'

const PostList = ({ posts }: { posts: PostMetadata[] }) => (
  <ul className="list">
    {posts.map(({ id, date, title, image, tags, copy }) => (
      <li key={id}>
        <Link href={`/post/${id}`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
          <span className="list-link-content" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ 
              position: 'relative', 
              width: '6.5rem', 
              aspectRatio: '3 / 2',
            }}>
              <Image
                src={image ? `/img/${image}` : `/img/og_image_bw.png`}
                alt={title}
                fill
                style={{ overflow: 'hidden', background: 'var(--light)', color: 'transparent', objectFit: 'cover' }}
                placeholder="empty"
                loading="eager"
              />
            </div>
            <span>
              <Heading.Md style={{ display: 'inline-block', marginRight: '0.5em' }}>
                {title}
              </Heading.Md>
              <Byline date={date} tags={tags} linkTags={false} />
              <span className="list-subtitle">
                {copy}
              </span>
            </span>
          </span>
        </Link>
      </li>
    ))}
  </ul>
)

export default PostList
