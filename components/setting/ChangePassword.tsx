"use client"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { IoKeyOutline } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AuthForm from "../auth/auth-form";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/types/setting-schema";
import z from "zod";
import { useAction } from "next-safe-action/hooks";
import { changePassword } from "@/server/actions/changePassword";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

function ChangePassword({email}:{email:string}) {
    const [isOpen,setIsOpen] = useState(false)
    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver:zodResolver(changePasswordSchema),
        defaultValues:{
            email,
            oldpassword:"",
            newPassword:""
        }
    })
    const {isExecuting,execute} = useAction(changePassword,{
        onSuccess({data}){
            if(data.success){
                toast.success(data.success)
                setIsOpen(false)
            }
            if(data.error){
                toast.error(data.error)
            }
        }
    })
const onSubmit:SubmitHandler<z.infer<typeof changePasswordSchema>>=(value)=>{
    execute(value)
}
  return (
    <Card>
  <CardContent>
   <div className="w-full px-2 flex items-center justify-between">
     <p className=" text-gray-600">Change new password</p>
     
     <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild><IoKeyOutline size={23} className="cursor-pointer"/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change the password</DialogTitle>
    </DialogHeader>
    <AuthForm 
    actionHref=""
    formDescription=""
    formTitle=""
    showProvider={false}
    width="w-full">
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>old password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>new password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={cn("w-full",isExecuting && "opacity-20")}>change password</Button>
      </form>
    </Form>
    </AuthForm>
  </DialogContent>
</Dialog>
   </div>
  </CardContent>
</Card>
  )
}

export default ChangePassword