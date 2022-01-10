import { Article, getAboutPageArticle } from '../lib/article';
import ArticleView from '../components/ArticleView';
import { getDisqusShortname, getServerURL } from '../lib/configuration';

export default function AboutPage({ article, disqusShortname, serverURL } : AboutPageProps) {
  return (
    <ArticleView
      article={article}
      disqusShortname={disqusShortname}
      currentURL={`${serverURL}/about`}
    />
  )
}

type AboutPageProps = {
  article: Article,
  disqusShortname: string | null,
  serverURL: string
}

export async function getStaticProps(): Promise<{ props: AboutPageProps }> {
  const article = getAboutPageArticle()
  return {
    props: {
      article,
      disqusShortname: getDisqusShortname(),
      serverURL: getServerURL(),
    },
  }
}
