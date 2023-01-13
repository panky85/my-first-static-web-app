<template>
  <ViewReport />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ViewReport from '@/components/report/ViewReport.vue'

export default defineComponent({
  name: 'PMPReportView',
  components: { ViewReport },
})
</script>
