<template>
  <Card>
    <template #header
      ><RouterLink :to="{ name: linkName }">{{ header }} </RouterLink></template
    >
    <template #content><slot name="description">Wording to be determined</slot></template>
  </Card>
</template>
<script lang="ts">
import { useReportStore } from '@/stores/report'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

import Card from 'primevue/card'

export default defineComponent({
  name: 'ProgramCard',
  components: { Card },
  setup() {
    return { reportStore: useReportStore() }
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    program: {
      type: String,
      default: '',
    },
  },
  computed: {
    header() {
      return `${this.name} (${this.program}) Reporting Portal`
      //return this.name + ' (' + this.program + ')' + ' Reporting Portal'
    },
    linkName() {
      return this.program.toLowerCase() + 'Landing'
    },
  },
})
</script>

<style>
.p-card {
  width: 250px;
  margin: 0px 10px 0px 0px;
}
.p-card-header {
  background-color: #38598a;
  color: #ffffff;
  font-weight: 600;
  padding: 10px;
  text-align: center;
}

.p-card-header a {
  color: #ffffff;
  text-decoration: none;
}
</style>
