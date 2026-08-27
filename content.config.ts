import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const levels = ['debutant', 'intermediaire', 'avance', 'tous'] as const
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

// Relations between the three calendar entities are resolved by slug, so both
// sides are enums: Studio renders them as dropdowns and a typo fails the build
// instead of silently emptying a row of the schedule table.
const classSlugs = [
  'ballet-classique',
  'danse-contemporaine',
  'hip-hop-ados',
  'jazz-adulte',
  'salsa-en-couple',
  'danse-en-ligne'
] as const

const teacherSlugs = [
  'marie-claude-tremblay',
  'samuel-bergeron',
  'lea-fortin',
  'carlos-mendoza'
] as const

const pageSchema = z.object({
  title: z.string().editor({
    label: 'Titre de la page',
    description: 'Affiché dans l\'onglet du navigateur et les résultats de recherche.'
  }),
  description: z.string().editor({
    input: 'textarea',
    label: 'Description',
    description: 'Résumé de la page pour les moteurs de recherche et les partages sur les réseaux sociaux.'
  }),
  hero: z.object({
    headline: z.string().editor({
      label: 'Titre principal',
      description: 'Le grand titre en haut de la page.'
    }),
    subline: z.string().editor({
      input: 'textarea',
      label: 'Sous-titre',
      description: 'Une ou deux phrases sous le titre principal.'
    }),
    image: z.string().editor({
      input: 'media',
      label: 'Image',
      description: 'Image d\'en-tête, format paysage recommandé.'
    }),
    ctaLabel: z.string().editor({
      label: 'Texte du bouton',
      description: 'Par exemple : Voir le calendrier.'
    }),
    ctaTo: z.string().editor({
      label: 'Lien du bouton',
      description: 'Chemin interne commençant par une barre oblique, par exemple /contact.',
      tooltip: 'Utilisez /calendrier ou /contact en français, /en/calendar ou /en/contact en anglais.'
    })
  }).editor({
    label: 'En-tête',
    description: 'Bandeau affiché en haut de la page.'
  }),
  highlights: z.array(z.object({
    icon: z.string().editor({
      input: 'icon',
      label: 'Icône'
    }),
    title: z.string().editor({
      label: 'Titre'
    }),
    description: z.string().editor({
      input: 'textarea',
      label: 'Description'
    })
  })).optional().editor({
    label: 'Points saillants',
    description: 'Trois éléments mis en avant sous l\'en-tête.'
  }),
  info: z.object({
    address: z.string().editor({
      label: 'Adresse'
    }),
    phone: z.string().editor({
      label: 'Téléphone'
    }),
    email: z.string().editor({
      label: 'Courriel'
    }),
    mapLabel: z.string().editor({
      label: 'Légende de la carte',
      description: 'Texte affiché à la place de la carte géographique.'
    }),
    hours: z.array(z.object({
      label: z.string().editor({
        label: 'Jours',
        description: 'Par exemple : Lundi au jeudi.'
      }),
      value: z.string().editor({
        label: 'Heures',
        description: 'Par exemple : 9 h à 21 h.'
      })
    })).editor({
      label: 'Heures d\'ouverture'
    })
  }).optional().editor({
    label: 'Coordonnées',
    description: 'Bloc affiché uniquement sur la page contact.'
  })
})

const classSchema = z.object({
  slug: z.enum(classSlugs).editor({
    hidden: true
  }),
  name: z.string().editor({
    label: 'Nom du cours'
  }),
  style: z.string().editor({
    label: 'Style',
    description: 'Famille de danse affichée en étiquette, par exemple Ballet.'
  }),
  level: z.enum(levels).editor({
    label: 'Niveau'
  }),
  duration: z.number().editor({
    label: 'Durée',
    description: 'Durée d\'un cours, en minutes.'
  }),
  price: z.string().editor({
    label: 'Tarif',
    description: 'Texte libre, par exemple 285 $ / session.'
  }),
  description: z.string().editor({
    input: 'textarea',
    label: 'Description'
  }),
  teacher: z.enum(teacherSlugs).editor({
    label: 'Professeur',
    description: 'Choisissez la personne qui enseigne ce cours.'
  }),
  image: z.string().editor({
    input: 'media',
    label: 'Image'
  }),
  featured: z.boolean().default(false).editor({
    label: 'Afficher sur l\'accueil',
    description: 'Les cours cochés apparaissent dans la section vedette de la page d\'accueil.'
  })
})

const teacherSchema = z.object({
  slug: z.enum(teacherSlugs).editor({
    hidden: true
  }),
  name: z.string().editor({
    label: 'Nom'
  }),
  role: z.string().editor({
    label: 'Fonction',
    description: 'Par exemple : Professeure de danse contemporaine.'
  }),
  bio: z.string().editor({
    input: 'textarea',
    label: 'Biographie'
  }),
  photo: z.string().editor({
    input: 'media',
    label: 'Photo',
    description: 'Photo carrée, affichée en médaillon.'
  }),
  styles: z.array(z.string()).editor({
    label: 'Styles enseignés'
  })
})

const scheduleSchema = z.object({
  season: z.string().editor({
    label: 'Session',
    description: 'Par exemple : Session d\'automne 2026.'
  }),
  entries: z.array(z.object({
    classSlug: z.enum(classSlugs).editor({
      label: 'Cours'
    }),
    day: z.enum(days).editor({
      label: 'Jour'
    }),
    startTime: z.string().editor({
      label: 'Heure de début',
      description: 'Format 24 heures, par exemple 17:30.'
    }),
    endTime: z.string().editor({
      label: 'Heure de fin',
      description: 'Format 24 heures, par exemple 19:00.'
    }),
    room: z.string().editor({
      label: 'Salle'
    })
  })).editor({
    label: 'Plages horaires'
  })
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
