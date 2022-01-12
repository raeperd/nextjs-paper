import { ArticlePreview, getAllArticlesByTag, getAllTags } from '../../lib/article';
import ArticleListView from '../../components/ArticleListView';

export default function TagPage(
  { tag, articles }: TagPageProps,
) {
  return (
    <ArticleListView
      siteName={tag}
      mainTitle={tag}
      articles={articles}
      pageNumber={1}
      isFirstPage
      isLastPage
    />
  )
}

type TagPageProps = {
  tag: string,
  articles: ArticlePreview[]
}

export async function getStaticProps({ params }: {params: {tag: string}}):
  Promise<{props: TagPageProps}> {
  return {
    props: {
      tag: params.tag,
      articles: getAllArticlesByTag(params.tag),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getAllTags().map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}
