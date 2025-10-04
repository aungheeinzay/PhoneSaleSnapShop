'use client'
import AuthForm from '@/components/auth/auth-form'
import z from "zod"
import {useAction} from "next-safe-action/hooks"
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
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/types/login-schema'
import { register } from '@/server/actions/register-action'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver:zodResolver(registerSchema),
    defaultValues:{
      username:"",
      email:"",
      password:""
    }
  })
const {execute,reset,isExecuting} = useAction(register,{
  onSuccess({data}){
    toast.success(data.success,{
      action:{
        label:'open',
        onClick:()=>window.open('https://mail.google.com/mail/u/0/#inbox')
      }
    })
    form.reset()
  }
})
  const onSubmit:SubmitHandler<z.infer<typeof registerSchema>> = (value)=>{
    execute(value)

  }
  return (
    <AuthForm
    showProvider={true}
    formTitle='Register here'
    formDescription='Create and account to get more information about us'
    actionHref='/auth/login'
    actionLabel='Login'
    >
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

           <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="snap shop" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email */}
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
        <Button disabled={isExecuting} type="submit" className={cn('w-full cursor-pointer text-white',isExecuting && 'opacity-20 animate-pulse')}>Register</Button>
      </form>
    </Form>
    </AuthForm>
  )
}

export default Register