import { join } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';

const ARTICLE_DIRECTORY = join(process.cwd(), 'lib', 'content', 'post')

export function getAllArticles(): Article[] {
  return readdirSync(ARTICLE_DIRECTORY)
    .filter((file) => !file.startsWith('_'))
    .map((file) => readArticleSync(file))
}

function readArticleSync(file: string): Article {
  const filePath = join(ARTICLE_DIRECTORY, file)
  const fileContent = readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return {
    slug: file.replace(/\.md$/, ''),
    title: data.title,
    date: data.date
      ? data.date.toDateString()
      : statSync(filePath).birthtime.toDateString(),
    tags: data.tags ? data.tags : [],
    content,
  }
}

export interface Article {
  slug: string,
  title?: string,
  date: string,
  tags: string[],
  content: string
}
