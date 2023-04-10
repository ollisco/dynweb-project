import { useToggle, upperFirst } from '@mantine/hooks'
import GoogleButton from '../basic/googlebutton'
import {
  Text,
  Paper,
  Group,
  PaperProps,
  Center,
  Box,
  Stack,
  BackgroundImage,
  Image,
  Overlay,
  Alert,
} from '@mantine/core'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'
import { UserCredential } from '@firebase/auth'
import useAuth from './user-context'
import LoginView from './login-view'
import Model from '../../Model'
import { observer } from 'mobx-react'

interface LoginPresenterProps {
  model: Model
}

const LoginPresenter = observer(({ model }: LoginPresenterProps) => {
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { user, setUser } = useAuth()
  useEffect(() => {
    if (model.user) {
      setUser(model.user)
    }
  }, [model.user, setUser])

  function onSignInACB() {
    model.signIn()
  }

  return <LoginView onSignIn={onSignInACB} user={user} />
  // return <LoginView model={model}/>
})

export default LoginPresenter
