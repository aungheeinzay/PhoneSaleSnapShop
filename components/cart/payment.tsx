"use client"
import { caculatingTotal } from '@/lib/caculatingTotal'
import stripeInit from '@/lib/stripe_inits'
import { useCartStore } from '@/store/card-store'
import {Elements} from "@stripe/react-stripe-js"
import PaymentForm from './paymentForm'

const stripe = stripeInit()
function Payment() {
    const cart = useCartStore(state=>state.cart)
  return (
    <div>
        <Elements stripe={stripe} options={{
            mode:"payment",
            currency:"usd",
            amount:caculatingTotal(cart)
        }}>
            <PaymentForm totalPrice={caculatingTotal(cart)}/>
        </Elements>
    </div>
  )
}

export default Payment