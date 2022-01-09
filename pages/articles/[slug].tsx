import { Article, getAllArticleSlugs, findFirstArticleBySlug } from '../../lib/article';
import markdownToHtml from '../../lib/markdownToHtml';

// TODO: Add tag link
export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <article className="post-single">
      <header className="post-title">
        <p>
          <time>{article.date}</time>
          <span>author</span>
        </p>
        <h1>{article.title}</h1>
      </header>
      {/* eslint-disable-next-line react/no-danger */}
      <section className="post-content" dangerouslySetInnerHTML={{ __html: article.content }} />
      <footer className="post-tags">
        {article.tags.map((tag) => (
          <a key={tag}>{tag}</a>
        ))}
      </footer>
    </article>
  )
}

type ArticlePageProps = {
  article: Article
}

export async function getStaticProps({ params }: {params: {slug: string}})
  : Promise<{ props: ArticlePageProps }> {
  const article = findFirstArticleBySlug(params.slug)
  article.content = await markdownToHtml(article.content)
  return { props: { article } }
}

export async function getStaticPaths() {
  return {
    paths: getAllArticleSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
