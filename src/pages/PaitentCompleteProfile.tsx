import { useUser } from '@/store/useUser'
import {
  completeProfileSchema,
  TCompleteProfile,
} from '@/validations/completeProfileValidation'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { addToast, DateInput, Divider, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate } from '@internationalized/date'
import { Controller, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { useState } from 'react'

const lifeStyles = [
  { name: 'Smoking', value: 'smoking' },
  { name: 'Alcohol', value: 'alcohol' },
  { name: 'Active', value: 'active' },
  { name: 'Sedentary', value: 'sedentary' },
]

export const chronicConditions = [
  { name: 'Diabetes', value: 'diabetes' },
  { name: 'Hypertension', value: 'hypertension' },
  { name: 'Heart Disease', value: 'heart-disease' },
  { name: 'Asthma', value: 'asthma' },
  { name: 'None', value: 'none' },
]

const PaitentCompleteProfile = () => {
  const [chronicCondition, setChronicCondition] = useState<string[]>([])

  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<TCompleteProfile>({
    resolver: zodResolver(completeProfileSchema),
  })

  const selectedLifeStyle = watch('lifeStyle')

  const { completeProfile, isCompletingProfile, logout } = useUser()

  const onSubmit = async (data: TCompleteProfile) => {
    try {
      const res = await completeProfile({
        ...data,
        chronicConditions: chronicCondition,
      })
      addToast({
        title: res.success ? 'Success' : 'Error',
        color: res.success ? 'success' : 'danger',
        description: res.message,
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    } catch {
      addToast({
        title: 'Error',
        color: 'danger',
        description: 'Something went wrong',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    }
  }

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
    } catch {
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
    <div className="bg-[#F8F9FD] min-h-screen flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow rounded-xl p-6 md:p-10 flex flex-col gap-6">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 items-center text-center">
            <h1 className="text-xl md:text-2xl font-bold">My Health Profile</h1>
            <p className="text-sm text-[#4B5563]">
              Complete your information once to auto-fill during booking
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-bold text-[#4B5563]">Personal information</p>
            <Divider />

            <div>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DateInput
                    label="Birth date"
                    labelPlacement="outside"
                    placeholderValue={new CalendarDate(1995, 11, 6)}
                    onChange={(value) => field.onChange(value?.toString())}
                    isInvalid={!!errors.birthDate}
                  />
                )}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm">Birth date is required</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Gender"
                      labelPlacement="outside"
                      placeholder="e.g. Male"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(keys) => field.onChange([...keys][0])}
                      isInvalid={!!errors.gender}
                      className="w-full"
                    >
                      <SelectItem key="male">Male</SelectItem>
                      <SelectItem key="female">Female</SelectItem>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-red-500 text-sm">Gender is required</p>
                )}
              </div>

              <Input
                placeholder="e.g. 123456789"
                label="Phone number"
                type="number"
                {...register('phone')}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
                labelPlacement="outside"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <p className="font-bold text-[#4B5563]">Medical History</p>
            <Divider />

            <p className="font-bold text-[#4B5563]">Chronic Conditions</p>

            <input type="hidden" {...register('chronicConditions')} />

            <div className="flex flex-wrap text-sm gap-3">
              {chronicConditions.map((item) => (
                <p
                  key={item.value}
                  className={`border shadow rounded-full bg-[#F8F9FD] py-1 cursor-pointer px-3 transition ${
                    chronicCondition.includes(item.name) &&
                    'bg-primary text-white'
                  }`}
                  onClick={() => {
                    const updated = chronicCondition.includes(item.name)
                      ? chronicCondition.filter((i) => i !== item.name)
                      : [...chronicCondition, item.name]

                    setChronicCondition(updated)

                    setValue('chronicConditions', updated, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                >
                  {item.name}
                </p>
              ))}
            </div>

            {errors.chronicConditions && (
              <p className="text-red-500 text-sm">
                Please select at least one chronic condition
              </p>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="e.g. Penicillin, Peanuts"
                label="Allergies"
                {...register('allergies')}
                isInvalid={!!errors.allergies}
                errorMessage={errors.allergies?.message}
                labelPlacement="outside"
                className="w-full"
              />
              <Input
                placeholder="e.g. Appendectomy, Heart Surgery"
                label="Surgeries"
                {...register('pastSurgeries')}
                isInvalid={!!errors.pastSurgeries}
                errorMessage={errors.pastSurgeries?.message}
                labelPlacement="outside"
                className="w-full"
              />
            </div>

            <Input
              placeholder="e.g. Father - Heart Disease"
              label="Family History"
              {...register('familyHistory')}
              isInvalid={!!errors.familyHistory}
              errorMessage={errors.familyHistory?.message}
              labelPlacement="outside"
            />

            <p className="font-bold text-[#4B5563] mt-2">Lifestyle</p>

            <div className="flex flex-wrap text-sm gap-3">
              {lifeStyles.map((item) => (
                <p
                  key={item.value}
                  className={`border shadow rounded-full bg-[#F8F9FD] py-1 cursor-pointer px-3 transition ${
                    selectedLifeStyle === item.value && 'bg-primary text-white'
                  }`}
                  onClick={() =>
                    setValue('lifeStyle', item.value, {
                      shouldValidate: true,
                    })
                  }
                >
                  {item.name}
                </p>
              ))}
            </div>

            {errors.lifeStyle && (
              <p className="text-red-500 text-sm">Lifestyle is required</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-end mt-6">
            <Button className="w-full md:w-auto" onPress={handleLogout}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-white w-full md:w-auto"
              type="submit"
              isLoading={isCompletingProfile}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default PaitentCompleteProfile
