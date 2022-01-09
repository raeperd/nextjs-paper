import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Article, findFirstArticleBySlug, getAllArticleSlugs } from '../../lib/article';

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
      <section className="post-content">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          remarkPlugins={[remarkGfm, remarkMath]}
        >
          {article.content}
        </ReactMarkdown>
      </section>
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
  return { props: { article } }
}

export async function getStaticPaths() {
  return {
    paths: getAllArticleSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
