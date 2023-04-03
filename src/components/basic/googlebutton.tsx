import { Button, ButtonProps } from '@mantine/core'
import GoogleIcon from './googleicon'
import { signInWithGoogle } from '../../Firebase'
import { UserCredential } from '@firebase/auth'

interface GoogleButtonProps extends ButtonProps {
  onLogin: (user: UserCredential) => void
  onError: (error: unknown) => void
}

function GoogleButton(props: GoogleButtonProps) {
  const { onLogin, onError } = props

  function signInClick() {
    signInWithGoogle(onLogin, onError)
  }

  return (
    <Button
      onClick={signInClick}
      leftIcon={<GoogleIcon />}
      variant='default'
      color='gray'
      {...props}
    />
  )
}

export default GoogleButton
