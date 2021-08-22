import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/Date'
import { GetStaticProps } from 'next'
import ColorWrapper from '../components/ColorWrapper'
import socialLinks from '../lib/social-links.json'
import { PostMetadata } from '../lib/types'

const Index = ({
  allPostsData,
}: {
  allPostsData: PostMetadata[]
}) => (
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
        I studied the interaction of technology &amp; society at NYU, and have also worked as a designer and marketer.
      </p>
      <p>
        In my free time I love working with electronics, reading, and cycling. I am always at the beginning of my journey to learn.
      </p>
    </section>
    <section>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ColorWrapper>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, copy, tags }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <div className="list-link-content">
                  <h3 className={utilStyles.headingMd} style={{ display: 'inline-block', marginRight: '0.5em' }}>
                    {title}
                  </h3>
                  <div style={{ fontSize: '85%' }}>
                    { tags && <>
                      {' ['}
                      {tags.join(', ')}
                      {'] '}
                    </>}
                    <Date dateString={date} />
                  </div>
                  <div style={{ opacity: 0.5, color: 'var(--text)' }}>
                    {copy}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ColorWrapper>
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
      allPostsData,
    },
  }
}
