"use client"
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { PartyPopper } from 'lucide-react'
import { useCartStore } from '@/store/card-store'

function Success() {
    const setCartPosition = useCartStore((state)=>state.setCartPosition)
    const cart =useCartStore((state)=>state.cart)
    useEffect(()=>{
        if(cart.length===0){
            setTimeout(()=>{
                setCartPosition("Order")
            },4000)
        }
    },[cart])
  return (
    <div className='mx-auto border rounded-xl py-4 px-5'>
        <PartyPopper className='animate-bounce text-2xl' />
        <h1 className='text-4xl font-bold'>Your payment was successful</h1>
        <p>Thank you for your purchese</p>
        <Button>view order</Button>
    </div>
  )
}

export default Success