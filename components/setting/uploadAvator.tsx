'use client'
import { UploadButton } from "@/app/api/uploadthing/uploadthing"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { avatorSchema } from "@/types/setting-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useAction } from "next-safe-action/hooks"
import { profileAvatorUpdate } from "@/server/actions/setting"
import { toast } from "sonner"

interface uploadAvatorProps{
  image:string
  name:string
  email:string
}

function UploadAvator({image,name,email}:uploadAvatorProps) {
  const [isUploading,setIsUploading]=useState(false)

  const form = useForm<z.infer<typeof avatorSchema>>({
    resolver:zodResolver(avatorSchema),
    defaultValues:{
      image: image || undefined,
      email,
      imageKey:""
    }
    
  })
  const {isExecuting,execute} = useAction(profileAvatorUpdate,{
    onSuccess({data}){
      if(data.success){
        toast.success(data.success)
      }
      if(data.error){
        toast.error(data.error)
      }
    }
  })

  const onSubmit:SubmitHandler<z.infer<typeof avatorSchema>> = (value)=>{
    execute(value)
  }
  return (
     <div className="col-span-1 self-start flex h-full items-center justify-center">
           <div className="grid grid-rows-2 gap-2 place-items-center">
             <div>
              <Avatar className="scale-200 row-span-1">
            {
              form.getValues('image') ? <AvatarImage src={form.getValues("image") ?? image }></AvatarImage>
            
            :
             <AvatarFallback className="bg-primary text-white">{name?.slice(0,2)}</AvatarFallback>
            }
            
        </Avatar>
             </div>
             {/* upload photo to uploadthing */}
        <div className="row-span-1">
          <UploadButton className={cn("ut-button:bg-primary scale-90 ut-button:focus:outline-0",isExecuting && 'opacity-20')} disabled={isExecuting} endpoint="imageUploader" content={{button({ready}){
            if(ready)return <div>{isUploading ? "uploading..." : "upload avator"}</div>
            return <div>uploading...</div>
          }}}
          onUploadBegin={()=>{
            setIsUploading(true)
          }}
          onUploadError={(error)=>{
            form.setError("image",{
              type:'validate',
              message:error.message
            })
            setIsUploading(false)
            return
          }}
          onClientUploadComplete={(res)=>{
            form.setValue("image",res[0].url)
            form.setValue("imageKey",res[0].key)
            form.handleSubmit(onSubmit)()
              setIsUploading(false)
          }}
          />
        </div>
         <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden"  placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
      </form>
    </Form>
           </div>
                  
        </div>
  )
}

export default UploadAvator