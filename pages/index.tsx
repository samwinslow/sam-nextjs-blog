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
        Hi, I'm Sam. I am a software engineer and pilot, leading engineering at Flycore, which is a customer relationship management tool for flight schools.
      </p>
      <p>
        I studied communications at NYU and will send you book recommendations.
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
        </ul>
      </div>
    </section>
    <section>
      <Heading.Lg>Work</Heading.Lg>
      <p>
          Software Engineer at{' '}
          <a href="https://getflycore.com/" target="_blank" rel="noopener noreferrer">Flycore</a>,{' '}
          prev.{' '}
          <a href="https://www.patchbay.xyz/" target="_blank" rel="noopener noreferrer">Patchbay</a>,{' '}
          <a href="https://www.linkedin.com/company/thesevenapp/" target="_blank" rel="noopener noreferrer">Seven</a>,{' '}
          <a href="https://posthog.com/" target="_blank" rel="noopener noreferrer">PostHog</a> (YC W20).
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
