import createRootPage from '../createRootPage'
import fetchMock from 'fetch-mock'
import createResponse from '../createResponse'
import notFound from '../fixtures/notFound.json'
import asyncTest from './asyncTestJasmine'

describe('userSearchesNotFound', () => {
  let page

  beforeEach(() => {
    fetchMock
    .get(
      `https://api.github.com/repos/as/df`,
      createResponse({ body: notFound, status: 404 })
    )
    .get(
      `https://api.github.com/repos/as/df/stargazers`,
      createResponse({ body: notFound, status: 404 })
    )
    .get(
      `https://api.github.com/users/doesntexist`,
      createResponse({ body: notFound, status: 404 })
    )
    .get(
      `https://api.github.com/users/doesntexist/starred`,
      createResponse({ body: notFound, status: 404 })
    )

    page = createRootPage()
  })

  afterEach(() => {
    page.destroy()
    fetchMock.restore()
  })

  it('should show an error banner when there is no matching user', asyncTest(async () => {
    page
      .fillIn('search-input', 'doesntexist')
      .clickButton('Go!')

    await page.waitUntil(() => page.findWrapperForClickLink('Dismiss'))
    expect(page.content()).toMatch(/Not Found/)
    page.clickLink('Dismiss')
    expect(page.content()).not.toMatch(/Not Found/)
  }))

  it('should show an error banner when there is no matching repository', asyncTest(async () => {
    page
      .fillIn('search-input', 'as/df')
      .clickButton('Go!')

    await page.waitUntil(() => page.findWrapperForClickLink('Dismiss'))
    expect(page.content()).toMatch(/Not Found/)
    page.clickLink('Dismiss')
    expect(page.content()).not.toMatch(/Not Found/)
  }))
})
