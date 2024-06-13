import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = () => {
  const location = useLocation()
  const isLocation = location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/forgot' && location.pathname !== '/reset-password'
  const isLocationFooter = location.pathname !== '/register' && location.pathname !== '/login'  && location.pathname !== '/forgot'  && location.pathname !== '/reset-password'
  return (
    <>
      <ToastContainer/>
      {isLocation && <Header/>}
      <Outlet/>
      { isLocationFooter && <Footer/>}
    </>
  )
}

export default MainLayout
