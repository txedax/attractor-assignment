import * as z from 'zod'

export const SettingsFormSchema = z.object({
  name: z.string(),
  bio: z.string(),
  company: z.string(),
  location: z.string(),
})

export type SettingsFormRequest = z.infer<typeof SettingsFormSchema>
