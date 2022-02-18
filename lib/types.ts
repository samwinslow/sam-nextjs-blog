import type { MdxRemote } from 'next-mdx-remote/types'

export type PostData = {
  id: string
  date: string
  title: string
  copy: string
  image: string
  parents?: string[]
  children?: string[]
  tags?: string[]
  source: MdxRemote.Source
  previous: string | null
  next: string | null
}

export interface TagData {
  id: string
  postCount: number
}

export type PostMetadata = Exclude<PostData, 'source'>
