import { createPinia } from 'pinia'
import { createApp } from 'vue'

import './styles/element-plus-theme.scss'
import './index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
