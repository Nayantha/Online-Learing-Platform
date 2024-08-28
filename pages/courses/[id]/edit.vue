<template>
    <div v-if="form">
        <h1>Edit Course</h1>
        <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input id="name" v-model="form.name"/>

            <label for="description">Description:</label>
            <textarea id="description" v-model="form.description"></textarea>

            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const form = ref({name: '', description: '', price: 0});
const router = useRouter();
const route = useRoute();

onMounted(async () => {
    form.value = await $fetch(`/api/courses/${route.params.id}`, {
        headers: {
            Authorization: `Bearer ${await authStore.getToken()}`
        }
    });
});

const submitForm = async () => {
    await $fetch(`/api/courses/${route.params.id}`, {method: "PUT", body: form.value});
    await router.push(`/courses/${route.params.id}`);
};
</script>
