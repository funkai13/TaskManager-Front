<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
const task = ref(null)


onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tasks')
    task.value = response.data.data
  } catch (error) {
    console.log('error', error)
  }
})
</script>
<template>
  <section class=" grid h-16 place-items-center pt-10 ">
    <div>
      <p class="xl:text-4xl pb-6 text-2xl items-center justify-center flex">All tasks</p>
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <router-link to="/createtask"> Create Task</router-link>
      </button>
      <div class="container overflow-x-auto shadow-md sm:rounded-lg flex flex-col justify-center  items-center  w-full">
        <table class=" text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 lg:text-xl">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 lg:text-xl">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              Title
            </th>
            <th scope="col" class="px-6 py-3">
              Description
            </th>
            <th scope="col" class="px-6 py-3">
              Employee
            </th>
            <th scope="col" class="px-6 py-3">
              estatus
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
          <tr v-for="(task, index) in task" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{index+1}}
            </th>
            <td class="px-6 py-4">
              {{ task.title }}
            </td>
            <td class="px-6 py-4">
              {{task.description}}
            </td>
            <td class="px-6 py-4">
              {{task.employee_id}}
            </td>
            <td class="px-6 py-4">
              {{task.status_id}}
            </td>
            <td class="px-6 py-4">
              pedro {{task.modified_by}}
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
