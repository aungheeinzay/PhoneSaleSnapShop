'use client'
import Link from 'next/link'
import React from 'react'

function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 h-fit py-2">
      <img src="/shop.png" alt="logo" className="w-[100px]" />
    </Link>
  )
}

export default NavLogo
