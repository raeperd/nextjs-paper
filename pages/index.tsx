import Header from '../components/Header';

export default function Index({ siteName, menus }: IndexProps) {
  return (
    <Header siteName={siteName} menus={menus} />
  )
}

type IndexProps = {
  siteName: string,
  menus: MenuProps[]
}

type MenuProps = {
  name: string
  href: string
}

export async function getStaticProps() {
  return {
    props: {
      siteName: process.env.SITE_NAME,
      menus: [{ name: 'About', href: '/about' }],
    },
  }
}
