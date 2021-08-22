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
  const allPostsData = fileNames.map(fileName => {
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
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)
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
  return {
    id,
    source,
    ...data
  } as PostData
}
