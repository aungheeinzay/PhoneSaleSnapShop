import { variantSchema } from '@/types/inferType'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import z from 'zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UploadDropzone } from '@/app/api/uploadthing/uploadthing'
import { X } from 'lucide-react'


function VariantImage() {
    const {control,getValues,setError,formState:{errors}} = useFormContext<z.infer<typeof variantSchema>>()
    const {fields,append,remove,update} =useFieldArray({
        control,
        name:"variantImage"
    })
    
  return (
      <div>
        <FormField
          control={control}
          name="variantImage"
          render={({field }) => (
            <FormItem>
              <FormLabel>Variant images</FormLabel>

              <FormDescription>
                You can upload multiple 30 images at once
              </FormDescription>
              <FormControl>
               <UploadDropzone endpoint={"variantImageUploader"}
               className='ut-button:bg-primary ut-label:text-primary ut-allowed-content:text-primary cursor-pointer'
               onBeforeUploadBegin={(files)=>{
                files.forEach((file)=>{
                    append({
                        name:file.name,
                        size:file.size,
                        url:URL.createObjectURL(file)
                    })
                })
                return files
               }}  
               onUploadError={(error)=>{
                setError("variantImage",{
                    type:"validate",
                    message:error.message
                })
               }}
               onClientUploadComplete={(data)=>{
                const variantImages = getValues("variantImage")
                variantImages.forEach((img,index)=>{
                    if(img.url.startsWith("blob:")){
                        const image =data.find(im=>im.name===img.name)
                        if(image){
                            update(index,{
                                url:image.ufsUrl,
                                name:image.name,
                                size:image.size,
                                key:image.key
                            })
                        }
                    }
                })
               }} config={{mode:"auto"}}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2 rounded border flex-wrap'>
            {
          fields.map((field,i)=>(
            <div key={i} className='w-[70px] h-[70px] overflow-hidden relative'>
                <img src={field.url} className={`object-contain
                    ${field.name.startsWith("blob") && "animate-pulse"}`}/>
                <X size={20} className="rounded-full
                 text-white fill-primary absolute top-0 right-0 z-40 bg-primary"
                 onClick={async(e)=>{
                    e.preventDefault()
                    remove(i)
                 }}/>
            </div>
          ))  
        }
        </div>
      </div>
  )
}

export default VariantImage