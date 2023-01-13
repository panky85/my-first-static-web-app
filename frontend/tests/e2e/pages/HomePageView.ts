import { Selector } from 'testcafe'

class HomeViewPage {
  pmpLink: Selector
  homeLink: Selector
  helpLink: Selector
  heading: Selector
  constructor() {
    this.homeLink = Selector('#home-link')
    this.pmpLink = Selector('#pmp-link')
    this.helpLink = Selector('#help-link')
    this.heading = Selector('h1')
  }
}

export default new HomeViewPage()
