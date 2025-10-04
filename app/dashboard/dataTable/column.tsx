"use client"

import { AvatarFallback, AvatarImage,Avatar } from "@/components/ui/avatar"


export type Product= {
  id: number
  price: number
  title:string
  image:{
    id?: number;
    name?: string;
    variantID?: number;
    image_url?: string;
    size?: string;
    order?: number;
    key?: string | null;
  }[];
  variants?:VariantsWithImagesTags[]
}

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CirclePlus, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { deleteProduct } from "@/server/actions/product"
import { toast } from "sonner"
import { VariantsWithImagesTags } from "@/types/inferType"
import VariantDialog from "@/components/products/variant-dialog"
import { title } from "process"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => {
      const image = row.getValue("image") as {
    id?: number;
    name?: string;
    variantID?: number;
    image_url?: string;
    size?: string;
    order?: number;
    key?: string | null;
  }[] 
 
      return <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
          {
            image.map((img,i)=>(
              <Avatar key={i}>
                <AvatarImage src={img.image_url}></AvatarImage>
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            ))
          }
      </div>
    },
  },
  {
    accessorKey:"variants",
    header:"variants",
    cell:({row})=>{
      const variants = row.getValue("variants") as VariantsWithImagesTags[]   
      
      return <div className="flex items-center">
        {
          variants?.map((variant)=>(
          
              <VariantDialog editMode={true} productID={row.getValue("id")} key={variant.id} variant={variant}>
                <div className="w-[20px] h-[20px] rounded-full "style={{background:variant.color}}></div>
              </VariantDialog>
          ))
        }
       <VariantDialog editMode={false} productID={row.getValue("id")}>
         <CirclePlus className="font-light text-gray-500 cursor-pointer hover:text-black duration-100"/>
       </VariantDialog>
      </div>
    }
  },
  {
    accessorKey:'title',
    header:"name",
    cell:({row})=>{
        const name = row.getValue("title") as string
        console.log(title);
        
        return <p>{name}</p>
    }
  },
  {
    accessorKey: "price",
    header:({column})=>{
        return (
            <Button
            className=""
            variant={"ghost"}
            onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}>
                PRICE
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-start ps-2 font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    header:'actions',
    cell: ({ row }) => {
        const id = row.getValue("id")
        const deleting = async (id:number)=>{
         const res =  await deleteProduct(id)
         if(res.error){
            toast.success(res.error)
         }
         if(res.success){
            toast.success(res.success)
         }
        }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/dashboard/createProduct?id=${id}`}>edit product</Link></DropdownMenuItem>
            <DropdownMenuItem className="text-red-500"
            onClick={()=>deleting(Number(id))}>delete product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]