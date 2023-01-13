import { Selector } from 'testcafe'

class LoginViewPage {
  loginButtons: Selector
  healthBCIDButton: Selector
  healthBCProviderButton: Selector
  idirButton: Selector
  keycloakButton: Selector
  pidpLink: Selector
  healthBClogo: Selector
  healthAuthorityHeader: Selector
  healthAuthorityUserName: Selector
  keycloakHeader: Selector
  keycloakUsername: Selector
  constructor() {
    this.loginButtons = Selector('#login')
    this.healthBCIDButton = Selector('#phsaLogin')
    this.healthBCProviderButton = Selector('#bcscLogin')
    this.idirButton = Selector('#idirLogin')
    this.keycloakButton = Selector('#moh_idpLogin')
    this.pidpLink = Selector('p').withText('Provider Identity Portal')
    this.healthBClogo = Selector('#bannerLogo')

    // Health BC Login
    this.healthAuthorityHeader = Selector('#header > h4')
    this.healthAuthorityUserName = Selector('#userNameInput')

    // Keycloak Login
    this.keycloakHeader = Selector('header > h1')
    this.keycloakUsername = Selector('#username')
  }
}

export default new LoginViewPage()
