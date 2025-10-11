
import { set } from "zod"
import {create} from "zustand"
import {persist} from "zustand/middleware"
export type VariantType={
 variantId:number
 quantity:number
}
export interface CartItemType {
    id:number
    name:string
    image:string 
    varinat:VariantType
    price:number
}
export type CartType={
    cart:CartItemType[]
    addToCart:(item:CartItemType)=>void
    removeFromCart:(item:CartItemType)=>void
    cartPosition:"Order" | "Checkout" | "Success"
    setCartPosition:(position:"Order" | "Checkout" | "Success")=>void,
    clearCart:()=>void
}

export const useCartStore =create(persist<CartType>(
    (set)=>({
    cart:[],
    cartPosition:"Order",
    setCartPosition:(position)=>set((state)=>({cartPosition:position})),
    clearCart:()=>set((state)=>({cart:[]})),
    addToCart:(item)=>set((state)=>{
        const exitingCart=state.cart.find((citem)=>citem.varinat.variantId===item.varinat.variantId)
        if(exitingCart){
           const updatedCart = state.cart.map((citem)=>{
            if(item.varinat.variantId===citem.varinat.variantId){
                return {
                    ...citem,
                    varinat:{
                        ...citem.varinat,
                        quantity:item.varinat.quantity+citem.varinat.quantity
                    }
                }
               
            }
             return citem
           })
           return {cart:updatedCart}
        }else{
            return {
                cart:[...state.cart,{...item,varinat:{variantId:item.varinat.variantId,quantity:item.varinat.quantity}}]
            }
        }
    }),
    removeFromCart:(item)=>set((state)=>{
        const updatedCart = state.cart.map((citem)=>{
            if(citem.varinat.variantId===item.varinat.variantId){
                return {
                    ...citem,
                    varinat:{
                        ...citem.varinat,
                        quantity:citem.varinat.quantity-1
                    }
                }
            }
            return citem
        })
        return {cart:updatedCart.filter((citem)=>citem.varinat.quantity>0)}
    })
}),{
    name:"cart-persist"
}
))