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
import ReactTooltip from 'react-tooltip'

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
        <title>{tag}</title>
      </Head>
      <section>
        <p>
          <Link href="/tags">
            &larr; all tags
          </Link>
        </p>
        <h2 className="headingLg">
          {tag}{' '}
          <span style={{
            opacity: 0.5,
            color: 'var(--text)',
            fontWeight: 500,
            marginLeft: '0.25em'
          }}>
            {pluralize('posts', posts.length, true)}
          </span>
        </h2>
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
                    <div className="list-link-content" data-tip data-for={`tooltip-${id}`}>
                      <h3 className="headingMd" style={{ display: 'inline-block', marginRight: '0.5em' }}>
                        {title}
                      </h3>
                      <Byline date={date} tags={tags} />
                      <div style={{ opacity: 0.5, color: 'var(--text)' }}>
                        {copy}
                      </div>
                    </div>
                  </div>
                </Link>
                { index > 0 &&
                  <ReactTooltip
                    id={`tooltip-${id}`}
                    place={index % 2 === 0 ? "left" : "right"}
                    type="light"
                    effect="solid"
                  >
                    { image && <img
                        src={`/img/${image}`}
                        style={{ width: '12rem' }}
                      />
                    }
                  </ReactTooltip>
                }
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
