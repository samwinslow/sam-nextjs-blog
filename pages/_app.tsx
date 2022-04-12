import '../styles/global.css'
import '../styles/nprogress.css'
import '../styles/utils.css'
import '../components/Layout.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import posthog from 'posthog-js'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())

    // Capture PostHog analytics
    posthog.init('API_KEY', { api_host:'https://app.posthog.com' })
    const capturePageview = () => posthog.capture('$pageview')

    router.events.on('routeChangeComplete', capturePageview)

    return () => {
      router.events.off('routeChangeComplete', capturePageview)
    }
  })
  return <Component {...pageProps} />
}

export default App
