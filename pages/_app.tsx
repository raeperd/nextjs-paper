import { AppProps } from 'next/app'
import Head from 'next/head';
import Layout from '../components/Layout'
import '../public/app.css'
import '../public/katex.min.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
