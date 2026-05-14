import { z } from 'zod'

export const updateHealthProfileSchema = z.object({
  lifeStyle: z.string().min(1, 'Life style is required').optional(),
  allergies: z.string().min(1, 'Allergies are required').optional(),
  chronicConditions: z
    .array(z.string())
    .min(1, 'Please select at least one chronic condition'),
  pastSurgeries: z.string().min(1, 'Past surgeries are required').optional(),
  familyHistory: z.string().min(1, 'Family history is required').optional(),
})

type TUpdateHealthProfileSchema = z.infer<typeof updateHealthProfileSchema>

export type { TUpdateHealthProfileSchema }
