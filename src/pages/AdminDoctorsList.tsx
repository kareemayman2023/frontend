import DoctorCard from '@/components/homeComponents/DoctorCard'
import { useAdmin } from '@/store/useAdmin'

const AdminDoctorsList = () => {
  const { doctors } = useAdmin()
  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-xl">All Doctors</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {doctors?.map((i) => (
          <DoctorCard
            key={i._id}
            name={i.name}
            image={i.image.url}
            speciality={i.speciality}
            available={i.available}
          />
        ))}
      </div>
    </div>
  )
}

export default AdminDoctorsList
