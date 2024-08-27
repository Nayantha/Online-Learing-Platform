<template>
    <div>
        <h1>Courses</h1>
        <NuxtLink to="/courses/create">Create Course</NuxtLink>
        <ul>
            <li v-for="course in courses" :key="course.id">
                <NuxtLink :to="`/courses/${course.id}`">{{ course.name }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Course } from "~/utils/types";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const courses = ref<Course[] | []>([]);

onMounted(async () => {
    courses.value = await $fetch('/api/courses', {
        headers: {
        Authorization: `Bearer ${await authStore.getToken()}`
    }
    }) as Course[];
});
</script>

<style scoped>

</style>