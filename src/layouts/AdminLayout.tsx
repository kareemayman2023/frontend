import AdminNavbar from '@/components/adminComponents/AdminNavbar'
import AdminSideBar from '@/components/adminComponents/AdminSideBar'
import { useAdmin } from '@/store/useAdmin'
import { useAppointment } from '@/store/useAppointment'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const { getAllAppointments } = useAppointment()
  const { getDoctors } = useAdmin()
  useEffect(() => {
    getAllAppointments()
    getDoctors()
  }, [])
  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <AdminNavbar />
      <div className="flex  min-h-screen gap-10">
        <AdminSideBar />
        <div className="p-5 container x-auto flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
