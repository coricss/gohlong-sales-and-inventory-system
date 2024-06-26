import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

export const useSaleStore = defineStore('sales', {
    state: () => ({
        salesData: [],
    }),
    getters: {
        salesInfo: (state) => state.salesData,
    },
    actions: {
        getSalesData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/sales').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        addSale(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/new-sale', data).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        countSales() {
            return new Promise ((resolve, reject) => {
                axios.get('api/count-sales').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }, 
        revertTransaction(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/revert-transaction', {transaction_id: data}).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});