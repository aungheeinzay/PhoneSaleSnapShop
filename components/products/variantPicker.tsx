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
}
function variantPicker({id,color,productID,productType,price,image,title}:variantPickerProps) {
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
    onClick={()=>router.push(`/product/${id}?productID=${productID}}&productType=${productType}&imge_url=${image}&title=${title}&price=${price}&color=${color}`,{scroll:false})}></div>
  )
}

export default variantPicker