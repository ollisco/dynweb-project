import React from 'react'
import { Navigate } from 'react-router-dom'

interface LogoutProps {
  logoutFunction: () => void
}

const Logout = ({ logoutFunction }: LogoutProps) => {
  logoutFunction()
  return <Navigate to='/login' />
}

export default Logout
