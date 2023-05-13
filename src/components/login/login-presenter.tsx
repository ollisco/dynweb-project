import { observer } from 'mobx-react'
import { UserCredential } from 'firebase/auth'
import LoginView from './login-view'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginPresenterProps {
  user: UserCredential | null
  signIn: () => void
}

const LoginPresenter = observer((props: LoginPresenterProps) => {

  const navigate = useNavigate()


  useEffect(() => {
    if (props.user) navigate('/')
  }, [props.user])



  return <LoginView onSignIn={props.signIn} />
})

export default LoginPresenter
