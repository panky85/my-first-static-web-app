<template>
  <div>
    <h1>Welcome to the Provider Reporting Portal</h1>
    <p>
      The goal of the Provider Reporting Portal (PRP) is to provide physicians, health system admins & policymakers with a single reporting solution that enables:
      <ul>
        <li>Quality measures and data needed to achieve quality improvement</li>
        <li>Better experiences for patients and health care providers</li>
        <li>A cost-effective health system</li>
      </ul>
    </p>

    <p>You have access to the following programs:</p>
    <div id="programs">
      <ProgramCard v-if="reportStore.hasProgram('MSPQI')" name="Measurement System for Physician Quality Improvement" program="MSPQI">
        <template #description></template>
      </ProgramCard>
      <ProgramCard v-if="reportStore.hasProgram('PMP')" name="Prescription Monitoring Program" program="PMP">
        <template #description></template>
      </ProgramCard>
    </div>

    <br/>
    <p>If you are new to PRP, consider reviewing the <RouterLink :to="{ name: 'help' }">Contact Us</RouterLink> page.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

import { useReportStore } from '@/stores/report'

import ProgramReports from '@/components/report/ProgramReports.vue'

import ProgramCard from '@/components/program/ProgramCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: { ProgramCard, ProgramReports },
  setup() {
    return { reportStore: useReportStore()}
  },
})
</script>

<style scoped>
#programs {
  display: flex;
}
ul {
  list-style: disc;
  padding-left: 40px;
  padding-top: 10px;
}

</style>