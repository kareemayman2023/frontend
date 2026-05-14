import { TAddDoctorSchema } from '@/validations/addDoctorValidation'
import { TUpdateUserSchema } from '@/validations/updateUserValidation'
import axios, { isAxiosError } from 'axios'
import { create } from 'zustand'

interface AdminStore {
  isCreatingDoctor: boolean
  isGettingFilteredDoctors: boolean
  isGettingDoctor: boolean
  doctors: (TAddDoctorSchema & { available: boolean; _id: string })[] | null
  doctor: (TAddDoctorSchema & { available: boolean; _id: string }) | null
  createDoctor: (
    data: TAddDoctorSchema
  ) => Promise<{ message: string; success: boolean }>
  getDoctors: () => void
  getDoctor: (id: string) => Promise<{ message: string; success: boolean }>
  getFilteredDoctors: (query: string) => Promise<{
    data: (TAddDoctorSchema & { available: boolean; _id: string })[]
  }>
  getAllPatients: () => Promise<{
    data: TUpdateUserSchema[] | null
    success: boolean
  }>
}

export const useAdmin = create<AdminStore>((set) => ({
  isCreatingDoctor: false,
  isGettingFilteredDoctors: false,
  isGettingDoctor: false,
  doctors: null,
  doctor: null,
  createDoctor: async (data: TAddDoctorSchema) => {
    try {
      set({ isCreatingDoctor: true })

      const formData = new FormData()

      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof TAddDoctorSchema

        if (typedKey !== 'image' && data[typedKey] !== undefined) {
          formData.append(typedKey, String(data[typedKey]))
        }
      })

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0])
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/add-doctor`,
        formData,
        { withCredentials: true }
      )
      set({ doctors: res.data.data })
      return { success: true, message: 'Doctor added successfully' }
    } catch (error) {
      return { success: false, message: 'Something went wrong' }
    } finally {
      set({ isCreatingDoctor: false })
    }
  },
  getDoctors: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctor/get-doctors`,
        {
          withCredentials: true,
        }
      )
      set({ doctors: res.data.data })
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          message: error.response?.data.message,
          success: false,
        }
      } else {
        return {
          message: 'Something went wrong',
          success: false,
        }
      }
    }
  },
  getDoctor: async (id) => {
    try {
      set({ isGettingDoctor: true })
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctor/${id}`,
        {
          withCredentials: true,
        }
      )
      set({ doctor: res.data.data })
      return { success: true, message: 'Doctor fetched successfully' }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          message: error.response?.data.message,
          success: false,
        }
      } else {
        return {
          message: 'Something went wrong',
          success: false,
        }
      }
    } finally {
      set({ isGettingDoctor: false })
    }
  },
  getFilteredDoctors: async (query) => {
    try {
      set({ isGettingFilteredDoctors: true })
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctor/filterd-doctors?speciality=${query}`,
        {
          withCredentials: true,
        }
      )
      return { data: res.data.data }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          data: null,
        }
      } else {
        return {
          data: null,
        }
      }
    } finally {
      set({ isGettingFilteredDoctors: false })
    }
  },
  getAllPatients: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/all-patients`,
        {
          withCredentials: true,
        }
      )
      return { data: res.data.data, success: true }
    } catch (error) {
      if (isAxiosError(error)) {
        return { data: null, success: false }
      } else {
        return { data: null, success: false }
      }
    }
  },
}))
