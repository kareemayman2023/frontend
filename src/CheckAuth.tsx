import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from './store/useUser'
import { useEffect } from 'react'
import { Spinner } from '@heroui/react'
import { useAdmin } from './store/useAdmin'
import { useAppointment } from './store/useAppointment'

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation()
  const { isAuthenticated, isCompleted, checkAuth, role, isCheckingAuth } =
    useUser()
  const { getAppointments } = useAppointment()
  const { getDoctors } = useAdmin()
  useEffect(() => {
    getDoctors()
  }, [])
  useEffect(() => {
    checkAuth()
  }, [])
  useEffect(() => {
    getAppointments()
  }, [])
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="primary" />
      </div>
    )
  }

  if (
    !isAuthenticated &&
    (pathname.includes('/admin-panel') ||
      pathname.includes('/doctor-panel') ||
      pathname.includes('/complete-profile') ||
      pathname.includes('/my-profile') ||
      pathname.includes('/my-appointments') ||
      pathname.includes('/my-medical-history') ||
      pathname.includes('/pre-visit'))
  ) {
    return <Navigate to="/" />
  }

  if (
    isAuthenticated &&
    isCompleted &&
    pathname.includes('/complete-profile')
  ) {
    return <Navigate to="/" />
  }

  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return <Navigate to="/" />
  }

  if (isAuthenticated && role === 'user') {
    if (
      pathname.includes('/admin-panel') ||
      pathname.includes('/doctor-panel')
    ) {
      return <Navigate to="/" />
    }
  }

  if (isAuthenticated && role === 'admin') {
    if (!pathname.includes('/admin-panel')) {
      return <Navigate to="/admin-panel" />
    }
  }

  if (isAuthenticated && role === 'doctor') {
    if (!pathname.includes('/doctor-panel')) {
      return <Navigate to="/doctor-panel" />
    }
  }

  if (isAuthenticated && !isCompleted && role === 'user') {
    if (!pathname.includes('/complete-profile')) {
      return <Navigate to="/complete-profile" />
    }
  }

  return <>{children}</>
}

export default CheckAuth
