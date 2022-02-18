import Head from 'next/head'
import ReactTooltip from 'react-tooltip'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import ColorWrapper from '../components/ColorWrapper'
import socialLinks from '../lib/social-links.json'
import { PostMetadata } from '../lib/types'
import { Byline } from '../components/Byline'
import { Heading } from '../components/Heading'

const Index = ({ allPostsData }: { allPostsData: PostMetadata[] }) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className="headingMd">
      <p>
        My name is Sam. I am a self-taught software engineer interested in tech for music and creativity.
      </p>
      <p>
        I studied the interaction of technology &amp; society at NYU, and have also worked as a designer and marketer.
      </p>
      <p>
        In my free time I love working with electronics, reading, and cycling. I am always at the beginning of my journey to learn.
      </p>
    </section>
    <section>
      <Heading.Lg>Blog</Heading.Lg>
      <ColorWrapper>
        <ul className="list">
          {allPostsData.map(({ id, date, title, image, copy, tags }, index) => (
            <li key={id}>
              <Link href={`/post/${id}`}>
                <div>
                  { image && index === 0 && <img
                      src={`/img/${image}`}
                      style={{ width: '100%', cursor: 'pointer' }}
                    />
                  }
                  <div className="list-link-content" data-tip data-for={`tooltip-${id}`}>
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
    <section>
      <Heading.Lg>Find me elsewhere</Heading.Lg>
      <ColorWrapper>
        <ul className="list">
          { socialLinks.map(({ site, url, introText }) => (
            <li key={url}>
              <Heading.Md style={{ display: 'flex', wordBreak: 'break-word' }}>
                <div style={{ minWidth: '6em', opacity: 0.5 }}>
                  {introText}:
                </div>
                <div>
                  <Link href={url}>
                    {url.replace(/(^https?:\/\/)|(\.com)/g, '')}
                  </Link>
                </div>
              </Heading.Md>
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
