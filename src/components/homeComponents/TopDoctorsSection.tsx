import { Button } from '@heroui/button'
import DoctorCard from './DoctorCard'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '@/store/useAdmin'

const TopDoctorsSection = () => {
  const navigate = useNavigate()
  const { doctors } = useAdmin()
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-3xl font-semibold">Top Doctors to Book</p>
        <p className="text-[#4B5563] text-center">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        {doctors?.slice(0, 5).map((i) => (
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
      <Button
        className="w-[9rem] my-10 rounded-full"
        onPress={() => navigate('/all-doctors')}
      >
        more
      </Button>
    </div>
  )
}

export default TopDoctorsSection
