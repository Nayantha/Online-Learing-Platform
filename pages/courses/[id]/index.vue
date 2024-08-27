<template>
    <div v-if="course">
        <h1>{{ course.name }}</h1>
        <p>{{ course.description }}</p>
        <NuxtLink :to="`/courses/${course.id}/edit`">Edit Course</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Course } from "~/utils/types";

const route = useRoute();
const course  = ref<Course | null>(null);

onMounted(async () => {
    const { data } = await axios.get(`/api/courses/${route.params.id}`);
    course.value = data as Course;
});
</script>
