import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('token')}`;

export const useProfileManagementStore = defineStore('profile-management', {
    state: () => ({
        profileData: [],
    }),
    getters: {
        profileInfo: (state) => state.profileData,
    },
    actions: {
        async getToken() {
            await axios.get('sanctum/csrf-cookie');
        },
        getProfileData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/user')
                .then((response) => {
                    resolve(response.data);
                    /* this.profileData = response.data; */
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateUserPicture(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/profile/update-picture', data)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateUserName(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/profile/update-name', {name: data})
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateUserEmail(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/profile/update-email', {email: data})
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        changePassword(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/profile/change-password', data)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});