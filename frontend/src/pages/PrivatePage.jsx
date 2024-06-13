import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivatePage = () => {
    const {userInfo} = useSelector(state => state.auth)
    return (
      <>
        {userInfo ? <Outlet/> : <Navigate to="/" replace/>}
      </>
    )
}

export default PrivatePage
