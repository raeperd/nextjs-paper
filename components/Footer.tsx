import Link from 'next/link';

export default function Footer({ siteName }: {siteName: string}) {
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
        <a href="https://github.com/raeperd/nextjs-paper" rel="noopener noreferrer" target="_blank"> Paper </a>
      </p>
    </footer>
  )
}
