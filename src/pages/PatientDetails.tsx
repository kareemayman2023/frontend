import { useAppointment } from '@/store/useAppointment'
import { Card, CardBody, Spinner } from '@heroui/react'
import { useEffect } from 'react'
import { BiSolidError } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'

const PatientDetails = () => {
  const { id } = useParams()
  const { getAppointment, appointment, isGettingAppointment } = useAppointment()
  useEffect(() => {
    if (id) {
      getData(id)
    }
  }, [])
  const getData = async (id: string) => {
    try {
      await getAppointment(id)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(appointment)
  return (
    <>
      {isGettingAppointment ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="primary" variant="gradient" />
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <h1 className="text-2xl font-bold">
              {appointment?.user.fullName}'s{' '}
              <span className="text-blue-600 text-xl">Medical History</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card>
                <CardBody>
                  <div className="flex flex-col gap-3">
                    <p className="font-bold ">Chronic Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {appointment?.user.healthProfile.chronicConditions.map(
                        (condition) => (
                          <p
                            className="rounded-full bg-blue-100 w-fit px-3 py-1 text-sm text-blue-700"
                            key={condition}
                          >
                            {condition}
                          </p>
                        )
                      )}
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
                      {appointment?.user.healthProfile.allergies}
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
                      {appointment?.user.healthProfile.lifeStyle}
                    </p>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="flex flex-col gap-3">
                    <p className="font-bold ">Past Surgeries</p>
                    <p className="text-sm rounded-full bg-gray-100 w-fit px-3 py-1">
                      {appointment?.user.healthProfile.pastSurgeries}
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
                    {appointment?.user.healthProfile.familyHistory}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
          {appointment?.preVisitInfo && (
            <div className="flex flex-col gap-10">
              <h1 className="text-2xl font-bold">
                <span className="text-blue-600 text-xl">
                  Pre-visit information
                </span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card>
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      <p className="font-bold ">Reasons</p>
                      <p className="rounded-full bg-blue-100 w-fit px-3 py-1 text-sm text-blue-700">
                        {appointment?.preVisitInfo.reasons}
                      </p>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      <p className="font-bold ">How Long</p>
                      <p className="text-sm flex items-center gap-1 rounded-full text-red-700 bg-red-100 w-fit px-3 py-1">
                        <BiSolidError />
                        {appointment?.preVisitInfo.howLong}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card>
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      <p className="font-bold ">Current Medications</p>
                      <p className="text-sm rounded-full bg-gray-100 w-fit px-3 py-1">
                        {appointment?.preVisitInfo.currentMedications}
                      </p>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      <p className="font-bold ">Tests</p>
                      {appointment?.preVisitInfo.tests.public_id ? (
                        <Link
                          to={appointment?.preVisitInfo.tests.url}
                          target="_blank"
                          className="text-sm rounded-full bg-green-200 w-fit px-3 py-1"
                        >
                          ⬇️ View Tests
                        </Link>
                      ) : (
                        <p className="text-sm rounded-full bg-gray-100 w-fit px-3 py-1">
                          No Tests Uploaded
                        </p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default PatientDetails
