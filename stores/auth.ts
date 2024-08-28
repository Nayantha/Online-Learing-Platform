import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import type {AuthResponse, LoginAuthBody, RegisterAuthBody, Session, StoreUser} from "~/utils/types";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useStorage<StoreUser | null>('user', null),
        token: useStorage<string | null>('token', null),
        session: useStorage<Session | null>("session", null)
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
                this.session = data.session;
            } catch (error) {
                console.error(error);
            }
        },
        async loginAdmin(userData: LoginAuthBody) {
            try {
                const data: AuthResponse = await $fetch('/api/auth/admin/login', {
                    method: "POST",
                    body: userData
                }) as AuthResponse;
                this.token = data.token;
                this.user = data.user;
                this.session = data.session;
                console.log(this.user, this.session)
            } catch (error) {
                console.error(error);
            }
        },
        async register(userData: RegisterAuthBody) {
            try {
                const data: AuthResponse = await $fetch('/api/auth/register', {
                    method: "POST",
                    body: userData
                }) as AuthResponse;
                this.token = data.token;
                this.user = data.user;
                this.session = data.session;
            } catch (error) {
                console.error(error);
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            this.session = null
        },
        async getToken() {
            try {
                const data: boolean = await $fetch(`/api/auth/${this.token}`, {method: "GET"});
                if (data) {
                    return this.token;
                } else {
                    return ""
                }
            } catch (e) {
                return "";
            }
        }
    }
});
