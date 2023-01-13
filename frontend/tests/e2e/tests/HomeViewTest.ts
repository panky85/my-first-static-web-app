import { SITE_UNDER_TEST } from '../configuration'
import HomeViewPage from '../pages/HomePageView'
import { regularAccUser } from '../roles/roles'

fixture(`Home Page`).disablePageCaching`Test Home Page`
  .beforeEach(async (t) => {
    await t.useRole(regularAccUser)
  })
  .page(SITE_UNDER_TEST)

test('Check Home tab is clickable ', async (t) => {
  await t.click(HomeViewPage.homeLink)
})

test('Check PMP tab is clickable ', async (t) => {
  await t.click(HomeViewPage.pmpLink)
})

test('Check Help tab is clickable ', async (t) => {
  await t.click(HomeViewPage.helpLink)
})

test('Check heading exists on Home page ', async (tc) => {
  await tc.click(HomeViewPage.homeLink).expect(HomeViewPage.heading.innerText).eql('Welcome to the Provider Reporting Portal')
})

test('Check heading exists on Help page ', async (tc) => {
  await tc.click(HomeViewPage.helpLink).wait(2000).expect(HomeViewPage.heading.innerText).eql('Help')
})
