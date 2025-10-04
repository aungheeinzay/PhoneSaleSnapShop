"use server"
import emailConformationTemplate from "@/components/emailTemplate"
import resetEmailTemplate from "@/components/resetTemplate"
import SnapShopTwoFactorCodeEmail from "@/components/twofactorEmail"
import { baseUrl } from "@/lib/getbaseUrl"
import {Resend} from "resend"
import { success } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)
export const sendEmail = async(email:string,token:string,username:string | null)=>{
    const url = baseUrl()
    const conformLink = `${url}/conform-email?token=${token}`
    const resetLink =`${url}/auth/resetPassword?token=${token}`
    const conformTemplate = emailConformationTemplate({
            username:username!,
            conformLink
        })
    
    const resetTemplate = resetEmailTemplate({
        username:"snapShop user",
        resetLink
    })
    const {data,error}  =await resend.emails.send({
        from:'Acme <onboarding@resend.dev>',
        to:email,
        subject:username ? 'snapShop conform to your email' : 'snapshop reset password token',
        react:username ? conformTemplate : resetTemplate
    })
    
     if(error){
     console.log(error);
            
     }else{
        return {success:'email verificaton sent'}
     }
}

export const sendCodeEmail=async(email:string,token:string) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to:email,
    subject: 'snapShop verification code',
    react:SnapShopTwoFactorCodeEmail({codes:token})
  });
  if(error){
    console.log(error); 
  }else{
    return{success:"verification code sent"}
  }
};