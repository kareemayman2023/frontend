import { AdminMenuItems } from '@/dummyData/dummy'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from '@heroui/react'
import { IoIosMenu } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function AdminDrawer({
  handleLogout,
}: {
  handleLogout: () => void
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<IoIosMenu />}
        isIconOnly
        className="text-white bg-primary"
      />
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Admin Menu
              </DrawerHeader>
              <DrawerBody>
                <div className="flex flex-col gap-5">
                  {AdminMenuItems.map((item) => (
                    <Link
                      key={item.item}
                      onClick={onClose}
                      to={item.href}
                      className="flex gap-2"
                    >
                      <img
                        src={`/${item.icon}`}
                        className="w-5 h-5"
                        alt={item.item}
                      />
                      {item.item}
                    </Link>
                  ))}
                  <Button color="danger" variant="solid" onPress={handleLogout}>
                    Logout
                  </Button>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
