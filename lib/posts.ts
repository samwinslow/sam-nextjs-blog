import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import MDXComponents from '../components/MDXComponents'
import { PostData, PostMetadata } from './types'

const postsDirectory = path.join(process.cwd(), 'posts')

const mdxExtension = /\.mdx$/

export const getSortedPostsData = () => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(name => mdxExtension.test(name))
  const postsData = fileNames
    .map(fileName => {
      const id = fileName.replace(mdxExtension, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const postMetadata = data as PostMetadata
      return {
        id,
        ...postMetadata,
        tags: postMetadata?.tags?.sort() || null,
      }
    })
    .sort((a, b) => a.date < b.date ? 1 : -1)
    .map((current, i, allPosts) => {
      const postWithPointers = {
        ...current,
        next: null,
        previous: null,
      }
      if(i > 0) {
        postWithPointers.next = allPosts[i - 1].id
      }
      if(i < allPosts.length - 2) {
        postWithPointers.previous = allPosts[i + 1].id
      }
      return postWithPointers
    })
  return postsData 
}

const sortedPosts = getSortedPostsData()

export const getAllPostIds = () => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(name => mdxExtension.test(name))
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(mdxExtension, '')
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const source = await renderToString(content, {
    components: MDXComponents
  })
  const postWithPointers = sortedPosts.find(({ id: postId }) => postId === id)

  return {
    id,
    source,
    next: postWithPointers?.next || null,
    previous: postWithPointers?.previous || null,
    ...data,
  } as PostData
}
