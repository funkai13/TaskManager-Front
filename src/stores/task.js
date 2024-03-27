
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({ taskSelected: null, }),
  getters: {
    taskSelect: (state) => state.taskSelected
  },
  actions:
    {
      setTask(newtask) {
        this.task = newtask;
      },
      addTask(task) {
        this.task=(task);
      },
      persist: true
    }


})
