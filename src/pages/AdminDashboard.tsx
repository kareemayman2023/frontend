import { useAdmin } from '@/store/useAdmin'
import { useAppointment } from '@/store/useAppointment'
import formatDate from '@/utils/formatDate'
import { TUpdateUserSchema } from '@/validations/updateUserValidation'
import { Avatar, Divider, Image } from '@heroui/react'
import { useEffect, useState } from 'react'

const AdminDashboard = () => {
  const { doctors, getAllPatients } = useAdmin()
  const { allAppointments } = useAppointment()
  const [patients, setPatients] = useState<TUpdateUserSchema[] | null>(null)
  useEffect(() => {
    const getPatients = async () => {
      const res = await getAllPatients()
      setPatients(res.data)
    }
    getPatients()
  }, [])
  return (
    <div className="flex flex-col gap-10 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex gap-3  p-5 items-center shadow bg-white">
          <Image src="doctor_icon.png" className="w-16 h-16" />
          <div>
            <p className="font-bold">{doctors?.length}</p>
            <p className="text-gray-500 text-sm">Doctors</p>
          </div>
        </div>
        <div className="flex gap-3  p-5 items-center shadow bg-white">
          <Image src="appointments_icon.png" className="w-16 h-16" />
          <div>
            <p className="font-bold">{allAppointments?.length}</p>
            <p className="text-gray-500 text-sm">Appointments</p>
          </div>
        </div>
        <div className="flex gap-3  p-5 items-center shadow bg-white">
          <Image src="patients_icon.png" className="w-16 h-16" />
          <div>
            <p className="font-bold">{patients?.length}</p>
            <p className="text-gray-500 text-sm">Patients</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow p-5">
        <div className="flex gap-3 items-center">
          <Image src="list_icon.png" className="w-6 h-6 rounded-none" />
          <p className="font-bold">Latest Appointments</p>
        </div>
        <Divider className="my-3" />
        <div className="flex flex-col gap-5">
          {allAppointments?.map((i) => (
            <div key={i._id} className="flex gap-3 items-center">
              <Avatar src={i.doctor.image.url} size={'lg'} />
              <div className="flex flex-col gap-1 flex-grow">
                <p className="font-bold">{i.doctor.name}</p>
                <p className="text-gray-500 text-sm">
                  Booking on {formatDate(i.date)}
                </p>
              </div>
              <p
                className={`px-3 py-1 rounded-full ${i.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : i.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
              >
                {i.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
