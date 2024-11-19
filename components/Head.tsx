import NextHead from 'next/head'
import { headline, ogImageURI, siteTitle } from '../lib/constants'

export interface HeadProps {
  title?: string
  description?: string
  ogImage?: string
  children?: React.ReactNode
}

const Head = ({
  title = siteTitle,
  description = headline,
  ogImage,
  children = null,
}: HeadProps) => (
  <NextHead>
    <link rel="icon" href="/favicon.ico" />
    <title>{title}</title>
    <meta name="description" content={description || headline} />
    <meta property="og:image" content={ogImage || ogImageURI} />
    <meta name="og:title" content={title} />
    <meta name="twitter:card" content="summary_large_image" />
    {children}
  </NextHead>
)

export default Head
