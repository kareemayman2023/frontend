import { useAppointment } from '@/store/useAppointment'
import formatDate from '@/utils/formatDate'
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'

const AdminAppointments = () => {
  const { allAppointments } = useAppointment()
  console.log(allAppointments)
  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold">All Appointments</p>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Paitent</TableColumn>
          <TableColumn>Department</TableColumn>
          <TableColumn>Date&Time</TableColumn>
          <TableColumn>Doctor</TableColumn>
          <TableColumn>Fees</TableColumn>
        </TableHeader>
        <TableBody>
          {(allAppointments ?? []).map((appointment, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Avatar size="sm" src={appointment.user.profileImage.url} />
                {appointment.user.fullName}
              </TableCell>
              <TableCell>{appointment.doctor.speciality}</TableCell>
              <TableCell>
                {formatDate(appointment.date)} {appointment.time}
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Avatar size="sm" src={appointment.doctor.image.url} />
                {appointment.doctor.name}
              </TableCell>
              <TableCell>${appointment.doctor.fees}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminAppointments
