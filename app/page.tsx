
import Product from '@/components/products';
import { db } from '@/server'
import SearcBox from '@/components/products/SearcBox';
import TagFilter from '@/components/products/TagFilter';

async function Home() {
const porductsWithVariants = await db.query.productVariant.findMany({
  with:{
    product:true,
    variantImages:true,
    variantTags:true
  },
  orderBy:(productVariant,
      {desc})=>[desc(productVariant.id)]
})
const tags = porductsWithVariants.map((p)=>p.variantTags.map((v)=>v.tag)).flat()
const uniqueTag = [...new Set(tags)]

  return (
    <div>
      <div className='grid grid-cols-2 gap-4 items-center '>
        <SearcBox productWithVariant={porductsWithVariants}/>
        <TagFilter tags={uniqueTag}/>
      </div>
        <Product products={porductsWithVariants}/>
    </div>
  )
}

export default Home