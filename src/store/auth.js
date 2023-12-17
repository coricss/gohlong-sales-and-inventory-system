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
            /* this.getToken(); */
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
            }).then((res) => {
                if (res.status === 200) {
                    axios.post('api/check_login_attempts', {
                        email: data.email
                    }).then((response) => {
                        if(response.data.status == 200) {
                            this.isLoggedIn = true;
                            sessionStorage.setItem('token', res.data.token);
                            sessionStorage.setItem('user', JSON.stringify(res.data.user));
                            this.router.push('/dashboard');
                        } else if (response.data.status == 401) {
                            this.loadToast(response.data.message, 'error');
                            this.router.push('/login');
                        }
                    });

                } else {
                    this.loadToast('Invalid credentials!', 'error');
                }
            }).catch((error) => {
                if (error.response.status === 401) {
                    this.loadToast(error.response.data.message, 'error');
                    this.router.push('/login');
                } else if (error.response.status === 422) {
                    axios.post('api/add_login_attempts', {
                        email: data.email
                    }).then((response) => {
                        this.loadToast(response.data.message, 'error');
                    }).catch((error) => {
                        if (error.response.status === 401) {
                            this.loadToast(error.response.data.message, 'error');
                            this.router.push('/login');
                        } else if (error.response.status === 404) {
                            this.loadToast(error.response.data.message, 'error');
                            this.router.push('/login');
                        }
                    });
                } else if (error.response.status === 500) {
                    this.loadToast('Server error!', 'error');
                }
            });
        },
        async handleLogout() {
            await axios.post('api/logout').then((response) => {
                if(response.status === 200) {
                    this.authUser = null;
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                    this.router.push('/');
                } else {
                    this.loadToast('Server error!', 'error');
                }
            });
        },
        async loadToast (message, type) {
            toast(message, {
                timeout: 3000,
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