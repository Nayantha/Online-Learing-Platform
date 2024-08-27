import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import axios from 'axios';
import type { RegisterAuthBody, User } from "~/utils/types";

interface AuthResponse {
    token: string;
    user: User;
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
        async register(userData: RegisterAuthBody) {
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
