<script setup lang="ts">
import type { SchoolClass, Teacher } from '~/composables/useSchoolContent'

const props = defineProps<{
  item: SchoolClass
  teacher?: Teacher
}>()

const { t } = useI18n()

const badges = computed(() => [
  { icon: 'i-lucide-gauge', value: t(`levels.${props.item.level}`) },
  { icon: 'i-lucide-clock', value: t('class.minutes', { count: props.item.duration }) },
  { icon: 'i-lucide-tag', value: props.item.price }
])
</script>

<template>
  <UCard :ui="{ body: 'space-y-3' }">
    <template #header>
      <img
        :src="item.image"
        :alt="item.name"
        class="w-full h-40 object-cover rounded-md"
        loading="lazy"
      >
    </template>

    <div class="flex items-start justify-between gap-2">
      <h3 class="text-lg font-semibold text-highlighted">
        {{ item.name }}
      </h3>
      <UBadge
        :label="item.style"
        color="primary"
        variant="subtle"
      />
    </div>

    <p class="text-sm text-muted">
      {{ item.description }}
    </p>

    <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-dimmed">
      <span
        v-for="badge in badges"
        :key="badge.icon"
        class="inline-flex items-center gap-1.5"
      >
        <UIcon
          :name="badge.icon"
          class="size-4"
        />
        {{ badge.value }}
      </span>
    </div>

    <template
      v-if="teacher"
      #footer
    >
      <div class="flex items-center gap-3">
        <UAvatar
          :src="teacher.photo"
          :alt="teacher.name"
          size="sm"
        />
        <div class="text-sm">
          <p class="font-medium text-highlighted">
            {{ teacher.name }}
          </p>
          <p class="text-muted">
            {{ t('class.teacher') }}
          </p>
        </div>
      </div>
    </template>
  </UCard>
</template>
