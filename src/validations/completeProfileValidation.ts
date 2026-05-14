import { z } from 'zod'

export const completeProfileSchema = z.object({
  birthDate: z.string().min(1, 'Date is required'),
  gender: z.string().min(1, 'Gender is required'),
  lifeStyle: z.string().min(1, 'Life style is required'),
  phone: z.string().min(11, 'Phone number is required'),
  chronicConditions: z.array(z.string().min(1, 'Condition cannot be empty')),
  allergies: z.string().min(1, 'Allergies are required'),
  pastSurgeries: z.string().min(1, 'Past surgeries are required'),
  familyHistory: z.string().min(1, 'Family history is required'),
})

export type TCompleteProfile = z.infer<typeof completeProfileSchema>
