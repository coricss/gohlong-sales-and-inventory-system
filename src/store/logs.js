import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

export const useLogStore = defineStore('logs', {
    state: () => ({
        logsData: [],
    }),
    getters: {
        logsInfo: (state) => state.logsData,
    },
    actions: {
        getLogsData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/logs').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        addNewLog(action, moduleName) {
            return new Promise ((resolve, reject) => {
                axios.post('api/new-log', {action: action, module: moduleName}).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});