import {z} from "zod"
export const specialChar=['!','@','#','$','%','&','*','?']

export const loginSchema = z.object({
    email:z.string().email({message:'please enter a valid email address'}),
    password:z.string().min(5,{message:'password too short'}).max(20,{message:'password too long'}),
    code:z.string().optional(                                                                                                                                                                                                                                                                                                                                                                                                                                                     )

})

export const registerSchema = z.object({
    username:z.string().min(3,{message:"username is too short"}).max(20,{message:"username is too long"}),
    email:z.string().email({message:"enter valid email"}),
    password:z.string().min(6,{message:"password too short"}).max(20,{message:"password too long"}).refine((value)=>specialChar.some((s)=>value.includes(s)),{
        message:'password have at least special char'
    })
})

export const emailSchema = z.object({
    email:z.string().email({message:'enter valid email'})
})

export const resetPasswordSchema = z.object({
    password:z.string().min(6,{message:'password too short'}).max(20,{message:'password too long'})
    .refine((value)=>specialChar.some((s)=>value.includes(s)),{message:'one special character'}),
    conformPassword:z.string(),
    token:z.string().optional()
}).refine((data)=>data.conformPassword===data.password,{
    path:['conformPassword'],
    message:'password must match'
})
