"use server"

import { variantSchema } from "@/types/inferType"
import { actionClient } from "./actions"
import { db } from "..";
import { products, productVariant, variantImages, variantTags } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

export const createVariant = actionClient
.inputSchema(variantSchema)
.action(async({parsedInput:{id,editMode,productID,color,tag,variantImage,productType}})=>{
   try {
     if(editMode && id){
       const editVariant = await db.update(productVariant).set({
        color,
        productType,
        updated:new Date()
       }).where(eq(productVariant.id,id)).returning()
       await db.delete(variantTags).where(eq(variantTags.variantID,editVariant[0].id))
       await db.insert(variantTags).values(tag.map((ta)=>{
        return {
            tag:ta,
            variantID:editVariant[0].id
        }
       }))
       await db.delete(variantImages).where(eq(variantImages.variantID,editVariant[0].id))
       await db.insert(variantImages).values(variantImage.map(({url,size,name,key},i)=>{
            return {
                image_url:url,
                size:size.toString(),
                name,
                key,
                order:i,
                variantID:editVariant[0].id
            }
        }))
        revalidatePath('/dashboard/dataTable')
        return {success:"variant updated successfully"}
    }
    if(!editMode){
        const variant = await db.insert(productVariant).values({
            color,
            productID,
            productType
        }).returning()
        const product  = await db.query.products.findFirst({
            where:eq(products.id,productID)
        })
        await db.insert(variantTags).values(tag.map((tag)=>{
            return {
                tag,
                variantID:variant[0].id
            }
        }))
        await db.insert(variantImages).values(variantImage.map(({url,size,name,key},i)=>{
            return {
                image_url:url,
                size:size.toString(),
                name,
                key,
                order:i,
                variantID:variant[0].id
            }
        }))
revalidatePath("/dashboard/dataTable")
    return {success:`${product?.title }add variant`}
    }
    
   } catch (error) {
    console.log(error);
    return {error:"something went wrong"}
   }
})

export const deleteVariant = actionClient
.inputSchema(z.object({
    id:z.number()
})).action(async({parsedInput:{id}})=>{
    try {
       await db.delete(productVariant).where(eq(productVariant.id,id))
       
        revalidatePath('/dashboard/dataTable')
        return {success:"variant deleted successfully"}
    } catch (error) {
        console.log(error);
        return {error:"something went wrong"}
    }
})