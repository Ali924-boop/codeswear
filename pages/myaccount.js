import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Myaccount = () => {
    const router = useRouter()
    
      useEffect(() => {
              if(!localStorage.getItem('token')){
                router.push('/')
              }
            }, [router.query])
  return (
    <div>Myaccount</div>
  )
}

export default Myaccount