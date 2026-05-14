import { Divider, Image } from '@heroui/react'

const About = () => {
  return (
    <div className="flex flex-col gap-10 ">
      <h1 className="text-xl text-center">
        ABOUT <span className="font-bold">US</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-1">
          <Image src="/about_image.png" />
        </div>
        <div className="col-span-2 flex flex-col text-[#4B5563] text-sm  justify-center gap-10">
          <p>
            Welcome to HelthHub, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At HelthHub, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            HelthHub is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className="font-bold">Our Vision</p>
          <p>
            Our Vision Our vision at Prescripto is to create a seamless
            healthcare experience for every user. We aim to bridge the gap
            between patients and healthcare providers, making it easier for you
            to access the care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <p>
          WHY <span className="font-bold">CHOOSE US</span>
        </p>
        <div>
          <Divider orientation="vertical" />
          <div>
            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col gap-5 p-10">
                <p className="font-bold">Efficiency:</p>
                <p className="text-sm text-[#4B5563]">
                  Streamlined appointment scheduling that fits into your busy
                  lifestyle.
                </p>
              </div>
              <div className="flex flex-col gap-5 p-10">
                <p className="font-bold">Convenience:</p>
                <p className="text-sm text-[#4B5563]">
                  Access to a network of trusted healthcare professionals in
                  your area.
                </p>
              </div>
              <div className="flex flex-col gap-5 p-10">
                <p className="font-bold">Personalization:</p>
                <p className="text-sm text-[#4B5563]">
                  Tailored recommendations and reminders to help you stay on top
                  of your health.
                </p>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
