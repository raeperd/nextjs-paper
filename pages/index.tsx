import Head from 'next/head';
import { useState } from 'react';
import { Article, getAllArticles } from '../lib/article';

const PAGE_SIZE = 1

export default function Index({ siteName, posts }: IndexProps) {
  const [pageCurrent, setPageCurrent] = useState(0)
  const lastPage = Math.floor(posts.length / PAGE_SIZE) - 1
  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>
      {posts
        .slice(pageCurrent * PAGE_SIZE, pageCurrent * PAGE_SIZE + PAGE_SIZE)
        .map((post) => <ArticlePreview article={post} />)}
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
        {pageCurrent !== lastPage && (
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
    // TODO: ADD LINK
    <article className="post-entry" key={article.slug}>
      <h2>{article.title}</h2>
      <time>{article.date}</time>
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
