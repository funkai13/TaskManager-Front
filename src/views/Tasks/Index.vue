<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const apiData = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tasks')
    apiData.value = response.data.data
    console.log(apiData.value)
  } catch (error) {
    console.log('error', error)
  }
})
</script>
<template>
  <main></main>
</template>
