import createRootPage from '../createRootPage'
import fetchMock from 'fetch-mock'
import createResponse from '../createResponse'
import forbidden from '../fixtures/forbidden.json'
import asyncTest from './asyncTestJasmine'

describe('userHitsApiLimit', () => {
  let page

  beforeEach(() => {
    fetchMock
    .get(
      `https://api.github.com/repos/intrepidpursuits/react-page-object`,
      createResponse({ body: forbidden, status: 403 })
    )
    .get(
      `https://api.github.com/repos/intrepidpursuits/react-page-object/stargazers`,
      createResponse({ body: forbidden, status: 403 })
    )
    .get(
      `https://api.github.com/users/intrepidpursuits`,
      createResponse({ body: forbidden, status: 403 })
    )
    .get(
      `https://api.github.com/users/intrepidpursuits/starred`,
      createResponse({ body: forbidden, status: 403 })
    )

    page = createRootPage()
  })

  afterEach(() => {
    page.destroy()
    fetchMock.restore()
  })

  it('should show an error banner when API limit is reached when searching for a user', asyncTest(async () => {
    page
      .fillIn('search-input', 'IntrepidPursuits')
      .clickButton('Go!')

    await page.waitUntil(() => page.findWrapperForClickLink('Dismiss'))
    expect(page.content()).toMatch(/API rate limit exceeded/)
    page.clickLink('Dismiss')
    expect(page.content()).not.toMatch(/API rate limit exceeded/)
  }))

  it('should show an error banner when API limit is reached when searching for a repository', asyncTest(async () => {
    page
      .fillIn('search-input', 'IntrepidPursuits/react-page-object')
      .clickButton('Go!')

    await page.waitUntil(() => page.findWrapperForClickLink('Dismiss'))
    expect(page.content()).toMatch(/API rate limit exceeded/)
    page.clickLink('Dismiss')
    expect(page.content()).not.toMatch(/API rate limit exceeded/)
  }))
})
