<template>
    <div>
        <h1>Create a Course</h1>
        <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input id="name" v-model="form.name"/>

            <label for="description">Description:</label>
            <textarea id="description" v-model="form.description"></textarea>

            <button type="submit">Create Course</button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const form = ref({name: 'Science 101', description: 'Introduction to basic Science.'});
const router = useRouter();

const submitForm = async () => {
    await $fetch('/api/courses', {
            method: "POST", body: form.value,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    );
    await router.push('/courses');
};
</script>
