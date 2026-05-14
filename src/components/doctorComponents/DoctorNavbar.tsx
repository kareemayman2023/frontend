import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  addToast,
} from '@heroui/react'
import DoctorDrawer from './DoctorDrawer'
import { useUser } from '@/store/useUser'

export default function DoctorNavbar() {
  const { logout } = useUser()
  const handleLogout = async () => {
    try {
      const res = await logout()
      addToast({
        title: res.success ? 'Success' : 'Error',
        color: res.success ? 'success' : 'danger',
        description: res.message,
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    } catch (error) {
      addToast({
        title: 'Error',
        color: 'danger',
        description: 'Something went wrong',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    }
  }
  return (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand className="gap-2  justify-center md:justify-start">
        <div className="md:hidden">
          <DoctorDrawer handleLogout={handleLogout} />
        </div>
        <img src={'/logo.png'} alt="logo" className="w-8 h-8" />
        <p className="font-bold font-outfit text-xl text-secondary">
          HealthHub
        </p>
        <p className="text-sm border border-secondary rounded-full px-2">
          Doctor
        </p>
      </NavbarBrand>
      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem>
          <Button
            className="text-white rounded-full px-8"
            color="primary"
            onPress={handleLogout}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
