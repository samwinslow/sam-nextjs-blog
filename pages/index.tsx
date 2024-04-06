import Head from 'next/head'
import ReactTooltip from 'react-tooltip'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedPostsData, getTagsFromPosts } from '../lib/posts'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import ColorWrapper from '../components/ColorWrapper'
import socialLinks from '../lib/social-links.json'
import hostedProjects from '../lib/hosted-projects.json'
import { PostMetadata, TagData } from '../lib/types'
import { Byline } from '../components/Byline'
import { Heading } from '../components/Heading'
import { TagsCloud } from './tags'
import ConditionalExternalLink from '../components/ConditionalExternalLink'

const Index = ({
  allPostsData,
  tags,
}: {
  allPostsData: PostMetadata[],
  tags: TagData[],
}) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className="headingMd" style={{ maxWidth: '36rem', marginBottom: '4rem' }}>
      <p>
        Hi, I'm Sam.
      </p>
      <p>
        Before working as a software engineer, I worked as a designer and marketer. My skills are largely self-taught, and I studied communications at NYU.
      </p>
      <p>
        In my free time I love reading, working with electronics, and flying airplanes.
      </p>
    </section>
    <section>
      <Heading.Lg>Projects</Heading.Lg>
      <div className="pretty-grid">
        {hostedProjects.map(({ uri, title, subtitle, desc, image }) => (
          <div
            key={uri}
            style={{
              backgroundImage: `url(/img/${image})`
            }}
          >
            <ConditionalExternalLink href={uri}>
              <div className="inner">
                <h3>{title}</h3>
                <p>{subtitle}</p>
              </div>
            </ConditionalExternalLink>
          </div>
        ))}
      </div>
    </section>
    <section>
      <Heading.Lg>Words</Heading.Lg>
      <div className="row">
        <ColorWrapper>
          <TagsCloud tags={tags} />
          <ul className="list">
            {allPostsData.map(({ id, date, title, image, tags, copy }) => (
              <li key={id}>
                <Link href={`/post/${id}`}>
                  <div>
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
                { image ? (
                  <ReactTooltip
                    id={`tooltip-${id}`}
                    place="top"
                    type="light"
                    effect="solid"
                  >
                    <img
                      src={`/img/${image}`}
                      style={{ width: '12rem' }}
                    />
                  </ReactTooltip>
                ) : null}
              </li>
            ))}
          </ul>
        </ColorWrapper>
      </div>
    </section>
    <section>
      
    </section>
    <section>
      <Heading.Lg>Links</Heading.Lg>
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
      tags: getTagsFromPosts(allPostsData),
    },
  }
}
