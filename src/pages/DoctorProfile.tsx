import { useUser } from '@/store/useUser'
import { addToast, Button, Checkbox, Image } from '@heroui/react'
import { useState } from 'react'

const DoctorProfile = () => {
  const [edit, setEdit] = useState(true)

  const { user, updateDoctor, isUpdatingDoctorProfile } = useUser()
  const [fees, setFees] = useState(user?.fees)
  const [about, setAbout] = useState(user?.about)
  const [addressOne, setAddressOne] = useState(user?.addressOne)
  const [addressTwo, setAddressTwo] = useState(user?.addressTwo)
  const [available, setAvailable] = useState(user?.available)
  const handleUpdateDoctorProfile = async () => {
    if (edit) {
      setEdit(false)
      return
    }
    try {
      const res = await updateDoctor({
        fees,
        about,
        addressOne,
        addressTwo,
        available,
      })
      if (res.success) {
        setEdit(true)
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
      <div>
        <Image src={user?.image.url} className="w-64 h-64 bg-primary" />
      </div>
      <div className="flex flex-col gap-3 bg-white p-5">
        <p className="font-bold text-3xl">{user?.name}</p>
        <p>
          {user?.speciality}
          <span className="border text-sm shadow rounded-full p-1">
            {user?.experience} Years
          </span>
        </p>
        <textarea
          disabled={edit}
          onChange={(e) => setAbout(e.target.value)}
          defaultValue={user?.about
            .split('\n')
            .join('\n')
            .replace(/<br>/g, '\n')}
        />
        <div className="flex gap-3 items-center w-full">
          <p>Appointments fee: $</p>
          <input
            type="number"
            defaultValue={user?.fees}
            onChange={(e) => setFees(e.target.value)}
            disabled={edit}
            className="w-fit"
          />
        </div>
        <div className="flex  gap-3">
          <p>Address:</p>
          <div className="flex flex-col gap-1">
            <input
              disabled={edit}
              defaultValue={user?.addressOne}
              onChange={(e) => setAddressOne(e.target.value)}
              className="w-fit"
            />
            <input
              disabled={edit}
              defaultValue={user?.addressTwo}
              onChange={(e) => setAddressTwo(e.target.value)}
              className="w-fit"
            />
          </div>
        </div>
        <Checkbox
          isSelected={available}
          className="text-white"
          isDisabled={edit}
          onChange={(e) => setAvailable(e.target.checked)}
        >
          Available
        </Checkbox>
        <Button
          className={`w-fit ${edit ? 'bg-primary text-white' : 'bg-white'}`}
          variant="bordered"
          onPress={handleUpdateDoctorProfile}
          isLoading={isUpdatingDoctorProfile}
          isDisabled={isUpdatingDoctorProfile}
        >
          {edit ? 'Edit' : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default DoctorProfile
