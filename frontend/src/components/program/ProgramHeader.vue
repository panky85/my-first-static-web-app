<template>
  <div class="programHeader" :style="{ backgroundColor: color }">{{ program }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgramHeader',
  props: {
    color: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
  },
})
</script>
<style scoped>
.programHeader {
  font-weight: 600;
  padding: 5px;
}
</style>
