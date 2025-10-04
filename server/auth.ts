import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "."
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/types/login-schema"
import bcrypt from 'bcrypt'
import { eq } from "drizzle-orm"
import { accounts, users } from "./schema"


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session:{strategy:"jwt"},
  secret:process.env.AUTH_SECRET,
  callbacks:{
     async session({session,token}){
      if(session && token.sub){
        session.user.id=token.sub
      }
      if(session.user && token.role){
        session.user.role=token.role as string
      }
      if(session.user && token.isTwoFactorFectorEnabled){
        session.user.isTwoFactorEnabled=token.isTwoFactorFectorEnabled as boolean
      }
      session.user.email=token.email as string
      session.user.name=token.name as string
      session.user.image = token.image as string
      session.user.isOauth=token.isOauth as boolean
      session.user.imageKey=token.imageKey as string
      session.user.isTwoFactorEnabled=token.isTwoFactorEnabled as boolean
      return session
    },
    async jwt({token}){
      if(!token.sub)return token
      //check user
      const exitingUser = await db.query.users.findFirst({where:eq(users.id,token.sub)})
      if(!exitingUser)return token
      //check account
      const exitingAccount = await db.query.accounts.findFirst({where:eq(accounts.userId,token.sub)})
      //new custom token
      token.isOath = !!exitingAccount
      token.name=exitingUser.name
      token.email=exitingUser.email
      token.role=exitingUser.role
      token.image=exitingUser.image
      token.imageKey=exitingUser.imageKey
      token.isTwoFactorEnabled=exitingUser.isTwoFactorEnabled
      return token
    },
   
  },
  providers: [
    Google({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET,
        allowDangerousEmailAccountLinking:true,
              profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },

    }),
    GitHub({
        clientId:process.env.AUTH_GITHUB_ID,
        clientSecret:process.env.AUTH_GITHUB_SECRET,
        allowDangerousEmailAccountLinking:true,
        profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    Credentials({
  authorize: async (credentials) => {
    const validatedData = loginSchema.safeParse(credentials)
    if (!validatedData.success) return null

    const { email, password } = validatedData.data
    if (!email || !password) return null

    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    
    if (!user || !user.password) return null

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return null
    return user
  }
})

  ],
})