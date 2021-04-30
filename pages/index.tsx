import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/Date'
import { GetStaticProps } from 'next'
import ColorWrapper from '../components/ColorWrapper'
import socialLinks from '../lib/social-links.json'
import interestingThings from '../lib/interesting-things.json'

interface NestedList {
  name: string,
  nodes?: NestedList[]
}
const formatTree = (nestedList: NestedList, depth = 0): string => {
  if (!nestedList.nodes?.length) { // ├
    return '    '.repeat(Math.max(depth, 0)) + ''
      + nestedList.name + '\n'
  }
  return '    '.repeat(Math.max(depth, 0))
    + nestedList.name
    + '\n'
    + nestedList.nodes.reduce((prev, node) =>
        prev + formatTree(node, depth + 1), ''
      )
}

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
        In my free time I love building hardware projects, reading, and cycling. I am always at the beginning of my journey to learn.
      </p>
    </section>
    <section>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ColorWrapper>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <h3 className={utilStyles.headingMd} style={{ display: 'flex' }}>
                <div style={{ minWidth: '6em', opacity: 0.5 }}>
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
    <section>
      <h2 className={utilStyles.headingLg}>Things I consider interesting</h2>
      <pre style={{ fontSize: '0.7rem' }}>
        { formatTree(interestingThings) }
      </pre>
    </section>
    <section>
      <h2 className={utilStyles.headingLg}>Find me elsewhere</h2>
      <ColorWrapper>
        <ul className={utilStyles.list}>
          { socialLinks.map(({ site, url, introText }) => (
            <li className={utilStyles.listItem} key={url}>
              <h3 className={utilStyles.headingMd} style={{ display: 'flex' }}>
                <div style={{ minWidth: '6em', opacity: 0.5 }}>
                  {introText}:
                </div>
                <div>
                  <Link href={url}>
                    {url.replace(/^https?:\/\//, '')}
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
