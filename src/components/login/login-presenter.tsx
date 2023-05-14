import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCredential } from 'firebase/auth'
import LoginView from './login-view'

interface LoginPresenterProps {
  user: UserCredential | null
  signIn: () => void
}

const LoginPresenter = ({ user, signIn }: LoginPresenterProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return <LoginView onSignIn={signIn} />
}

export default LoginPresenter
