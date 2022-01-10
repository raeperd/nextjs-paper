import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { DiscussionEmbed } from 'disqus-react';
import { Article } from '../lib/article'

// TODO: Add tag link
export default function ArticleView({ article, disqusShortname, currentURL }: ArticleViewProps) {
  return (
    <article className="post-single">
      <header className="post-title">
        <p>
          <time>{article.date}</time>
          <span>{article.author}</span>
        </p>
        <h1>{article.title}</h1>
      </header>
      <section className="post-content">
        <ReactMarkdown
          components={SyntaxHighlight}
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
      {disqusShortname && <div id="disqus_thread" className="post-comments" />}
      {disqusShortname && (
      <DiscussionEmbed
        shortname={disqusShortname}
        config={{
          url: currentURL,
          identifier: article.slug,
          title: article.title,
        }}
      />
      )}
    </article>
  )
}

export interface ArticleViewProps {
  article: Article,
  disqusShortname: string | null
  currentURL: string,
}

const SyntaxHighlight: object = {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}
