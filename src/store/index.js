import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        user: {
            id: 0,
            name: '',
            email: '',
            password: '',
            role: '',
            status: '',
            created_at: '',
            updated_at: ''
        },
    });
    actions: {
        setUser(user) {
            this.user = user;
        },
        getUser() {
            return this.user;
        }
    }
})