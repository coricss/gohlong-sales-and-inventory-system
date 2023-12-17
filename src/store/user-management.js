import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

export const useUserManagementStore = defineStore('user-management', {
    state: () => ({
        usersData: [],
    }),
    getters: {
        usersInfo: (state) => state.usersData,
    },
    actions: {
        async getToken() {
            await axios.get('sanctum/csrf-cookie');
        },
        getUsersData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/users')
                .then((response) => {
                    resolve(response.data);
                    this.usersData = response.data;
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        registerUser(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/register', data).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getUser(id) {
            return new Promise ((resolve, reject) => {
                axios.get(`api/users/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateUser(data) {
           /*  console.log(data); */
            return new Promise ((resolve, reject) => {
                axios.post(`api/users/update`, data).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        resetPassword(id) {
            return new Promise ((resolve, reject) => {
                axios.put(`api/users/reset-password/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        removeUser(id) {
            return new Promise ((resolve, reject) => {
                axios.delete(`api/users/delete/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
    }
})