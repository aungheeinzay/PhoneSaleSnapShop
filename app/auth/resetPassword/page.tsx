'use client'
import { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm' // <-- သီးသန့် form component ထုတ်ထား

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
