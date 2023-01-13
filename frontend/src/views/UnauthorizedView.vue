<template>
  <h1>Enrollment Required</h1>
  <p>Your log-in credentials are valid but you aren't enrolled with the Provider Reporting Portal.</p>
  <p>If you wish to enroll please visit the <a :href="pidpUrl" target="_blank">Provider Identity Portal</a>.</p>
  <p>If you have logged in mistakenly please <b>Sign Out.</b></p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UnauthorizedView',
  computed: {
    pidpUrl() {
      return import.meta.env.VITE_PIDP_URL
    },
  },
})
</script>
