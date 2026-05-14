import { useUser } from '@/store/useUser'
import {
  TUpdateUserSchema,
  updateUserShema,
} from '@/validations/updateUserValidation'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
  Badge,
  addToast,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaCamera } from 'react-icons/fa6'

interface OriginalValues {
  fullName: string
  email: string
  phone: string
  profileImageUrl: string | null
  profileImageFile: File | null
}

export default function MyProfileEditModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { user, updateProfile, isUpdatingProfile } = useUser()
  const profileImageRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(
    user?.profileImage.url || null
  )
  const [hasChanges, setHasChanges] = useState(false)
  const [originalValues, setOriginalValues] = useState<OriginalValues>({
    fullName: '',
    email: '',
    phone: '',
    profileImageUrl: null,
    profileImageFile: null,
  })

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TUpdateUserSchema>({
    resolver: zodResolver(updateUserShema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.healthProfile.phone || '',
      profileImage: undefined,
    },
  })

  const formValues = watch()
  const profileImage = watch('profileImage')

  useEffect(() => {
    if (user) {
      setOriginalValues({
        fullName: user.fullName,
        email: user.email,
        phone: user.healthProfile.phone || '',
        profileImageUrl: user.profileImage.url || null,
        profileImageFile: null,
      })
    }
  }, [user])

  useEffect(() => {
    const currentFullName = formValues.fullName || ''
    const currentEmail = formValues.email || ''
    const currentPhone = formValues.phone || ''

    const hasImageChanged =
      profileImage &&
      profileImage instanceof FileList &&
      profileImage[0] instanceof File

    const hasFormChanged =
      currentFullName !== originalValues.fullName ||
      currentEmail !== originalValues.email ||
      currentPhone !== originalValues.phone ||
      hasImageChanged

    setHasChanges(hasFormChanged)
  }, [formValues, originalValues, profileImage])

  useEffect(() => {
    if (user?.profileImage.url) {
      setPreview(user.profileImage.url)
    }
  }, [user])

  useEffect(() => {
    if (profileImage && profileImage instanceof FileList && profileImage[0]) {
      const file = profileImage[0]
      setPreview(URL.createObjectURL(file))
    }
  }, [profileImage])

  const handleImageClick = () => {
    profileImageRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      const fileList = dataTransfer.files

      setValue('profileImage', fileList as any)
    }
  }

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const onSubmit = async (data: TUpdateUserSchema) => {
    if (!hasChanges) {
      addToast({
        title: 'No Changes',
        color: 'warning',
        description: 'No changes detected to update.',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
      return
    }

    console.log('Form data:', data)
    const formData = new FormData()
    formData.append('fullName', data.fullName as string)
    formData.append('email', data.email as string)
    formData.append('phone', data.phone || '')

    if (data.profileImage && data.profileImage[0]) {
      formData.append('profileImage', data.profileImage[0])
    }

    try {
      const res = await updateProfile(formData)
      if (res.success) {
        const newOriginalValues: OriginalValues = {
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          profileImageUrl: preview || null,
          profileImageFile: data.profileImage?.[0] || null,
        }

        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview)
        }

        setOriginalValues(newOriginalValues)

        reset({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          profileImage: undefined,
        })

        if (profileImageRef.current) {
          profileImageRef.current.value = ''
        }

        setHasChanges(false)
        addToast({
          title: 'Success',
          color: 'success',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      } else {
        addToast({
          title: 'Error',
          color: 'danger',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      }
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

  const handleClose = useCallback(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        email: user.email,
        phone: user.healthProfile.phone,
        profileImage: undefined,
      })
      setPreview(user.profileImage.url || null)

      setOriginalValues({
        fullName: user.fullName,
        email: user.email,
        phone: user.healthProfile.phone || '',
        profileImageUrl: user.profileImage.url || null,
        profileImageFile: null,
      })

      if (profileImageRef.current) {
        profileImageRef.current.value = ''
      }
    }

    setHasChanges(false)
    onClose()
  }, [user, reset, onClose])

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        email: user.email,
        phone: user.healthProfile.phone,
        profileImage: undefined,
      })
      setPreview(user.profileImage.url || null)

      setOriginalValues({
        fullName: user.fullName,
        email: user.email,
        phone: user.healthProfile.phone || '',
        profileImageUrl: user.profileImage.url || null,
        profileImageFile: null,
      })

      setHasChanges(false)
    }
  }, [user, reset])

  return (
    <>
      <Button onPress={onOpen} className="w-fit text-white" color="primary">
        Edit Profile
      </Button>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleClose()
          }
          onOpenChange()
        }}
      >
        <ModalContent>
          {() => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>

              <ModalBody>
                <div className="flex justify-center">
                  <Badge
                    color="primary"
                    content={<FaCamera size={10} />}
                    className="text-white cursor-pointer w-6 h-6"
                    placement="bottom-right"
                  >
                    <Avatar
                      src={preview || undefined}
                      size="lg"
                      className="cursor-pointer"
                      onClick={handleImageClick}
                    />
                  </Badge>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register('profileImage')}
                    ref={(e) => {
                      register('profileImage').ref(e)
                      profileImageRef.current = e
                    }}
                    onChange={handleImageChange}
                  />
                </div>

                <Input
                  defaultValue={user?.fullName}
                  label="Full Name"
                  {...register('fullName')}
                  errorMessage={errors.fullName?.message}
                  isInvalid={!!errors.fullName?.message}
                />

                <Input
                  defaultValue={user?.email}
                  label="Email"
                  {...register('email')}
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email?.message}
                />

                <Input
                  defaultValue={user?.healthProfile.phone}
                  label="Phone"
                  {...register('phone')}
                  errorMessage={errors.phone?.message}
                  isInvalid={!!errors.phone?.message}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="text-white"
                  type="submit"
                  isLoading={isUpdatingProfile}
                  disabled={isUpdatingProfile || !hasChanges}
                >
                  Update
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
