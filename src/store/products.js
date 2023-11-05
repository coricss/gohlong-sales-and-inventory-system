import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('token')}`;

export const useProductStore = defineStore('products', {
    state: () => ({
        productsData: [],
    }),
    getters: {
        productsInfo: (state) => state.productsData,
    },
    actions: {
        getProductData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/products').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        addProduct(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/new-product', data).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getProductById(id) {
            return new Promise ((resolve, reject) => {
                axios.get(`api/product/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateProduct(data, id) {
            return new Promise ((resolve, reject) => {
                axios.put(`api/update-product/${id}`, data).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteProduct(id) {
            return new Promise ((resolve, reject) => {
                axios.delete(`api/delete-product/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        printBarcode(id) {
            return new Promise ((resolve, reject) => {
                axios.get(`api/print-barcode/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});