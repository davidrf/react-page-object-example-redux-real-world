import createRootPage from '../createRootPage'
import fetchMock from 'fetch-mock'
import createResponse from '../createResponse'
import userSuccessOkDavidrf from '../fixtures/userSuccessOkDavidrf.json'
import userSuccessOkIntrepidPursuits from '../fixtures/userSuccessOkIntrepidPursuits.json'
import starredSuccessOkDavidrfPageOne from '../fixtures/starredSuccessOkDavidrfPageOne.json'
import starredSuccessOkDavidrfPageTwo from '../fixtures/starredSuccessOkDavidrfPageTwo.json'
import starredSuccessOkIntrepidPursuits from '../fixtures/starredSuccessOkIntrepidPursuits.json'
import stargazersSuccessOkReactPageObject from '../fixtures/stargazersSuccessOkReactPageObject.json'

const pageOneLinkHeader = '<https://api.github.com/user/9678182/starred?page=2>; rel="next", <https://api.github.com/user/9678182/starred?page=2>; rel="last"'
const pageTwoLinkHeader = '<https://api.github.com/user/9678182/starred?page=1>; rel="first", <https://api.github.com/user/9678182/starred?page=1>; rel="prev"'

describe('userVisitsUserPage', () => {
  let page

  beforeEach(() => {
    fetchMock
    .get(
      `https://api.github.com/users/davidrf`,
      createResponse({ body: userSuccessOkDavidrf})
    )
    .get(
      `https://api.github.com/users/intrepidpursuits`,
      createResponse({ body: userSuccessOkIntrepidPursuits })
    )
    .get(
      `https://api.github.com/users/davidrf/starred`,
      createResponse({
        body: starredSuccessOkDavidrfPageOne,
        delay: 50,
        headers: { link: pageOneLinkHeader }
      })
    )
    .get(
      `https://api.github.com/user/9678182/starred?page=2`,
      createResponse({
        body: starredSuccessOkDavidrfPageTwo,
        headers: { link: pageTwoLinkHeader }
      })
    )
    .get(
      `https://api.github.com/users/intrepidpursuits/starred`,
      createResponse({ body: starredSuccessOkIntrepidPursuits })
    )
    .get(
      `https://api.github.com/repos/intrepidpursuits/react-page-object/stargazers`,
      createResponse({ body: stargazersSuccessOkReactPageObject })
    )
  })

  afterEach(() => {
    page.destroy()
    fetchMock.restore()
  })

  describe('user with starred repositories', () => {
    beforeEach(() => {
      page = createRootPage('/davidrf')
    })

    it('should show the user information', async () => {
      expect(page.content()).to.match(/Loading davidrf's profile.../)
      expect(page.content()).not.to.match(/davidrf \(David Rodriguez Fuentes\)/)
      await page.waitUntil(() => page.contentMatches(/davidrf \(David Rodriguez Fuentes\)/))
    })

    it('should show the user\'s starred repositories', async () => {
      await page.waitUntil(() => page.contentMatches(/davidrf \(David Rodriguez Fuentes\)/))
      expect(page.content()).to.match(/Loading davidrf's starred.../)
      expect(page.content()).not.to.match(/elixir by elixir-lang/)
      await page.waitUntil(() => page.contentMatches(/elixir by elixir-lang/))
    })

    it('should show more user starred repositories when clicking the \'Load More\' button if they have more', async () => {
      await page.waitUntil(() => page.findWrapperForClickButton('Load More').exists())
      page.clickButton('Load More')
      expect(page.content()).to.match(/Loading.../)
      expect(page.content()).not.to.match(/curriculum by davidrf/)
      await page.waitUntil(() => page.contentMatches(/curriculum by davidrf/))
      expect(page.findWrapperForClickButton('Load More').exists()).to.equal(false)
    })

    it('should allow navigation to the user page of a starred repository author', async () => {
      await page.waitUntil(() => page.findWrapperForClickLink('IntrepidPursuits').exists())
      page.clickLink('IntrepidPursuits')
      expect(page.currentPath()).to.equal('/IntrepidPursuits')
    })

    it('should allow navigation to the repository page of a starred repository', async () => {
      await page.waitUntil(() => page.findWrapperForClickLink('react-page-object').exists())
      page.clickLink('react-page-object')
      expect(page.currentPath()).to.equal('/IntrepidPursuits/react-page-object')
    })
  })

  describe('user with no starred repositories', () => {
    beforeEach(() => {
      page = createRootPage('/IntrepidPursuits')
    })

    it('should show the user\'s starred repositories', async () => {
      expect(page.content()).not.to.match(/Nothing here!/)
      await page.waitUntil(() => page.contentMatches(/Nothing here!/))
    })
  })
})
