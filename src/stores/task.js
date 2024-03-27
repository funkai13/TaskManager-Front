
import { defineStore } from 'pinia'

export const useTaskstore = defineStore('task', {
  state: () => ({ task: null, authToken: null ,authRole:null}),
  getters: {
    task: (state) => state.task,
  },
  actions:
    {
      setTask(task) {
        this.task = task;
      },
      persist: true
    }


})
