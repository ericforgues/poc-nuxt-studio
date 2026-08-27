<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const appConfig = useAppConfig()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('nav.home'), to: localePath('index'), icon: 'i-lucide-home' },
  { label: t('nav.calendar'), to: localePath('calendar'), icon: 'i-lucide-calendar-days' },
  { label: t('nav.contact'), to: localePath('contact'), icon: 'i-lucide-mail' }
])
</script>

<template>
  <UHeader :ui="{ left: 'min-w-0' }">
    <template #left>
      <NuxtLink
        :to="localePath('index')"
        class="flex items-center gap-2 font-semibold truncate focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
      >
        <UIcon
          name="i-lucide-drama"
          class="size-6 text-primary shrink-0"
        />
        <span class="truncate">{{ appConfig.school.name }}</span>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <LocaleSwitcher />
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>
