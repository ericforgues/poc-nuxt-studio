<script setup lang="ts">
const localePath = useLocalePath()
const { page, classes, teachers } = useSchoolContent()

const { data: home } = await page('/')
const { data: allClasses } = await classes()
const { data: allTeachers } = await teachers()

const featured = computed(() => allClasses.value.filter(c => c.featured))

const teacherOf = (slug: string) => allTeachers.value.find(teacher => teacher.slug === slug)

useSeoMeta({
  title: () => home.value?.title,
  description: () => home.value?.description
})
</script>

<template>
  <div v-if="home">
    <UPageHero
      :title="home.hero.headline"
      :description="home.hero.subline"
      :links="[
        { label: home.hero.ctaLabel, to: localePath('calendar'), icon: 'i-lucide-calendar-days', size: 'lg' },
        { label: $t('nav.contact'), to: localePath('contact'), variant: 'subtle', size: 'lg' }
      ]"
      orientation="horizontal"
    >
      <img
        :src="home.hero.image"
        :alt="home.hero.headline"
        class="rounded-lg shadow-lg w-full"
      >
    </UPageHero>

    <UPageSection v-if="home.highlights?.length">
      <UPageGrid>
        <UPageCard
          v-for="highlight in home.highlights"
          :key="highlight.title"
          :icon="highlight.icon"
          :title="highlight.title"
          :description="highlight.description"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="$t('calendar.classesTitle')"
      :links="[{ label: $t('nav.calendar'), to: localePath('calendar'), trailingIcon: 'i-lucide-arrow-right', variant: 'subtle' }]"
    >
      <UPageGrid>
        <ClassCard
          v-for="item in featured"
          :key="item.slug"
          :item="item"
          :teacher="teacherOf(item.teacher)"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection :title="$t('calendar.teachersTitle')">
      <UPageGrid>
        <TeacherCard
          v-for="teacher in allTeachers"
          :key="teacher.slug"
          :item="teacher"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection>
      <UPageBody>
        <ContentRenderer :value="home" />
      </UPageBody>
    </UPageSection>
  </div>
</template>
