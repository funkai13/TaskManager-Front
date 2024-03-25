import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authUser: null, authToken: null }),
  getters: {
    user: (state) => state.authUser,
    token: (state) => state.authToken
  },
  actions: {
    async getToken() {
      await axios.get('')
    },
    async login(form) {
      await this.getToken()
      await axios
        .post('/api/auth/login', form)
        .then((res) => {
          this.authToken = res.data.token
          this.authUser = res.data.data
          this.router.push('/taks')
        })
        .catch((errors) => {
          let desc = ''
          errors.response.data.erros.map((e) => {
            desc = desc + '' + e
          })
          show_alerta(desc, 'error', '')
        })
    }
  },
  async register(form) {
    await this.getToken()
    await axios
      .post('/api/auth/register', form)
      .then((res) => {
        show_alerta(res.data.message, 'succes', '')
        setTimeout(() => this.router.push('/login'), 2000)
        this.router.push('/taks')
      })
      .catch((errors) => {
        let desc = ''
        errors.response.data.erros.map((e) => {
          desc = desc + '' + e
        })
        show_alerta(desc, 'error', '')
      })
  },
  /*  async logout() {
    await axios.get('/api/auth/logout', this.authToken)
    this.authToken = null
    this.authUser = null
    this.router.push('/login')
  }, */
  persist: true
})
