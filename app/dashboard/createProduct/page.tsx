import { auth } from "@/server/auth"
import CreateProductForm from "./creteProductForm"
import React from 'react'
import { redirect } from "next/navigation"

async function createProduct() {
    const session = await auth()
    if(session?.user.role !== "admin")return redirect("/dashboard/setting") 
        
  return (
    <div>
       <CreateProductForm/>
    </div>
  )
}

export default createProduct