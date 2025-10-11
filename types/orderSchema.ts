import * as z from "zod"

export const createOrderSchema = z.object({
    totalPrice:z.number(),
    status:z.enum(["pending","completed","canceled"]),
    paymentID:z.string(),
    products:z.array(z.object({
        productID:z.number(),
        quantity:z.number(),
        variantID:z.number()
    }))
})