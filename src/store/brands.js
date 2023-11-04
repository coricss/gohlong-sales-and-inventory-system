import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('token')}`;

export const useBrandStore = defineStore('brands', {
    state: () => ({
        brandsData: [],
    }),
    getters: {
        brandsInfo: (state) => state.brandsData,
    },
    actions: {
        getBrandData() {
            return new Promise ((resolve, reject) => {
                axios.get('api/brands').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        addBrand(brand, category_id) {
            return new Promise ((resolve, reject) => {
                axios.post('api/new-brand', {brand_name: brand, category_id: category_id}).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getBrandById(id) {
            return new Promise ((resolve, reject) => {
                axios.get(`api/brand/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateBrand(brand, category_id, id) {
            return new Promise ((resolve, reject) => {
                axios.put(`api/update-brand/${id}`, {brand_name: brand, category_id: category_id}).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteBrand(id) {
            return new Promise ((resolve, reject) => {
                axios.delete(`api/delete-brand/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});