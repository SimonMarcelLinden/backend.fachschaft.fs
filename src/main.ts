import { createApp } from 'vue'

import router from './router'
import store from './store'

// i18n
import i18n from './i18n';

import App from './app.view.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)

app.mount('#app')
