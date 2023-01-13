<template>
  <TheHeader :key="$route.fullPath" />
  <TheNavBar :key="$route.fullPath" />
  <main>
    <section class="content">
      <TheAlert />
      <RouterView />
    </section>
  </main>

  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TheAlert from '@/components/TheAlert.vue'

import TheFooter from '@/components/template/TheFooter.vue'
import TheHeader from '@/components/template/TheHeader.vue'
import TheNavBar from '@/components/template/TheNavBar.vue'

export default defineComponent({
  components: { TheFooter, TheHeader, TheNavBar, RouterView, TheAlert },
  setup() {
    return {
      authStore: useAuthStore(),
    }
  },
  created() {
    // Load roles if the user is authenticated
    if (this.$keycloak.authenticated) {
      this.authStore.roles = this.loadRoles()
    }
  },
  methods: {
    loadRoles(): string[] {
      let roles: string[] = []
      if (this.$keycloak.tokenParsed?.resource_access) {
        const service = import.meta.env.VITE_KEYCLOAK_ROLE_CLIENT_ID
        roles = this.$keycloak.tokenParsed.resource_access[service]?.roles
      }
      return roles
    },
  },
})
</script>

<style src="./assets/css/main.css"></style>
<style src="./assets/css/reset.css"></style>
<style src="./assets/css/typography.css"></style>
