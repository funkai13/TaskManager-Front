import axios  from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authUser: null, authToken: null ,authRole:null}),
  getters: {
    id: (state) => state.authId,
    token: (state) => state.authToken,
    role: (state) => state.authRole,
  },
  actions:
  {
    setAuthToken(token) {
      this.authToken = token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setAuthUser(id) {
      this.authId = id;
    },
    setAuthRole(role) {
      this.authRole = role;
    },
    async login(form) {
      await axios
        .post('api/auth/login', form,)
        .then((res) => {
          const { access_token, role } = res.data;
          const id = res.data.data.id;
          this.setAuthToken(access_token);
          this.setAuthUser(id);
          this.setAuthRole(role);
          this.router.push('/tasks');

        })
        .catch((errors) => {
          console.log(errors);
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
         console.log(errors)
        })
    },
    async logout() {
      await axios.post('api/auth/logout', this.token)
      this.authToken = null
      this.authId = null
      this.router.push('/login')
    },
    persist: true
  }


})
