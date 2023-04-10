import React, { useState, useEffect } from 'react'
import GoogleButton from '../basic/googlebutton'
import {
  Text,
  Paper,
  Group,
  PaperProps,
  Center,
  Box,
  Button,
  Stack,
  BackgroundImage,
  Image,
  Overlay,
  Alert,
} from '@mantine/core'
//import BG from '../../assets/bg.jpg'

import { useNavigate } from 'react-router'
import { IconAlertCircle } from '@tabler/icons-react'
import { UserCredential } from '@firebase/auth'
import Model from '../../Model'
import GoogleIcon from '../basic/googleicon'
import { observer } from 'mobx-react'

interface LoginViewProps {
  onSignIn: () => void
  user: UserCredential | null
  //model: Model
}

function LoginView({ onSignIn, user }: LoginViewProps) {
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('current user', user)
    if (user) {
      navigate('/form')
    }
  }, [user])

  function onSignInACB() {
    onSignIn()
  }

  // function onError(message?: unknown) {
  //   if (typeof message === 'string') setErrorMessage(message)
  //   else setErrorMessage('Something went wrong when authenticating with Google')
  // }

  return (
    <Box mih='100vh'>
      <Box pos='relative'>
        {/* <Image src={BG} height='100vh' w='100vw' fit='cover' sx={{ filter: 'blur(2px)' }} /> */}
        <Paper
          top='50%'
          left='50%'
          pos='absolute'
          sx={{
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
          radius='md'
          p='md'
          withBorder
        >
          <Stack justify='space-between' h='100%'>
            <Text size='lg' weight={500}>
              Welcome to Komitid, please login with Google
            </Text>
            {/* {props.errorMessage && (
                  <Alert
                    title='Login Failed'
                    color='red'
                    withCloseButton
                    icon={<IconAlertCircle size={16} />}
                    onClose={() => setErrorMessage(null)}
                  >
                    {errorMessage}
                  </Alert>
                )} */}
            <Group grow mb='md' mt='md'>
              <Button
                onClick={onSignInACB}
                leftIcon={<GoogleIcon />}
                variant='default'
                color='gray'
              />
            </Group>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default LoginView
