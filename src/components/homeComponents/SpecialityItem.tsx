import { Image } from '@heroui/react'

const SpecialityItem = ({
  image,
  spciality,
}: {
  image: string
  spciality: string
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Image src={image} className="w-[6rem] " />
      <p className="text-sm text-[#4B5563]">{spciality}</p>
    </div>
  )
}

export default SpecialityItem
