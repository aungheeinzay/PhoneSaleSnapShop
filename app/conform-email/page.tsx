'use client'
import AuthForm from '@/components/auth/auth-form'
import { conformEmail } from '@/server/actions/token'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

function ConformEmail() {
    const token = useSearchParams().get('token')
    const router = useRouter()
    const [success,setSuccess]=useState('')
    const [error,setError] = useState('')
    const handleVerify =useCallback(()=>{
        if(!token){
            setError('invalid  Token')
        }
       conformEmail(token!).then((res)=>{
        if(res.error){
         setError(res.error)
        }else{
            setSuccess(res.success!)
            return router.push("/auth/login")
        }
       })
    },[])
    useEffect(()=>{
        handleVerify()
    },[])
  return (
    <AuthForm 
    formTitle='Conform Email'
    formDescription='we are conforming it is your own or not'
    showProvider={false}
    actionHref='/'
    >
       <div>
        {!success && !error && <p className='text-4xl text-red-500'>Verifying email...</p>}
        {
            success ? <p className='text-4xl'>{success}</p> :
            <p className='text-4xl text-red-500'>{error}</p>
        }
       </div>
    </AuthForm>
  )
}

export default ConformEmail