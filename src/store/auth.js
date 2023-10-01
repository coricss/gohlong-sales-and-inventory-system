import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from "vue-toastification";
const toast = useToast();

axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('token')}`;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        isLoggedIn: false,
    }),
    getters: {
        user: (state) => state.authUser,
        loggedIn: (state) => state.isLoggedIn,
    },
    actions: {
        async getToken() {
            await axios.get('sanctum/csrf-cookie');
        },
        async getUser() {
            this.getToken();
            await axios.get('api/user')
            .then((response) => {
                this.authUser = response.data;
                sessionStorage.setItem('user', JSON.stringify(response.data));
            }).catch((error) => {
                if (error.response.status === 401) {
                    this.loadToast('Please log in first', 'error');
                    this.router.push('/login');
                }
            });
        },
        async handleLogin(data) {
            await this.getToken();
            await axios.post('login', {
                email: data.email,
                password: data.password
            }).then((response) => {
                if (response.status === 200) {
                    this.getUser();
                    this.isLoggedIn = true;
                    sessionStorage.setItem('token', response.data.token);
                    
                    setTimeout(() => {
                        this.router.push('/dashboard');
                    }, 1000);
                } else {
                    this.loadToast('Invalid credentials!', 'error');
                }
            }).catch((error) => {
                if (error.response.status === 401) {
                    this.loadToast('Invalid credentials!', 'error');
                    this.router.push('/login');
                } else if (error.response.status === 422) {
                    this.loadToast('Invalid credentials!', 'error');
                } else if (error.response.status === 500) {
                    this.loadToast('Server error!', 'error');
                }
            });
        },
        async handleLogout() {
            await axios.post('logout').then(() => {
                this.authUser = null;
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                this.router.push('/login');
            });
        },
        async loadToast (message, type) {
            toast(message, {
                timeout: 2000,
                type: type,
                position: 'top-right',
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                newestOnTop: true,
                draggable: true,
                draggablePercent: 0.6,
                dangerouslyHTMLString: true,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: false,
                icon: true,
                rtl: false,
                theme: 'colored',
                transition: 'bounce'
            });
        }
    }
})