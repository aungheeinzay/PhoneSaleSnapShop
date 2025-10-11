
import { auth } from '@/server/auth'
import NavLogo from './nav-logo'
import UserButton from './user-button'

async function AppNav() {
    const session = await auth()
   
    
  return (
    <header className='fixed w-full top-0 z-50 flex justify-between items-center h-16 px-4 py-2 bg-gray-100 shadow-2xl'>
        <NavLogo/>
        <UserButton user={session?.user!} expires={session?.expires!}/>
    </header>
  )
}

export default AppNav