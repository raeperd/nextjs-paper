import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ siteName, menus, socials }: HeaderProps) {
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

export interface HeaderProps {
  siteName: string,
  menus: MenuProps[],
  socials: SocialProps[]
}

function MenuNav({ menus }: {menus: MenuProps[]}) {
  const router = useRouter()
  return (
    <nav className="menu">
      {menus.map((menu) => (
        <Link href={menu.href}>
          <a className={router.pathname === menu.href ? 'active' : ''} id={menu.name}>{menu.name}</a>
        </Link>
      ))}
    </nav>
  )
}

interface MenuProps {
  name: string,
  href: string
}

function SocialNav({ socials }: {socials: SocialProps[]}) {
  return (
    <nav className="social">
      {socials
        .filter((social) => social.id)
        .map((social) => (
          <a href={`//${social.name}.com/${social.id}`}>
            <img
              id={social.name}
              src={`./${social.name}.svg`}
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
