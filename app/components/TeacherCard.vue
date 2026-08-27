<script setup lang="ts">
import type { Teacher } from '~/composables/useSchoolContent'

defineProps<{
  item: Teacher
}>()
</script>

<template>
  <UCard :ui="{ body: 'space-y-3' }">
    <div class="flex items-center gap-4">
      <UAvatar
        :src="item.photo"
        :alt="item.name"
        size="xl"
      />
      <div>
        <h3 class="text-lg font-semibold text-highlighted">
          {{ item.name }}
        </h3>
        <p class="text-sm text-muted">
          {{ item.role }}
        </p>
      </div>
    </div>

    <p class="text-sm text-muted">
      {{ item.bio }}
    </p>

    <div class="flex flex-wrap gap-2">
      <UBadge
        v-for="style in item.styles"
        :key="style"
        :label="style"
        color="neutral"
        variant="subtle"
      />
    </div>
  </UCard>
</template>
