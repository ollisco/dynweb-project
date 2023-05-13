import { UserCredential } from 'firebase/auth'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

interface RequireAuthProps {
  user: UserCredential | null
}

const RequireAuth = ({ user }: RequireAuthProps) => {
  const location = useLocation()


  if (user) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth
