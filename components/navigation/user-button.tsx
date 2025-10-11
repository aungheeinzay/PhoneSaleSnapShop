'use client'
import { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChartNoAxesColumn, CircleUserRound, LayoutDashboard, LogOut, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { CiDeliveryTruck } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import OrderCart from "../cart/orderCart"
import { useCartStore } from "@/store/card-store"
import { useRouter } from "next/navigation"
 function UserButton({user}:Session) {
const orderCount = useCartStore((state)=>state.cart.length)
const router =useRouter()
  return (
<div className="flex gap-12 items-center">
  <OrderCart>
    <div className="relative cursor-pointer">
    <span className="absolute -top-5 -right-5 px-1 py-1 rounded-full bg-primary text-white">{orderCount}</span>
    <ShoppingCart className="text-primary text-4xl"/>
  </div>
  </OrderCart>
{
    user ? <DropdownMenu>
  <DropdownMenuTrigger><Avatar className="scale-120 cursor-pointer bg-primary">
   <AvatarImage src={user?.image ?? ""}/>
  <AvatarFallback className="bg-primary text-white">{user?.name?.slice(0,2)}</AvatarFallback>
</Avatar></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>
        <div className="grid-cols-3 flex items-center bg-gray-100 gap-2 p-2 rounded-md">
            <Avatar className="scale-120 cursor-pointer col-span-1">
  <AvatarImage src={user.image ?? ""} />
  <AvatarFallback className="bg-primary text-white">{user?.name?.slice(0,2)}</AvatarFallback>
</Avatar>
<div className="col-span-2">
    <p className="font-bold ">{user?.name}</p>
    <p className="font-light text-md">{user?.email}</p>
</div>
        </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem></DropdownMenuItem>
    <DropdownMenuItem className="group " onClick={()=>router.push("/dashboard/order")}><CiDeliveryTruck className="group-hover:text-primary group-hover:translate-x-1 duration-100"/> <span className="group-hover:text-primary">My order</span></DropdownMenuItem>
    <DropdownMenuItem className="group" asChild ><Link href={"/dashboard/setting"}><IoSettingsOutline className="group-hover:text-primary group-hover:rotate-180 group-hover:translate-x-1 duration-100 "/> <span className="group-hover:text-primary">Setting</span></Link></DropdownMenuItem>
  {
    user.role==='admin' &&   <DropdownMenuItem className="group" asChild ><Link href={"/dashboard/dataTable"}><LayoutDashboard className="group-hover:text-primary group-hover:rotate-180 group-hover:translate-x-1 duration-100 "/> <span className="group-hover:text-primary">DataTable</span></Link></DropdownMenuItem>
  }
  {
    user.role==='admin' &&   <DropdownMenuItem className="group" asChild ><Link href={"/dashboard/analysis"}><ChartNoAxesColumn className="group-hover:text-primary group-hover:translate-x-1 duration-100 "/> <span className="group-hover:text-primary">analysis</span></Link></DropdownMenuItem>
  }
    <DropdownMenuItem onClick={()=>signOut()}
     className="text-red-600"><LogOut className="text-red-600" size={20}/>logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> : <Link href="auth/login" className="">
  <CircleUserRound 
    className="text-gray-700" 
    size={30} 
  />
</Link>
}
</div>
  )
}

export default UserButton