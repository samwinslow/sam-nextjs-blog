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
}

export type PostMetadata = Exclude<PostData, 'source'>
