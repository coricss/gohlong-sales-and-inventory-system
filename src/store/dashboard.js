import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('token')}`;

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        dashboardData: [],
    }),
    getters: {
        dashboardInfo: (state) => state.dashboardData,
    },
    actions: {
        getWidgetsData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/widgets').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getWeeklySalesData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/weekly-sales').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getTopProductsData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/top-products').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});