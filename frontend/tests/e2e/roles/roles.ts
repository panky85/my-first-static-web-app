import { Role } from 'testcafe'

import { SITE_UNDER_TEST } from '../configuration'

const username: string = process.env.PRP_TESTCAFE_USER ? process.env.PRP_TESTCAFE_USER : ''
const password: string = process.env.PRP_TESTCAFE_PASSWORD ? process.env.PRP_TESTCAFE_PASSWORD : ''

export const regularAccUser = Role(SITE_UNDER_TEST, async (t) => {
  await t.click('#moh_idpLogin').typeText('#username', username).typeText('#password', password).click('#kc-login')
})
