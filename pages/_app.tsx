import '../styles/global.css'
import '../styles/nprogress.css'
import '../styles/utils.css'
import '../components/Layout.css'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
