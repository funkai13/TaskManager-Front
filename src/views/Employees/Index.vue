<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'

const task = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tasks')
    task.value = response.data.data
    console.log(task.value)


  } catch (error) {
    console.log('error', error)
  }
})
</script>

<template>

</template>
