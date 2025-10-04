'use client'
import AuthForm from "@/components/auth/auth-form"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/types/login-schema"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks"
import { login } from "@/server/actions/login-action"
import { toast } from "sonner"
import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

function Login() {
  const [isTwoFactor,setIsTwoFactor] = useState(false)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
  const {isExecuting,execute} = useAction(login,{
    onSuccess({data}){
      if(data?.error){
        toast.error(data.error)
      }
      if(data?.success){
        toast.success(data.success,{
          action:{
            label:'open',
            onClick:()=>window.open('https://mail.google.com/mail/u/0/#inbox')
          }
        })
      }
      if(data?.twoFactor){
        toast.success(data.twoFactor,{
           action:{
            label:'open',
            onClick:()=>window.open('https://mail.google.com/mail/u/0/#inbox')
          }
        })
        setIsTwoFactor(true)
      }
    }
  })
  const onSubmit:SubmitHandler<z.infer<typeof loginSchema>>=(value)=>{
    execute(value)
  }
  return (
     <AuthForm
    showProvider={true}
    formTitle='Login here'
    formDescription='login with email and password'
    actionHref='/auth/register'
    actionLabel='Register'
    >
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {
          !isTwoFactor ? <div>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/auth/forgetPassword" className="underline text-primary">forget password</Link>
        </div> :  <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter the code we have sent</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} disabled={isExecuting}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        }
        <Button type="submit" disabled={isExecuting} className="w-full cursor-pointer text-white">{
          isTwoFactor ? "verify" : "login" }{isExecuting && "..."}</Button>
      </form>
    </Form>
    
    </AuthForm>
  )
}

export default Login