import Head from 'next/head';
import Link from 'next/link';
import { ArticlePreview } from '../lib/article';

export default function ArticleListView(
  { title, mainTitle, articles, basePath, pageNumber, isFirstPage, isLastPage }
    : ArticleListViewProps,
) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {mainTitle && <h1 className="main-title">{mainTitle}</h1>}
      {articles.map((article) => (
        <ArticlePreviewItem article={article} key={article.slug} />))}
      <nav className="main-nav">
        {!isFirstPage && (<PrevButton basePath={basePath || '/'} currentPageNumber={pageNumber} />)}
        {!isLastPage && (<NextButton basePath={basePath || '/'} currentPageNumber={pageNumber} />)}
      </nav>
    </>
  )
}

function ArticlePreviewItem({ article }: {article: ArticlePreview}) {
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

function PrevButton({ basePath, currentPageNumber }: PagingButtonProps) {
  const prevPageLink = currentPageNumber === 2 ? `${basePath}/` : `${basePath}/page/${currentPageNumber - 1}`
  return (
    <Link href={prevPageLink}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a className="prev">prev_page</a>
    </Link>
  )
}

function NextButton({ basePath, currentPageNumber }: PagingButtonProps) {
  return (
    <Link href={`${basePath}/page/${currentPageNumber + 1}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a className="next">next_page</a>
    </Link>
  )
}

type PagingButtonProps = {
  basePath: string,
  currentPageNumber: number
}

type ArticleListViewProps = {
  title: string,
  basePath?: string,
  mainTitle?: string,
  articles: ArticlePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean,
}
