import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    ui: group({
      title: 'Thème',
      description: 'Apparence globale du site.',
      icon: 'i-lucide-palette',
      fields: {
        colors: group({
          title: 'Couleurs',
          description: 'Palette Nuxt UI.',
          icon: 'i-lucide-swatch-book',
          fields: {
            primary: field({
              type: 'string',
              title: 'Couleur primaire',
              description: 'Couleur principale du site.',
              icon: 'i-lucide-paintbrush',
              default: 'violet'
            }),
            neutral: field({
              type: 'string',
              title: 'Couleur neutre',
              description: 'Couleur des textes et surfaces.',
              icon: 'i-lucide-paintbrush',
              default: 'slate'
            })
          }
        })
      }
    }),
    school: group({
      title: 'École',
      description: 'Coordonnées affichées dans le pied de page.',
      icon: 'i-lucide-building-2',
      fields: {
        name: field({
          type: 'string',
          title: 'Nom',
          icon: 'i-lucide-type',
          default: 'École de danse Saint-Jean'
        }),
        email: field({
          type: 'string',
          title: 'Courriel',
          icon: 'i-lucide-mail',
          default: 'info@ecoledansesaintjean.ca'
        }),
        phone: field({
          type: 'string',
          title: 'Téléphone',
          icon: 'i-lucide-phone',
          default: '418 555-0142'
        }),
        address: field({
          type: 'string',
          title: 'Adresse',
          icon: 'i-lucide-map-pin',
          default: '875, rue Saint-Jean, Québec (Québec) G1R 1R2'
        })
      }
    })
  }
})
