
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/server/auth'
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

import {formatISO9075} from "date-fns"
import { redirect } from 'next/navigation'
import { db } from '@/server'
import { eq } from 'drizzle-orm'
import { orders } from '@/server/schema'
import { cn } from '@/lib/utils'
import OrderDetail from './OrderDetail'
import ChangeStatus from './ChangeStatus'
async function Order() {
    const session = await auth()
    if(!session)return redirect("/")
    const orderArray = await db.query.orders.findMany({
        where:eq(orders.userID,session.user.id),
        with:{
            orderProduct:{
                with:{
                    product:true,
                    productVariant:{
                        with:{
                            variantImages:true
                        }
                    },
                    order:true,
                    
                }
            }
        }
})

  return (
    <Card className='w-10/12 mx-auto'>
         <CardHeader>
    <CardTitle>Your Orders</CardTitle>
    <CardDescription>View Your Orders And Status</CardDescription>
  </CardHeader>
  <CardContent>
 <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>Total</TableHead>
      <TableHead>Ordered On</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Action</TableHead>
      {session.user.role==="admin" && <TableHead>Change Status</TableHead>}
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        orderArray.map((order,i)=>(
              <TableRow key={i}>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableHead>{order.total}</TableHead>
       <TableCell>{formatISO9075(order.created!)}</TableCell>
      <TableCell><span className={cn(order.status==="pending" && "bg-primary",order.status==="completed" &&  "bg-green-600 ",order.status==="canceled" && "bg-red-600","py-1 px-2 rounded-md text-white")}>{order.status}</span></TableCell>
      <TableCell className="text-right">
        <OrderDetail variant={order.orderProduct.map((p)=>p.productVariant.color)}
         quantity={order.orderProduct.map((p)=>p.quantity)}
         price={order.orderProduct.map((p)=>p.product.price)}
         total={order.total}
         product={order.orderProduct.map((p)=>p.product.title)}
         image={order.orderProduct.map(({productVariant})=>productVariant.variantImages[0].image_url)}
         orderId={order.id}
         >
            <span>view order</span>
        </OrderDetail>
      </TableCell>
      <TableCell><ChangeStatus id={order.id}/></TableCell>
    </TableRow>
        ))
    }
  
  </TableBody>
</Table>
  </CardContent>
    </Card>
  )
}

export default Order