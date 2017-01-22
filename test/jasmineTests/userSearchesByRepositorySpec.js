import createRootPage from '../createRootPage'
import fetchMock from 'fetch-mock'
import createResponse from '../createResponse'
import repoSuccessOkReactPageObject from '../fixtures/repoSuccessOkReactPageObject.json'
import stargazersSuccessOkReactPageObject from '../fixtures/stargazersSuccessOkReactPageObject.json'
import asyncTest from './asyncTestJasmine'

describe('userSearchesByRepository', () => {
  let page

  beforeEach(() => {
    fetchMock
    .get(
      `https://api.github.com/repos/intrepidpursuits/react-page-object`,
      createResponse({ body: repoSuccessOkReactPageObject })
    )
    .get(
      `https://api.github.com/repos/intrepidpursuits/react-page-object/stargazers`,
      createResponse({ body: stargazersSuccessOkReactPageObject, })
    )

    page = createRootPage()
  })

  afterEach(() => {
    page.destroy()
    fetchMock.restore()
  })

  it('should show the user information', asyncTest(async () => {
    page
      .fillIn('search-input', 'IntrepidPursuits/react-page-object')
      .clickButton('Go!')

    await page.waitUntil(() => page.currentPath() === '/IntrepidPursuits/react-page-object')
    expect(page.currentPath()).toEqual('/IntrepidPursuits/react-page-object')
  }))
})
