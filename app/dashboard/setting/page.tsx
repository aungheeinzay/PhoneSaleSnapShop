import AuthForm from '@/components/auth/auth-form'
import ChangePassword from '@/components/setting/ChangePassword'
import Profile from '@/components/setting/Profile'
import TwoFactor from '@/components/setting/TwoFactor'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'


async function Setting() {
    const session = await auth()
    if(!session?.user)return redirect("/")
  return (
    <AuthForm
    formTitle={`Setting`}
    formDescription='edit your iniformation'
    actionHref=''
    actionLabel=''
    showProvider={false}
    width='sm:w-11/12 md:w-10/12 w-full' >
    <div className='grid sm:grid-cols-2 gap-2'>
        <div className='col-span-1'>
        <Profile session={session}/>
        </div>
       {
        !session.user.isOauth && 
         <div className='col-span-1 grid gap-2'>
        <ChangePassword email={session.user.email!}/>
     <TwoFactor isTwofactorEnabled={session.user.isTwoFactorEnabled} userId={session.user.id}/>
        </div>
       }
    </div>
    </AuthForm>
  )
}

export default Setting