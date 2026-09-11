import Sidebar from '@/components/Sidebar';
import React from 'react'

const layoutPublic = ({children}: {children: React.ReactNode}) => {
  return (
    <>
       
    <div>{children}</div>
    </>
  )
}

export default layoutPublic