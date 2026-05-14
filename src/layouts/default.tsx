import NavBar from '@/components/navbar'
import { Link } from '@heroui/link'
import { Divider, Image } from '@heroui/react'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <NavBar />
      </div>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-12 min-h-screen mb-10">
        <Outlet />
      </main>
      <footer className="w-full flex pt-12 flex-col gap-10 px-6 container mx-auto max-w-7xl justify-center py-3">
        <div className="flex flex-col gap-10">
          <div className="grid cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-20 text-[#4B5563]">
            <div className="flex flex-col gap-5 col-span-2">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="logo" className="w-[3rem]" />
                <p className="text-xl font-bold text-secondary">HealthHub</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                omnis quibusdam harum magni cumque officiis numquam sed,
                voluptas sunt ipsam sint facilis nesciunt molestiae nostrum nemo
                cum obcaecati veritatis doloremque.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold">COMPANY</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="#" color="foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" color="foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" color="foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" color="foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold">GET IN TOUCH</p>
              <p>+1-212-456-7890</p>
              <p>osamaoso2d@gmail.com</p>
            </div>
          </div>
        </div>
        <Divider />
        <p className="text-center">
          Copyright © 2025 HealthHub - All Right Reserved.
        </p>
      </footer>
    </div>
  )
}
