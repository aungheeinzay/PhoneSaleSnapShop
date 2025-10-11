"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { variantSchema, VariantsWithImagesTags } from "@/types/inferType"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import TagInput from "./tagInput"
import VariantImage from "./variantImage"
import { useAction } from "next-safe-action/hooks"
import { createVariant, deleteVariant } from "@/server/actions/variants"
import { toast } from "sonner"

type VariantDialogProps={
children:React.ReactNode
editMode:boolean
productID:number
variant?:VariantsWithImagesTags
}

function VariantDialog({children,editMode,productID,variant}:VariantDialogProps) {
    const [open,setisOpen] = useState(false)
      const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
        tag:[],
        variantImage:[],
        color:'#000000',
        productID,
        id:undefined,
        productType:"",
        editMode,
    },
  })
  const {execute,isExecuting} = useAction(createVariant,{
    onSuccess({data}){
      form.reset()
        if(data?.success){
            setisOpen(false)
            toast.success(data.success)
        }
        if(data?.error){
            toast.error(data.error)
        }
    }
  })
 
  const onSubmit = (data:z.infer<typeof variantSchema>)=>{
  
    execute(data)
  }
  const editmodeRun=()=>{
    if(editMode && variant){
        console.log(variant.variantImages);
        
        form.setValue('color',variant.color)
        form.setValue("tag",variant.variantTags.map(({tag})=>{
            return tag }))
        form.setValue("productType",variant.productType),
        form.setValue("variantImage",variant.variantImages.map((img)=>{
            return {
               url:img.image_url,
               name:img.name,
               size:Number(img.size),
               key:img.key?.toString()
            }
        }))
        form.setValue("id",variant.id)
    }
  }

   const deleteAVariant = useAction(deleteVariant,{
    onSuccess({data}){
        if(data?.success){

            setisOpen(false)
            toast.success(data.success)
        }
        if(data.error){
            toast.error(data.error)
        }
    }
  })
  useEffect(()=>{
    editmodeRun()
  },[])
  return (
   <Dialog open={open} onOpenChange={setisOpen}>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent className="max-h-[80vh] flex flex-col">
    <DialogHeader>
      <DialogTitle>{editMode ? "Edit" : "Create"} Variant</DialogTitle>
      <DialogDescription>
        Manage your product variant
      </DialogDescription>
    </DialogHeader>

    <div className="overflow-y-auto flex-1 pr-2">
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Title</FormLabel>
              <FormControl>
                <Input placeholder="please neter your variant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

           <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Tags</FormLabel>
              <FormControl>
                <TagInput {...field} handleOnChange={e=>field.onChange(e)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    <VariantImage/>
        <Button type="submit" className="cursor-pointer w-full block" disabled={isExecuting}>
            {
                editMode ? "Update Product's Variant" :
                "Create Product's Variant"
            }
        </Button>
      
      </form>
    </Form>
  {
            editMode && <Button className="cursor-pointer bg-red-600 text-white mt-5" type="button"
          onClick={async (e) => {
  e.preventDefault()
  if (!variant?.id) return 
  await deleteAVariant.execute({ id: variant.id })
}}>
                delete variant
            </Button>
        }
    </div>
  </DialogContent>
</Dialog>
  )
}

export default VariantDialog