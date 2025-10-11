"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { redirect, useSearchParams } from 'next/navigation'
import { useCartStore } from '@/store/card-store'

function AddToCard() {
    const [quantity,setQuantity] =useState(1)
    const searchParams = useSearchParams()
    const variantId = Number(searchParams.get("vid"))
    const price=Number(searchParams.get("price"))
    const image = searchParams.get("image_url")
    const title=searchParams.get("title")
    const productId = Number(searchParams.get("productID"))
    const type = searchParams.get("productType")
    const addToCart = useCartStore((state)=>state.addToCart)
    if(!variantId || !price || !image || !title || !type || !productId){
        return redirect("/")
    }  

    const addToCardHandler=()=>{
        addToCart({
            id:productId,
            name:title,
            varinat:{variantId,quantity},
            price,
            image

        })
    }
  return (
    <section className='w-full flex flex-col gap-4'>
        <div className='flex gap-8 w-full'>
            <Button disabled={quantity===1} variant={quantity<1 ? "secondary" : "default"} className='cursor-pointer'
            onClick={()=>setQuantity(pre=>{
                if(pre>1){
                    return pre -1
            }
            return pre})}>
            -
        </Button>
        <span>quantity: {quantity}</span>
        <Button className='cursor-pointer' variant={"default"} onClick={()=>setQuantity(pre=>pre+1)}>
            +
        </Button>
        </div>
        <Button className='w-1/2 cursor-pointer' variant={"default"}
        onClick={addToCardHandler}><span>add to card</span></Button>
    </section>
  )
}

export default AddToCard