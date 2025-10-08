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
} from "@/components/ui/table"
function orderedCart() {
    const cart = useCartStore((state)=>state.cart)
    
  return (
    <section>{
        cart.length===0 ? <Image src={"/emptyCartImage.jpg"} className='mx-auto' width={300} height={300} alt='emptybox'/> :
        <Table className='w-full  sm:w-8/12 mx-auto'>
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
      <TableCell>{item.varinat.quantity}</TableCell>
      <TableCell className="text-right">{item.price}</TableCell>
    </TableRow>
        ))
    }
  </TableBody>
</Table>
        }</section>
  )
}

export default orderedCart