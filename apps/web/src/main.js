import './assets/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import PageLayout from './components/PageLayout/index.vue'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

app.component('PageLayout', PageLayout)

await router.isReady()
app.mount('#app')
