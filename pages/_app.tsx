import '../styles/index.scss'
import type { AppProps } from 'next/app'
import Nav from '../components/Nav/Nav'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (  
  <div className="app_wrapper">
    <Nav/>
    <Component {...pageProps} />
  </div>  )
}

export default MyApp;
