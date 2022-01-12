import { ArticlePreview, getArticlePreviews } from '../lib/article';
import ArticleListView from '../components/ArticleListView';
import { getPageSize, getSiteName } from '../lib/configuration';

export default function Index(
  { title, articles, pageNumber, isLastPage, isFirstPage }: IndexProps,
) {
  return (
    <ArticleListView
      title={title}
      articles={articles}
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

interface IndexProps {
  title: string,
  articles: ArticlePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
  const pagedArticles = getArticlePreviews(1, getPageSize())
  return {
    props: {
      title: getSiteName(),
      articles: pagedArticles.articles,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
