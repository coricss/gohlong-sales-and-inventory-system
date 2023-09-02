import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios';
import '@/assets/css/style.css';
import App from './App.vue';
import router from './router';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/plugins/sweetalert2/sweetalert2.min.css';
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import 'admin-lte/plugins/chart.js/Chart.min.js';
import 'admin-lte/plugins/sweetalert2/sweetalert2.min.js';
import 'admin-lte/dist/js/adminlte.min.js';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_LARAVEL_API_URL;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

pinia.use(({ store }) => {
    store.router = markRaw(router);
});

const Vue = createApp(App);
Vue.use(pinia);
Vue.use(router);
Vue.use(Toast);
Vue.mount('#app');
