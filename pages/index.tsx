import Header, { HeaderProps } from '../components/Header';
import Footer from '../components/Footer';

export default function Index({ siteName, menus, socials }: HeaderProps) {
  return (
    <>
      <Header siteName={siteName} menus={menus} socials={socials} />
      <Footer siteName={siteName} />
    </>
  )
}

export async function getStaticProps(): Promise<{ props: HeaderProps }> {
  const siteName = process.env.SITE_NAME ? process.env.SITE_NAME : 'Paper'
  return {
    props: {
      siteName,
      menus: [{ name: 'About', href: '/about' }],
      socials: [
        { name: 'github', id: process.env.GITHUB },
        { name: 'twitter', id: process.env.TWITTER },
        { name: 'instagram', id: process.env.INSTAGRAM },
      ],
    },
  }
}
