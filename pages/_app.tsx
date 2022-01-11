import { AppProps } from 'next/app'
import Head from 'next/head';
import '../public/app.css'
import '../public/katex.min.css'
import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDarkMode } from 'usehooks-ts';
import { getSiteName } from '../lib/configuration';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout
      siteName={getSiteName()}
      menus={[{ name: 'About', href: '/about' }]}
      socials={[{ siteName: 'github', userId: process.env.GITHUB },
        { siteName: 'twitter', userId: process.env.TWITTER },
        { siteName: 'instagram', userId: process.env.INSTAGRAM },
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
        <DarkModeToggleButton />
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

function DarkModeToggleButton() {
  const { isDarkMode, toggle } = useDarkMode()

  useEffect(() => {
    const body = document.body.classList
    if (isDarkMode) {
      body.add('dark')
    } else {
      body.remove('dark')
    }
  }, [isDarkMode])

  return (
    <button
      aria-label="darkMode-toggle-button"
      type="button"
      className="btn-dark"
      onClick={toggle}
    />
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
      {socials.filter((social) => social.userId !== 'undefined')
        .map((social) => (
          <a href={`//${social.siteName}.com/${social.userId}`} key={social.siteName}>
            <Image
              id={social.siteName}
              src={`/${social.siteName}.svg`}
              alt={`${social.siteName}`}
              width={500}
              height={500}
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
  userId?: string
}
