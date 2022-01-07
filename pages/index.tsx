import Header from '../components/Header';

export default function Index({ siteName }: {siteName: string}) {
  return (
    <Header siteName={siteName} />
  )
}

export async function getStaticProps() {
  return { props: { siteName: process.env.SITE_NAME } }
}
