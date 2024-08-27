// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-08-27',
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        "@prisma/nuxt"
    ],
})