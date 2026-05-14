import { useAdmin } from '@/store/useAdmin'
import {
  addDoctorSchema,
  TAddDoctorSchema,
} from '@/validations/addDoctorValidation'
import {
  addToast,
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { spicialities } from '@/dummyData/dummy'

const AdminAddDoctor = () => {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    reset,
    formState: { errors },
  } = useForm<TAddDoctorSchema>({
    resolver: zodResolver(addDoctorSchema),
    defaultValues: {
      speciality: '',
      experience: '',
      image: undefined,
    },
  })

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { createDoctor, isCreatingDoctor } = useAdmin()

  const onSubmit: SubmitHandler<TAddDoctorSchema> = async (data) => {
    try {
      const res = await createDoctor(data)
      if (res.success) {
        addToast({
          title: 'Success',
          color: 'success',
          description: res.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
        reset()
        setImageUrl(null)
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

  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-lg">Add doctor</p>
      <div className="flex flex-col gap-5 bg-white shadow p-10 rounded-xl">
        <Form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="image"
            control={control}
            rules={{ required: 'Doctor image is required' }}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar
                      className="w-24 h-24 cursor-pointer"
                      src={imageUrl || ''}
                      onClick={() => fileInputRef.current?.click()}
                    />
                    {imageUrl && (
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                        onClick={() => {
                          setImageUrl(null)
                          resetField('image')
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p
                      className="text-gray-500 cursor-pointer hover:text-primary transition"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imageUrl
                        ? 'Change doctor picture'
                        : 'Upload doctor picture'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => {
                        fileInputRef.current = el
                        field.ref(el)
                      }}
                      onChange={(e) => {
                        const files = e.target.files
                        field.onChange(files)
                        if (files && files[0]) {
                          const url = URL.createObjectURL(files[0])
                          setImageUrl(url)
                        }
                      }}
                    />
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm">
                    {errors.image.message?.toString()}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex gap-5 w-full">
            <Input
              label="Doctor name"
              labelPlacement="outside"
              placeholder="Name"
              type="text"
              variant="bordered"
              radius="none"
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />

            <Controller
              name="speciality"
              control={control}
              rules={{ required: 'Please select a speciality' }}
              render={({ field }) => (
                <Select
                  label="Speciality"
                  labelPlacement="outside"
                  placeholder="Select your speciality"
                  variant="bordered"
                  radius="none"
                  selectedKeys={
                    field.value ? new Set([field.value]) : new Set([])
                  }
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] ?? ''
                    field.onChange(selected)
                  }}
                  isInvalid={!!errors.speciality}
                  errorMessage={errors.speciality?.message}
                >
                  {spicialities.map((speciality) => (
                    <SelectItem key={speciality.name}>
                      {speciality.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className="flex gap-5 w-full">
            <Input
              label="Doctor Email"
              labelPlacement="outside"
              placeholder="Your email"
              type="text"
              variant="bordered"
              radius="none"
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              label="Education"
              labelPlacement="outside"
              placeholder="Education"
              type="text"
              variant="bordered"
              radius="none"
              {...register('education')}
              isInvalid={!!errors.education}
              errorMessage={errors.education?.message}
            />
          </div>

          <div className="flex gap-5 w-full">
            <Input
              label="Doctor Password"
              labelPlacement="outside"
              placeholder="Password"
              type="password"
              variant="bordered"
              className="w-1/2"
              radius="none"
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <div className="flex flex-col gap-2 w-1/2">
              <Input
                label="Address"
                labelPlacement="outside"
                placeholder="Address 1"
                type="text"
                variant="bordered"
                radius="none"
                {...register('addressOne')}
                isInvalid={!!errors.addressOne}
                errorMessage={errors.addressOne?.message}
              />
              <Input
                labelPlacement="outside"
                placeholder="Address 2"
                type="text"
                variant="bordered"
                radius="none"
                {...register('addressTwo')}
                isInvalid={!!errors.addressTwo}
                errorMessage={errors.addressTwo?.message}
              />
            </div>
          </div>

          <Controller
            name="experience"
            control={control}
            rules={{ required: 'Please select your experience' }}
            render={({ field }) => (
              <Select
                label="Experience"
                labelPlacement="outside"
                placeholder="Select your experience"
                variant="bordered"
                radius="none"
                selectedKeys={
                  field.value ? new Set([field.value]) : new Set([])
                }
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] ?? ''
                  field.onChange(selected)
                }}
                isInvalid={!!errors.experience}
                errorMessage={errors.experience?.message}
              >
                <SelectItem key="1">1 year</SelectItem>
                <SelectItem key="2">2 years</SelectItem>
                <SelectItem key="3">3 years</SelectItem>
                <SelectItem key="4">4 years</SelectItem>
                <SelectItem key="5">5 years</SelectItem>
                <SelectItem key="6">6 years</SelectItem>
                <SelectItem key="7">7 years</SelectItem>
                <SelectItem key="8">8 years</SelectItem>
                <SelectItem key="9">9 years</SelectItem>
                <SelectItem key="10">10 years</SelectItem>
              </Select>
            )}
          />

          <Input
            label="Fees"
            labelPlacement="outside"
            placeholder="Your fees"
            type="text"
            variant="bordered"
            radius="none"
            {...register('fees')}
            isInvalid={!!errors.fees}
            errorMessage={errors.fees?.message}
          />
          <Textarea
            label="About me"
            labelPlacement="outside"
            radius="none"
            variant="bordered"
            placeholder="Write about yourself"
            {...register('about')}
            isInvalid={!!errors.about}
            errorMessage={errors.about?.message}
          />

          <Button
            type="submit"
            radius="full"
            className="bg-primary text-white w-1/6 min-w-fit"
            isLoading={isCreatingDoctor}
            isDisabled={isCreatingDoctor}
          >
            Add doctor
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default AdminAddDoctor
