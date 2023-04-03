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
import { useState } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'
import { UserCredential } from '@firebase/auth'
import useAuth from './user-context'

function Login() {
  const [type, toggle] = useToggle(['login', 'register'])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()

  const { setUser } = useAuth()

  function onLogin(user: UserCredential) {
    setUser(user)
    navigate('/hello')
  }

  function onError(message?: unknown) {
    if (typeof message === 'string') setErrorMessage(message)
    else setErrorMessage('Something went wrong when authenticating with Google')
  }

  return (
    <Box mih='100vh'>
      <Box pos='relative'>
        <Image src={BG} height='100vh' w='100vw' fit='cover' sx={{ filter: 'blur(2px)' }} />
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
              Welcome to Komitid, please {type} with Google
            </Text>
            {errorMessage && (
              <Alert
                title='Login Failed'
                color='red'
                withCloseButton
                icon={<IconAlertCircle size={16} />}
                onClose={() => setErrorMessage(null)}
              >
                {errorMessage}
              </Alert>
            )}
            <Group grow mb='md' mt='md'>
              <GoogleButton radius='xl' onLogin={onLogin} onError={onError}>
                Google
              </GoogleButton>
            </Group>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
