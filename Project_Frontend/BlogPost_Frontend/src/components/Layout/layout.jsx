import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/header'
import Footer from '../footer/footer'
function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}



export default Layout