<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: '/calendrier',
    en: '/calendar'
  }
})

const localePath = useLocalePath()
const { page, classes, teachers, schedule } = useSchoolContent()

const { data: calendarPage } = await page('/calendar')
const { data: allClasses } = await classes()
const { data: allTeachers } = await teachers()
const { data: weekly } = await schedule()

const teacherOf = (slug: string) => allTeachers.value.find(teacher => teacher.slug === slug)

useSeoMeta({
  title: () => calendarPage.value?.title,
  description: () => calendarPage.value?.description
})
</script>

<template>
  <div v-if="calendarPage">
    <UPageHero
      :title="calendarPage.hero.headline"
      :description="calendarPage.hero.subline"
      :links="[
        { label: calendarPage.hero.ctaLabel, to: localePath('contact'), icon: 'i-lucide-mail', size: 'lg' }
      ]"
      orientation="horizontal"
    >
      <img
        :src="calendarPage.hero.image"
        :alt="calendarPage.hero.headline"
        class="rounded-lg shadow-lg w-full"
      >
    </UPageHero>

    <UPageSection v-if="calendarPage.highlights?.length">
      <UPageGrid>
        <UPageCard
          v-for="highlight in calendarPage.highlights"
          :key="highlight.title"
          :icon="highlight.icon"
          :title="highlight.title"
          :description="highlight.description"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="classes"
      :title="$t('calendar.classesTitle')"
    >
      <UPageGrid>
        <ClassCard
          v-for="item in allClasses"
          :key="item.slug"
          :item="item"
          :teacher="teacherOf(item.teacher)"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="teachers"
      :title="$t('calendar.teachersTitle')"
    >
      <UPageGrid>
        <TeacherCard
          v-for="teacher in allTeachers"
          :key="teacher.slug"
          :item="teacher"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="schedule"
      :title="$t('calendar.scheduleTitle')"
      :description="weekly?.season"
    >
      <ScheduleTable
        :schedule="weekly"
        :classes="allClasses"
        :teachers="allTeachers"
      />
    </UPageSection>

    <UPageSection>
      <UPageBody>
        <ContentRenderer :value="calendarPage" />
      </UPageBody>
    </UPageSection>
  </div>
</template>
