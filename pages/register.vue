<script lang="ts" setup>

import { ref } from 'vue';

export interface RegisterBody {
    email: string;
    password: string;
    name: string;
}

const form = ref<RegisterBody>({
    email: 'email@mail.com',
    password: '1234567890',
    name: 'name1',
});

const submitForm = async () => {
    try {
        const response = await $fetch('/api/auth/register', {
            method: "POST",
            body: form.value
        });
        console.log('Form submitted:', form.value);
        console.log(response)
    } catch (error) {
        console.error('Submission error:', error);
    }
};
</script>
<template>
    <form @submit.prevent="submitForm">
        <div>
            <label for="name">Name:</label>
            <input
                    id="name"
                    v-model="form.name"
                    placeholder="Enter your name"
                    required
                    type="text"
            />
        </div>
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