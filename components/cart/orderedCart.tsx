import { useCartStore } from '@/store/card-store'
import Image from 'next/image'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import { Button } from '../ui/button'
import { formatPrice } from '@/lib/formatPrice'
import { caculatingTotal } from '@/lib/caculatingTotal'
import CartStatus from './CartStatus'
function orderedCart() {
    const {addToCart,cart,removeFromCart,setCartPosition,cartPosition} = useCartStore((state)=>state)
    
  return (
    <section  className='w-full  sm:w-8/12 mx-auto'>
       
        {
        cart.length===0 ? <Image src={"/emptyCartImage.jpg"} className='mx-auto' width={300} height={300} alt='emptybox'/> :
        <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Invoice Item</TableHead>
      <TableHead>Items Preview</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        cart.map((item,i)=>(
             <TableRow key={i}>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell><Image src={item.image} width={50} height={50} alt='image'/></TableCell>
      <TableCell className='flex gap-4 items-center'>
        <Button size={"sm"} className='cursor-pointer'
        onClick={()=>removeFromCart(item)}>-</Button>
        {item.varinat.quantity}
        <Button size={"sm"} className='cursor-pointer'
        onClick={()=>addToCart({...item,varinat:{
            variantId:item.varinat.variantId,
            quantity:1
        }})}>+</Button></TableCell>
      <TableCell className="text-right">{item.price}</TableCell>
    </TableRow>
        ))
    }
  </TableBody>
    <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{formatPrice(caculatingTotal(cart))}</TableCell>
        </TableRow>
      </TableFooter>
</Table>
        }
        {
          cart.length>0 && <Button className='cursor-pointer'
        onClick={()=>setCartPosition("Checkout")}>place order</Button>
        }
        </section>
  )
}

export default orderedCart