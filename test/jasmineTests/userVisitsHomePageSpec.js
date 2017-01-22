import createRootPage from '../createRootPage'

describe('userVisitsHomePage', () => {
  let page

  beforeEach(() => {
    page = createRootPage()
  })

  afterEach(() => {
    page.destroy()
  })

  it('should show a search input', () => {
    expect(page.content()).toMatch(/Type a username or repo full name and hit 'Go'/)
    expect(page.findWrapperForFillIn('search-input').exists()).toEqual(true)
    expect(page.findWrapperForClickButton('Go!').exists()).toEqual(true)
  })
})
