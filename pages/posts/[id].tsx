import Head from 'next/head'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/Date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import MDXComponents from '../../components/MDXComponents'
import type { MdxRemote } from 'next-mdx-remote/types'

const Post = ({
  postData
}: {
  postData: {
    title: string
    date: string
    source: MdxRemote.Source
  }
}) => {
  const content = hydrate(postData.source, { components: MDXComponents })
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className="mdx-wrapper">{content}</div>
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
