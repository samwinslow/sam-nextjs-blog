import Head from 'next/head'
import Image from 'next/image'
import ColoredLink from './ColoredLink'
import { Heading } from './Heading'

const name = 'Sam Winslow'
export const siteTitle = name

const headingStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
}

const Header = ({ home }: { home?: boolean }) => (
  <header style={{ marginBottom: '2rem' }}>
    { home ? (
      <Heading.Xl style={headingStyle}>
        <Image
          priority
          src="/img/profile.jpg"
          className="borderCircle"
          height={72}
          width={72}
          alt={name}
        />
        <ColoredLink href="/">
          {name}
        </ColoredLink>
      </Heading.Xl>
    ) : (
      <Heading.Lg style={headingStyle}>
        <Image
          priority
          src="/img/profile.jpg"
          className="borderCircle"
          height={48}
          width={48}
          alt={name}
        />
        <ColoredLink href="/">
          {name}
        </ColoredLink>
      </Heading.Lg>
    )}
  </header>
)

const Layout = ({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) => {
  return (
    <div className={`container${home ? ' container-wide' : ''}`}>
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
      <Header home={home} />
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
