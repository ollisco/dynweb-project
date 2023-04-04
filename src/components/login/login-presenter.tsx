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
import BG from '../../assets/bg.jpg'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'
import { UserCredential } from '@firebase/auth'
import useAuth from './user-context'
import LoginView from './login-view'
import Model from '../../Model'

interface LoginPresenterProps {
  model: Model
}

function LoginPresenter({ model }: LoginPresenterProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  console.log(model, 'm')
  const navigate = useNavigate()

  return <LoginView signIn={model.signIn} user={model.user} />
}

export default LoginPresenter
