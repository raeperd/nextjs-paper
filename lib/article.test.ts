import { getAllArticles } from './article';

test('getAllArticles', () => {
  const articles = getAllArticles()
  expect(articles).toHaveLength(5)

  expect(articles[0].title?.length).toBeGreaterThanOrEqual(0)
})
