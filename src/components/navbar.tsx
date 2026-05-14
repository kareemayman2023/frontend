import { useUser } from '@/store/useUser'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  addToast,
} from '@heroui/react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

const menuItems = [
  { item: 'HOME', href: '/' },
  { item: 'ALL DOCTORS', href: '/all-doctors' },
  { item: 'ABOUT', href: '/about' },
  { item: 'CONTACT', href: '/contact' },
]

export default function NavBar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useUser()
  const navigate = useNavigate()
  const handleLogout = async () => {
    setIsMenuOpen(false)
    navigate('/')
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
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarBrand className="gap-2  justify-end md:justify-start">
        <img src={'/logo.png'} alt="logo" className="w-8 h-8" />
        <p className="font-bold font-outfit text-xl text-secondary">
          HealthHub
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map(({ item, href }) => (
          <NavbarItem key={item} isActive={location.pathname === href}>
            <Link color="foreground" to={href} as={RouterLink}>
              {item}
            </Link>
          </NavbarItem>
        ))}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                as={RouterLink}
                className="w-full"
                color="foreground"
                to={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.item}
              </Link>
            </NavbarMenuItem>
          ))}
          {isAuthenticated ? (
            <>
              <NavbarMenuItem key={`profile`}>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={'/my-profile'}
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PROFILE
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem key={`medical-history`}>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={'/my-medical-history'}
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  MEDICAL HISTORY
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem key={`appointments`}>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={'/my-appointments'}
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  APPOINTMENTS
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem key={`logout`}>
                <Button color="danger" onPress={handleLogout}>
                  Logout
                </Button>
              </NavbarMenuItem>
            </>
          ) : (
            <NavbarMenuItem key={`register`}>
              <Link
                as={RouterLink}
                className="w-full"
                color="foreground"
                to={'/register'}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                CREATE ACCOUNT
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </NavbarContent>
      <NavbarContent justify="end" className="hidden sm:flex">
        {!isAuthenticated ? (
          <Button
            as={RouterLink}
            to="/register"
            color="primary"
            className="text-white rounded-full"
          >
            Create Account
          </Button>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user?.profileImage.url}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                onPress={() => navigate('/my-profile')}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                key="medical-history"
                onPress={() => navigate('/my-medical-history')}
              >
                Medical History
              </DropdownItem>
              <DropdownItem
                key="appointments"
                onPress={() => navigate('/my-appointments')}
              >
                Appointments
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  )
}
