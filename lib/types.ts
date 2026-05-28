import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type PostData = {
  id: string
  date: string
  title: string
  copy: string
  image: string
  parents?: string[]
  children?: string[]
  tags?: string[]
  archived?: boolean
  source: MDXRemoteSerializeResult
  previous: string | null
  next: string | null
}

export interface TagData {
  id: string
  postCount: number
}

export type PostMetadata = Exclude<PostData, 'source'>
