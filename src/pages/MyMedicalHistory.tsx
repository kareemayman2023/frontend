import UpdateHealthProfileModal from '@/components/UpdateHealthProfileModal'
import { useUser } from '@/store/useUser'
import { Card, CardBody } from '@heroui/react'
import { BiSolidError } from 'react-icons/bi'

const MyMedicalHistory = () => {
  const { user } = useUser()
  console.log(user)
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold">Your Medical History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardBody>
            <div className="flex flex-col gap-3">
              <p className="font-bold ">Chronic Conditions</p>
              <div className="flex flex-wrap gap-2">
                {user?.healthProfile.chronicConditions.map((condition) => (
                  <p
                    className="rounded-full bg-blue-100 w-fit px-3 py-1 text-sm text-blue-700"
                    key={condition}
                  >
                    {condition}
                  </p>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex flex-col gap-3">
              <p className="font-bold ">Allergies</p>
              <p className="text-sm flex items-center gap-1 rounded-full text-red-700 bg-red-100 w-fit px-3 py-1">
                <BiSolidError />
                {user?.healthProfile.allergies}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardBody>
            <div className="flex flex-col gap-3">
              <p className="font-bold ">Life Style</p>
              <p className="text-sm rounded-full bg-gray-100 w-fit px-3 py-1">
                {user?.healthProfile.lifeStyle}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex flex-col gap-3">
              <p className="font-bold ">Past Surgeries</p>
              <p className="text-sm rounded-full bg-gray-100 w-fit px-3 py-1">
                {user?.healthProfile.pastSurgeries}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardBody>
          <div className="flex flex-col gap-3">
            <p className="font-bold ">Family History</p>
            <p className="text-sm rounded-full bg-gray-100 w-fit px-3 py-1">
              {user?.healthProfile.familyHistory}
            </p>
          </div>
        </CardBody>
      </Card>
      <UpdateHealthProfileModal />
    </div>
  )
}

export default MyMedicalHistory
