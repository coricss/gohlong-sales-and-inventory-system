import { defineStore } from 'pinia'

import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('token')}`;

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