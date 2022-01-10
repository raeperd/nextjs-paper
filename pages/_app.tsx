import { AppProps } from 'next/app'
import Head from 'next/head';
import '../public/app.css'
import '../public/katex.min.css'
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  getGithubUserId,
  getInstagramUserId,
  getSiteName,
  getTwitterUserId,
} from '../lib/configuration';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout
      siteName={getSiteName()}
      menus={[{ name: 'About', href: '/about' }]}
      socials={[{ siteName: 'github', userId: getGithubUserId() },
        { siteName: 'twitter', userId: getTwitterUserId() },
        { siteName: 'instagram', userId: getInstagramUserId() },
      ]}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

function Layout({ siteName, menus, socials, children }: LayoutProps) {
  return (
    <>
      <Header siteName={siteName} menus={menus} socials={socials} />
      <main className="main">{children}</main>
      <Footer siteName={siteName} />
    </>
  )
}

type LayoutProps = {
  siteName: string,
  menus: MenuProps[],
  socials: SocialProps[],
  children: ReactNode
}

function Header({ siteName, menus, socials }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="logo">
        <Link href="/">
          <a className="site-name">{siteName}</a>
        </Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a className="btn-dark" />
      </h1>
      <MenuNav menus={menus} />
      <SocialNav socials={socials} />
    </header>
  )
}

function Footer({ siteName }: { siteName: string }) {
  return (
    <footer className="footer">
      <p>
        &copy;
        {new Date().getFullYear()}
        &nbsp;
        <Link href="/"><a>{siteName}</a></Link>
      </p>
      <p>
        Powered by
        {' '}
        <a href="https://nextjs.org/" rel="noopener noreferrer" target="_blank">NextJS</a>
      </p>
      <p>
        <a
          href="https://github.com/raeperd/nextjs-paper"
          rel="noopener noreferrer"
          target="_blank"
        >
          {' '}
          Paper
        </a>
      </p>
    </footer>
  )
}

function MenuNav({ menus }: { menus: MenuProps[] }) {
  const router = useRouter()
  return (
    <nav className="menu">
      {menus.map((menu) => (
        <Link href={menu.href} key={menu.name}>
          <a className={router.pathname === menu.href ? 'active' : ''}>{menu.name}</a>
        </Link>
      ))}
    </nav>
  )
}

function SocialNav({ socials }: { socials: SocialProps[] }) {
  return (
    <nav className="social">
      {socials.filter((social) => social.userId !== null)
        .map((social) => (
          <a href={`//${social.siteName}.com/${social.userId}`} key={social.siteName}>
            <img
              id={social.siteName}
              src={`/${social.siteName}.svg`}
              alt={`${social.siteName}`}
            />
          </a>
        ))}
    </nav>
  )
}

interface HeaderProps {
  siteName: string,
  menus: MenuProps[],
  socials: SocialProps[]
}

interface MenuProps {
  name: string,
  href: string
}

interface SocialProps {
  siteName: 'instagram' | 'github' | 'twitter',
  userId: string | null
}
