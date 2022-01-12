import { findFirstArticleBySlug, getAllArticleSlugs, getArticlePreviews } from './article';

test('getArticlePreviews', () => {
  const pageSize = 1
  const articles = getArticlePreviews(1, pageSize)

  expect(articles.pageSize).toBe(pageSize)
  expect(articles.articles).toHaveLength(pageSize)
})

test('getAllArticleSlugs', () => {
  const articleSlugs = getAllArticleSlugs()
  expect(articleSlugs.length).toBeGreaterThanOrEqual(1)
})

test('findFirstArticleBySlug', () => {
  const articleSlugs = getAllArticleSlugs()
  articleSlugs.forEach((slug) => expect(findFirstArticleBySlug(slug).slug).toBe(slug))
})
