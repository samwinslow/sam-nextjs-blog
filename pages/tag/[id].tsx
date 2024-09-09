import Head from 'next/head'
import Layout from '../../components/Layout'
import { getPostsByTag } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import tags from '../../lib/tags.json'
import pluralize from 'pluralize'
import { Byline } from '../../components/Byline'
import { PostData } from '../../lib/types'
import ColorWrapper from '../../components/ColorWrapper'
import Link from 'next/link'
import { Heading } from '../../components/Heading'

const Tag = ({
  tag,
  posts,
}: {
  tag: string
  posts: PostData[]
}) => {
  return (
    <Layout>
      <Head>
        <title>Tag: {tag} • Sam Winslow</title>
      </Head>
      <section>
        <p>
          <Link href="/tags">
            &larr; all tags
          </Link>
        </p>
        <Heading.Lg>
          {tag}{' '}
          <span style={{
            opacity: 0.5,
            color: 'var(--text)',
            fontWeight: 500,
            marginLeft: '0.25em'
          }}>
            {pluralize('posts', posts.length, true)}
          </span>
        </Heading.Lg>
        <ColorWrapper>
          <ul className="list">
            {posts.map(({ id, date, title, image, copy, tags }, index) => (
              <li key={id}>
                <Link href={`/post/${id}`}>
                  <div>
                    { image && index === 0 && <img
                        src={`/img/${image}`}
                        style={{ width: '100%', cursor: 'pointer' }}
                      />
                    }
                    <div className="list-link-content">
                      <Heading.Md style={{ display: 'inline-block', marginRight: '0.5em' }}>
                        {title}
                      </Heading.Md>
                      <Byline date={date} tags={tags} />
                      <div style={{ opacity: 0.5, color: 'var(--text)' }}>
                        {copy}
                      </div>
                    </div>
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

export default Tag

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = tags.map(tag => ({
    params: {
      id: tag
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPostsByTag(params.id as string)
  return {
    props: {
      tag: params.id,
      posts
    }
  }
}
