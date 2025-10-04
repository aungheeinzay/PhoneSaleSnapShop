"use server"

import { productSchema } from "@/types/product";
import { actionClient } from "./actions";
import { db } from "..";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const createProduct = actionClient
.inputSchema(productSchema)
.action(async({parsedInput:{id,title,description,price}})=>{
   try {
     if(!id){
     
        await db.insert(products).values({
            title,
            description,
            price
        })
        return {success:"created a product"}
    }else {
           const exitingProduct = await db.query.products.findFirst({
            where:eq(products.id,id)
        })
        if(!exitingProduct)return {error :"not product found"}
        await db.update(products).set({
            title,
            description,
            price
        }).where(eq(products.id,id))
        return {success:'updated the products'}
    }
    
   } catch (error) {
    console.log(error);
    return {error:"something went wrong"}
   }
})


export const getProductById = async(id:number)=>{
    try {
        const exitingProduct = await db.query.products.findFirst({
            where:eq(products.id,id)
        })
        if(!exitingProduct)return {error:'not product exit'}
        return {success:exitingProduct}
    } catch (error) {
       console.log(error);
       return {error:"something went wrong"} 
    }
}

export const deleteProduct = async(id:number)=>{
    try {
       const deleteSuccess= await db.delete(products).where(eq(products.id,id))
        if(deleteSuccess){
            revalidatePath("dashboard/dataTable")
            return {success:"delete product successfully"}
        }
        return {error:'error deleting success'}
    } catch (error) {
        console.log(error);
        return {error:'error on deleting'}
    }
}
 