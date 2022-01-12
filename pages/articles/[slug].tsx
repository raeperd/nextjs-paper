import Head from 'next/head';
import { Article, findFirstArticleBySlug, getAllArticleSlugs } from '../../lib/article';
import ArticleView from '../../components/ArticleView';
import { getDisqusShortname, getServerURL } from '../../lib/configuration';

export default function ArticlePage({ article, disqusShortname, serverURL }: ArticlePageProps) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <ArticleView
        article={article}
        disqusShortname={disqusShortname}
        currentURL={`${serverURL}/articles/${article.slug}`}
      />
    </>
  )
}

type ArticlePageProps = {
  article: Article,
  disqusShortname: string | null,
  serverURL: string
}

export async function getStaticProps({ params }: {params: {slug: string}})
  : Promise<{ props: ArticlePageProps }> {
  const article = findFirstArticleBySlug(params.slug)
  return {
    props: {
      article,
      disqusShortname: getDisqusShortname(),
      serverURL: getServerURL(),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getAllArticleSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
