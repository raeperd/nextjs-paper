import { ArticlePreview, getAllTags, getArticlePreviewsByTag } from '../../lib/article';
import ArticleListView from '../../components/ArticleListView';
import { getPageSize } from '../../lib/configuration';

export default function TagPage(
  { tag, articles, pageNumber, isFirstPage, isLastPage }: TagPageProps,
) {
  return (
    <ArticleListView
      title={tag}
      mainTitle={tag}
      basePath={`/tags/${tag}`}
      articles={articles}
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type TagPageProps = {
  tag: string,
  articles: ArticlePreview[]
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string}}):
  Promise<{props: TagPageProps}> {
  const pagedArticles = getArticlePreviewsByTag(params.tag, 1, getPageSize())
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
    paths: getAllTags().map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}
