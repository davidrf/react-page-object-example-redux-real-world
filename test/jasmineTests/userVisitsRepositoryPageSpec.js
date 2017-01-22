import createRootPage from '../createRootPage'
import fetchMock from 'fetch-mock'
import createResponse from '../createResponse'
import repoSuccessOkReactPageObject from '../fixtures/repoSuccessOkReactPageObject.json'
import repoSuccessOkReact from '../fixtures/repoSuccessOkReact.json'
import stargazersSuccessOkReactPageObject from '../fixtures/stargazersSuccessOkReactPageObject.json'
import stargazersFailureInternalServerErrorReact from '../fixtures/stargazersFailureInternalServerErrorReact.json'
import userSuccessOkDavidrf from '../fixtures/userSuccessOkDavidrf.json'
import starredSuccessOkDavidrfPageOne from '../fixtures/starredSuccessOkDavidrfPageOne.json'
import asyncTest from './asyncTestJasmine'

describe('userVisitsRepositoryPage', () => {
  let page

  beforeEach(() => {
    fetchMock
    .get(
      `https://api.github.com/repos/intrepidpursuits/react-page-object`,
      createResponse({ body: repoSuccessOkReactPageObject })
    )
    .get(
      `https://api.github.com/repos/facebook/react`,
      createResponse({ body: repoSuccessOkReact })
    )
    .get(
      `https://api.github.com/repos/intrepidpursuits/react-page-object/stargazers`,
      createResponse({
        body: stargazersSuccessOkReactPageObject,
        delay: 50
      })
    )
    .get(
      `https://api.github.com/repos/facebook/react/stargazers`,
      createResponse({
        body: stargazersFailureInternalServerErrorReact,
        status: 500
      })
    )
    .get(
      `https://api.github.com/users/davidrf`,
      createResponse({ body: userSuccessOkDavidrf })
    )
    .get(
      `https://api.github.com/users/davidrf/starred`,
      createResponse({ body: starredSuccessOkDavidrfPageOne })
    )
  })

  afterEach(() => {
    page.destroy()
    fetchMock.restore()
  })

  describe('repository with stargazers', () => {
    beforeEach(() => {
      page = createRootPage('/IntrepidPursuits/react-page-object')
    })

    it('should show the repository information', asyncTest(async () => {
      expect(page.content()).not.toMatch(/react-page-object by IntrepidPursuits/)
      await page.waitUntil(() => page.contentMatches(/react-page-object by IntrepidPursuits/))
      expect(page.content()).toMatch(/Declarative integration testing for React/)
    }))

    it('should show the repository\'s stargazers', asyncTest(async () => {
      await page.waitUntil(() => page.contentMatches(/react-page-object by IntrepidPursuits/))
      let pageContent = page.content()
      expect(pageContent).toMatch(/Loading stargazers of react-page-object.../)
      expect(pageContent).not.toMatch(/davidrf/)
      await page.waitUntil(() => page.contentMatches(/davidrf/))
    }))

    it('should allow navigation to the user page of a stargazer', asyncTest(async () => {
      await page.waitUntil(() => page.findWrapperForClickLink('/davidrf').exists())
      page.clickLink('/davidrf')
      expect(page.currentPath()).toEqual('/davidrf')
    }))
  })

  describe('repository that is unable to load stargazers', () => {
    beforeEach(() => {
      page = createRootPage('/facebook/react')
    })

    it('should display an error banner', asyncTest(async () => {
      await page.waitUntil(() => page.findWrapperForClickLink('Dismiss').exists())
      expect(page.content()).toMatch(/Server Error/)
      page.clickLink('Dismiss')
      expect(page.content()).not.toMatch(/Server Error/)
    }))
  })
})
