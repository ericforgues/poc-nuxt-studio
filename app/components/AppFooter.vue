<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ appConfig.school.name }} — {{ t('footer.rights') }}
        </p>
      </template>

      <template #right>
        <UButton
          :to="`mailto:${appConfig.school.email}`"
          icon="i-lucide-mail"
          color="neutral"
          variant="ghost"
          :label="appConfig.school.email"
        />
        <UButton
          :to="localePath('contact')"
          icon="i-lucide-map-pin"
          color="neutral"
          variant="ghost"
          :label="t('nav.contact')"
        />
      </template>
    </UFooter>
  </div>
</template>
