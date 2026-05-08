import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/style.css'
import router from '@/router'
import App from '@/App.vue'

createApp(App).use(router).mount('#app')
App.use(createPinia())
App.use(router)
App.mount('#app')
