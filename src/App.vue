<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

import { RouterLink, RouterView } from 'vue-router'
import NavItem from './components/NavItem.vue'
import LoginView from './views/LoginView.vue'
</script>
<template>
  <header class="aspect-auto">
    <NavItem />
  </header>
  <div class="aspec-auto">
    <RouterView />
  </div>
</template>
