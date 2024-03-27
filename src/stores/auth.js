import axios  from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authUser: null, authToken: null ,authRole:null}),
  getters: {
    user: (state) => state.authUser,
    token: (state) => state.authToken,
    role: (state) => state.authRole,
  },
  actions:
  {
    setAuthToken(token) {
      this.authToken = token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setAuthUser(user) {
      this.authUser = user;
    },
    setAuthRole(role) {
      this.authRole = role;
    },
    async login(form) {
      console.log(form);
      await axios
        .post('api/auth/login', form,)
        .then((res) => {
          const { access_token, id, role } = res.data;
          this.setAuthToken(access_token);
          this.setAuthUser(id);
          this.setAuthRole(role);
          console.log(useAuthStore().token); // Acceder al token actualizado usando useAuthStore()
          this.router.push('/tasks');
          console.log(useAuthStore().role);
        })
        .catch((errors) => {
          console.log(form);
          let desc = ''
          errors.response.data.errors.map((e) => {
            desc = desc + '' + e
          })
          //show_alerta(desc, 'error', '')
        })
    },
    async register(form) {
     const token= useAuthStore()
      console.log(token.authToken)
      await axios
        .post('api/auth/register', form, {
          headers: {
            Authorization: 'Bearer ' + token.authToken
          }
        })
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
      await axios.post('api/auth/logout', this.token)
      this.authToken = null
      this.authUser = null
      this.router.push('/login')
    },
    persist: true
  }


})
