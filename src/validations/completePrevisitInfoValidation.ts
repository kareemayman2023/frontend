import { z } from 'zod'

export const completePrevisitInfoSchema = z.object({
  reasons: z.string().min(1, 'Reasons are required'),
  howLong: z.string().min(1, 'How long is required'),
  currentMedications: z.string().min(1, 'Current medications are required'),
  tests: z.instanceof(File).optional(),
})

type TCompletePrevisitInfoSchema = z.infer<typeof completePrevisitInfoSchema>

export type { TCompletePrevisitInfoSchema }
