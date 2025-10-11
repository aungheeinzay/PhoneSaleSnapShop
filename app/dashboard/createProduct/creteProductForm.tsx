"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { productSchema } from "@/types/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardTitle,Card, CardHeader, CardContent } from "@/components/ui/card"
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
import { useAction } from "next-safe-action/hooks"
import { createProduct, getProductById } from "@/server/actions/product"
import { toast } from "sonner"
import Tiptap from "./tiptaxEditor"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { error } from "console"


function CreteProductForm() {
  const searchParam = useSearchParams()
  const editId = searchParam.get("id") || null
  
  const form  = useForm<z.infer<typeof productSchema>>({
    resolver:zodResolver(productSchema),
    defaultValues:{
      title:"",
      description:"",
      price:0

    }
  })

  const {execute,isExecuting} = useAction(createProduct,{
    onSuccess({data}){
      form.reset()
      if(data.success){
        toast.success(data.success)
        
      }
      if(data?.error){
        toast.error(data.error)
      }
    }
  })
  const onSubmit=(data:z.infer<typeof productSchema>)=>{
    execute({...data,price:Number(data.price)})
  }
  const isProductExit = async(id:number)=>{
    const res = await getProductById(id)
    console.log(res);
    
    if(res.error){
       toast.error(res.error)
    }
    if(res.success){
      form.setValue("title",res.success.title)
      form.setValue("description",res.success.description)
      form.setValue("price",res.success.price)
      form.setValue("id",res.success.id)
    }
  }
  useEffect(()=>{
    if(editId){
      isProductExit(Number(editId))
    }
  },[])
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="enter title here..." {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
               <Tiptap value={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>price</FormLabel>
              <FormControl>
                  <Input 
          type="number" 
          placeholder="enter price here..." 
          {...field} 
          value={field.value ?? ""}
          onChange={e => field.onChange(e.target.valueAsNumber)}
          step={100}/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" disabled={isExecuting}>Submit</Button>
      </form>
    </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreteProductForm