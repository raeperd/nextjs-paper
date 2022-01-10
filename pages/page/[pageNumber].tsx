import { useRouter } from 'next/router';
import { Article, getAllArticles, getNumArticles } from '../../lib/article';
import ArticleListView from '../../components/ArticleListView';

export default function ArticleListPage({ siteName, articles }: ArticleListPageProps) {
  const router = useRouter()
  const { pageNumber } = router.query
  return (
    <ArticleListView
      siteName={siteName}
      articles={articles}
      pageNumber={parseInt(pageNumber as string, 10)}
    />
  )
}

type ArticleListPageProps = {
      siteName: string,
  articles: Article[]
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ArticleListPageProps }> {
  const siteName = process.env.SITE_NAME ? process.env.SITE_NAME : 'Paper'
  const articles = getAllArticles()
  return { props: { siteName, articles } }
}

export async function getStaticPaths() {
  const pageSize = process.env.PAGE_SIZE ? parseInt(process.env.PAGE_SIZE, 10) : 3
  const numPage = Math.ceil(getNumArticles() / pageSize)
  const paths = Array(numPage)
    .fill(0)
    .map((_, index) => (index + 1).toString())
    .map((pageNumber) => ({ params: { pageNumber } }))
  return {
    paths,
    fallback: false,
  }
}
