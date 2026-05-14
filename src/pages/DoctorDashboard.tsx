import { useAppointment } from '@/store/useAppointment'
import formatDate from '@/utils/formatDate'
import { addToast, Avatar, Divider, Image, Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {
  const {
    doctorAppointments,
    doctorCancelAppointment,
    isLoadingDoctorAppointments,
    doctorApproveAppointment,
    doctorTotalEarnings,
    doctorTotalPatients,
  } = useAppointment()
  const [totalEarnings, setTotalEarnings] = useState<string | null>(null)
  const [totalPatients, setTotalPatients] = useState<string | null>(null)
  const navigate = useNavigate()
  console.log(doctorAppointments)
  useEffect(() => {
    const handleTotalEarnings = async () => {
      const res = await doctorTotalEarnings()
      if (res.success) {
        setTotalEarnings(res.data)
      }
    }
    const handleTotalPatients = async () => {
      const res = await doctorTotalPatients()
      if (res.success) {
        setTotalPatients(res.data)
      }
    }
    handleTotalPatients()
    handleTotalEarnings()
  }, [doctorAppointments])
  const handleCancel = async (id: string) => {
    try {
      const res = await doctorCancelAppointment(id)
      if (res.success) {
        addToast({
          title: 'Success',
          color: 'success',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      } else {
        addToast({
          title: 'Error',
          color: 'danger',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      }
    } catch (error) {
      addToast({
        title: 'Error',
        color: 'danger',
        description: 'Something went wrong',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    }
  }
  const handleApprove = async (id: string) => {
    try {
      const res = await doctorApproveAppointment(id)
      if (res.success) {
        addToast({
          title: 'Success',
          color: 'success',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      } else {
        addToast({
          title: 'Error',
          color: 'danger',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      }
    } catch (error) {
      addToast({
        title: 'Error',
        color: 'danger',
        description: 'Something went wrong',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex gap-3  p-5 items-center shadow bg-white">
          <img src={'/earning_icon.png'} className="w-16 h-16" />
          <div>
            <p className="font-bold">${totalEarnings}</p>
            <p className="text-gray-500 text-sm">Earnings</p>
          </div>
        </div>
        <div className="flex gap-3  p-5 items-center shadow bg-white">
          <img src={'/appointments_icon.png'} className="w-16 h-16" />
          <div>
            <p className="font-bold">{doctorAppointments?.length}</p>
            <p className="text-gray-500 text-sm">Appointments</p>
          </div>
        </div>
        <div className="flex gap-3  p-5 items-center shadow bg-white">
          <img src={'/patients_icon.png'} className="w-16 h-16" />
          <div>
            <p className="font-bold">{totalPatients}</p>
            <p className="text-gray-500 text-sm">Patients</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow p-5">
        <div className="flex gap-3 items-center">
          <Image src="list_icon.png" className="w-6 h-6 rounded-none" />
          <p className="font-bold">Latest Bookings</p>
        </div>
        <Divider className="my-3" />
        {isLoadingDoctorAppointments ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {doctorAppointments?.map((i) => (
              <div key={i._id} className="flex gap-3 items-center">
                <div
                  onClick={() => navigate(`patient/${i._id}`)}
                  className="flex gap-3 items-center flex-grow cursor-pointer"
                >
                  <Avatar src={i.user.profileImage.url} />
                  <div className="flex flex-col gap-1 flex-grow">
                    <p className="font-bold">{i.user.fullName}</p>
                    <p className="text-gray-500 text-sm">
                      Booking on {formatDate(i.date)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {(i.status === 'pending' && (
                    <>
                      <Image
                        src="/cancel_icon.png"
                        className="w-10 h-10 rounded-none cursor-pointer"
                        onClick={() => handleCancel(i._id)}
                      />
                      <Image
                        src="/tick_icon.png"
                        className="w-10 h-10 rounded-none cursor-pointer"
                        onClick={() => handleApprove(i._id)}
                      />
                    </>
                  )) ||
                    (i.status === 'approved' && (
                      <div className="text-green-700">Completed</div>
                    )) || <div className="text-red-700">Cancelled</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard
