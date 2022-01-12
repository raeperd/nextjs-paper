import { join } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { getDefaultAuthor } from './configuration';

export function getArticlePreviews(pageNumber: number, pageSize: number): PagedArticlePreview {
  const articles = getAllArticleFiles()
    .map((file) => readArticle(file))
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  return {
    articles: articles.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === Math.ceil(articles.length / pageSize),
    pageNumber,
    pageSize,
  }
}

export function getNumArticles(): number {
  return getAllArticleFiles().length
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
  return readArticle(`${slugToFind}.md`)
}

export function getAboutPageArticle(): Article {
  return readPage('about.md')
}

export function getAllTags(): string[] {
  return getAllArticleFiles()
    .map((file) => readArticle(file))
    .flatMap((article) => article.tags)
}

export function getArticlePreviewsByTag(tagToFind: string, pageNumber: number, pageSize: number)
  : PagedArticlePreview {
  const articles = getAllArticlesByTag(tagToFind)
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  return {
    articles: articles.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === Math.ceil(articles.length / pageSize),
    pageNumber,
    pageSize,
  }
}

export function getNumArticlesByTag(tag: string): number {
  return getAllArticlesByTag(tag).length
}

function getAllArticlesByTag(tagToFind: string): ArticlePreview[] {
  return getAllArticleFiles()
    .map((file) => readArticle(file))
    .filter((article) => article.tags.findIndex((tag) => tag === tagToFind) > -1)
}

export interface Article extends ArticlePreview{
  tags: string[],
  content: string
}

export interface ArticlePreview {
  slug: string,
  title: string,
  date: string,
  author: string
}

export interface PagedArticlePreview {
  articles: ArticlePreview[],
  pageNumber: number,
  pageSize: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

const PAGE_DIRECTORY = join(process.cwd(), 'lib', 'content')
const ARTICLE_DIRECTORY = join(PAGE_DIRECTORY, 'article')

function getAllArticleFiles(): string[] {
  return readdirSync(ARTICLE_DIRECTORY)
}

function readArticle(file: string): Article {
  return readFileAsArticle(ARTICLE_DIRECTORY, file)
}

function readPage(file: string): Article {
  return readFileAsArticle(PAGE_DIRECTORY, file)
}

function readFileAsArticle(directory:string, file: string): Article {
  const filePath = join(directory, file)
  const fileContent = readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return {
    slug: file.replace(/\.md$/, ''),
    title: data.title ? data.title : file,
    date: data.date
      ? data.date.toDateString()
      : statSync(filePath).birthtime.toDateString(),
    tags: data.tags ? data.tags : [],
    author: data.author ? data.author : getDefaultAuthor(),
    content,
  }
}
