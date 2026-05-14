import { addToast, Button, Card, CardBody, Form, Input } from '@heroui/react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { loginSchema, TLoginSchema } from '@/validations/loginValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@/store/useUser'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const { login, isLoggingIn } = useUser()
  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    try {
      const res = await login(data)
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
    <div className="flex justify-center">
      <div className="w-1/3 min-w-[320px]">
        <Card>
          <CardBody>
            <div className="flex flex-col gap-5 p-5">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">Login</p>
                <p className="text-[#4B5563] text-sm">
                  Please login to book an appointment
                </p>
              </div>
              <Form className="gap-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Email"
                  {...register('email')}
                  labelPlacement="outside-top"
                  radius="none"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  className="rounded-none"
                />
                <Input
                  label="Password"
                  labelPlacement="outside-top"
                  {...register('password')}
                  type="password"
                  radius="none"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  variant="bordered"
                  className="rounded-none"
                />
                <Button
                  className="w-full  text-white"
                  color="primary"
                  type="submit"
                  isLoading={isLoggingIn}
                  isDisabled={isLoggingIn}
                >
                  Login
                </Button>
              </Form>
              <div className="flex gap-1 text-sm">
                <p>Don't have an account?</p>
                <Link to="/register" className="text-primary underline">
                  Register
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
