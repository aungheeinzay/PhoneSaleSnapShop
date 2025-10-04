"use server"
import { changePasswordSchema } from "@/types/setting-schema";
import { actionClient } from "./actions";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import bcrypt from "bcrypt"

export const changePassword = actionClient
.inputSchema(changePasswordSchema)
.action(async({parsedInput:{email,oldpassword,newPassword}})=>{
    const exitingUser = await db.query.users.findFirst({where:eq(users.email,email)})
    if(!exitingUser)return {error:'user does not exit'}
    const isMatch = await bcrypt.compare(oldpassword,exitingUser.password!)
    if(!isMatch)return {error : 'old password wrong'}
    const hashPassword = await bcrypt.hash(newPassword,10)
    await db.update(users).set({password:hashPassword}).where(eq(users.email,email))
    return {success:'password chaged successfully'}
})