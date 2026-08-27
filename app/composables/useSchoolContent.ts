import type { Collections } from '@nuxt/content'

type Locale = 'fr' | 'en'

export type SchoolClass = Collections['classes_fr']
export type Teacher = Collections['teachers_fr']
export type Schedule = Collections['schedule_fr']
export type SchoolPage = Collections['pages_fr']

/**
 * Content collections are duplicated per locale (`classes_fr`, `classes_en`, ...),
 * so queries need the active locale suffix resolved at call time.
 */
export function useSchoolContent() {
  const { locale } = useI18n()
  const current = computed<Locale>(() => (locale.value === 'en' ? 'en' : 'fr'))

  const page = (path: string) => useAsyncData(
    () => `page-${current.value}-${path}`,
    () => queryCollection(`pages_${current.value}` as 'pages_fr').path(path).first(),
    { watch: [current] }
  )

  const classes = () => useAsyncData(
    () => `classes-${current.value}`,
    () => queryCollection(`classes_${current.value}` as 'classes_fr').all(),
    { watch: [current], default: () => [] }
  )

  const teachers = () => useAsyncData(
    () => `teachers-${current.value}`,
    () => queryCollection(`teachers_${current.value}` as 'teachers_fr').all(),
    { watch: [current], default: () => [] }
  )

  const schedule = () => useAsyncData(
    () => `schedule-${current.value}`,
    () => queryCollection(`schedule_${current.value}` as 'schedule_fr').first(),
    { watch: [current] }
  )

  return { locale: current, page, classes, teachers, schedule }
}
