import createRootPage from '../createRootPage'
import fetchMock from 'fetch-mock'
import createResponse from '../createResponse'
import userSuccessOkDavidrf from '../fixtures/userSuccessOkDavidrf.json'
import starredSuccessOkDavidrfPageOne from '../fixtures/starredSuccessOkDavidrfPageOne.json'

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

  it('should show the user information', async () => {
    page
      .fillIn('search-input', 'davidrf')
      .clickButton('Go!')

    expect(page.currentPath()).to.equal('/davidrf')
  })
})
