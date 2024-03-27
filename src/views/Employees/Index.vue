<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const employees = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/employees')
    employees.value = response.data
    console.log(employees.value)
    console.log((employees.value[1]))

  } catch (error) {
    console.log('error', error)
  }
})
</script>

<template>
  <section class=" grid h-16 place-items-center ">
    <div>
      <p class="text-4xl pb-6 flex justify-center">Employees</p>
      <div class="container overflow-x-auto shadow-md sm:rounded-lg flex flex-col justify-center  items-center  w-full">
        <table class=" text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              user
            </th>
            <th scope="col" class="px-6 py-3">
              mail
            </th>
            <th scope="col" class="px-6 py-3">
              name
            </th>
            <th scope="col" class="px-6 py-3">
              code
            </th>
            <th scope="col" class="px-6 py-3">
              Last modification
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(employees, index) in employees" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{index+1}}
            </th>
            <td class="px-6 py-4">
              {{ employees.user_id }}
            </td>
            <td class="px-6 py-4">
              correito
            </td>
            <td class="px-6 py-4">
              {{employees.name}}
            </td>
            <td class="px-6 py-4">
              {{employees.code}}
            </td>
            <td class="px-6 py-4">
              pedro {{employees.modified_by}}
            </td>
            <td class="px-6 py-4 text-right">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>


</template>

