// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    // @ts-ignore
    compatibilityDate: '2024-08-27',
    devtools: {enabled: true},
    modules: [
        '@pinia/nuxt',
        "@prisma/nuxt"
    ],
    piniaPersistedstate: {
        storage: 'localStorage'
    },
    pinia: {
        storesDirs: ['./stores/**'],
    },
})