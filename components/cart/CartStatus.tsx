import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/card-store'
import { Box, Minus, ShoppingCart, Ticket } from 'lucide-react'
import React from 'react'

function CartStatus() {
    const cartPosition = useCartStore((state)=>state.cartPosition)
    const setCartPosition = useCartStore((state)=>state.setCartPosition)
    console.log(cartPosition);
    
  return (
    <div className='flex justify-center items-center gap-4'>
        <ShoppingCart className={cn(cartPosition==="Order" && "text-primary fill-primary")}
        onClick={()=>setCartPosition("Order")}/>
        <Minus  className={cn(cartPosition==="Order" && "text-primary fill-primary")}/>
        <Ticket  onClick={()=>setCartPosition("Checkout")}  className={cn(cartPosition==="Checkout" && "text-primary fill-primary")}/>
        <Minus className={cn(cartPosition==="Checkout" && "text-primary fill-primary")}/>
        <Box  className={cn(cartPosition==="Success" && "text-primary fill-primary")}
        />
    </div>
  )
}

export default CartStatus