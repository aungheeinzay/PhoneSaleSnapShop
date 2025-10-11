"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { changeOrderStatus } from "@/server/actions/order"
function ChangeStatus({id}:{id:number}) {
  return (
   <DropdownMenu>
  <DropdownMenuTrigger className='bg-primary px-2 py-1 rounded-md cursor-pointer'>change status</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>changeOrderStatus({id,status:"pending"})}>pending</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>changeOrderStatus({id,status:"completed"})}>completed</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>changeOrderStatus({id,status:"canceled"})}>canceled</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default ChangeStatus