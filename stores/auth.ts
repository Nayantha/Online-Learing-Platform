import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { LoginAuthBody, RegisterAuthBody, User } from "~/utils/types";

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
        async login(userData: LoginAuthBody) {
            try {
                const data : AuthResponse = await $fetch('/api/auth/login', {
                    method: "POST",
                    body: userData
                }) as AuthResponse;
                this.token = data.token;
                this.user = data.user;
            } catch (error) {
                console.error(error);
            }
        },
        async register(userData: RegisterAuthBody) {
            try {
                const data : AuthResponse = await $fetch('/api/auth/register', {
                    method: "POST",
                    body: userData
                }) as AuthResponse;
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
