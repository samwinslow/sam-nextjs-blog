import PageLayout from '../../components/Layout'
import { getPostsByTag } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import tags from '../../lib/tags.json'
import pluralize from 'pluralize'
import { PostData } from '../../lib/types'
import ColorWrapper from '../../components/ColorWrapper'
import Link from 'next/link'
import { Heading } from '../../components/Heading'
import PostList from '../../components/PostList'

const Tag = ({
  tag,
  posts,
}: {
  tag: string
  posts: PostData[]
}) => {
  return (
    <PageLayout headProps={{
      title: 'Tag: {tag} • Sam Winslow'
    }}>
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
          <PostList posts={posts} />
        </ColorWrapper>
      </section>
    </PageLayout>
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
