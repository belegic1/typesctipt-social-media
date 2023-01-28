import { NextPageContext } from 'next'
import React, { ReactNode } from 'react'
import Navbar from './Navbar/Navbar'

const Layout: React.FC = ({ children }) => {
  return (
      <>
          <Navbar />
          {children}
      </>
  )
}

export default Layout