import { test, expect } from '@playwright/test'

test.describe('Blog Index Page', () => {
  test('redirects / to /blog', async ({ page }) => {
    await page.goto('/')
    await page.waitForURL('**/blog')
    expect(page.url()).toContain('/blog')
  })

  test('displays blog page with articles heading', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.locator('h1')).toHaveText('Articles')
  })

  test('lists blog posts', async ({ page }) => {
    await page.goto('/blog')
    const articles = page.locator('article')
    await expect(articles).not.toHaveCount(0)
  })

  test('each post has title, date, and reading time', async ({ page }) => {
    await page.goto('/blog')
    const firstArticle = page.locator('article').first()
    await expect(firstArticle.locator('h2')).toBeVisible()
    await expect(firstArticle.locator('time')).toBeVisible()
    await expect(firstArticle.getByText(/min/)).toBeVisible()
  })

  test('navigation links are visible', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('link', { name: 'Blog', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'About', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible()
  })
})

test.describe('Blog Post Page', () => {
  test('navigates to a post and displays content', async ({ page }) => {
    await page.goto('/blog')
    await page.locator('article').first().locator('a').first().click()
    await expect(page.locator('article h1')).toBeVisible()
    await expect(page.locator('.prose')).toBeVisible()
  })

  test('displays post metadata', async ({ page }) => {
    await page.goto('/blog/exemple-de-post')
    await expect(page.locator('h1')).toContainText('Exemple complet')
    await expect(page.locator('time')).toBeVisible()
    await expect(page.getByText(/min de lecture/)).toBeVisible()
  })

  test('renders MDX components correctly', async ({ page }) => {
    await page.goto('/blog/exemple-de-post')
    // Callout component
    await expect(page.locator('.mdx-callout-content').first()).toBeVisible()
    // Code blocks with syntax highlighting
    await expect(page.locator('pre code').first()).toBeVisible()
    // Tables
    await expect(page.locator('table').first()).toBeVisible()
  })

  test('has back to articles link', async ({ page }) => {
    await page.goto('/blog/exemple-de-post')
    const backLink = page.getByText('Retour aux articles').first()
    await expect(backLink).toBeVisible()
    await backLink.click()
    await page.waitForURL('**/blog')
  })

  test('renders embedded images', async ({ page }) => {
    await page.goto('/blog/exemple-de-post')
    const figures = page.locator('figure')
    await expect(figures.first()).toBeVisible()
  })
})

test.describe('About Page', () => {
  test('about page renders correctly', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toContainText("Simon")
    await expect(page.locator('.prose')).toBeVisible()
  })

  test('about is accessible from navigation', async ({ page }) => {
    await page.goto('/blog')
    await page.getByRole('link', { name: 'About', exact: true }).click()
    await page.waitForURL('**/about')
    await expect(page.locator('h1')).toContainText('Simon')
  })
})

test.describe('Kobo Root Post', () => {
  test('renders the kobo-root post with Columns component', async ({ page }) => {
    await page.goto('/blog/kobo-root')
    await expect(page.locator('h1').first()).toContainText('Jailbreak')
    // The post uses Columns and Figure components
    await expect(page.locator('figure').first()).toBeVisible()
  })
})

test.describe('General Site Health', () => {
  test('returns 404 for non-existent pages', async ({ page }) => {
    const response = await page.goto('/blog/non-existent-post')
    expect(response?.status()).toBe(404)
  })

  test('page has correct lang attribute', async ({ page }) => {
    await page.goto('/blog')
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBe('fr')
  })

  test('page title is set correctly on blog', async ({ page }) => {
    await page.goto('/blog')
    await expect(page).toHaveTitle(/Blog/)
  })

  test('page title is set correctly on post', async ({ page }) => {
    await page.goto('/blog/exemple-de-post')
    await expect(page).toHaveTitle(/Exemple complet/)
  })
})
