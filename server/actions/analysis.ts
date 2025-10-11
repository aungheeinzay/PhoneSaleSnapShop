"use server"

import { between, eq } from "drizzle-orm"
import { db } from ".."
import { orders, products, users } from "../schema"
import { endOfDay, format, startOfDay, subDays } from "date-fns"


export const analysis=async()=>{
    const customers = await db.select().from(users)
    const pendingOrders = await db.select().from(orders).where(eq(orders.status,"pending"))
    const allProducts = await db.select().from(products)
    const completedOrders = await db.select().from(orders).where(eq(orders.status,"completed"))
    return {
        customers:customers.length,
        pendingOrders:pendingOrders.length,
        allProducts:allProducts.length,
        completedOrders:completedOrders.length
    }
}

export const weaklyAnalysis = async()=>{
    try {
        const today = new Date();
        const days = Array.from({length:7},(_,i)=>{
            return format(subDays(today,i),"yyyy-MM-dd")
        }).reverse()
        const data = await Promise.all(
            days.map(async(day)=>{
                const startDay = startOfDay(new Date(day))
                const endDay = endOfDay(new Date(day))
                endDay.setDate(startDay.getDate()+1)
                const orderData = await db.select({
                    count:orders.id
                }).from(orders).where(between(orders.created,startDay,endDay))
                return {day,count:orderData.length}
            })
        )
        return data
    } catch (error) {
        console.log(error);
        
    }
}