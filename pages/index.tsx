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
    {/* <section>
      <Heading.Lg>Projects</Heading.Lg>
      <ul className="list">
        {hostedProjects.map(({ uri, title, subtitle, image }, i) => (
          <li key={uri}>
            <ConditionalExternalLink href={uri}>
              <span className="list-link-content">
                <Heading.Md style={{
                  display: 'inline-block',
                  marginRight: '0.5em',
                  color: 'var(--text)',
                }}>
                  {title}
                </Heading.Md>
                <span className="list-subtitle" style={{ textDecoration: 'none' }}>
                  {subtitle}
                </span>
              </span>
            </ConditionalExternalLink>
          </li>
        ))}
      </ul>
    </section> */}
    <section>
      <Heading.Lg>Posts</Heading.Lg>
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
