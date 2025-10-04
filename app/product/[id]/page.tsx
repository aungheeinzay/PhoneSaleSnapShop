import { formatPrice } from '@/lib/formatPrice'
import { db } from '@/server'
import { productVariant } from '@/server/schema'
import { eq } from 'drizzle-orm'
import VariantPicker from '@/components/products/variantPicker'

type singleProductPorps={
    params:{
        id:number
    }
}

export async function generateStaticParams(){
    const data = await db.query.productVariant.findMany({
        with:{
            variantImages:true,
            variantTags:true,
            product:true
        },
  orderBy:(productVariant,
      {desc})=>[desc(productVariant.id)]
    })
if(data){
const idArr = data.map(d=>({
    id:d.id.toString()
}))
return idArr
}
return []
}
async function ProductDetals({params}:singleProductPorps) {
const product = await db.query.productVariant.findFirst({
    where:(eq(productVariant.id,params.id)),
    with:{
        product:{
            with:{
                productVariants:{
                    with:{
                        variantImages:true,
                        variantTags:true
                    }
                }
            }
        }
    }
})
console.log(product);

  return (
    <section className='mt-5'>
        {
            product && <div className='grid grid-cols-2'>
                <div>

                </div>
                <div>
                <p className='text-2xl font-bold'>{product.product.title}</p>
                <p>{product.productType} variant</p>
               
                <p className='font-bold '>{formatPrice(product.product.price)}</p>
                <div dangerouslySetInnerHTML={{__html:product.product.description}}/>
                <div>
                    <p className='font-bold'>Color</p>
                <div className='flex gap-2'>
                    {
                    product.product.productVariants.map((v)=>(
                        <VariantPicker key={v.id} {...v}
                         title={product.product.title}
                         price={product.product.price}
                         productID={v.id}
                         color={v.color}
                         image={v.variantImages[0]?.image_url}
                         />
                    ))
                }
                </div>
                </div>
               </div>
                
                </div>
        }
    </section>
  )
}

export default ProductDetals