import PageLayout from '../components/Layout'
import { getSortedPostsData, getTagsFromPosts } from '../lib/posts'
import { GetStaticProps } from 'next'
import socialLinks from '../lib/social-links.json'
import { PostMetadata, TagData } from '../lib/types'
import { Heading } from '../components/Heading'
import { TagsCloud } from './tags'
import ConditionalExternalLink from '../components/ConditionalExternalLink'
import PostList from '../components/PostList'
import { SlugItem } from '../components/SlugItem'
import { useState } from 'react'

const TelLink = () => {
  const phone = '+1 ' + (424*2) + ' ' + (206*2) + ' 0' + (341*2)
  const defaultLinkText = 'Phone'
  const [linkText, setLinkText] = useState(defaultLinkText)
  return (
    <li
      onMouseOver={() => setLinkText(phone)}
      onMouseOut={() => setLinkText(defaultLinkText)}
      onClick={(e) => {
        e.preventDefault()
        if (linkText !== defaultLinkText) {
          window.location.href = `tel:${phone.replace(/\s/g, '')}`
        }
      }}
      style={{ color: 'var(--link)' }}
    >
      <SlugItem text={linkText} />
    </li>
  )
}

const Index = ({
  allPostsData,
  tags,
}: {
  allPostsData: PostMetadata[],
  tags: TagData[],
}) => (
  <PageLayout isHome>
    <section className="headingMd" style={{ maxWidth: '36rem', marginBottom: '4rem' }}>
      <p>
        Hi, I'm Sam. I am a freelance software engineer, most recently at Flycore, which is a customer relationship management tool for flight schools.
      </p>
      <p>
        I am also a private pilot with an instrument rating, high performance and complex endorsements.
      </p>
      <p>
        I hold a B.S. in Communications from NYU.
      </p>
    </section>
    <section>
      <Heading.Lg>Contact</Heading.Lg>
      <div className="flex-col">
        <ul className="list" style={{ display: 'flex' }}>
          { socialLinks.map(({ url, site }) => (
            <li key={url}>
              <ConditionalExternalLink href={url}>
                <SlugItem text={site} />
              </ConditionalExternalLink>
            </li>
          ))}
          <TelLink />
        </ul>
      </div>
    </section>
    <section>
      <Heading.Lg>Work Experience</Heading.Lg>
      <p>
          Software Engineer at{' '}
          <a href="https://getflycore.com/" target="_blank" rel="noopener noreferrer">Flycore</a>,{' '}
          <a href="https://www.patchbay.xyz/" target="_blank" rel="noopener noreferrer">Patchbay</a>,{' '}
          <a href="https://www.linkedin.com/company/thesevenapp/" target="_blank" rel="noopener noreferrer">Seven</a>, and{' '}
          <a href="https://posthog.com/" target="_blank" rel="noopener noreferrer">PostHog</a>.
      </p>
    </section>
    <section>
      <Heading.Lg>Writing</Heading.Lg>
      <div className="flex-col">
        <TagsCloud tags={tags} />
        <PostList posts={allPostsData} />
      </div>
    </section>
  </PageLayout>
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
