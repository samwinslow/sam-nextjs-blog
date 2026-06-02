import NextLink from 'next/link'
import Image from './Image'
import Tweet from 'react-tweet-embed'
import type { AnchorHTMLAttributes } from 'react'
import { createElement } from 'react'

const Link = ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
  createElement(NextLink, { href: href ?? '#', ...props }, children)

const MDXComponents = {
  a: Link,
  img: Image,
  Tweet,
}

export default MDXComponents
