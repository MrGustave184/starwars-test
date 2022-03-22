import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./services/store";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

const app = createApp(App);

app.use(store);

app.mount('#app');