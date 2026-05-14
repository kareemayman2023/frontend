import { Card, CardHeader, CardBody, Image } from '@heroui/react'
import { motion } from 'motion/react'

const MotionCardHeader = motion(CardHeader)
const MotionCard = motion(Card)
export default function DoctorCard({
  image,
  name,
  speciality,
  available,
}: {
  image: string
  name: string
  speciality: string
  available?: boolean
}) {
  return (
    <MotionCard
      radius="none"
      whileHover={{ y: -10, cursor: 'pointer' }}
      transition={{ duration: 0.1 }}
    >
      <MotionCardHeader
        className="flex-col items-center p-0 bg-[#EAEFFF]"
        whileHover={{ backgroundColor: '#5F6FFF' }}
        transition={{ duration: 0.5 }}
      >
        <Image
          alt="Doctor"
          className="w-full h-[250px] object-cover rounded-none "
          src={image}
        />
      </MotionCardHeader>
      <CardBody className="overflow-visible p-3">
        <p className="text-tiny text-green-600 flex items-center gap-1 mb-1">
          <span className="w-2 h-2 bg-green-600 rounded-full inline-block" />
          {available ? 'Available' : 'Unavailable'}
        </p>
        <h4 className="font-bold text-large"> {name}</h4>
        <small className="text-default-500">{speciality}</small>
      </CardBody>
    </MotionCard>
  )
}
