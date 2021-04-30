import type { MdxRemote } from 'next-mdx-remote/types'

export type PostData = {
  id: string
  date: string
  title: string
  copy: string
  image: string
  parents?: string[]
  children?: string[]
  source: MdxRemote.Source
}
