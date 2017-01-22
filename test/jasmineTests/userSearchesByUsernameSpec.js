import createRootPage from '../createRootPage'
import fetchMock from 'fetch-mock'
import createResponse from '../createResponse'
import userSuccessOkDavidrf from '../fixtures/userSuccessOkDavidrf.json'
import starredSuccessOkDavidrfPageOne from '../fixtures/starredSuccessOkDavidrfPageOne.json'
import asyncTest from './asyncTestJasmine'

describe('userSearchesByUsername', () => {
  let page

  beforeEach(() => {
    fetchMock
    .get(
      `https://api.github.com/users/davidrf`,
      createResponse({ body: userSuccessOkDavidrf})
    )
    .get(
      `https://api.github.com/users/davidrf/starred`,
      createResponse({ body: starredSuccessOkDavidrfPageOne })
    )

    page = createRootPage()
  })

  afterEach(() => {
    page.destroy()
    fetchMock.restore()
  })

  it('should show the user information', asyncTest(async () => {
    page
      .fillIn('search-input', 'davidrf')
      .clickButton('Go!')

    expect(page.currentPath()).toEqual('/davidrf')
  }))
})
