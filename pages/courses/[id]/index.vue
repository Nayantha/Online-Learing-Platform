<template>
    <div v-if="course">
        <h1>{{ course.name }}</h1>
        <p>{{ course.description }}</p>
        <NuxtLink :to="`/courses/${course.id}/edit`">Edit Course</NuxtLink>
        <button @click="deleteCourse">Delete</button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Course } from "~/utils/types";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const route = useRoute();
const course  = ref<Course | null>(null);
const authStore = useAuthStore();

onMounted(async () => {
    course.value = await $fetch(`/api/courses/${ route.params.id }`);
});

const deleteCourse = async () => {
    if (confirm('Are you sure you want to delete this course?')) {
        try {
            await $fetch(`/api/courses/${ route.params.id }`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${await authStore.getToken()}`
                }
            });
            await router.push('/courses');
        } catch (error) {
            console.error('Failed to delete the course:', error);
        }
    }
};
</script>
