import { useState } from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import type { StripeCardElement } from '@stripe/stripe-js'
import { addToast } from '@heroui/react'

type CreatePaymentIntentResponse = {
  clientSecret: string
}

const Checkout: React.FC = () => {
  const params = new URLSearchParams(location.search)
  const amount = Number(params.get('amount'))

  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!stripe || !elements) return

    setLoading(true)

    try {
      const { data } = await axios.post<CreatePaymentIntentResponse>(
        'http://localhost:3000/api/payments/create-payment-intent',
        { amount }
      )

      const cardElement = elements.getElement(
        CardElement
      ) as StripeCardElement | null

      if (!cardElement) {
        throw new Error('Card element not found')
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (result.error) {
        addToast({
          title: 'Error',
          color: 'danger',
          description: result.error.message,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === 'succeeded'
      ) {
        addToast({
          title: 'Success',
          color: 'success',
          description: 'Payment successful',
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
      }
    } catch (error) {
      console.error(error)
      alert('Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}

export default Checkout
