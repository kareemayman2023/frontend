import DoctorCard from '@/components/homeComponents/DoctorCard'
import { useAdmin } from '@/store/useAdmin'
import { TAddDoctorSchema } from '@/validations/addDoctorValidation'
import { addToast, Button, Card, CardBody, Image, Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import useNext7Days from '@/utils/getNextSevenDays'
import { useAppointment } from '@/store/useAppointment'

const Doctor = () => {
  const { id } = useParams()
  const { getDoctor, doctor, getFilteredDoctors, isGettingDoctor } = useAdmin()
  const {
    createAppointment,
    doctorAppointments,
    getDoctorAppointments,
    isCreatingAppointment,
  } = useAppointment()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedHour, setSelectedHour] = useState<string | null>(null)
  const [relatedDoctors, setRelatedDoctors] = useState<
    (TAddDoctorSchema & { available: boolean; _id: string })[]
  >([])
  const navigate = useNavigate()

  const calendarDays = useNext7Days()
  useEffect(() => {
    getDoctorAppointments(id!)
  }, [])
  console.log(doctorAppointments)

  const selectedDateObj = calendarDays.find((day) => day.date === selectedDay)
  useEffect(() => {
    if (id) {
      getDoctor(id)
    }
  }, [id, getDoctor])

  useEffect(() => {
    if (doctor?.speciality) {
      getRelatedDoctors()
    }
  }, [doctor])

  const getRelatedDoctors = async () => {
    if (doctor?.speciality) {
      const res = await getFilteredDoctors(doctor.speciality)
      setRelatedDoctors(res.data || [])
    }
  }

  const handleDaySelect = (date: number) => {
    setSelectedDay(date)
    setSelectedHour(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedHour(time)
  }

  const handleBookAppointment = async () => {
    if (!selectedDay || !selectedHour) {
      alert('Please select both a day and time slot')
      return
    }

    const selectedDate = calendarDays.find((day) => day.date === selectedDay)
    try {
      const res = await createAppointment({
        doctorId: id,
        date: selectedDate?.fullDate,
        time: selectedHour,
        day: selectedDate?.dayName,
      })

      if (res.success) {
        addToast({
          title: 'Success',
          color: 'success',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
        setSelectedDay(null)
        setSelectedHour(null)
        navigate('/my-appointments')
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

  const formatTimeDisplay = (time: string) => {
    const [hours] = time.split(':')
    const hourNum = parseInt(hours)
    return hourNum >= 12 ? `${time} pm` : `${time} am`
  }

  const timeSlots = [
    { time: '09:00' },
    { time: '09:30' },
    { time: '10:00' },
    { time: '10:30' },
    { time: '11:00' },
    { time: '11:30' },
    { time: '12:00' },
  ].filter((slot) => {
    const selectedDateString = selectedDateObj?.fullDate

    return !doctorAppointments?.some((appointment) => {
      return (
        appointment.doctor._id === id &&
        appointment.time === slot.time &&
        appointment.date === selectedDateString
      )
    })
  })

  return (
    <div className="flex flex-col gap-20">
      {isGettingDoctor ? (
        <Spinner variant="wave" />
      ) : (
        <div className="md:grid grid-cols-1 flex flex-col  gap-5 md:grid-cols-6 ">
          <div className="md:col-span-1 flex justify-center  w-full">
            <Image
              alt="Doctor"
              className="w-full md:h-[250px] object-cover rounded-xl bg-primary"
              src={doctor?.image?.url}
            />
          </div>

          <div className="col-span-5 flex flex-col gap-10">
            <Card className="min-h-[250px]">
              <CardBody>
                <div className="p-5 flex flex-col gap-3">
                  <div>
                    <div className="flex gap-2 items-center">
                      <p className="font-bold text-2xl">{doctor?.name}</p>
                      <Image src="/verficationMark.png" className="h-4 w-4" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-default-500 text-sm">
                        {doctor?.speciality}
                      </p>
                      <Button
                        variant="bordered"
                        size="sm"
                        className="rounded-full cursor-alias"
                        disabled={true}
                      >
                        {doctor?.experience} Years
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm">About</p>
                    <p className="text-sm text-default-500">{doctor?.about}</p>
                  </div>

                  <p>
                    Appointment fee:{' '}
                    <span className="font-bold">${doctor?.fees}</span>
                  </p>
                </div>
              </CardBody>
            </Card>

            <div className="flex flex-col gap-5">
              <p className="font-bold text-default-500">Booking slots</p>

              <div className="flex gap-3 flex-wrap">
                {calendarDays.map((day) => (
                  <div
                    key={`${day.day}-${day.date}`}
                    className={`flex w-16 h-16 p-2 items-center justify-center gap-1 border border-default-500 flex-col rounded-full cursor-pointer transition-colors ${
                      selectedDay === day.date
                        ? 'bg-primary text-white border-primary'
                        : 'hover:bg-primary hover:text-white hover:border-primary'
                    }`}
                    onClick={() => handleDaySelect(day.date)}
                  >
                    <p className="text-xs font-semibold">{day.day}</p>
                    <p className="text-sm">{day.date}</p>
                  </div>
                ))}
              </div>

              {selectedDay && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-default-600">
                    Select a time slot for{' '}
                    {calendarDays.find((d) => d.date === selectedDay)?.day},{' '}
                    {selectedDay}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.time}
                        onClick={() => handleTimeSelect(slot.time)}
                        className={`border px-4 py-2 rounded-full cursor-pointer transition-colors ${
                          selectedHour === slot.time
                            ? 'bg-primary text-white border-primary'
                            : 'border-default-500 hover:bg-primary hover:text-white hover:border-primary'
                        }`}
                      >
                        <p className="text-sm">
                          {formatTimeDisplay(slot.time)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              className="w-fit text-white rounded-full px-20 py-6"
              color="primary"
              onPress={handleBookAppointment}
              isDisabled={
                !selectedDay || !selectedHour || isCreatingAppointment
              }
              isLoading={isCreatingAppointment}
            >
              Book an appointment
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-3 mb-20">
        <p className="text-3xl font-semibold">Related doctors</p>
        <p className="text-[#4B5563] text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          {relatedDoctors
            .slice(0, 5)
            ?.filter((i) => i._id !== id)
            .map((doctor) => (
              <motion.div
                key={doctor._id}
                whileHover={{ y: -10, cursor: 'pointer' }}
                onClick={() => navigate(`/doctor/${doctor._id}`)}
              >
                <DoctorCard
                  image={doctor.image?.url}
                  name={doctor.name}
                  speciality={doctor.speciality}
                  available={doctor.available}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Doctor
