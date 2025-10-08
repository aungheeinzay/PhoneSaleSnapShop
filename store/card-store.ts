
import {create} from "zustand"
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
}

export const useCartStore =create<CartType>((set)=>({
    cart:[],
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
    })
}))