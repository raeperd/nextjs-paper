import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ siteName, menus }: HeaderProps) {
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
    </header>
  )
}

type HeaderProps = {
  siteName: string,
  menus: Menu[]
}

type Menu = {
  name: string,
  href: string
}

function MenuNav({ menus }: {menus: Menu[]}) {
  const router = useRouter()
  return (
    <nav className="menu">
      {menus.map((menu) => (
        <Link href={menu.href}>
          <a className={router.pathname === menu.href ? 'active' : ''}>{menu.name}</a>
        </Link>
      ))}
    </nav>
  )
}
