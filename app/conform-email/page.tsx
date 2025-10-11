'use client'

import { Suspense } from 'react'
import ConformEmail from '@/components/conform-email' 

export default function ConformEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConformEmail />
    </Suspense>
  )
}
