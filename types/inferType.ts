import {
    BuildQueryResult,
    DBQueryConfig,
   type ExtractTablesWithRelations
} from "drizzle-orm"
import * as schema from "@/server/schema"
import * as z from "zod"


type Schema = typeof schema
type TSchema = ExtractTablesWithRelations<Schema>

export type includeRelation<TableName extends keyof TSchema> = DBQueryConfig<
"one" | "many",
boolean,
TSchema,
TSchema[TableName]
>["with"]

export type InferResultType<
TableName extends keyof TSchema,
With extends includeRelation<TableName> | undefined = undefined> = BuildQueryResult<
TSchema,
TSchema[TableName],{
    with:With
}>

export type VariantsWithImagesTags = InferResultType<
"productVariant",
{variantImages:true,variantTags:true}>

export type ProductsWithVariants = InferResultType<
"products",
{productVariants:true}>

export type VariantsWithProduct = InferResultType<
"productVariant",
{variantTags:true,variantImages:true,product:true}>

export const variantSchema = z.object({
    productID:z.number(),
    id:z.number().optional(),
    editMode:z.boolean(),
    color:z.string(),
    tag:z.array(z.string()).min(1,{message:"at least one tag"}),
    productType:z.string(),
    variantImage:z.array(
        z.object({
            url:z.string().url(),
            size:z.number(),
            key:z.string().optional(),
            id:z.number().optional(),
            name:z.string()
        })
    )
})

