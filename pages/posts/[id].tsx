import Head from 'next/head'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/Date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import MDXComponents from '../../components/MDXComponents'
import { PostData } from '../../lib/types'
import Link from 'next/link'
import pluralize from 'pluralize'
import { SlugItem } from '../../components/SlugItem'
import { Byline } from '../../components/Byline'

const TreeNavigation = ({ postIds, relation }: { postIds: string[], relation: string }) => (
  <div className={`tree-nav ${relation}`}>
    {pluralize(relation, postIds.length) + ': '}
    { postIds.map(id => (
      <SlugItem href={`/posts/${id}`} text={id} />
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
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <Byline date={date} tags={tags} expanded />
        { hasRelatedNodes && <RelatedNodes parents={parents} children={children} /> }
        <div className="mdx-wrapper">{content}</div>
        { hasRelatedNodes && <RelatedNodes parents={parents} children={children} /> }
      </article>
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
