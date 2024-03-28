import axios  from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authUser: null, authToken: null ,authRole:null, authTokenCsrf: null}),
  getters: {
    id: (state) => state.authId,
    token: (state) => state.authToken,
    role: (state) => state.authRole,
    TokenCsrf: (state) => state.authTokenCsrf,
  },
  actions:
  {
    async getTokenCsrf() {
      await axios.get('/sanctum/csrf-cookie')
    },
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
      await this.getTokenCsrf()
      await axios
        .post('api/auth/login', form,)
        .then((res) => {
          const { access_token, role,  } = res.data;
          console.log(res.data)
          const id = res.data.user.id;
          const verified =res.data.user.email_verified_at
           if ( verified === null){
            this.router.push('/newpassword')
             this.setAuthToken(access_token);
             this.setAuthUser(id);
             this.setAuthRole(role);
          }
           else {
             this.setAuthToken(access_token);
             this.setAuthUser(id);
             this.setAuthRole(role);
             this.router.push('/tasks');
           }
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
