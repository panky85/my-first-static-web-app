<template>
  <!-- <ProgramHeader color="lightblue" logo="" program="MSPQI" /> -->
  <img src="@/assets/images/mspqi_bar.png" alt="MSPQI" height="40" />
  <div>
    <RouterView> </RouterView>
  </div>
</template>
<script lang="ts">
import ProgramHeader from '@/components/program/ProgramHeader.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MSPQITemplateView',
  components: { ProgramHeader },
})
</script>
<style scoped></style>
