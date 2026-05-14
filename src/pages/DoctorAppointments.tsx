import { useAppointment } from '@/store/useAppointment'
import calculateAge from '@/utils/calculateAge'
import formatDate from '@/utils/formatDate'
import {
  addToast,
  Avatar,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'

const DoctorAppointments = () => {
  const {
    doctorAppointments,
    doctorCancelAppointment,
    doctorApproveAppointment,
  } = useAppointment()
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
    <div className="flex flex-col gap-5">
      <p className="font-bold">All Appointments</p>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Paitent</TableColumn>
          <TableColumn>Payment</TableColumn>
          <TableColumn>Age</TableColumn>
          <TableColumn>Date&Time</TableColumn>
          <TableColumn>Fees</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {(doctorAppointments ?? []).map((appointment, i) => (
            <TableRow key={i}>
              <TableCell>{i}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Avatar size="sm" src={appointment.user.profileImage.url} />
                {appointment.user.fullName}
              </TableCell>
              <TableCell>
                <div className="border px-3 py-1 rounded-full w-fit ">
                  {appointment.paymentMethod.toUpperCase()}
                </div>
              </TableCell>
              <TableCell>
                {calculateAge(appointment.user.healthProfile.birthDate)}
              </TableCell>
              <TableCell>
                {formatDate(appointment.date)} {appointment.time}
              </TableCell>
              <TableCell>${appointment.doctor.fees}</TableCell>
              <TableCell>
                {(appointment.status === 'pending' && (
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/cancel_icon.png"
                      className="w-10 h-10 rounded-none cursor-pointer"
                      onClick={() => handleCancel(appointment._id)}
                    />
                    <Image
                      src="/tick_icon.png"
                      className="w-10 h-10 rounded-none cursor-pointer"
                      onClick={() => handleApprove(appointment._id)}
                    />
                  </div>
                )) ||
                  (appointment.status === 'approved' && (
                    <div className="text-green-700">Completed</div>
                  )) || <div className="text-red-700">Cancelled</div>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DoctorAppointments
