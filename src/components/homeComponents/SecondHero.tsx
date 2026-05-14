import { Button } from '@heroui/react'

const SecondHero = () => {
  return (
    <div className="relative w-full h-[400px] flex items-end justify-between">
      <img
        src="/heroBg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
      />
      <div className="relative z-10  text-white w-full lg:w-1/2 h-full flex items-center justify-center px-2 lg:pl-20">
        <div className="flex flex-col gap-5 justify-center">
          <h1 className="text-4xl font-extrabold ">
            Book Appointment With 100+ Trusted Doctors
          </h1>
          <Button className="w-fit bg-white rounded-full">
            Create account
          </Button>
        </div>
      </div>
      <div className="relative z-10 w-1/2 h-full hidden lg:flex items-end justify-center">
        <img
          src="/queenDoctor.png"
          alt="Hero Image"
          className="w-full h-[500px]"
        />
      </div>
    </div>
  )
}

export default SecondHero
