import Head from 'next/head'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import MDXComponents from '../../components/MDXComponents'
import { PostData } from '../../lib/types'
import pluralize from 'pluralize'
import { SlugItem } from '../../components/SlugItem'
import { Byline } from '../../components/Byline'
import { Heading } from '../../components/Heading'

const TreeNavigation = ({ postIds, relation }: { postIds: string[], relation: string }) => (
  <div className={`tree-nav ${relation}`}>
    {pluralize(relation, postIds.length) + ': '}
    { postIds.map(id => (
      <SlugItem key={id} href={`/post/${id}`} text={id} />
    ))}
  </div>
)

const RelatedNodes = ({ parents, children }: Pick<PostData, 'parents' | 'children'>) =>
  (parents?.length || children?.length) && (
    <div className="tree-nav-box">
      { parents?.length && (
        <TreeNavigation
          postIds={parents}
          relation="Parent"
        />
      )}
      { children?.length && (
        <TreeNavigation
          postIds={children}
          relation="Child"
        />
      )}
    </div>
  )

const Post = ({
  postData: {
    date,
    title,
    parents,
    children,
    tags,
    source,
    next,
    previous,
    image,
  }
}: {
  postData: PostData
}) => {
  const content = hydrate(source, { components: MDXComponents })
  const hasRelatedNodes = parents?.length || children?.length
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        { image && <meta
          property="og:image"
          content={`https://samwinslow.net/_next/image?${encodeURIComponent('/img/'+ image)}&w=1200&q=75`}
        />}
      </Head>
      <article>
        <Heading.Xl>{title}</Heading.Xl>
        <Byline date={date} tags={tags} expanded />
        { hasRelatedNodes && <RelatedNodes parents={parents} children={children} /> }
        <div className="mdx-wrapper">{content}</div>
        { hasRelatedNodes && <RelatedNodes parents={parents} children={children} /> }
      </article>
      <footer style={{ marginTop: '2em' }}>
        <div>
          { previous && <span>Previous: <SlugItem text={previous} href={`/post/${previous}`} /></span> }
        </div>
        <div>
          { next && <span>Next: <SlugItem text={next} href={`/post/${next}`} /></span> }
        </div>
      </footer>
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}
