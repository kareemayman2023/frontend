import { useAppointment } from '@/store/useAppointment'
import {
  completePrevisitInfoSchema,
  TCompletePrevisitInfoSchema,
} from '@/validations/completePrevisitInfoValidation'
import { Input, Textarea } from '@heroui/input'
import { addToast, Button, Checkbox } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Form, useNavigate, useParams } from 'react-router-dom'

const PreVisitPage = () => {
  const { completePreVistInfo, isCompletingPreVisitInfo } = useAppointment()
  const [accepted, setAccepted] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCompletePrevisitInfoSchema>({
    resolver: zodResolver(completePrevisitInfoSchema),
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<TCompletePrevisitInfoSchema> = async (data) => {
    const formdata = new FormData()
    if (data.reasons) formdata.append('reasons', data.reasons)
    if (data.howLong) formdata.append('howLong', data.howLong)
    if (data.currentMedications)
      formdata.append('currentMedications', data.currentMedications)

    if (data.tests) {
      formdata.append('tests', data.tests)
    }
    try {
      const res = await completePreVistInfo(formdata, id!)
      if (res.success) {
        navigate('/my-appointments')
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
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex flex-col w-1/2 gap-5 min-w-[320px]">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-bold">Pre-Visit Information</h1>
          <p className="text-gray-500 text-sm">
            Please provide the following information to help us prepare your
            visit.
          </p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Textarea
            placeholder="Describe your symptoms or concerns"
            variant="bordered"
            label="What reason for your visit?"
            {...register('reasons')}
            isInvalid={!!errors.reasons}
            errorMessage={errors.reasons?.message}
            labelPlacement="outside"
          />
          <Input
            placeholder="e.g., 2 weeks, 1 month"
            variant="bordered"
            label="How long have you had these symptoms?"
            labelPlacement="outside"
            isInvalid={!!errors.howLong}
            errorMessage={errors.howLong?.message}
            {...register('howLong')}
          />
          <Textarea
            placeholder="List any medications you are currently taking"
            variant="bordered"
            label="Current medications"
            isInvalid={!!errors.currentMedications}
            errorMessage={errors.currentMedications?.message}
            {...register('currentMedications')}
            labelPlacement="outside"
          />
          <Controller
            name="tests"
            control={control}
            render={({ field }) => (
              <Input
                type="file"
                label="Upload your tests"
                accept=".pdf,image/*"
                onChange={(e) => {
                  field.onChange(e.target.files![0])
                }}
              />
            )}
          />
          <Checkbox
            className="text-white"
            onChange={(e) => setAccepted(e.target.checked)}
          >
            I agree to share this information with the doctor.
          </Checkbox>
          <div className="flex justify-end gap-3">
            <Button
              variant="bordered"
              onPress={() => navigate('/my-appointments')}
            >
              skip
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isCompletingPreVisitInfo}
              disabled={isCompletingPreVisitInfo || !accepted}
              className="text-white"
            >
              Save & Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default PreVisitPage
