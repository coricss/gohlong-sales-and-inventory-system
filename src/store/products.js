import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

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
        getProductByProductCode(product_code) {
            return new Promise ((resolve, reject) => {
                axios.get(`api/product-code/${product_code}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getProductByBarcode(barcode) {
            return new Promise ((resolve, reject) => {
                axios.get(`api/search-product-barcode/${barcode}`).then((response) => {
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
        updateInventoryStocks(data, id) {
            return new Promise ((resolve, reject) => {
                axios.put(`api/update-inventory-stocks/${id}`, data).then((response) => {
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
        updateActualStocks(data, id) {
            return new Promise ((resolve, reject) => {
                axios.put(`api/update-actual-stocks/${id}`, data).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        addActualStocks(data, id) {
            return new Promise ((resolve, reject) => {
                axios.put(`api/add-actual-stocks/${id}`, data).then((response) => {
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
        },
        printAllBarcode() {
            return new Promise ((resolve, reject) => {
                axios.get(`api/print-all-barcode`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});