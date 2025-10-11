import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button";
import React from "react"
import OrderedCart from "./orderedCart";
import { useCartStore } from "@/store/card-store";
import CartStatus from "./CartStatus";
import Payment from "./payment";
import Success from "./Success";
interface orderCartProps{
    children:React.ReactNode;
}
function orderCart({children}:orderCartProps) {
    const cartPosition = useCartStore((state)=>state.cartPosition)
  return (
  <Drawer>
  <DrawerTrigger>{children}</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Here is your ordered items</DrawerTitle>
      <DrawerDescription>here you can buy by one click.</DrawerDescription>
    </DrawerHeader>
     <CartStatus/>
    {cartPosition==="Order" && <OrderedCart/>}
    {cartPosition==="Checkout" && <Payment/>}
    {cartPosition==="Success" && <Success/>}
    <DrawerFooter>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  )
}

export default orderCart