import PageLayout from '../components/Layout'
import { getSortedPostsData, getTagsFromPosts } from '../lib/posts'
import { TagData } from '../lib/types'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Heading } from '../components/Heading'
import { SlugItem } from '../components/SlugItem'

const TagsList = ({ tags }: { tags: TagData[] }) => (
  <ul className="list">
    {tags.map(({ id, postCount }, index) => (
      <li key={index}>
        <Link href={`/tag/${id}`}>
          <div className="list-link-content">
            <Heading.Md style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 0
            }}>
              <div>
                {id}
              </div>
              <div style={{ opacity: 0.5, color: 'var(--text)' }}>
                {postCount}
              </div>
            </Heading.Md>
          </div>
        </Link>
      </li>
    ))}
  </ul>
)

const Tags = ({ tags }: { tags: TagData[] }) => {
  return (
    <PageLayout headProps={{
      title: 'All Tags • Sam Winslow'
    }}>
      <section>
        <Heading.Lg>
          Tags{' '}
          <span style={{
            opacity: 0.5,
            color: 'var(--text)',
            fontWeight: 500,
            marginLeft: '0.25em'
          }}>
            {tags.length}
          </span>
        </Heading.Lg>
        <TagsList tags={tags} />
      </section>
    </PageLayout>
  )
}

export default Tags

export const TagsCloud = ({ tags }: { tags: TagData[] }) => (
  <div style={{ marginBottom: '1rem' }}>
    {tags.map(({ id, postCount }, i) => (
      <SlugItem key={i} href={`/tag/${id}`} text={`${id} ${postCount}`} />
    ))}
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPostsData()
  return {
    props: {
      tags: getTagsFromPosts(posts),
    }
  }
}
