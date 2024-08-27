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
import axios from 'axios';

const courses = ref([]);

onMounted(async () => {
    const { data } = await axios.get('/api/courses');
    courses.value = data;
});
</script>

<style scoped>

</style>