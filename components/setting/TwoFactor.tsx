'use client'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { twoFactorSchema } from "@/types/setting-schema"
import { useAction } from "next-safe-action/hooks"
import { twoFactorToogler } from "@/server/actions/setting"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,

  FormLabel,

  FormMessage,
} from "@/components/ui/form"
import z from "zod"
import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
type twoFactorProps={
  isTwofactorEnabled:boolean,
  userId:string
}

function TwoFactor({isTwofactorEnabled,userId}:twoFactorProps) {
    const form = useForm({
        resolver:zodResolver(twoFactorSchema),
        defaultValues:{
            isTwofactorEnabled,
            userId
        }
    })
    const {isExecuting,execute} = useAction(twoFactorToogler,{
      onSuccess({data}){
        if(data.error){
          toast.success(data.error)
        }
        if(data.sucess){
          toast.info(data.sucess)
        }
      }
    })
    const onSubmit:SubmitHandler<z.infer<typeof twoFactorSchema>>=(value)=>{
      execute({...value,isTwofactorEnabled:!isTwofactorEnabled})
    }
  return (
     <Card>
  <CardContent className="">
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="isTwofactorEnabled"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className=" text-gray-600 ">Two Factor AuthenTication</FormLabel>
              <FormControl>
                <Switch className="cursor-pointer" disabled={isExecuting} checked={isTwofactorEnabled} onCheckedChange={(checked) => {
              field.onChange(checked);      
              execute({                               
                isTwofactorEnabled: checked,
                userId,
              });
            }}
 />
              </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={cn("w-full cursor-pointer",isExecuting && "opacity-20")}>{
          isTwofactorEnabled ? "Disable" : "Enable"}</Button>
      </form>
    </Form>
  </CardContent>
</Card>
  )
}

export default TwoFactor