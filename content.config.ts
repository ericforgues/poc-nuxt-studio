import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const levels = ['debutant', 'intermediaire', 'avance', 'tous'] as const
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  hero: z.object({
    headline: z.string(),
    subline: z.string(),
    image: z.string().editor({ input: 'media' }),
    ctaLabel: z.string(),
    ctaTo: z.string()
  }),
  highlights: z.array(z.object({
    icon: z.string().editor({ input: 'icon' }),
    title: z.string(),
    description: z.string()
  })).optional(),
  info: z.object({
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    mapLabel: z.string(),
    hours: z.array(z.object({
      label: z.string(),
      value: z.string()
    }))
  }).optional()
})

const classSchema = z.object({
  slug: z.string(),
  name: z.string(),
  style: z.string(),
  level: z.enum(levels),
  duration: z.number(),
  price: z.string(),
  description: z.string(),
  teacher: z.string(),
  image: z.string().editor({ input: 'media' }),
  featured: z.boolean().default(false)
})

const teacherSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  photo: z.string().editor({ input: 'media' }),
  styles: z.array(z.string())
})

const scheduleSchema = z.object({
  season: z.string(),
  entries: z.array(z.object({
    classSlug: z.string(),
    day: z.enum(days),
    startTime: z.string(),
    endTime: z.string(),
    room: z.string()
  }))
})

function localizedCollections(locale: 'fr' | 'en') {
  return {
    [`pages_${locale}`]: defineCollection({
      type: 'page',
      source: { include: `${locale}/pages/**/*.md`, prefix: '' },
      schema: pageSchema
    }),
    [`classes_${locale}`]: defineCollection({
      type: 'data',
      source: `${locale}/classes/**/*.yml`,
      schema: classSchema
    }),
    [`teachers_${locale}`]: defineCollection({
      type: 'data',
      source: `${locale}/teachers/**/*.yml`,
      schema: teacherSchema
    }),
    [`schedule_${locale}`]: defineCollection({
      type: 'data',
      source: `${locale}/schedule/**/*.yml`,
      schema: scheduleSchema
    })
  }
}

export default defineContentConfig({
  collections: {
    ...localizedCollections('fr'),
    ...localizedCollections('en')
  }
})
