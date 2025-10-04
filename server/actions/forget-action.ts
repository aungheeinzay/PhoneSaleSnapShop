"use server"

import { emailSchema, resetPasswordSchema } from "@/types/login-schema";
import { actionClient } from "./actions";
import { db } from "..";
import { eq } from "drizzle-orm";
import { resetPasswordToken, users } from "../schema";
import { generateResetPasswordToken } from "./token";
import { sendEmail } from "./email";
import bcrypt from "bcrypt"
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

export const forgetPassword = actionClient
.inputSchema(emailSchema).action(async({parsedInput:{email}})=>{
    const exitingUser = await db.query.users.findFirst({where:eq(users.email,email)})
    if(!exitingUser)return {error: 'account does not exit'}
    const resetToken = await generateResetPasswordToken(email)
    await sendEmail(email,resetToken[0].token,null)
    return {success:'we send email to restPassword'}
})

export const resetPassword = actionClient.inputSchema(resetPasswordSchema)
.action(async({parsedInput:{password,token}})=>{
   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
   const dbPool = drizzle({ client: pool })

    if(!token)return null
    const exitingToken = await db.query.resetPasswordToken.findFirst({where:eq(resetPasswordToken.token,token)})
    if(!exitingToken)return {error:'invalid token'}
    const isExpires = new Date() > new Date(exitingToken.expires)
    if(isExpires)return {error:'invalid token'}
    const exitingUser = await db.query.users.findFirst({where:eq(users.email,exitingToken.email)})
    if(!exitingUser)return {error:'no account found'}
    const hashPassword = await bcrypt.hash(password,10)
    await dbPool.transaction(async(context)=>{
        await context.update(users).set({password:hashPassword}).where(eq(users.id,exitingUser.id))
        await context.delete(resetPasswordToken).where(eq(resetPasswordToken.id,exitingToken.id))
    })
 return {success:"Password changes"}
})