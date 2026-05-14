import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from './provider.tsx'
import '@/styles/globals.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router.tsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={Router} />
      </Elements>
    </Provider>
  </React.StrictMode>
)
