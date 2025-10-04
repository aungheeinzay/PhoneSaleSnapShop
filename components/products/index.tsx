import { VariantsWithProduct } from '@/types/inferType'

import React from 'react'
import { Card, CardContent } from '../ui/card';
import { formatPrice } from '@/lib/formatPrice';
import Link from 'next/link';

interface productProps{
    products:VariantsWithProduct[]
}
function Product({products}:productProps) {
    
  return (
    <main>
      <div className='list-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
    {
      products.map((p)=>(
       <Link  key={p.id} href={`/product/${p.id}?productID=${p.product.id}&productType=${p.productType}&imge_url=${p.variantImages[0]?.image_url}&title=${p.product.title}&price=${p.product.price}&color=${p.color}`}>
        <Card className='hover:shadow-2xl'>
          <CardContent className='flex flex-col flex-center items-center'>
            <div className='w-[250px] h-[250px] overflow-hidden rounded-md'>
              <img src={p.variantImages[0]?.image_url} alt="img"  className='object-contain '/>
            </div>
            <div className='w-full text-start text-xl  pt-2 border-t-2'>
              <p>{p.product.title}</p>
              <p>{formatPrice(p.product.price)}</p>
            </div>
          </CardContent>
        </Card>
       </Link>
      ))
    }
      </div>
    </main>
  )
}

export default Product