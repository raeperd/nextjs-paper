import { AppProps } from 'next/app'
import Head from 'next/head';
import '../public/app.css'
import '../public/katex.min.css'
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

function Layout({ children }: { children: ReactNode }) {
  const siteName = process.env.SITE_NAME ? process.env.SITE_NAME : 'Paper'
  return (
    <>
      <Header
        siteName={siteName}
        menus={[{ name: 'About', href: '/about' }]}
        socials={[{ name: 'github', id: process.env.GITHUB },
          { name: 'twitter', id: process.env.TWITTER },
          { name: 'instagram', id: process.env.INSTAGRAM },
        ]}
      />
      <main className="main">{children}</main>
      <Footer siteName={siteName} />
    </>
  )
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

interface HeaderProps {
  siteName: string,
  menus: MenuProps[],
  socials: SocialProps[]
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

interface MenuProps {
  name: string,
  href: string
}

function SocialNav({ socials }: { socials: SocialProps[] }) {
  return (
    <nav className="social">
      {socials
        .map((social) => (
          <a href={`//${social.name}.com/${social.id}`} key={social.name}>
            <img
              id={social.name}
              src={`/${social.name}.svg`}
              alt={`${social.name}`}
            />
          </a>
        ))}
    </nav>
  )
}

interface SocialProps {
  name: 'instagram' | 'github' | 'twitter',
  id?: string
}
