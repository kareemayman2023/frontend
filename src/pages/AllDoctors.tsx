import DoctorCard from '@/components/homeComponents/DoctorCard'
import { spicialities } from '@/dummyData/dummy'
import { useAdmin } from '@/store/useAdmin'
import { TAddDoctorSchema } from '@/validations/addDoctorValidation'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const AllDoctors = () => {
  const { getFilteredDoctors, isGettingFilteredDoctors } = useAdmin()
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState<string | null>(
    searchParams.get('speciality') || null
  )
  const [filteredDoctors, setFilteredDoctors] = useState<
    (TAddDoctorSchema & { available: boolean; _id: string })[] | null
  >(null)

  const onChangeCategory = (name: string) => {
    if (name === searchParams.get('speciality')) {
      searchParams.delete('speciality')
      setSearchParams(searchParams)
      setActive('all')
      return
    }
    setActive(name)
    searchParams.set('speciality', name)
    setSearchParams(searchParams)
  }
  useEffect(() => {
    FilteredDoctors(active || 'all')
  }, [active])

  const FilteredDoctors = async (query: string) => {
    const res = await getFilteredDoctors(query)
    setFilteredDoctors(res.data)
  }
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-10">
      <p className="text-[#4B5563] text-sm">
        Browse through the doctors specialist.
      </p>
      <div className="grid gird-cols-1 md:grid-cols-5 gap-5">
        <div className="gap-5 grid grid-cols-2 md:grid-cols-1 h-min md:col-span-1">
          {spicialities.map((spiciality) => (
            <Button
              key={spiciality.key}
              onPress={() => {
                onChangeCategory(spiciality.name)
              }}
              variant={active === spiciality.name ? 'solid' : 'bordered'}
            >
              {spiciality.name}
            </Button>
          ))}
        </div>
        {isGettingFilteredDoctors ? (
          <div className="col-span-4 flex justify-center items-center">
            <Spinner variant="wave" />
          </div>
        ) : (
          <div className="col-span-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredDoctors?.map((i) => (
              <div key={i._id} onClick={() => navigate('/doctor/' + i._id)}>
                <DoctorCard
                  name={i.name}
                  image={i.image.url}
                  speciality={i.speciality}
                  available={i.available}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllDoctors
