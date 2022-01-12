import { ArticlePreview, getArticlePreviews, getNumArticles } from '../../lib/article';
import ArticleListView from '../../components/ArticleListView';
import { getPageSize, getSiteName } from '../../lib/configuration';

export default function ArticleListPage(
  { title, articles, pageNumber, isFirstPage, isLastPage }: ArticleListPageProps,
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

type ArticleListPageProps = {
  title: string,
  articles: ArticlePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ArticleListPageProps }> {
  const pagedArticles = getArticlePreviews(parseInt(params.pageNumber, 10), getPageSize())
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

export async function getStaticPaths() {
  const numPage = Math.ceil(getNumArticles() / getPageSize())
  return {
    paths: Array(numPage)
      .fill(0)
      .map((_, index) => (index + 1))
      .map((pageNumber) => ({ params: { pageNumber: pageNumber.toString() } })),
    fallback: false,
  }
}
