import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authUser: null, authToken: null }),
  getters: {
    user: (state) => state.authUser,
    token: (state) => state.authToken,
    role: (state) => state.authRole,
  },
  actions:
  {
    async login(form) {
      console.log(form);
      await axios
        .post('api/auth/login', form,)
        .then((res) => {
          console.log(res.data.access_token);
          this.authToken = res.data.acces_token
          this.authUser = res.data.id
          this.authRole = res.data.role
          this.router.push('/tasks')

        })
        .catch((errors) => {
          console.log(form);
          let desc = ''
          errors.response.data.errors.map((e) => {
            desc = desc + '' + e
          })
          //show_alerta(desc, 'error', '')
        })
    }
  },
  async register(form) {
    await this.getToken()
    await axios
      .post('api/auth/register', form)
      .then((res) => {
        console.log(res.data.message, 'succes', '')
        setTimeout(() => this.router.push('/login'), 2000)
        this.router.push('/taks')
      })
      .catch((errors) => {
        let desc = ''
        errors.response.data.errors.map((e) => {
          desc = desc + '' + e
        })
       // show_alerta(desc, 'error', '')
      })
  },
  async logout() {
    await axios.get('api/auth/logout', this.authToken)
    this.authToken = null
    this.authUser = null
    this.router.push('/login')
  },
  persist: true
})
