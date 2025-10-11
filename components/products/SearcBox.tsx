"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { VariantsWithProduct } from '@/types/inferType'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation'
type searchBoxProps={
    productWithVariant:VariantsWithProduct[]
}
function SearcBox({productWithVariant}:searchBoxProps) {
    const [search,setSearch] = useState("")
    const[searchResults,setSearchResult] = useState<VariantsWithProduct[]>([])
    const router = useRouter()
    useEffect(()=>{
       if(search!==""){
         const filteredProducts=productWithVariant.filter((product)=>{
        const searchTerm = search.toLowerCase()
        const itemName = product.product.title.toLowerCase() || ""
        return itemName.includes(searchTerm)
        
    })
    setSearchResult(filteredProducts)
       }else{
        setSearchResult([])
       }
    },[search])
  return (
    <main className=' my-10 ms-10'>
        <div className='relative group'>
            <Input placeholder='search the product...' className='ps-10'
            value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <Search size={24} className='absolute top-1/2 -translate-y-1/2  left-2'/>
        </div>
    {
     searchResults.length>0 && <section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-2xl bg-white w-5/12 flex flex-col items-center gap-2 py-2 px-4'>
          <Table >
          <TableBody>
    {
        searchResults.map((p,i)=>(

    <TableRow key={i} className='cursor-pointer' onClick={()=>router.push(`/product/${p.id}?productID=${p.product.id}&productType=${p.productType}&image_url=${p.variantImages[0]?.image_url}&title=${p.product.title}&price=${p.product.price}&vid=${p.id}&color=${p.color}`)}>
      <TableCell className="font-medium"> <Image src={p.variantImages[0].image_url} alt='img' width={40} height={40} className='rounded-full '/></TableCell>
      <TableCell><p>{p.product.title}</p></TableCell>
      <TableCell> 
                <p>{p.product.price}</p></TableCell>
    </TableRow>


           
        ))
    }
      </TableBody>
    </Table>
     </section>
    }
    {
        (search.length>0 && searchResults.length===0) && <p className='text-red-400'>no product found</p>
    }
    </main>
  )
}

export default SearcBox