'use server'

import { eq } from "drizzle-orm"
import { db } from ".."
import { emailVerificationToken, resetPasswordToken, twoFactorToken, users } from "../schema"
import crypto from "crypto"


const checkEmailVeryToken = async(email:string)=>{
    try {
        const token = await db.query.emailVerificationToken.findFirst({where:eq(emailVerificationToken.email,email)})
        return token
    } catch (error) {
        console.log(error);
        return null
    }
}

const checkResetPasswordToken = async(email:string)=>{
    try {
        const token = await db.query.resetPasswordToken.findFirst({where:eq(resetPasswordToken.email,email)})
        return token
    } catch (error) {
        console.log(error);
        return null
    }
}

//generate email verification token
export const generateEmailVeryToken=async(email:string)=>{
    const token =crypto.randomUUID()
    const expires=new Date().getTime()+1000*60*30

        const exitingToken = await checkEmailVeryToken(email)
        if(exitingToken){
            await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id,exitingToken.id))
        }
        const verificationToken =await db.insert(emailVerificationToken).values({
            email,
            token,
            expires:new Date(expires)
        }).returning()

        return verificationToken
    
}

//generate reset password token
export const generateResetPasswordToken=async(email:string)=>{
    const token =crypto.randomUUID()
    const expires=new Date().getTime()+1000*60*30

        const exitingToken = await checkResetPasswordToken(email)
        if(exitingToken){
            await db.delete(resetPasswordToken).where(eq(resetPasswordToken.id,exitingToken.id))
        }
        const resetToken =await db.insert(resetPasswordToken).values({
            email,
            token,
            expires:new Date(expires)
        }).returning()

        return resetToken
    
}
//get twofactor code
export const getTwoFactorCode = async(email:string)=>{
    try {
        const exitingCode = await db.query.twoFactorToken.findFirst({where:eq(twoFactorToken.email,email)})
        return exitingCode
    } catch (error) {
        console.log(error); 
    }
}

export const conformEmail =async (token:string)=>{
    const exitingToken = await db.query.emailVerificationToken.findFirst({where:eq(emailVerificationToken.token,token)})
    if(!exitingToken)return {error:'invalid token'}
    const isExpires =new Date(exitingToken.expires)<new Date()
    if(isExpires)return {error:'invalid token,again'}
    await db.update(users).set({
        emailVerified:new Date(),
        email:exitingToken.email
    }).where(eq(users.email,exitingToken.email))
    await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id,exitingToken.id))
    return {success:'email conformed'}
}

export const generateTwoFactorCode = async(email:string)=>{
try {
    const code = crypto.randomInt(100_000,1_000_000).toString()
    const expires = new Date(new Date().getTime()+30*60*1000)
    const exitingCode =await getTwoFactorCode(email)
    if(exitingCode){
        await db.delete(twoFactorToken).where(eq(twoFactorToken.id,exitingCode.id))
    }
    const twoFactorCode = await db.insert(twoFactorToken).values({
        email,
        token:code,
        expires
    }).returning()
    return twoFactorCode
} catch (error) {
    return null
}
}