import { spicialities } from '@/dummyData/dummy'
import SpecialityItem from './SpecialityItem'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const SpecialitySection = () => {
  const naviagation = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-3xl font-semibold">Find by Speciality</p>
        <p className="max-w-[573px] text-center text-[#4B5563]">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mt-10">
          {spicialities.map((i) => (
            <motion.div
              key={i.key}
              onClick={() => naviagation(`/all-doctors?speciality=${i.name}`)}
              whileHover={{
                y: -10,
                cursor: 'pointer',
              }}
            >
              <SpecialityItem spciality={i.name} image={i.image} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpecialitySection
