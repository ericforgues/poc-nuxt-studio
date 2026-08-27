<script setup lang="ts">
const { locale } = useI18n()
const head = useLocaleHead()

useHead(() => ({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(head.value.meta || [])
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    ...(head.value.link || [])
  ],
  htmlAttrs: {
    lang: locale.value === 'fr' ? 'fr-CA' : 'en-CA'
  }
}))
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
