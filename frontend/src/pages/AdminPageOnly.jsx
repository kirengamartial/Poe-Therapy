import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminPageOnly = () => {
  const {userInfo} = useSelector(state => state.auth)

  const isUserAdmin = userInfo && userInfo.isAdmin
  return (
    <>
      {isUserAdmin ? <Outlet/> : <Navigate to="/" replace/>}
    </>
  )
}

export default AdminPageOnly
