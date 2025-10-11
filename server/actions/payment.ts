"use server"
import Stripe from "stripe"
import { paymentSchema } from "@/types/paymentSchema"
import { actionClient } from "./actions"
import { auth } from "../auth"
import { json } from "zod"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export const paymentProcess = actionClient
.inputSchema(paymentSchema)
.action(async({parsedInput:{amount,cart,currency}})=>{
    const user = await auth()
    if(!user)return {error:"You need to Login"}
    if(!amount)return {error:"no products in cart"}
    const paymentIntent = await stripe.paymentIntents.create({
        amount:amount*100,
        currency,
        automatic_payment_methods:{
            enabled:true
        },
        metadata:{
            cart:JSON.stringify(cart)
        }
    })
    return {
        success:{
            paymentIntentId:paymentIntent.id,
            clientSecretId:paymentIntent.client_secret,
            user_email:user.user.email
        }
    }
})