import { Article, findFirstArticleBySlug, getAllArticleSlugs } from '../../lib/article';
import ArticleView from '../../components/ArticleView';

// TODO: Add tag link
export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <ArticleView article={article} />
  )
}

type ArticlePageProps = {
  article: Article
}

export async function getStaticProps({ params }: {params: {slug: string}})
  : Promise<{ props: ArticlePageProps }> {
  const article = findFirstArticleBySlug(params.slug)
  return { props: { article } }
}

export async function getStaticPaths() {
  return {
    paths: getAllArticleSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
