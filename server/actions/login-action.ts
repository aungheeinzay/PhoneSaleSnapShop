'use server'

import { loginSchema } from "@/types/login-schema"
import { actionClient } from "./actions"
import { db } from ".."
import { eq } from "drizzle-orm"
import { twoFactorToken, users } from "../schema"
import { signIn } from "../auth"
import { generateEmailVeryToken, generateTwoFactorCode } from "./token"
import { sendCodeEmail, sendEmail } from "./email"
import { AuthError } from "next-auth"

export const login = actionClient
.inputSchema(loginSchema)
.action(async({parsedInput:{email,password,code}})=>{
    try {
        //check email
        const exitingUser = await db.query.users.findFirst({where:eq(users.email,email)})
        if(!exitingUser)return {error:'invalid credentials'}
        if(!exitingUser.emailVerified){
            const verificationToken = await generateEmailVeryToken(email)

            //send email
            await sendEmail(email,verificationToken[0].token,exitingUser.name!)
           
            return {success:'email verifycation sent'}
        }
        if(exitingUser.isTwoFactorEnabled){
            if(code){
                const twoFactorCode=await db.query.twoFactorToken.findFirst({where:eq(twoFactorToken.token,code)})
                if(!twoFactorCode)return {error:'wrong code'}
                const isExpires = new Date() > new Date(twoFactorCode.expires)
                if(isExpires)return {error:'wrong code'}
                await db.delete(twoFactorToken).where(eq(twoFactorToken.id,twoFactorCode.id))
            }else{
                const twoFactorCode = await generateTwoFactorCode(email)
                if(!twoFactorCode)return null
                await sendCodeEmail(email,twoFactorCode[0].token)
                return {twoFactor:'verification code sent'}
            }
        }
        await signIn('credentials',{email,password,redirectTo:'/'})   
        return {success:'login success' } 
    } catch (error) {
        console.log(error);
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                return {error:'please provide valid credentials'}
                case 'OAuthSignInError':
                return {error : error.message}
            }
        }
        throw error
    }
    
})