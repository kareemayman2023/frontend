import { z } from 'zod'

const updateUserShema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters long' })
    .optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    )
    .optional(),
  profileImage: z.any().optional(),
})

type TUpdateUserSchema = z.infer<typeof updateUserShema>

export { updateUserShema, type TUpdateUserSchema }
