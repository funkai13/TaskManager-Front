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
    <NavItem />
    <RouterView />
</template>
