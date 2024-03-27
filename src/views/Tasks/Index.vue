<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js'
import {useTaskStore} from '@/stores/task.js'
import router from '@/router/index.js'
import { initFlowbite } from 'flowbite'
const task = ref(null)
const authStore = useAuthStore()
const taskStore = useTaskStore()
const id =authStore.id
const taskToDelete = ref(null)
const showModal = ref(false)
const showModalE = ref(false)
const taskToEdit = ref (null)
const showAllTasksButton = ref(true);
console.log(showAllTasksButton.value)

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
const form = ref({
  status_id: '',
  employee_id: '',
  title: '',
  description:'',
  created_by: 'admin',
});

 const reloadTasks = async () => {
  try {
    if (authStore.role === 'admin') {
      const response = await axios.get('/api/tasks')
      task.value = response.data.data
    } else {
      const response = await axios.get(`/api/employees/${id}/task`)
      task.value = response.data.data.tasks
    }
  } catch (error) {
    console.log('error', error)
  }
}

const showDeleteModal=(task)=>{
  taskToDelete.value=task
  showModal.value= true;
}

const cancelDelete=()=>{
  showModal.value=false;
  taskToDelete.value=null;
}

const confirmDelete = async ()  =>{
  showModal.value =false;
  try {
   await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskToDelete.value.id}`)
   await reloadTasks();
  }catch (error){
    console.log(error);
  }
}

onMounted(async () => {
  try {
    if(authStore.role==='admin'){
      const response = await axios.get('/api/tasks')
      task.value = response.data.data
      console.log(task.value)
    }
    else {
      const response = await axios.get(`/api/employees/${id}/task`)
      task.value = response.data.data.tasks

    }
  } catch (error) {
    console.log('error', error)
  }
})

const showModalEdit=(task)=>{
  showModalE.value=true
  taskToEdit.value=task
}
const cancelEdit=()=>{
  showModalE.value=false;
  taskToEdit.value=null;
}

const resetForm = () => {
    form.value.status_id = ''
    form.value.employee_id = ''
    form.value.title = ''
    form.value.description =''
    form.value.created_by = 'admin'
}
const confirmEdit = async ()  => {
   showModalE.value=false;
   console.log(form.value)
  if (authStore.role === 'admin'){
  try {
      await axios.put(`/api/tasks/${taskToEdit.value.id}`,form.value)
      resetForm()
      await reloadTasks()
      .then(response =>{
        console.log(response)
      })
  } catch (error) {
    console.log('error', error)
  }
  console.log(form.value);
  await router.push('/tasks');
  }else {
    form.value.id=taskToEdit.value.id;
    form.value.title=taskToEdit.value.title;
    form.value.description=taskToEdit.value.description;
    form.value.employee_id=taskToEdit.value.employee_id;
    try {
      await axios.put(`/api/tasks/${taskToEdit.value.id}`,form.value)
      await reloadTasks()
        .then(response =>{
          console.log(response)
        })
    } catch (error){
      console.log(error);
    }
    }
}
const allTacksCall = async () =>{
  const response = await axios.get('/api/tasks')
  task.value = response.data.data
  showAllTasksButton.value = false;
  console.log(showAllTasksButton.value)
}
const employeeTacksCall = async () =>{
  const id =authStore.id
  const response = await axios.get(`/api/employees/${id}/task`)
  task.value = response.data.data.tasks
  console.log(task.value)
  showAllTasksButton.value = true;
}
const taskToStore = (task)=> {
  taskStore.setTask(task)
  router.push('/comments');
}

</script>
<template>
    <section class=" grid h-16 place-items-center  ">
    <div class="pt-10 sm:px-6 lg:px-8 xl:px-10 2xl:px-2">
      <p  v-if="authStore.role==='admin' " class="xl:text-4xl pb-6 text-2xl items-center justify-center flex">All tasks</p>
      <p  v-if="authStore.role==='employee' " class="xl:text-4xl pb-6 text-2xl items-center justify-center flex"> your tasks</p>
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" v-if="authStore.role==='admin'">
        <router-link to="/create/task"> Create Task</router-link>
      </button>
        <button   v-if="authStore.role === 'employee'" @click="allTacksCall" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
         See all Tasks
      </button>
      <button  v-if="authStore.role === 'employee' " @click="employeeTacksCall"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
        back to Your Tasks
      </button>
      <div class="container overflow-x-auto shadow-md sm:rounded-lg hidden sm:block flex-col justify-center  items-center  w-full">
        <table class=" text-sm  table-auto min-w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 lg:text-based ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 lg:text-lg">
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
            <th scope="col" class="px-6 py-3" v-if="authStore.role==='admin'">
              Employee
            </th>
            <th scope="col" class="px-6 py-3" >
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
            <td class="px-6 py-4" v-if="authStore.role==='admin'">
              {{task.employee_id}}
            </td>
            <td class="px-6 py-4">
              {{
                task.status_id === 1 ? 'Pendiente' :
                  task.status_id === 2 ? 'En proceso' :
                    task.status_id === 3 ? 'Bloqueado' :
                      task.status_id !== 4 ? 'Estado desconocido' : 'Completado'
              }}
            </td>
            <td class="px-6 py-4">
               {{task.modified_by}}
            </td>
            <td class="px-6 py-4 text-right flex" >
              <button type="button" v-if="authStore.role==='admin' || id===task.employee_id" @click="showModalEdit(task)"   class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit </button>
              <button type="button" @click="showDeleteModal(task)"  v-if="authStore.role==='admin' "  class="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Delete </button>
              <button type="button"  @click="taskToStore(task)"  class="text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               Comments </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="sm:hidden  m-2">
        <div class="grid grid-cols-1 gap-4  md-4">
              <div  v-for="(task, index) in task" :key="index" class="bg-white rounded-lg shadow-xl p-4 dark:bg-gray-800">
                <p class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ task.title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ task.description }}</p>
                <div class="flex justify-around">
                  <button v-if="authStore.role==='admin' || id===task.employee_id" @click="showModalEdit(task)" class="text-blue-700 hover:text-blue-800 focus:outline-none dark:text-blue-400 ">Edit</button>
                  <button v-if="authStore.role==='admin'" @click="showDeleteModal(task)" class="text-red-700 hover:text-red-800 focus:outline-none dark:text-red-400">Delete</button>
                  <button @click="taskToStore(task)"  class="text-amber-700 hover:text-amber-800 focus:outline-none dark:text-amber-400"> Comments</button>
                </div>

              </div>


        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white rounded-lg p-8">
        <p class="text-lg font-semibold mb-4">Are you sure you want to eliminate the task with the title: {{ taskToDelete.title }}?</p>
        <div class="flex justify-end">
          <!-- Botón para cancelar la acción -->
          <button @click="cancelDelete" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 mr-4 rounded">
            Cancelar
          </button>
          <!-- Botón para confirmar la eliminación -->
          <button @click="confirmDelete" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    <div v-if="showModalE" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white rounded-lg p-8">
        <section class="bg-white dark:bg-gray-900 flex justify-center items-center">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Task</h2>
            <form @submit.prevent="confirmEdit" v>
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2" v-if="authStore.role==='admin' " >
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Title</label>
                  <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         placeholder= "title"
                         required="" type="text"
                         v-model="form.title">
                </div>
                <div class="w-full" >
                  <label  v-if="authStore.role==='admin' " for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assigned Employee</label>
                  <input  v-if="authStore.role==='admin' " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="assigned Employee"
                          type="text"
                          v-model="form.employee_id">
                  <label   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">Estatus</label>
                  <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           v-model="form.status_id">
                    <option selected="">Select Estatus</option>
                    <option value=1>Pendiente</option>
                    <option value=2>En proceso</option>
                    <option value=3>Bloqueado</option>
                    <option value=4>Completado</option>
                  </select>
                </div>

                <div class="sm:col-span-2" v-if="authStore.role==='admin' ">
                  <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="description"
                            v-model="form.description"
                            rows="8"></textarea>
                </div>
              </div>
            </form>
          </div>
        </section>
        <div class="flex justify-end">
          <!-- Botón para cancelar la acción -->
          <button @click="cancelEdit" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 mr-4 rounded">
            Cancel
          </button>
          <!-- Botón para confirmar la eliminación -->
          <button @click="confirmEdit" class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  </section>


</template>
