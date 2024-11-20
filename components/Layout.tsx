import Image from 'next/image'
import ColoredLink from './ColoredLink'
import { Heading } from './Heading'
import { copyrightHolder, siteTitle } from '../lib/constants'
import Head, { HeadProps } from './Head'

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
          alt={siteTitle}
        />
        <ColoredLink href="/">
          {siteTitle}
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
          alt={siteTitle}
        />
        <ColoredLink href="/">
          {siteTitle}
        </ColoredLink>
      </Heading.Lg>
    )}
  </header>
)

const PageLayout = ({
  children,
  isHome,
  headProps = {},
}: {
  children: React.ReactNode
  isHome?: boolean
  headProps?: HeadProps
}) => {
  return (
    <>
      <Head {...headProps} />
      <div className={`container${isHome ? ' container-wide' : ''}`}>
        <Header home={isHome} />
        <main>{children}</main>
        <footer style={{ marginTop: '3rem' }}>
          <h5 style={{ textAlign: 'center', color: 'var(--muted)', fontWeight: 'normal' }}>
            &copy; {new Date().getFullYear()} {copyrightHolder}
          </h5>
        </footer>
      </div>
    </>
  )
}

export default PageLayout
