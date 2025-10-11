"use server"
import { createOrderSchema } from "@/types/orderSchema";
import { actionClient } from "./actions";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";
import { eq } from "drizzle-orm";
import { success } from "zod";
import { revalidatePath } from "next/cache";

export const createOrder=actionClient
.inputSchema(createOrderSchema)
.action(async({parsedInput:{paymentID,products,status,totalPrice}})=>{
    const session = await auth()
    if(!session)return {error:"First you need to login"}
   const order =  await db.insert(orders).values({
        status,
        total:totalPrice,
        userID:session.user.id,

    }).returning()
    products.map(async(product)=>{
         await db.insert(orderProduct).values({
            quantity:product.quantity,
            productID:product.productID,
            orderID:order[0].id,
            productVariantID:product.variantID
        })
    })

    return {success:"order add"}
})
type changeStatus={
    id:number
    status:"pending" | "completed" | "canceled"
}
export const changeOrderStatus = async({id,status}:changeStatus)=>{
   try {
     await db.update(orders).set({status}).where(eq(orders.id,id))
     revalidatePath("/dashboard/order")
     return {success:"updated status successfully"}
   } catch (error) {
    console.log(error);
   }
}