import { Button, Image } from '@heroui/react'

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 ">
      <h1 className="text-xl">
        CONTACT <span className="font-bold">US</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-5 justify-center">
        <div className="flex items-center justify-center max-w-[560px]">
          <Image src="/contact_image.png" />
        </div>
        <div className="flex flex-col text-[#4B5563]  justify-center gap-10">
          <p className="text-xl font-bold">OUR OFFICE</p>
          <div>
            <p>54709 Willms Station </p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div>
            <p>Tel: (415) 555‑0132</p>
            <p>Email: osamaoso2d@gmail.com</p>
          </div>
          <p className="text-2xl font-bold">Careers at HealthHub</p>
          <p>Learn more about our teams and job openings.</p>
          <Button variant="bordered" className="w-fit">
            Explore Jobs
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Contact
