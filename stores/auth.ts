import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import axios from 'axios';

// Define interfaces for User and Authentication responses
interface User {
    id: number;
    name: string;
    email: string;
    std_id: string;
}
interface AuthResponse {
    token: string;
    user: User;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useStorage<User | null>('user', null),  // User can be null or of type User
        token: useStorage<string | null>('token', null) // Token can be null or string
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const { data } = await axios.post<AuthResponse>('/api/auth/login', { email, password });
                this.token = data.token;
                this.user = data.user;
            } catch (error) {
                console.error(error);
            }
        },
        async register(userData: RegisterData) {
            try {
                const { data } = await axios.post<AuthResponse>('/api/auth/register', userData);
                this.token = data.token;
                this.user = data.user;
            } catch (error) {
                console.error(error);
            }
        },
        logout() {
            this.user = null;
            this.token = null;
        }
    }
});
