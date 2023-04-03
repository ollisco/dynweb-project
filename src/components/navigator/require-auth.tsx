import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import useAuth from '../login/user-context'

const RequireAuth = () => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth
