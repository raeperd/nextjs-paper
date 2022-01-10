import { Article, getAboutPageArticle } from '../lib/article';
import ArticleView from '../components/ArticleView';

export default function AboutPage({ article }: {article: Article}) {
  return (
    <ArticleView article={article} />
  )
}

export async function getStaticProps(): Promise<{ props: {article: Article} }> {
  const article = getAboutPageArticle()
  return { props: { article } }
}
