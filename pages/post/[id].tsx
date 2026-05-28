import PageLayout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import MDXComponents from '../../components/MDXComponents'
import { PostData } from '../../lib/types'
import pluralize from 'pluralize'
import { SlugItem } from '../../components/SlugItem'
import { Byline } from '../../components/Byline'
import { Heading } from '../../components/Heading'
import { MDXRemote } from 'next-mdx-remote'

const TreeNavigation = ({ postIds, relation }: { postIds: string[], relation: string }) => (
  <div className={`tree-nav ${relation}`}>
    {pluralize(relation, postIds.length) + ': '}
    { postIds.map(id => (
      <SlugItem key={id} href={`/post/${id}`} text={id} />
    ))}
  </div>
)

const RelatedNodes = ({ parents, children }: Pick<PostData, 'parents' | 'children'>) =>
  (parents?.length || children?.length) && (
    <div className="tree-nav-box">
      { parents?.length && (
        <TreeNavigation
          postIds={parents}
          relation="Parent"
        />
      )}
      { children?.length && (
        <TreeNavigation
          postIds={children}
          relation="Child"
        />
      )}
    </div>
  )

const Post = ({
  postData: {
    date,
    title,
    copy,
    parents,
    children,
    tags,
    source,
    next,
    previous,
    image,
  }
}: {
  postData: PostData
}) => {
  // const content = hydrate(source, { components: MDXComponents })
  const hasRelatedNodes = parents?.length || children?.length
  const imgRel = encodeURIComponent('/img/'+ image)

  return (
    <PageLayout headProps={{
      title,
      description: copy,
      ogImage: image ? `https://samwinslow.net/_next/image?url=${imgRel}&w=1200&q=75` : undefined
    }}>
      <article>
        <Heading.Xl>{title}</Heading.Xl>
        <Byline date={date} expanded />
        { hasRelatedNodes && <RelatedNodes parents={parents} children={children} /> }
        <div className="mdx-wrapper">
          <MDXRemote {...source} components={{}} />
        </div>
        { hasRelatedNodes && <RelatedNodes parents={parents} children={children} /> }
      </article>
      <footer style={{ marginTop: '2em' }}>
        { tags?.length > 0 && (
          <div style={{ marginBottom: '1.5em' }}>
            <span style={{ fontStyle: 'italic' }}>See all posts tagged: </span>
            {tags.map((tag, i) => <SlugItem key={i} href={`/tag/${tag}`} text={tag} />)}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          { previous && <SlugItem text={`← Previous: ${previous}`} href={`/post/${previous}`} /> }
          { next && <SlugItem text={`Next: ${next} →`} href={`/post/${next}`} /> }
        </div>
      </footer>
    </PageLayout>
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
