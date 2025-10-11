
import { db } from "@/server"
import { columns} from "./column"
import { DataTable } from "./dataTable"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { redirect } from "next/navigation"
import { auth } from "@/server/auth"


export default async function DemoPage() {
  const product = await db.query.products.findMany({
      with:{
        productVariants:{
          with:{variantTags:true,variantImages:true}
        }
      },
    orderBy:(products,
      {desc})=>[desc(products.id)]
  })
const productData = product.map((p)=>{
  if(p.productVariants.length===0){
    return{
        id:p.id,
        title:p.title,
        price:p.price,
        image:[{
          image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s"
        }],
        variants:[]
    }

  }else{
    return {
    id:p.id,
    title:p.title,
    price:p.price,
    image:p.productVariants[0]?.variantImages,
    variants:p.productVariants
  }
  }
    
})
  const session = await auth()
   if(session?.user.role!=="admin")return redirect("/")
  return (
    <div className="container mx-auto py-10 w-11/12">
        <Card>
  <CardHeader>
    <CardTitle>Products Table</CardTitle>
  </CardHeader>
  <CardContent>
    <DataTable columns={columns} data={productData} />
  </CardContent>
</Card>
      
    </div>
  )
}