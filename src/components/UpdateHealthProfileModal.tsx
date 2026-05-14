import { useUser } from '@/store/useUser'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  addToast,
} from '@heroui/react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TUpdateHealthProfileSchema,
  updateHealthProfileSchema,
} from '@/validations/updateHealthProfileValidation'
import { chronicConditions } from '@/pages/PaitentCompleteProfile'

export default function UpdateHealthProfileModal() {
  const { user, updateHealthProfile, isUpdatingHealthProfile } = useUser()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TUpdateHealthProfileSchema>({
    resolver: zodResolver(updateHealthProfileSchema),
    defaultValues: {
      chronicConditions: user?.healthProfile?.chronicConditions ?? [],
      allergies: user?.healthProfile?.allergies ?? '',
      pastSurgeries: user?.healthProfile?.pastSurgeries ?? '',
      lifeStyle: user?.healthProfile?.lifeStyle ?? '',
      familyHistory: user?.healthProfile?.familyHistory ?? '',
    },
  })

  const onSubmit: SubmitHandler<TUpdateHealthProfileSchema> = async (data) => {
    try {
      const res = await updateHealthProfile(data, user?.healthProfile?._id!)
      addToast({
        title: res.success ? 'Success' : 'Error',
        color: res.success ? 'success' : 'danger',
        description: res.message,
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
      if (res.success) {
        onClose()
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

  return (
    <>
      <Button onPress={onOpen} color="primary" className="text-white w-fit">
        Edit Health Profile
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
              }}
            >
              <div className="w-full">
                <ModalHeader className="flex flex-col gap-1">
                  Update Health Profile
                </ModalHeader>
                <ModalBody>
                  <Controller
                    name="chronicConditions"
                    control={control}
                    render={({ field }) => {
                      const selected = field.value ?? []
                      const isNoneSelected = selected.includes('none')
                      return (
                        <div onClick={(e) => e.stopPropagation()}>
                          <Select
                            label="Chronic Conditions"
                            labelPlacement="outside"
                            placeholder="Select your chronic conditions"
                            selectionMode="multiple"
                            selectedKeys={selected}
                            onSelectionChange={(keys) => {
                              const values = Array.from(keys) as string[]
                              if (values.includes('none')) {
                                field.onChange(['none'])
                              } else {
                                field.onChange(values)
                              }
                            }}
                            isInvalid={!!errors.chronicConditions}
                            errorMessage={
                              errors.chronicConditions?.root?.message
                            }
                          >
                            {chronicConditions.map((condition) => (
                              <SelectItem
                                key={condition.value}
                                isDisabled={
                                  isNoneSelected && condition.value !== 'none'
                                }
                              >
                                {condition.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )
                    }}
                  />

                  <Input
                    label="Allergies"
                    labelPlacement="outside"
                    placeholder="Enter your allergies"
                    {...register('allergies')}
                    isInvalid={!!errors.allergies}
                    errorMessage={errors.allergies?.message}
                  />
                  <Input
                    label="Past Surgeries"
                    labelPlacement="outside"
                    placeholder="Enter your past surgeries"
                    {...register('pastSurgeries')}
                    isInvalid={!!errors.pastSurgeries}
                    errorMessage={errors.pastSurgeries?.message}
                  />
                  <Input
                    label="Life Style"
                    labelPlacement="outside"
                    placeholder="Enter your life style"
                    {...register('lifeStyle')}
                    isInvalid={!!errors.lifeStyle}
                    errorMessage={errors.lifeStyle?.message}
                  />
                  <Input
                    label="Family History"
                    labelPlacement="outside"
                    placeholder="Enter your family history"
                    {...register('familyHistory')}
                    isInvalid={!!errors.familyHistory}
                    errorMessage={errors.familyHistory?.message}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    className="text-white"
                    type="submit"
                    isLoading={isUpdatingHealthProfile}
                    isDisabled={isUpdatingHealthProfile}
                  >
                    Update
                  </Button>
                </ModalFooter>
              </div>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
