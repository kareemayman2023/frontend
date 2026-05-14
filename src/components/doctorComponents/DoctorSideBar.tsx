import { DoctorMenuItems } from '@/dummyData/dummy'
import { Link, useLocation } from 'react-router-dom'

const DoctorSideBar = () => {
  const location = useLocation()
  return (
    <div className="hidden md:flex min-w-[200px] w-[300px] flex-col gap-5 border-r py-5 bg-white border-gray-300 ">
      {DoctorMenuItems.map((item) => (
        <Link
          key={item.item}
          to={item.href}
          className={`${
            location.pathname === item.href
              ? 'bg-[#F8F9FD] border-r-5  border-primary '
              : 'bg-white text-default-500'
          } py-2 px-4 rounded-md flex gap-2 items-center`}
        >
          <img src={`/${item.icon}`} className="w-5" alt={item.item} />
          {item.item}
        </Link>
      ))}
    </div>
  )
}

export default DoctorSideBar
