import Head from 'next/head';
import { Article, getAllArticles } from '../lib/article';

export default function Index({ siteName, posts }: IndexProps) {
  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>
      {posts.map((post) => <ArticlePreview article={post} />)}
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
