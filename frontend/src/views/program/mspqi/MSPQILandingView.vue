<template>
  <h1>Landing Page</h1>
  <p>Introduction</p>
  <ProgramReports program="MSPQI" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useReportStore } from '@/stores/report'
import ProgramReports from '@/components/report/ProgramReports.vue'

export default defineComponent({
  name: 'MSPQILandingView',
  components: { ProgramReports },
  setup() {
    return { reportStore: useReportStore() }
  },
})
</script>
