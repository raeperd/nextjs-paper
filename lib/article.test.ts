import { findFirstArticleBySlug, getAllArticles, getAllArticleSlugs } from './article';

test('getAllArticles', () => {
  const articles = getAllArticles()
  expect(articles).toHaveLength(5)
  expect(articles[0].title.length).toBeGreaterThanOrEqual(0)
})

test('getAllArticleSlugs', () => {
  const articleSlugs = getAllArticleSlugs()
  expect(articleSlugs).toHaveLength(5)
})

test('findFirstArticleBySlug', () => {
  const articleSlugs = getAllArticleSlugs()
  articleSlugs.forEach((slug) => expect(findFirstArticleBySlug(slug).slug).toBe(slug))
})
