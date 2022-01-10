import { ArticlePreview, getArticlePreviews } from '../lib/article';
import ArticleListView from '../components/ArticleListView';
import { getPageSize, getSiteName } from '../lib/configuration';

export default function Index(
  { siteName, articles, pageNumber, isLastPage, isFirstPage }: IndexProps,
) {
  return (
    <ArticleListView
      siteName={siteName}
      articles={articles}
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

interface IndexProps {
  siteName: string,
  articles: ArticlePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
  const pagedArticles = getArticlePreviews(1, getPageSize())
  return {
    props: {
      siteName: getSiteName(),
      articles: pagedArticles.articles,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
