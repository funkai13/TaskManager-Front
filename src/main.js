import './index.css'
import { useAuthStore } from '@/stores/auth.js'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import axios from 'axios'

window.axios = axios

window.axios.defaults.baseURL = 'https://sea-lion-app-5j6li.ondigitalocean.app/'
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.withCredentials = false

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(pinia)
app.use(router)


app.mount('#app')
