/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_ENABLE_KC_LOGIN: boolean
  readonly VITE_KEYCLOAK_URL: string
  readonly VITE_KEYCLOAK_CLIENT_ID: string
  readonly VITE_PIDP_URL: string
  readonly VITE_KEYCLOAK_ROLE_CLIENT_ID: string
  readonly VITE_SITE_MINDER_LOGOUT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
