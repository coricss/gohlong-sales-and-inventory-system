import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios';
import '@/assets/css/style.css';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/plugins/sweetalert2/sweetalert2.min.css';
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import 'admin-lte/plugins/chart.js/Chart.min.js';
import 'admin-lte/plugins/sweetalert2/sweetalert2.min.js';
import 'admin-lte/dist/js/adminlte.min.js';

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import ToggleButton  from 'primevue/togglebutton';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmDialog from 'primevue/confirmdialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Checkbox from 'primevue/checkbox';
import SelectButton from 'primevue/selectbutton';
import Skeleton from 'primevue/skeleton';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import Vue3Autocounter from 'vue3-autocounter';
import Chart from 'primevue/chart';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
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
Vue.use(VueSweetalert2);

Vue.use(PrimeVue);
Vue.use(ToastService);
Vue.use(ConfirmationService);
Vue.component('Card', Card);
Vue.component('InputText', InputText);
Vue.component('Dropdown', Dropdown);
Vue.component('InputNumber', InputNumber);
Vue.component('ToggleButton', ToggleButton);
Vue.component('Button', Button);
Vue.component('Dialog', Dialog);
Vue.component('ConfirmPopup', ConfirmPopup);
Vue.component('ConfirmDialog', ConfirmDialog);
Vue.component('TabView', TabView);
Vue.component('TabPanel', TabPanel);
Vue.component('Checkbox', Checkbox);
Vue.component('SelectButton', SelectButton);
Vue.component('Skeleton', Skeleton);
Vue.component('vue3-autocounter', Vue3Autocounter)
Vue.component('Chart', Chart)
Vue.mount('#app');
