<script setup>
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'

const authStore = useAuthStore();
console.log(authStore.token)
const form = ref({
  name:'',
  second_name: "",
  surname: "",
  second_surname: "",
  email: '',
  role: '',
});
const submitForm = async () => {
try {
  await axios.post('/api/auth/register', form.value)
    .then((response) => {
      console.log(response)
      const default_password =response.data.password
      alert(`default new password user ${default_password}`)
      console.log(default_password);
    })
} catch (error) {
  console.log(error)
}

}

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 lg:mt-0 xl:">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="logo">
        TaskManager
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create and account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> email</label>
              <input type="email" name="email" id="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="user@taskmanager.com" required="" v-model="form.email">
              <label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Name</label>
              <input type="text" name="user" id="user"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Juan" required="" v-model="form.name">
              <label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Second Name </label>
              <input type="text" name="user" id="user"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com" required="" v-model="form.second_name">
              <label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Surname</label>
              <input type="text" name="user" id="user"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com" required="" v-model="form.surname">

              <label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Second Surname</label>
              <input type="text" name="user" id="user"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com" required="" v-model="form.second_surname">
            </div>
            <div class="flex items-start">
            </div>
            <button
              class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit">Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
