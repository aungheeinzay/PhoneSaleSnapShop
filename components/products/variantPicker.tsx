"use client"
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface variantPickerProps{
    id:number
    color:string
    productType:string
    title:string
    price:number
    productID:number
    image:string
    vid:number
}
function VariantPicker({color,productID,productType,price,image,title,vid}:variantPickerProps) {
    const router = useRouter()
    const searchParams =  useSearchParams()
    const type= searchParams.get("productType") || productType
    console.log("type",type);
    console.log(productType);
    
    
  return (
  
        <div style={{background:color}}
    className={cn("w-5 h-5 rounded-full cursor-pointer ",
      type===productType ? "opacity-100" : "opacity-20"
    )}
    onClick={()=>router.push(`/product/${vid}?productID=${productID}&productType=${productType}&image_url=${image}&title=${title}&price=${price}&vid=${vid}&color=${color}`,{scroll:false})}></div>
  )
}

export default VariantPicker