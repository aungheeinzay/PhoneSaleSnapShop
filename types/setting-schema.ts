import z, { email, string } from "zod";
import { specialChar } from "./login-schema";

export const profileUpdateSchema = z.object({
    username:z.string().min(4,{message:'please enter at least 4 characters'}),
    email:z.string().email().optional()
})

export const changePasswordSchema = z.object({
    email:string().email({message:'invalid email'}),
    oldpassword:string({message:"old password is required"}).nonoptional({message:"old password is required"}),
    newPassword:string({message:'new password is required'}).min(6,{message:'password too short'}).max(20,{message
        :'password too long'
    }).refine((value)=>specialChar.some((s)=>value.includes(s)),{
        message:'password have one special char'
    })
})

export const twoFactorSchema = z.object({
    isTwofactorEnabled:z.boolean(),
    userId:string()
})

export const avatorSchema=z.object({
    image:string().url(),
    email:string().email(),
    imageKey:string()
})