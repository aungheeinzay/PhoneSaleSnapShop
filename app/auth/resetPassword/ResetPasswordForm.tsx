'use client'
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '@/types/login-schema'
import { useAction } from 'next-safe-action/hooks'
import { resetPassword } from '@/server/actions/forget-action'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import AuthForm from '@/components/auth/auth-form'
import { cn } from '@/lib/utils'
import z from 'zod'

export default function ResetPasswordForm() {
  const router = useRouter()
  const param = useSearchParams()
  const token = param.get('token')

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      conformPassword: ''
    }
  })

  const { isExecuting, execute } = useAction(resetPassword, {
    onSuccess({ data }) {
      if (data?.error) toast.error(data.error)
      if (data?.success) {
        router.push('/login')
        toast.success(data.success)
      }
    }
  })

  const onSubmit: SubmitHandler<z.infer<typeof resetPasswordSchema>> = (value) => {
    if (!token) {
      toast.error('Invalid or missing token')
      return
    }
    execute({ ...value, token })
  }

  return (
    <AuthForm
      actionHref=''
      formDescription='enter new password'
      showProvider={false}
      formTitle='Reset Password'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn("w-full cursor-pointer text-white", isExecuting && 'opacity-25')}
            disabled={isExecuting}
          >
            Change password
          </Button>
        </form>
      </Form>
    </AuthForm>
  )
}
