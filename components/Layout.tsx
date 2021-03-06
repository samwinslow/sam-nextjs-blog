import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ColoredLink from './ColoredLink'
import ColorWrapper from './ColorWrapper'

const name = 'Sam Winslow'
export const siteTitle = 'Sam Winslow'

const Layout = ({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) => {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="header">
        {home ? (
          <>
            <Image
              priority
              src="/img/profile.jpg"
              className="borderCircle"
              height={144}
              width={144}
              alt={name}
            />
              <h1 className="heading2Xl" style={{ margin: '1rem' }}>
                <ColorWrapper>
                  {name}
                </ColorWrapper>
              </h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/img/profile.jpg"
                  className="borderCircle"
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className="headingLg" style={{ margin: '1rem' }}>
              <ColoredLink href="/">
                {name}
              </ColoredLink>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      <footer style={{ marginTop: '3rem' }}>
        <h5 style={{ textAlign: 'center', color: 'var(--muted)', fontWeight: 'normal' }}>
          &copy; {new Date().getFullYear()} {name}
        </h5>
      </footer>
    </div>
  )
}

export default Layout
