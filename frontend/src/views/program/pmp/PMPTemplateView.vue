<template>
  <!-- <ProgramHeader color="lightgreen" logo="" program="PMP" /> -->
  <img src="@/assets/images/pmp.png" alt="PMP" height="40" />
  <div>
    <RouterView> </RouterView>
  </div>
</template>
<script lang="ts">
import ProgramHeader from '@/components/program/ProgramHeader.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PMPTemplateView',
  components: { ProgramHeader },
})
</script>
<style scoped></style>
