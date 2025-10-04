'use client'
import { profileUpdateSchema } from "@/types/setting-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AuthForm from "../auth/auth-form"
import { useAction } from "next-safe-action/hooks"
import { updateDisplayName } from "@/server/actions/setting"
import { toast } from "sonner"
import { Dispatch, SetStateAction } from "react"
import { cn } from "@/lib/utils"

type ProfileFormProps={
    username:string
    email:string
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ProfileForm = ({username,email,setIsOpen}:ProfileFormProps)=>{
    const form = useForm<z.infer<typeof profileUpdateSchema>>({
        resolver:zodResolver(profileUpdateSchema),
        defaultValues:{
            username
        }
    })
    const {isExecuting,execute} = useAction(updateDisplayName,{
        onSuccess({data}){
            if(data.success){
                setIsOpen(false)
                toast.success(data.success)
            }
            if(data.error){
                toast.error(data.error)
            }
        }
    })
    const onSubmit:SubmitHandler<z.infer<typeof profileUpdateSchema>>=(value)=>{
        execute({...value,email})
    }
    return (
         <AuthForm 
         formDescription=""
         formTitle=""
         actionHref=""
         actionLabel=""
         showProvider={false}
         width="w-11/12">
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={cn("w-full",isExecuting && "opacity-20")}>Submit</Button>
      </form>
    </Form>
         </AuthForm>
    )
}
export default ProfileForm