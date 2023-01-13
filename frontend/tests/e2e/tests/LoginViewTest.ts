import { ClientFunction, t } from 'testcafe'

import { SITE_UNDER_TEST } from '../configuration'
import LoginViewPage from '../pages/LoginViewPage'

fixture(`Login Page`).disablePageCaching`Test Login`
  // Auth/role is not required for this test
  .page(SITE_UNDER_TEST)

test('Check the Health BC login is correct', async (t) => {
  await t.click(LoginViewPage.healthBCIDButton).wait(1000).expect(LoginViewPage.healthAuthorityHeader.innerText).eql('QA STS HEALTHBC').expect(LoginViewPage.healthAuthorityUserName.exists).ok()
})

test('Check the BC Provider login is correct', async (t) => {
  await t.click(LoginViewPage.healthBCProviderButton).wait(1000).expect(LoginViewPage.healthBClogo.exists).ok()
})

test('Check that the Keycloak login is correct', async (t) => {
  await t.click(LoginViewPage.keycloakButton).wait(1000).expect(LoginViewPage.keycloakHeader.innerText).eql('Keycloak Login').expect(LoginViewPage.keycloakUsername.exists).ok()
})

test('Check that pidp link is clickable', async (t) => {
  const getPageUrl = ClientFunction(() => window.location.href)
  await t.click(LoginViewPage.pidpLink).wait(1000).expect(getPageUrl()).contains('healthprovideridentityportal.gov.bc.ca/auth/login')
})
