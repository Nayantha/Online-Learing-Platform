<script lang="ts" setup>

import {ref} from 'vue';
import type {LoginAuthBody} from "~/utils/types";
import {useRouter} from "vue-router";

const form = ref<LoginAuthBody>({
    email: 'email@mail.com',
    password: '1234567890',
});
const router = useRouter();
const authStore = useAuthStore();

const submitForm = async () => {
    try {
        await authStore.login({...form.value});
        console.log("logged in...");
        await router.push('/courses');
    } catch (error) {
        console.error('Submission error:', error);
    }
};
</script>
<template>
    <form @submit.prevent="submitForm">
        <div>
            <label for="email">Email:</label>
            <input
                    id="email"
                    v-model="form.email"
                    placeholder="Enter your email"
                    required
                    type="email"
            />
        </div>
        <div>
            <label for="password">Password:</label>
            <input
                    id="password"
                    v-model="form.password"
                    placeholder="Enter your password"
                    required
                    type="password"
            />
        </div>
        <button type="submit">Submit</button>
    </form>
</template>
<style scoped>

</style>