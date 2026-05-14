import { z } from 'zod'

export const loginSchema = z.object({
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

export type TLoginSchema = z.infer<typeof loginSchema>
