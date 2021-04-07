import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/Date'
import { GetStaticProps } from 'next'
import ColorWrapper from '../components/ColorWrapper'
import ColoredLink from '../components/ColoredLink'

const Index = (
  {
    allPostsData
  }: {
    allPostsData: {
      date: string
      title: string
      id: string
    }[]
  }
) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>
        Hello. I’m glad you’re here.
      </p>
      <p>
        My name is Sam. I am currently a full-stack engineer at PostHog. Before that, I founded Tunestack, a music-based social network.
      </p>
      <p>
         My earliest experiences with code were building games on a TI-83 calculator and teaching myself BASIC at a young age. I later studied the interaction of technology &amp; society at NYU, and have also worked as a designer and marketer.
      </p>
      <p>
        I am always at the beginning of my journey to learn.
      </p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ColorWrapper>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <h3 className={utilStyles.headingMd} style={{ display: 'flex' }}>
              <div style={{ minWidth: '6rem', opacity: 0.5 }}>
                <Date dateString={date} />
              </div>
              <div>
                <Link href={`/posts/${id}`}>
                  {title}
                </Link>
              </div>
            </h3>
          </li>
        ))}
      </ul>
      </ColorWrapper>
    </section>
  </Layout>
)

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
