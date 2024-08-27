import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { AuthResponse, LoginAuthBody, RegisterAuthBody, StoreUser } from "~/utils/types";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useStorage<StoreUser | null>('user', null),
        token: useStorage<string | null>('token', null)
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
