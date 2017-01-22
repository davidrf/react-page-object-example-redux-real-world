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
    expect(page.content()).to.match(/Type a username or repo full name and hit 'Go'/)
    expect(page.findWrapperForFillIn('search-input').exists()).to.equal(true)
    expect(page.findWrapperForClickButton('Go!').exists()).to.equal(true)
  })
})
