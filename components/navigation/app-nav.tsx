"use server"
import { auth } from '@/server/auth'
import NavLogo from './nav-logo'
import UserButton from './user-button'
import { CircleUserRound } from 'lucide-react'
import Link from 'next/link'

async function AppNav() {
    const session = await auth()

  return (
    <header className='fixed w-full top-0 z-50 flex justify-between items-center h-16 px-4 py-2 bg-gray-100 shadow-2xl'>
        <NavLogo/>
      {session?.user ? <UserButton user={session.user} expires={session.expires}/> : <Link href="auth/login" className="">
  <CircleUserRound
    className="text-gray-700" 
    size={30} 
  />
</Link>}
    </header>
  )
}

export default AppNav