import * as z from "zod";

export const productSchema = z.object({
    id:z.number().optional(),
    title:z.string().min(4,{message:"title too short"}).max(30,{message:"title too long"}),
    description:z.string(),
    price:z.number({message:"price must be number"})
})