import { observer } from 'mobx-react'
import { UserCredential } from 'firebase/auth'
import LoginView from './login-view'

interface LoginPresenterProps {
  user: UserCredential | null
  signIn: () => void
}

const LoginPresenter = observer((props: LoginPresenterProps) => {


  return <LoginView onSignIn={props.signIn} />
})

export default LoginPresenter
