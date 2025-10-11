import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
type orderDetailProp={
    image?:string[]
    quantity:number[]
    price:number[],
    product:string[]
    variant:string[]
    children:React.ReactNode,
    total:number
    orderId:number
}
type OrderItem = {
  image?: string
  quantity: number
  price: number
  product: string
  variant: string
}

function OrderDetail({image,price,product,quantity,variant,children,orderId}:orderDetailProp) {
    const orderDetail:OrderItem[]=product.map((p,i)=>{
        return {
            image:image?.[i],
            price:price[i],
            product:product[i],
            variant:variant[i],
            quantity:quantity[i]
        }
    })
  return (
    <Dialog>
  <DialogTrigger className='cursor-pointer'>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Order Details # {orderId}</DialogTitle>
    </DialogHeader>
    <Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>image</TableHead>
      <TableHead>product</TableHead>
      <TableHead>Variant</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead>Price(one)</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        orderDetail.map((od,i)=>(
            <TableRow key={i}>
      <TableCell><Image src={od.image!} alt='3' width={30} height={30} className='rounded-full'/></TableCell>
      <TableCell>{od.product}</TableCell>
      <TableCell><div style={{background:od.variant}} className='rounded-full w-[20px] h-[20px]'></div></TableCell>
      <TableCell>{od.quantity}</TableCell>
      <TableCell>{od.price}</TableCell>
    </TableRow>
        ))
    }
    
  </TableBody>
</Table>
  </DialogContent>
</Dialog>
  )
}

export default OrderDetail