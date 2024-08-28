<template>
    <div v-if="course">
        <h1>{{ course.name }}</h1>
        <p>{{ course.description }}</p>
        <NuxtLink :to="`/courses/${course.id}/edit`">Edit Course</NuxtLink>
        <button v-if="isAdmin" @click="deleteCourse">Delete</button>
        <button @click="enroll">Enroll</button>
        <div>Enrolled</div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import type {Course, Session} from "~/utils/types";

const router = useRouter();
const route = useRoute();
const course = ref<Course | null>(null);
const isAdmin = ref(false);

onMounted(async () => {
    course.value = await $fetch(`/api/courses/${route.params.id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    // Ensure this runs only in the client
    if (process.client) {
        const session: Session | null = localStorage.getItem('session') as Session | null;
        if (session) {
            if (session.userType === 'admin') {
                isAdmin.value = true;
            }
        }
    }
});

const deleteCourse = async () => {
    if (confirm('Are you sure you want to delete this course?')) {
        try {
            await $fetch(`/api/courses/${route.params.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            await router.push('/courses');
        } catch (error) {
            console.error('Failed to delete the course:', error);
        }
    }
};

const enroll = async () => {
    try {
        await $fetch('/api/enrollment', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error('Failed to enroll the course:', error);
    }
}
</script>
