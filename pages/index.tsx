import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { Article, getAllArticles } from '../lib/article';

const PAGE_SIZE = 3

export default function Index({ siteName, posts }: IndexProps) {
  const [pageCurrent, setPageCurrent] = useState(0)
  const pageLast = posts.length < PAGE_SIZE ? 0 : Math.ceil(posts.length / PAGE_SIZE) - 1
  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>
      {posts
        .slice(pageCurrent * PAGE_SIZE, pageCurrent * PAGE_SIZE + PAGE_SIZE)
        .map((post) => <ArticlePreview article={post} key={post.slug} />)}
      <nav className="main-nav">
        {pageCurrent > 0 && (
          <button
            className="prev"
            type="button"
            onClick={() => setPageCurrent(pageCurrent - 1)}
          >
            prev_page
          </button>
        )}
        {pageCurrent !== pageLast && (
        <button
          className="next"
          type="button"
          onClick={() => setPageCurrent(pageCurrent + 1)}
        >
          next_page
        </button>
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

type IndexProps = {
  siteName: string,
  posts: Article[]
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
  const siteName = process.env.SITE_NAME ? process.env.SITE_NAME : 'Paper'
  return { props: { siteName, posts: getAllArticles() } }
}
