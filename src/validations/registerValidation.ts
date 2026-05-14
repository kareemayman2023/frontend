import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters long' }),
  email: z
    .string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    ),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
      message:
        'Password must be at least 6 characters long and contain at least one letter and one number',
    }),
})

export type TRegisterSchema = z.infer<typeof registerSchema>
