import { CartItemType } from "@/store/card-store";

export const caculatingTotal=(cart:CartItemType[]):number=>{
    const totalValue = cart.reduce((total,item)=>{
        return total+item.varinat.quantity*item.price
    },0)
    return totalValue
}