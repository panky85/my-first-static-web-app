<template>
  <div>
    <h1>PRP Login</h1>
    <p>Welcome to the Provider Reporting Portal.</p>
    <section id="login">
      <p>Please log-in to PRP using one of the following Identity Providers:</p>
      <AppButton @click="login('idir_aad')" class="btn-xxl" id="idirLogin">IDIR AAD</AppButton>
      <AppButton @click="login('phsa')" class="btn-xxl" id="phsaLogin">Health BC</AppButton>
      <AppButton @click="login('bcprovider_aad')" class="btn-xxl" id="bcscLogin">BC Provider</AppButton>
      <AppButton @click="login('moh_idp')" class="btn-xxl" id="moh_idpLogin" v-if="enableKcLogin">Keycloak</AppButton>
    </section>
    <p>If you have not yet registered for PRP, please enroll using the <a :href="pidpUrl" target="_blank">Provider Identity Portal</a>.</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

export default defineComponent({
  name: 'LoginView',
  components: { AppButton },
  computed: {
    pidpUrl() {
      return import.meta.env.VITE_PIDP_URL
    },
    enableKcLogin() {
      return import.meta.env.VITE_ENABLE_KC_LOGIN
    },
  },
  methods: {
    login(idpHint: string) {
      const options = {
        idpHint,
        redirectUri: location.origin + this.$router.resolve({ name: 'home' }).path,
      }
      this.$keycloak.login(options)
    },
  },
})
</script>

<style></style>
