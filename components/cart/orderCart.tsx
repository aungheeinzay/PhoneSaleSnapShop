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
interface orderCartProps{
    children:React.ReactNode;
}
function orderCart({children}:orderCartProps) {
  return (
  <Drawer>
  <DrawerTrigger>{children}</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Here is your ordered items</DrawerTitle>
      <DrawerDescription>here you can buy by one click.</DrawerDescription>
    </DrawerHeader>
    <OrderedCart/>
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