import DoctorNavbar from '@/components/doctorComponents/DoctorNavbar'
import DoctorSideBar from '@/components/doctorComponents/DoctorSideBar'
import { useAppointment } from '@/store/useAppointment'
import { useUser } from '@/store/useUser'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const DoctorLayout = () => {
  const { getDoctorAppointments } = useAppointment()
  const { user } = useUser()
  useEffect(() => {
    const handleGetAppointments = async () => {
      try {
        await getDoctorAppointments(user?._id!)
      } catch (error) {
        console.log(error)
      }
    }
    handleGetAppointments()
  }, [])
  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <DoctorNavbar />
      <div className="flex  min-h-screen gap-10">
        <DoctorSideBar />
        <div className="p-5 container mx-auto flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DoctorLayout
