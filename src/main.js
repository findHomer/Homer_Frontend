import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { instance } from './components/api/axios'
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.provide('axios',instance)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
