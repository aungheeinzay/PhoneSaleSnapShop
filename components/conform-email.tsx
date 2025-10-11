'use client'

import AuthForm from '@/components/auth/auth-form'
import { conformEmail } from '@/server/actions/token'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

export default function ConformEmail() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleVerify = useCallback(() => {
    if (!token) {
      setError('Invalid token')
      return
    }

    conformEmail(token).then((res) => {
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess(res.success!)
        router.push('/auth/login')
      }
    })
  }, [token, router])

  useEffect(() => {
    handleVerify()
  }, [handleVerify])

  return (
    <AuthForm
      formTitle='Confirm Email'
      formDescription='We are confirming your email address'
      showProvider={false}
      actionHref='/'
    >
      <div>
        {!success && !error && <p className='text-4xl text-gray-500'>Verifying email...</p>}
        {success && <p className='text-4xl text-green-600'>{success}</p>}
        {error && <p className='text-4xl text-red-500'>{error}</p>}
      </div>
    </AuthForm>
  )
}
