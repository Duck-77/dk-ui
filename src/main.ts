import './styles/index.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

/** fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

app.mount('#app')
