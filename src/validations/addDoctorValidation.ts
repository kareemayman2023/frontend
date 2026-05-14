import { z } from 'zod'

export const addDoctorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: 'Doctor image is required',
  }),
  email: z
    .string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    ),
  education: z.string().min(1, 'Education is required'),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
      message:
        'Password must be at least 6 characters long and contain at least one letter and one number',
    }),
  addressOne: z.string().min(1, 'Address is required'),
  addressTwo: z.string().optional(),
  speciality: z.string().nonempty('Please select a speciality'),
  experience: z.string().nonempty('Please select your experience'),
  fees: z.string().min(1, 'Fees are required'),
  about: z.string().min(1, 'Please write about yourself'),
})

export type TAddDoctorSchema = z.infer<typeof addDoctorSchema>
