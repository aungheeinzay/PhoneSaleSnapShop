type paymentFormProps = {
  totalPrice: number
}

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { paymentProcess } from "@/server/actions/payment"
import { useCartStore } from "@/store/card-store"
import { useAction } from "next-safe-action/hooks"
import { createOrder } from "@/server/actions/order"

function PaymentForm({ totalPrice }: paymentFormProps) {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const setCartPosition = useCartStore((state) => state.setCartPosition)
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const { execute } = useAction(createOrder, {
    onSuccess({ data }) {
      if (data.error) return
      if (data.success) {
        clearCart()
        setCartPosition("Success")
      }
    },
  })

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      setLoading(false)
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setLoading(false)
      return
    }

    const response = await paymentProcess({
      amount: totalPrice,
      currency: "usd",
      cart: cart.map((c) => ({
        image: c.image,
        price: c.price,
        productID: c.id,
        quantity: c.varinat.quantity,
        title: c.name,
      })),
    })

    if (response.data?.error) {
      setLoading(false)
      return
    }

    if (response.data?.success) {
      setLoading(false)
      const paymentResponse = await stripe.confirmPayment({
        elements,
        clientSecret: response.data.success.clientSecretId!,
        redirect: "if_required",
        confirmParams: {
          return_url:"https://snapshop-six.vercel.app/success",
          receipt_email: response.data.success.user_email!,
        },
      })

      if (paymentResponse.error) {
        setLoading(false)
        console.log(paymentResponse.error)
      } else {
        setLoading(false)
        execute({
          paymentID: response.data.success.paymentIntentId,
          totalPrice,
          status: "pending",
          products: cart.map((c) => ({
            productID: c.id,
            quantity: c.varinat.quantity,
            variantID: c.varinat.variantId,
          })),
        })
      }
    }
  }

  useEffect(() => {
    if (cart.length === 0) {
      setCartPosition("Order")
    }
  }, [])

  return (
    <form className="sm:w-8/12 mx-auto" onSubmit={onSubmitHandler}>
      <PaymentElement />
      <Button
        disabled={loading || !stripe || !elements}
        className="w-full cursor-pointer mt-4"
      >
        Pay
      </Button>
    </form>
  )
}

export default PaymentForm
