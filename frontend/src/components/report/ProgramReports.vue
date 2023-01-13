<template>
  <div class="program">
    <ul>
      <li v-for="report in reportStore.getReports(program)">
        <RouterLink :to="{ name: viewReportName, params: { id: report.id } }">{{ report.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useReportStore } from '@/stores/report'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'ProgramReports',
  setup() {
    return { reportStore: useReportStore() }
  },
  props: {
    program: {
      type: String,
      default: '',
    },
  },
  computed: {
    viewReportName() {
      return this.program.toLowerCase() + 'ViewReport'
    },
  },
})
</script>
<style scoped>
ul {
  list-style: disc;
  padding-left: 50px;
}
.program {
  padding: 0 0 20px 0;
}
</style>
