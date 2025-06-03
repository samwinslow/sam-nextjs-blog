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
  ogImage = ogImageURI,
  children = null,
}: HeadProps) => (
  <NextHead>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="description" content={description || headline} />
    <meta property="og:image" content={ogImage || ogImageURI} />
    <meta name="og:title" content={title} />
    <meta name="twitter:card" content="summary_large_image" />
    {children}
  </NextHead>
)

export default Head
