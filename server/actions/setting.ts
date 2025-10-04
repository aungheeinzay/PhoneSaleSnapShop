'use server'
import { avatorSchema, profileUpdateSchema, twoFactorSchema } from "@/types/setting-schema";
import { actionClient } from "./actions";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";



export const updateDisplayName = actionClient
.inputSchema(profileUpdateSchema)
.action(async({parsedInput:{username,email}})=>{
    const exitingUser = await db.query.users.findFirst({where:eq(users.email,email!)})
    if(!exitingUser)return {error:'user does not exit'}
    await db.update(users).set({name:username}).where(eq(users.email,email!))
    revalidatePath("/dashboard/setting")
    return {success:'update username'}
})

export const twoFactorToogler = actionClient
.inputSchema(twoFactorSchema)
.action(async({parsedInput:{isTwofactorEnabled,userId}})=>{
    const exitingUser = await db.query.users.findFirst({where:eq(users.id,userId)})
    if(!exitingUser)return {error:'something went wrong'}
   await db.update(users).set({isTwoFactorEnabled:isTwofactorEnabled}).where(eq(users.id,userId))
    revalidatePath("/dashboard/setting")
    if(exitingUser.isTwoFactorEnabled)return {sucess:'2FA Disabled'}
    return {sucess:"2FA Enabled"}

})

export const profileAvatorUpdate =actionClient
.inputSchema(avatorSchema)
.action(async({parsedInput:{image,email,imageKey}})=>{
    if(!image)return {error:'image is required'}
    const exitingUser = await db.query.users.findFirst({where:eq(users.email,email)})
    if(!exitingUser)return {error:"user doesnot exit"}
    if(exitingUser.imageKey){
        const utapi = new UTApi()
        await utapi.deleteFiles(exitingUser.imageKey)
    }
    await db.update(users).set({image,imageKey}).where(eq(users.email,email))
    revalidatePath("/dashboard/setting")
    return {success:'image uploaded'}
})
