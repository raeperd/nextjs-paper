import {
  ArticlePreview,
  getAllTags,
  getArticlePreviewsByTag,
  getNumArticlesByTag,
} from '../../../../lib/article';
import { getPageSize } from '../../../../lib/configuration';
import ArticleListView from '../../../../components/ArticleListView';

export default function TagPageListPage(
  { tag, articles, pageNumber, isFirstPage, isLastPage }: TagPageListProps,
) {
  return (
    <ArticleListView
      siteName={tag}
      mainTitle={tag}
      basePath={`/tags/${tag}`}
      articles={articles}
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type TagPageListProps = {
  tag: string,
  articles: ArticlePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string, pageNumber: string}}):
  Promise<{props: TagPageListProps}> {
  const pagedArticles = getArticlePreviewsByTag(
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tag: params.tag,
      articles: pagedArticles.articles,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getAllTags().flatMap((tag) => pathsFromTag(tag)),
    fallback: false,
  }
}

function pathsFromTag(tag: string) {
  const numPage = Math.ceil(getNumArticlesByTag(tag) / getPageSize())
  return Array(numPage)
    .fill(0)
    .map((_, index) => (index + 1))
    .map((pageNumber) => ({ params: { tag, pageNumber: pageNumber.toString() } }))
}
