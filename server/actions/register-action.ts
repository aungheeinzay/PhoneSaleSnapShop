'use server'

import { registerSchema } from "@/types/login-schema"
import { actionClient } from "./actions"
import bcrypt from "bcrypt"
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVeryToken } from "./token"
import { sendEmail } from "./email"


export const register = actionClient
.inputSchema(registerSchema)
.action(async({parsedInput:{username,email,password}})=>{
    //check use is exit or not
    const exitingUser =await db.query.users.findFirst({where:eq(users.email,email)})
    if(exitingUser){
        if(!exitingUser.emailVerified){
            const verificationToken = await generateEmailVeryToken(email)

            //send email
            await sendEmail(email,verificationToken[0].token,username)
           
            return {success:'email verifycation sent'}
        }
        return {error: 'email is already exit'}
    }
    const hashPassword =await bcrypt.hash(password,10)
    await db.insert(users).values({
        name:username,
        email,
        password:hashPassword
    })
    const verificationToken = await generateEmailVeryToken(email)
    //send email verification token
    await sendEmail(email,verificationToken[0].token,username)
    return {success:'verification sent'}
})