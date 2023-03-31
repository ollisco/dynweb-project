
import { Button, ButtonProps} from '@mantine/core';
import GoogleIcon from './googleicon';
import { signInWithGoogle } from '../../Firebase';

function GoogleButton(props: ButtonProps) {
  return <Button onClick={signInWithGoogle} leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export default GoogleButton