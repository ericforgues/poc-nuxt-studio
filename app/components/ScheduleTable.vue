<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { SchoolClass, Schedule, Teacher } from '~/composables/useSchoolContent'

const props = defineProps<{
  schedule?: Schedule | null
  classes: SchoolClass[]
  teachers: Teacher[]
}>()

const { t } = useI18n()

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

type Row = {
  daySlug: string
  levelSlug: string
  day: string
  time: string
  className: string
  level: string
  teacherName: string
  room: string
}

const selectedDay = ref('all')
const selectedLevel = ref('all')

const rows = computed<Row[]>(() => {
  const entries = props.schedule?.entries ?? []

  return entries
    .map((entry) => {
      const danceClass = props.classes.find(c => c.slug === entry.classSlug)
      const teacher = props.teachers.find(teach => teach.slug === danceClass?.teacher)

      return {
        daySlug: entry.day,
        levelSlug: danceClass?.level ?? 'tous',
        day: t(`days.${entry.day}`),
        time: `${entry.startTime} – ${entry.endTime}`,
        className: danceClass?.name ?? entry.classSlug,
        level: t(`levels.${danceClass?.level ?? 'tous'}`),
        teacherName: teacher?.name ?? '—',
        room: entry.room
      }
    })
    .filter(row => selectedDay.value === 'all' || row.daySlug === selectedDay.value)
    .filter(row => selectedLevel.value === 'all' || row.levelSlug === selectedLevel.value)
    .sort((a, b) => dayOrder.indexOf(a.daySlug) - dayOrder.indexOf(b.daySlug) || a.time.localeCompare(b.time))
})

const dayOptions = computed(() => [
  { label: t('calendar.allDays'), value: 'all' },
  ...dayOrder
    .filter(day => (props.schedule?.entries ?? []).some(entry => entry.day === day))
    .map(day => ({ label: t(`days.${day}`), value: day }))
])

const levelOptions = computed(() => [
  { label: t('calendar.allLevels'), value: 'all' },
  ...[...new Set(props.classes.map(c => c.level))].map(level => ({
    label: t(`levels.${level}`),
    value: level
  }))
])

const columns = computed<TableColumn<Row>[]>(() => [
  { accessorKey: 'day', header: t('calendar.columns.day') },
  { accessorKey: 'time', header: t('calendar.columns.time') },
  { accessorKey: 'className', header: t('calendar.columns.class') },
  { accessorKey: 'level', header: t('class.level') },
  { accessorKey: 'teacherName', header: t('calendar.columns.teacher') },
  { accessorKey: 'room', header: t('calendar.columns.room') }
])
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-3">
      <USelectMenu
        v-model="selectedDay"
        :items="dayOptions"
        value-key="value"
        icon="i-lucide-calendar"
        class="w-56"
        :aria-label="t('calendar.filterDay')"
      />
      <USelectMenu
        v-model="selectedLevel"
        :items="levelOptions"
        value-key="value"
        icon="i-lucide-gauge"
        class="w-56"
        :aria-label="t('calendar.filterLevel')"
      />
    </div>

    <UTable
      :data="rows"
      :columns="columns"
      class="border border-default rounded-lg"
    >
      <template #empty>
        <p class="text-sm text-muted py-6 text-center">
          {{ t('calendar.noResults') }}
        </p>
      </template>
    </UTable>
  </div>
</template>
