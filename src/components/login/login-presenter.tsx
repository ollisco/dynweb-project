import { observer } from 'mobx-react'
import { UserCredential } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import useAuth from './user-context'
import LoginView from './login-view'

interface LoginPresenterProps {
  user: UserCredential | null
  signIn: () => void
}

const LoginPresenter = observer((props: LoginPresenterProps) => {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (props.user) {
      setUser(props.user)
      navigate('/')
    }
  }, [props.user])

  return <LoginView onSignIn={props.signIn} />
})

export default LoginPresenter
