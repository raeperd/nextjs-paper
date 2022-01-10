import { Article, getAllArticles } from '../lib/article';
import ArticleListView from '../components/ArticleListView';

export default function Index({ siteName, articles }: IndexProps) {
  return <ArticleListView siteName={siteName} articles={articles} pageNumber={1} />
}

type IndexProps = {
  siteName: string,
  articles: Article[]
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
  const siteName = process.env.SITE_NAME ? process.env.SITE_NAME : 'Paper'
  return { props: { siteName, articles: getAllArticles() } }
}
