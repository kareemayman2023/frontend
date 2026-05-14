import { TAddDoctorSchema } from '@/validations/addDoctorValidation'
import { TCompleteProfile } from '@/validations/completeProfileValidation'
import { TUpdateUserSchema } from '@/validations/updateUserValidation'
import axios, { isAxiosError } from 'axios'
import { create } from 'zustand'

type TPopulatedDoctor = TAddDoctorSchema & {
  _id: string
  available: boolean
}

type TAppointment = {
  _id: string
  user: string
  doctor: string
  date: string
  time: string
  day: string
  status: string
  paymentMethod: string
  isPrevisitInfoCompleted: boolean
}

type TPopulatedAppointment = TAppointment & {
  _id: string
  doctor: TPopulatedDoctor
  preVisitInfo: {
    reasons: string
    howLong: string
    currentMedications: string
    tests: { url: string; public_id: string }
  }
  user: TUpdateUserSchema & { _id: string; healthProfile: TCompleteProfile }
}

type TAppointmentStore = {
  isCreatingAppointment: boolean
  isCancelingAppointment: boolean
  isLoadingDoctorAppointments: boolean
  isCompletingPreVisitInfo: boolean
  isGettingAppointment: boolean
  appointments: TPopulatedAppointment[] | null
  allAppointments: TPopulatedAppointment[] | null
  doctorAppointments: TPopulatedAppointment[] | null
  appointment: TPopulatedAppointment | null
  createAppointment: (
    data: any
  ) => Promise<{ message: string; success: boolean }>
  getAppointments: () => Promise<{ message: string; success: boolean }>
  cancelAppointment: (
    id: string
  ) => Promise<{ message: string; success: boolean }>
  getAllAppointments: () => Promise<{ message: string; success: boolean }>
  getDoctorAppointments: (
    id: string
  ) => Promise<{ message: string; success: boolean }>
  doctorCancelAppointment: (
    id: string
  ) => Promise<{ message: string; success: boolean }>
  doctorApproveAppointment: (
    id: string
  ) => Promise<{ message: string; success: boolean }>
  doctorTotalEarnings: () => Promise<{ data: string | null; success: boolean }>
  doctorTotalPatients: () => Promise<{ data: string | null; success: boolean }>
  completePreVistInfo: (
    data: any,
    id: string
  ) => Promise<{ message: string; success: boolean }>
  getAppointment: (id: string) => Promise<{ message: string; success: boolean }>
}

export const useAppointment = create<TAppointmentStore>((set) => ({
  isCreatingAppointment: false,
  isCancelingAppointment: false,
  isLoadingDoctorAppointments: false,
  isCompletingPreVisitInfo: false,
  isGettingAppointment: false,
  appointments: null,
  allAppointments: null,
  doctorAppointments: null,
  appointment: null,
  createAppointment: async (data) => {
    try {
      set({ isCreatingAppointment: true })
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/appointment/book-appointment`,
        data,
        {
          withCredentials: true,
        }
      )
      set({ doctorAppointments: res.data.data })
      return {
        message: 'Appointment created successfully',
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
      set({ isCreatingAppointment: false })
    }
  },
  getAppointments: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/get-my-appointments`,
        {
          withCredentials: true,
        }
      )
      set({ appointments: res.data.data })
      return {
        message: 'Appointments fetched successfully',
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
  cancelAppointment: async (id) => {
    try {
      set({ isCancelingAppointment: true })
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/appointment/cancel-appointment/${id}`,
        {
          withCredentials: true,
        }
      )
      set({ appointments: res.data.data })
      return {
        message: 'Appointment canceled successfully',
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
      set({ isCancelingAppointment: false })
    }
  },
  getAllAppointments: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/get-all-appointments`,
        {
          withCredentials: true,
        }
      )
      set({ allAppointments: res.data.data })
      return {
        message: 'Appointments fetched successfully',
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
  getDoctorAppointments: async (id) => {
    try {
      set({ isLoadingDoctorAppointments: true })
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/get-doctor-appointments/${id}`,
        {
          withCredentials: true,
        }
      )
      set({ doctorAppointments: res.data.data })
      return {
        message: 'Appointments fetched successfully',
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
      set({ isLoadingDoctorAppointments: false })
    }
  },
  doctorCancelAppointment: async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/doctor-cancel-appointment/${id}`,
        {
          withCredentials: true,
        }
      )
      set({ doctorAppointments: res.data.data })
      return {
        message: 'Appointment canceled successfully',
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
  doctorApproveAppointment: async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/doctor-approve-appointment/${id}`,
        {
          withCredentials: true,
        }
      )
      set({ doctorAppointments: res.data.data })
      return {
        message: 'Appointment approved successfully',
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
  doctorTotalEarnings: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctor/total-earning`,
        {
          withCredentials: true,
        }
      )
      return {
        data: res.data.data,
        success: true,
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          data: null,
          success: false,
        }
      } else {
        return {
          data: null,
          success: false,
        }
      }
    }
  },
  doctorTotalPatients: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctor/total-patients`,
        {
          withCredentials: true,
        }
      )
      return {
        data: res.data.data,
        success: true,
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          data: null,
          success: false,
        }
      } else {
        return {
          data: null,
          success: false,
        }
      }
    }
  },
  completePreVistInfo: async (data, id) => {
    try {
      set({ isCompletingPreVisitInfo: true })
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/appointment/preVisit/${id}`,
        data,
        {
          withCredentials: true,
        }
      )
      set({ appointments: res.data.data, isCompletingPreVisitInfo: false })
      return {
        message: 'Pre visit info completed successfully',
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
  getAppointment: async (id) => {
    try {
      set({ isGettingAppointment: true })
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointment/appointment/${id}`,
        {
          withCredentials: true,
        }
      )
      set({ appointment: res.data.data, isGettingAppointment: false })
      return {
        message: 'Appointment fetched successfully',
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
}))
