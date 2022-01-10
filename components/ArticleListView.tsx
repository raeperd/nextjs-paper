import Head from 'next/head';
import Link from 'next/link';
import { Article } from '../lib/article';

const PAGE_SIZE = 3

export default function ArticleListView({ siteName, articles, pageNumber }: ArticleListViewProps) {
  const pageLast = Math.ceil(articles.length / PAGE_SIZE)
  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>
      {articles
        .slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)
        .map((post) => <ArticlePreview article={post} key={post.slug} />)}
      <nav className="main-nav">
        {pageNumber > 1 && (
          <PrevButton currentPageNumber={pageNumber} />
        )}
        {pageNumber !== pageLast && (
          <NextButton currentPageNumber={pageNumber} />
        ) }
      </nav>
    </>
  )
}

function ArticlePreview({ article }: {article: Article}) {
  return (
    <article className="post-entry">
      <h2>{article.title}</h2>
      <time>{article.date}</time>
      <Link href={`/articles/${article.slug}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a />
      </Link>
    </article>
  )
}

function PrevButton({ currentPageNumber }: {currentPageNumber: number}) {
  const prevPageLink = currentPageNumber === 2 ? '/' : `/page/${currentPageNumber - 1}`
  return (
    <Link href={prevPageLink}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a className="prev">prev_page</a>
    </Link>
  )
}

function NextButton({ currentPageNumber }: {currentPageNumber: number}) {
  return (
    <Link href={`/page/${currentPageNumber + 1}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a className="next">next_page</a>
    </Link>
  )
}

type ArticleListViewProps = {
  siteName: string,
  articles: Article[],
  pageNumber: number
}
