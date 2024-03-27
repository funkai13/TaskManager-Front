<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { useAuthStore } from '@/stores/auth';
import router from '@/router/index.js'
const authStore = useAuthStore()
const form = ref({
  title: '',
  description: '',
  created_by: 'admin',
  status_id: '',
  employee_id: '',
});

const submitForm = async () => {
  try {
    await axios.put('http://127.0.0.1:8000/api/tasks',form.value)
      .then(response =>{
        console.log(response)
      })
  } catch (error) {
    console.log('error', error)
  }
  console.log(form.value);
  await router.push('/tasks');
}

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <section class="bg-white dark:bg-gray-900 flex justify-center items-center">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Task</h2>
      <form @submit.prevent="submitForm" v>
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2" v-if="authStore.role==='admin' " >
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Title</label>
            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Type Task Title"
                   required="" type="text"
                   v-model="form.title">
          </div>
          <div class="w-full" >
            <label  v-if="authStore.role==='admin' " for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assigned Employee</label>
            <input  v-if="authStore.role==='admin' " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Employee ID"
                   type="text"
                   v-model="form.employee_id">
            <label   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">Estatus</label>
            <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     v-model="form.status_id">
              <option selected="">Select Estatus</option>
              <option value="1">Pendiente</option>
              <option value="2">En proceso</option>
              <option value="3">Bloqueado</option>
              <option value="4">Completado</option>
            </select>
          </div>

          <div class="sm:col-span-2" v-if="authStore.role==='admin' ">
            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your description here"
                      v-model="form.description"
                      rows="8"></textarea>
          </div>
        </div>
        <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
          Update Task
        </button>
      </form>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  data(){

  }
}
</script>