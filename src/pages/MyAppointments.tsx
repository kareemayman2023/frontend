import Empty from '@/components/lottie/Empty'
import { useAppointment } from '@/store/useAppointment'
import formatDate from '@/utils/formatDate'
import { addToast, Button, Divider, Image } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const {
    appointments,
    cancelAppointment,
    isCancelingAppointment,
    getAppointments,
  } = useAppointment()
  const [currentCancelId, setCurrentCancelId] = useState<string | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    getAppointments()
  }, [])
  console.log(appointments)
  const handelCancelAppointment = async (id: string) => {
    setCurrentCancelId(id)
    try {
      const res = await cancelAppointment(id)
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
    <div className="flex flex-col gap-3">
      {appointments?.length === 0 ? (
        <div className="flex justify-center">
          <Empty />
        </div>
      ) : (
        <>
          <p>My Appointments</p>
          <Divider />
          <div className="flex flex-col gap-10">
            {appointments?.map((i) => (
              <div key={i._id} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex gap-3 flex-1">
                    <Image
                      src={i.doctor.image.url}
                      className="w-22 h-full sm:w-34 sm:h-34 lg:w-40 lg:h-40 min-w-[80px] sm:min-w-[100px] flex-shrink-0 bg-[#D9D9D9] object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
                      <div>
                        <p className="font-bold text-sm sm:text-base truncate">
                          {i.doctor.name}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {i.doctor.speciality}
                        </p>
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm">
                        <p className="font-bold">Address:</p>
                        <p className="break-words">{i.doctor.addressOne}</p>
                        <p className="break-words">{i.doctor.addressTwo}</p>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        <span className="font-bold">Date & time: </span>
                        <span className="break-words">
                          {`${formatDate(i.date)} | ${i.time}`}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 sm:justify-end sm:min-w-[160px]">
                    {!i.preVisitInfo ? (
                      <Button
                        onPress={() => navigate(`/pre-visit/${i._id}`)}
                        color="warning"
                        className="text-white"
                      >
                        pre-visit information
                      </Button>
                    ) : (
                      <Button color="success" disabled className="text-white">
                        pre-visit completed
                      </Button>
                    )}
                    <Button
                      color="primary"
                      className="text-white flex-1 sm:flex-none text-sm sm:text-base"
                      onPress={() =>
                        navigate(`/payment?amount=${i.doctor.fees}`)
                      }
                    >
                      Pay here
                    </Button>
                    <Button
                      variant="ghost"
                      color="danger"
                      className="flex-1 sm:flex-none text-sm sm:text-base"
                      isLoading={
                        isCancelingAppointment && currentCancelId === i._id
                      }
                      onPress={() => handelCancelAppointment(i._id)}
                    >
                      Cancel Appointment
                    </Button>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyAppointments
