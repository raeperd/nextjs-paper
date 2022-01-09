import { join } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';

const ARTICLE_DIRECTORY = join(process.cwd(), 'lib', 'content', 'article')

export function getAllArticles(): Article[] {
  return getAllArticleFiles()
    .map((file) => readArticleFile(file))
}

export function getAllArticleSlugs(): string[] {
  return getAllArticleFiles()
    .map((file) => file.replace(/\.md$/, ''))
}

export function findFirstArticleBySlug(slugToFind: string): Article {
  const slugFound = getAllArticleSlugs().find((slug) => slug === slugToFind)
  if (!slugFound) {
    throw new Error(`Given ${slugToFind} is not exists`)
  }
  return readArticleFile(`${slugToFind}.md`)
}

function getAllArticleFiles(): string[] {
  return readdirSync(ARTICLE_DIRECTORY)
    .filter((file) => !file.startsWith('_'))
}

function readArticleFile(file: string): Article {
  const filePath = join(ARTICLE_DIRECTORY, file)
  const fileContent = readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return {
    slug: file.replace(/\.md$/, ''),
    title: data.title ? data.title : file,
    date: data.date
      ? data.date.toDateString()
      : statSync(filePath).birthtime.toDateString(),
    tags: data.tags ? data.tags : [],
    content,
  }
}

export interface Article {
  slug: string,
  title: string,
  date: string,
  tags: string[],
  content: string
}
