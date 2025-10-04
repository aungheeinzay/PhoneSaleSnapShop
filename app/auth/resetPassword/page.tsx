'use client'
import React from 'react'

import AuthForm from '@/components/auth/auth-form'
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { useAction } from 'next-safe-action/hooks'
import z from 'zod'
import { resetPasswordSchema } from '@/types/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassword } from '@/server/actions/forget-action'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'


function ResetPassword() {
    const router = useRouter()
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver:zodResolver(resetPasswordSchema),
        defaultValues:{
            password:'',
            conformPassword:""
        }
    })
    const param = useSearchParams()
    const token = param.get('token')
    const {isExecuting,execute} = useAction(resetPassword,{
        onSuccess({data}){
            if(data?.error){
                toast.error(data.error)
            }
            if(data?.success){
                 router.push("login")
                toast.success(data.success) 
            }
        }
    })
    const onSubmit:SubmitHandler<z.infer<typeof resetPasswordSchema>>=(value)=>{
        
        execute({...value,token:token!})
    }
  return (
    <AuthForm 
    actionHref=''
    formDescription='enter new password'
    showProvider={false}
    formTitle='Reset Password'>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
         <FormField
          control={form.control}
          name="conformPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>conform Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={cn("w-full cursor-pointer text-white",isExecuting && 'opacity-25')} disabled={isExecuting}>change password</Button>
      </form>
    </Form>  
    </AuthForm>
  )
}

export default ResetPassword