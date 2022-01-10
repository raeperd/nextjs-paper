import { findFirstArticleBySlug, getAllArticleSlugs, getArticlePreviews } from './article';

test('getArticlePreviews', () => {
  const pageSize = 3
  const articles = getArticlePreviews(1, pageSize)

  expect(articles.pageSize).toBe(pageSize)
  expect(articles.articles).toHaveLength(pageSize)
})

test('getAllArticleSlugs', () => {
  const articleSlugs = getAllArticleSlugs()
  expect(articleSlugs).toHaveLength(5)
})

test('findFirstArticleBySlug', () => {
  const articleSlugs = getAllArticleSlugs()
  articleSlugs.forEach((slug) => expect(findFirstArticleBySlug(slug).slug).toBe(slug))
})
