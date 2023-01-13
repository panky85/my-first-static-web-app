import type Keycloak from 'keycloak-js'

// augmentations.d.ts

// Ensure this file is parsed as a module regardless of dependencies.
export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    program?: string
    programTitle: string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: Keycloak
  }
}
