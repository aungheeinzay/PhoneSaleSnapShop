'use client'
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
import { cn } from '@/lib/utils'
import { forgetPassword } from '@/server/actions/forget-action'
import { emailSchema } from '@/types/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

function ForgetPassword() {
    const form = useForm<z.infer <typeof emailSchema>>(
        {
            resolver:zodResolver(emailSchema),
            defaultValues:{
                email:''
            }
        }
    )
    const {execute,isExecuting} = useAction(forgetPassword,{
        onSuccess({data}){
            if(data.success){
                toast.success(data.success,{
                   action:{
                    label:'open',
                   onClick:()=>window.open('https://mail.google.com/mail/u/0/#inbox')
                   }
                })
                form.reset()
            }
            if(data.error){
                toast.error(data.error)
            }
        }
    })
    const onSubmit:SubmitHandler<z.infer<typeof emailSchema>>=(value)=>{
        execute(value)
    }
  return (
    <AuthForm 
     actionHref=''
     formTitle='Enter your email'
     formDescription='we will send to check the account with these email'
     showProvider={false}>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className={cn("w-full cursor-pointer text-white",isExecuting && 'opacity-25')} disabled={isExecuting}>send email</Button>
      </form>
    </Form>
    </AuthForm>
  )
}

export default ForgetPassword