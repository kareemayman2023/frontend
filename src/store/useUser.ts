import { create } from 'zustand'
import axios, { isAxiosError } from 'axios'
import { TAddDoctorSchema } from '@/validations/addDoctorValidation'
import { TCompleteProfile } from '@/validations/completeProfileValidation'

interface UserStore {
  user:
    | null
    | (TAddDoctorSchema & {
        available: boolean
        _id: string
        profileImage: { url: string; public_id: string }
        fullName: string
        healthProfile: TCompleteProfile & { _id: string }
      })

  isAuthenticated: boolean
  role: 'doctor' | 'admin' | 'user' | null
  isLoggingIn: boolean
  isRegistering: boolean
  isUpdatingDoctorProfile: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  isCompletingProfile: boolean
  isUpdatingHealthProfile: boolean
  isCompleted: boolean
  login: (user: {
    email: string
    password: string
  }) => Promise<{ message: string; success: boolean }>
  logout: () => Promise<{ message: string; success: boolean }>
  register: (user: {
    fullName: string
    email: string
    password: string
  }) => Promise<{ message: string; success: boolean }>
  checkAuth: () => Promise<void>
  completeProfile: (
    user: TCompleteProfile
  ) => Promise<{ message: string; success: boolean }>
  updateDoctor: (data: {
    about?: string
    fees?: string
    addressTwo?: string
    addressOne?: string
    available?: boolean
  }) => Promise<{ message: string; success: boolean }>
  updateProfile: (
    data: FormData
  ) => Promise<{ message: string; success: boolean }>
  updateHealthProfile: (
    data: any,
    id: string
  ) => Promise<{ message: string; success: boolean }>
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoggingIn: false,
  role: null,
  isUpdatingProfile: false,
  isRegistering: false,
  isCheckingAuth: true,
  isCompletingProfile: false,
  isUpdatingDoctorProfile: false,
  isCompleted: false,
  isUpdatingHealthProfile: false,
  login: async (data) => {
    try {
      set({ isLoggingIn: true })
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
        {
          withCredentials: true,
        }
      )
      set({
        user: res.data.data,
        isAuthenticated: true,
        isCompleted: res.data.data.isCompleted,
        role: res.data.data.role,
      })
      return {
        message: 'Login successful',
        success: true,
      }
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
      set({ isLoggingIn: false })
    }
  },
  logout: async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      set({
        user: null,
        isAuthenticated: false,
        isCompleted: false,
        role: null,
      })
      return {
        message: 'Logout successful',
        success: true,
      }
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
  register: async (data) => {
    try {
      set({ isRegistering: true })
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        data,
        {
          withCredentials: true,
        }
      )
      set({
        user: res.data.data,
        isAuthenticated: true,
        isCompleted: res.data.data.isCompleted,
        role: res.data.data.role,
      })
      return {
        message: 'Registration successful',
        success: true,
      }
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
      set({ isRegistering: false })
    }
  },
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true })
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/checkAuth`,
        {
          withCredentials: true,
        }
      )
      set({
        user: res.data.data,
        isAuthenticated: true,
        isCompleted: res.data.data.isCompleted,
        role: res.data.data.role,
      })
    } catch (error) {
      if (isAxiosError(error)) {
        set({ user: null, isAuthenticated: false, isCompleted: false })
      }
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  completeProfile: async (data) => {
    try {
      set({ isCompletingProfile: true })
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/healthProfile/complete`,
        data,
        {
          withCredentials: true,
        }
      )
      set({
        user: res.data.data,
        isCompleted: res.data.data.isCompleted,
        role: res.data.data.role,
      })
      return {
        message: 'Profile completed successfully',
        success: true,
      }
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
      set({ isCompletingProfile: false })
    }
  },
  updateDoctor: async (data) => {
    try {
      set({ isUpdatingDoctorProfile: true })
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/doctor/update`,
        data,
        {
          withCredentials: true,
        }
      )
      set({
        user: res.data.data,
      })
      return {
        message: 'Profile updated successfully',
        success: true,
      }
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
      set({ isUpdatingDoctorProfile: false })
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true })
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update`,
        data,
        {
          withCredentials: true,
        }
      )
      set({
        user: res.data.data,
      })
      return {
        message: 'Profile updated successfully',
        success: true,
      }
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
      set({ isUpdatingProfile: false })
    }
  },
  updateHealthProfile: async (data, id) => {
    try {
      set({ isUpdatingHealthProfile: true })
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/healthProfile/update/${id}`,
        data,
        {
          withCredentials: true,
        }
      )
      set({
        user: res.data.data,
      })
      return {
        message: 'Health profile updated successfully',
        success: true,
      }
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
      set({ isUpdatingHealthProfile: false })
    }
  },
}))
