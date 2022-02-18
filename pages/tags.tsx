import Head from 'next/head'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import ColorWrapper from '../components/ColorWrapper'
import Link from 'next/link'
import { Heading } from '../components/Heading'

interface TagData {
  id: string
  postCount: number
}

const Tags = ({
  tags,
}: {
  tags: TagData[]
}) => {
  return (
    <Layout>
      <Head>
        <title>All Tags • Sam Winslow</title>
      </Head>
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
        <ColorWrapper>
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
        </ColorWrapper>
      </section>
    </Layout>
  )
}

export default Tags

export const getStaticProps: GetStaticProps = async () => {
  const tagRecord: Record<string, number> = {}
  const posts = await getSortedPostsData()
  posts.forEach(({ tags: postTags }) => {
    postTags?.forEach(tag => {
      if (tag in tagRecord) {
        tagRecord[tag] += 1
      } else {
        tagRecord[tag] = 1
      }
    })
  })
  return {
    props: {
      tags: Object.entries(tagRecord)
        .map(([id, postCount]) => ({ id, postCount }))
        .sort((a, b) => b.postCount - a.postCount),
    }
  }
}
