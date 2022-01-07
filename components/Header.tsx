import Link from 'next/link';

type HeaderProps = {
  siteName: string
}

export default function Header({ siteName }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="logo">
        <Link href="/">
          <a className="site-name">{siteName}</a>
        </Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a className="btn-dark" />
      </h1>
    </header>
  )
}
