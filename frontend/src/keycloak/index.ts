import Keycloak, { type KeycloakInitOptions } from 'keycloak-js'

let kcConfig = {
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  url: import.meta.env.VITE_KEYCLOAK_URL,
}

// Keycloak uses "public\keycloak.json" by default if not otherwise specified.
// https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
let keycloak = new Keycloak(kcConfig)

let initOptions: KeycloakInitOptions = {
  responseMode: 'fragment',
  flow: 'standard',
  onLoad: 'check-sso',
  pkceMethod: 'S256',
  checkLoginIframe: false,
}

keycloak.init(initOptions)

export default keycloak
