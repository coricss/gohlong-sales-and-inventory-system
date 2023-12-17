import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

export const useCategoryStore = defineStore('categories', {
    state: () => ({
        categoriesData: [],
    }),
    getters: {
        categoriesInfo: (state) => state.categoriesData,
    },
    actions: {
        getCategoryData () {
            return new Promise ((resolve, reject) => {
                axios.get('api/categories')
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        addCategory(data) {
            return new Promise ((resolve, reject) => {
                axios.post('api/new-category', {category_name: data}).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getCategory(id) {
            return new Promise ((resolve, reject) => {
                axios.get(`api/category/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateCategory(category_name, id) {
            return new Promise ((resolve, reject) => {
                axios.put(`api/update-category/${id}`, {category_name: category_name}).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteCategory(id) {
            return new Promise ((resolve, reject) => {
                axios.delete(`api/delete-category/${id}`).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});