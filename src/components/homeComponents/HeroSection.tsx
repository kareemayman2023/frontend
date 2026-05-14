import { Button } from '@heroui/button'
import { Image } from '@heroui/react'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div className="relative w-full h-[600px] flex items-end justify-between">
      <img
        src="/heroBg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
      />
      <div className="relative z-10  text-white w-full lg:w-2/5 h-full flex items-center justify-center px-2 lg:pl-20">
        <div className="flex flex-col gap-5 justify-center">
          <h1 className="text-4xl font-extrabold ">
            Book Appointment With Trusted Doctors
          </h1>
          <div className="flex gap-3 items-center">
            <Image src="/group_profiles.png" className="w-[9rem]" />
            <p className="text-sm">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>
          </div>
          <Button
            className="w-fit bg-white rounded-full"
            endContent={<FaArrowRight />}
            onPress={() => navigate('/all-doctors')}
          >
            Book appointment
          </Button>
        </div>
      </div>
      <div className="relative z-10 w-3/5 h-full hidden lg:flex items-end justify-center">
        <img
          src="/heroImage.png"
          alt="Hero Image"
          className="w-full h-[500px]"
        />
      </div>
    </div>
  )
}

export default HeroSection
