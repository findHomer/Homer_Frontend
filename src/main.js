import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// import { instance } from './components/api/axios'
const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
// app.provide('axios',instance)
app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
