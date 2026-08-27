<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const items = computed<DropdownMenuItem[]>(() =>
  locales.value.map(l => ({
    label: l.name,
    to: switchLocalePath(l.code),
    icon: l.code === locale.value ? 'i-lucide-check' : undefined
  }))
)
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      :aria-label="t('common.switchLanguage')"
      :label="locale.toUpperCase()"
    />
  </UDropdownMenu>
</template>
