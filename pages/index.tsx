import Head from 'next/head';

export default function Index({ siteName }: {siteName: string}) {
  return (
    <Head>
      <title>{siteName}</title>
    </Head>
  )
}

export async function getStaticProps() {
  const siteName = process.env.SITE_NAME ? process.env.SITE_NAME : 'Paper'
  return { props: { siteName } }
}
