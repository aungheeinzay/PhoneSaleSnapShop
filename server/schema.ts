import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  serial,
  real,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "@auth/core/adapters"
import {createId} from '@paralleldrive/cuid2'

import { relations } from "drizzle-orm"
export const RoleEnum=pgEnum('role',['admin','user'])
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").unique(),
  password:text('password'),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isTwoFactorEnabled:boolean('isTwoFactor').default(false),
  role:RoleEnum('role').default('user'),
  imageKey:text("imageKey"),
  customerID:text("customerID")
})
 
export const accounts = pgTable(
  "account",
  { 
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const emailVerificationToken = pgTable(
  'email_verification_token',
  {
    id:text('id')
    .notNull()
    .$defaultFn(()=>createId()),
    token:text('token').notNull(),
    expires:timestamp('expires',{mode:'date'}).notNull(),
    email:text("email").notNull()
  },
  (vt)=>({
    compoundKey:primaryKey({columns:[vt.id,vt.token]})
  })
)

export const resetPasswordToken = pgTable(
  'reset-password-token',
  {
    
    id:text('id')
    .notNull()
    .$defaultFn(()=>createId()),
    token:text('token').notNull(),
    expires:timestamp('expires',{mode:'date'}).notNull(),
    email:text("email").notNull()
  },
  (vt)=>({
    compoundKey:primaryKey({columns:[vt.id,vt.token]})
  })

)

export const twoFactorToken = pgTable(
  "two_factor_tokens",
  {
  id:text("id")
  .primaryKey()
  .$defaultFn(()=>createId()),
  token:text('token').notNull(),
  expires:timestamp('expires',{mode:'date'}).notNull(),
  email:text('email').notNull(),
  userId:text('userId').references(()=>users.id,{onDelete:'cascade'})
})

export const products = pgTable('products',{
  id:serial("id").primaryKey(),
  title:text("title").notNull(),
  description:text("description").notNull(),
  price:real('price').notNull(),
  createdAt:timestamp('createdAt',{mode:"date"}).defaultNow()
})

export const productVariant = pgTable(
  "productVariants",{
    id:serial("id").primaryKey(),
    color:text("color").notNull(),
    productType:text("productType").notNull(),
    updated:timestamp("update").defaultNow(),
    productID:integer("productID").notNull().references(
      ()=>products.id,{onDelete:"cascade"}           
    )
  }
)

export const variantTags =pgTable("variantTags",{
  id:serial("id").primaryKey(),
  tag:text("tag").notNull(),
  variantID:serial("variantID").notNull().references(
    ()=>productVariant.id,{onDelete:"cascade"}
  )
})

export const variantImages = pgTable("variantImages",{
  id:serial("id").primaryKey(),
  image_url:text("image").notNull(),
  name:text("name").notNull(),
  size:text("size").notNull(), 
  order:real("order").notNull(),
  key:text("key"),
  variantID:serial("variantID")
  .notNull()
  .references(()=>productVariant.id,{onDelete:"cascade"})
})


export const productRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariant)
}))

export const productVariantRelations = relations(productVariant, ({ one, many }) => ({
  product: one(products, {
    fields:[productVariant.productID],
    references:[products.id],
  }),
  variantImages: many(variantImages),
  variantTags: many(variantTags)
}))


export const variantImagesRelations = relations(variantImages, ({ one }) => ({
  productVariant: one(productVariant, {
    fields:[variantImages.variantID],
    references:[productVariant.id]
  })
}))

export const variantTagsRelations = relations(variantTags,(
  ({one})=>({
    productVariant:one(productVariant,{
      fields:[variantTags.variantID],
      references:[productVariant.id],
    })
  })
))

export const orders = pgTable("orders",{
  id:serial("id").primaryKey(),
  userID:text("userID").notNull().references(()=>users.id,{onDelete:"cascade"}),
  total:real("total").notNull(),
  status:text("status").notNull(),
  created:timestamp("created").defaultNow(),
  receiptURL:text("receiptURL")
})

export const orderProduct = pgTable("orderProduct",{
  id:serial("id").primaryKey(),
  quantity:integer("quantity").notNull(),
  productVariantID:serial("productVariantID")
  .notNull()
  .references(()=>productVariant.id,{onDelete:"cascade"}),
  productID:serial("productID").notNull().references(()=>products.id,{onDelete:"cascade"}),
  orderID:serial("orderID").notNull().references(()=>orders.id,{onDelete:"cascade"})
})

export const userRelations = relations(users,(
  ({many})=>({
    orders:many(orders)
  })
))

export const orderRelations = relations(orders,(
  ({one,many})=>({user:one(users,{
    fields:[orders.userID],
    references:[users.id],
  }),
  orderProduct:many(orderProduct)
})
  
))

export const orderProductRelations=relations(orderProduct,({one})=>({
  order:one(orders,{
    fields:[orderProduct.orderID],
    references:[orders.id]
  }),
  product:one(products,{
    fields:[orderProduct.productID],
    references:[products.id]
  }),
  productVariant:one(productVariant,{
    fields:[orderProduct.productVariantID],
    references:[productVariant.id]
  })
}))

