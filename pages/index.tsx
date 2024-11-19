import PageLayout from '../components/Layout'
import { getSortedPostsData, getTagsFromPosts } from '../lib/posts'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import ColorWrapper from '../components/ColorWrapper'
import socialLinks from '../lib/social-links.json'
import hostedProjects from '../lib/hosted-projects.json'
import { PostMetadata, TagData } from '../lib/types'
import { Heading } from '../components/Heading'
import { TagsCloud } from './tags'
import ConditionalExternalLink from '../components/ConditionalExternalLink'
import PostList from '../components/PostList'

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
        Hi, I'm Sam.
      </p>
      <p>
        I am a full-stack software engineer and private pilot based in Philly. Prior to working in tech, I studied communications at NYU and held internships in advertising and marketing.
      </p>
      <p>
        I occasionally take on contract work, so reach out if you would be interested in collaborating.
      </p>
    </section>
    <section>
      <div style={{ display: 'flex', gap: 12 }}>
        { socialLinks.map(({ url, introText }) => (
          <Heading.Md key={url}>
            <div>
              <Link href={url}>
                {`${introText} ↗`}
              </Link>
            </div>
          </Heading.Md>
        ))}
      </div>
    </section>
    <section>
      <Heading.Lg>Projects</Heading.Lg>
      <ColorWrapper>
        <ul className="list">
          {hostedProjects.map(({ uri, title, subtitle, image }, i) => (
            <li key={uri}>
              <ConditionalExternalLink href={uri}>
                <span className="list-link-content">
                  <Heading.Md style={{ display: 'inline-block', marginRight: '0.5em' }}>
                    {title}
                  </Heading.Md>
                  <span className="list-subtitle">
                    {subtitle}
                  </span>
                </span>
              </ConditionalExternalLink>
            </li>
          ))}
        </ul>
      </ColorWrapper>
    </section>
    <section>
      <Heading.Lg>Posts</Heading.Lg>
      <div className="row">
        <ColorWrapper>
          <TagsCloud tags={tags} />
          <PostList posts={allPostsData} />
        </ColorWrapper>
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
