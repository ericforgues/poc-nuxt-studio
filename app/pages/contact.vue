<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const toast = useToast()
const { page } = useSchoolContent()

const { data: contactPage } = await page('/contact')

const schema = computed(() => z.object({
  name: z.string().min(1, t('contact.errors.name')),
  email: z.string().email(t('contact.errors.email')),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, t('contact.errors.message'))
}))

type ContactForm = {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

const state = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const sending = ref(false)

async function onSubmit(_event: FormSubmitEvent<ContactForm>) {
  sending.value = true
  // POC: no backend, the submission is simulated.
  await new Promise(resolve => setTimeout(resolve, 400))
  sending.value = false

  toast.add({ title: t('contact.success'), color: 'success', icon: 'i-lucide-check' })
  Object.assign(state, { name: '', email: '', phone: '', subject: '', message: '' })
}

useSeoMeta({
  title: () => contactPage.value?.title,
  description: () => contactPage.value?.description
})
</script>

<template>
  <div v-if="contactPage">
    <UPageHero
      :title="contactPage.hero.headline"
      :description="contactPage.hero.subline"
      :links="[
        { label: contactPage.hero.ctaLabel, to: localePath('calendar'), icon: 'i-lucide-calendar-days', size: 'lg' }
      ]"
      orientation="horizontal"
    >
      <img
        :src="contactPage.hero.image"
        :alt="contactPage.hero.headline"
        class="rounded-lg shadow-lg w-full"
      >
    </UPageHero>

    <UPageSection>
      <div class="grid gap-8 lg:grid-cols-2">
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('contact.formTitle') }}
            </h2>
          </template>

          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormField
              :label="t('contact.name')"
              name="name"
              required
            >
              <UInput
                v-model="state.name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="t('contact.email')"
              name="email"
              required
            >
              <UInput
                v-model="state.email"
                type="email"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="t('contact.phone')"
              name="phone"
            >
              <UInput
                v-model="state.phone"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="t('contact.subject')"
              name="subject"
            >
              <UInput
                v-model="state.subject"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="t('contact.message')"
              name="message"
              required
            >
              <UTextarea
                v-model="state.message"
                :rows="5"
                class="w-full"
              />
            </UFormField>

            <UButton
              type="submit"
              :label="t('contact.send')"
              :loading="sending"
              icon="i-lucide-send"
            />
          </UForm>
        </UCard>

        <div
          v-if="contactPage.info"
          class="space-y-6"
        >
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold text-highlighted">
                {{ t('contact.infoTitle') }}
              </h2>
            </template>

            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-map-pin"
                  class="size-5 text-primary shrink-0"
                />
                <span>{{ contactPage.info.address }}</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-phone"
                  class="size-5 text-primary shrink-0"
                />
                <a
                  :href="`tel:${contactPage.info.phone.replace(/\s/g, '')}`"
                  class="hover:text-primary"
                >{{ contactPage.info.phone }}</a>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-mail"
                  class="size-5 text-primary shrink-0"
                />
                <a
                  :href="`mailto:${contactPage.info.email}`"
                  class="hover:text-primary"
                >{{ contactPage.info.email }}</a>
              </li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold text-highlighted">
                {{ t('contact.hoursTitle') }}
              </h2>
            </template>

            <dl class="space-y-2 text-sm">
              <div
                v-for="slot in contactPage.info.hours"
                :key="slot.label"
                class="flex justify-between gap-4"
              >
                <dt class="text-muted">
                  {{ slot.label }}
                </dt>
                <dd class="font-medium text-highlighted">
                  {{ slot.value }}
                </dd>
              </div>
            </dl>
          </UCard>

          <div class="flex items-center justify-center gap-2 h-40 rounded-lg border border-dashed border-default text-muted text-sm">
            <UIcon
              name="i-lucide-map"
              class="size-5"
            />
            {{ contactPage.info.mapLabel }}
          </div>
        </div>
      </div>
    </UPageSection>

    <UPageSection>
      <UPageBody>
        <ContentRenderer :value="contactPage" />
      </UPageBody>
    </UPageSection>
  </div>
</template>
