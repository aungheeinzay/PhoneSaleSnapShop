
import Product from '@/components/products';
import { db } from '@/server'

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


  return (
    <div>
      <Product products={porductsWithVariants}/>
    </div>
  )
}

export default Home