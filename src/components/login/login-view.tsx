import { Paper, Button, Stack, Image, createStyles, rem, Title } from '@mantine/core'
import { FcGoogle } from 'react-icons/fc'
import LOGO from '../../assets/logo.svg'

interface LoginViewProps {
  onSignIn: () => void
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1552313573-45b8084e7fe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80)',
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
}))

const LoginView = ({ onSignIn }: LoginViewProps) => {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Stack align='center' justify='center' spacing='lg' h='80vh'>
          <Image src={LOGO} alt='logo' maw={300} />
          <Title order={2} ta='center' mt='md'>
            Welcome to Komitid!
          </Title>
          <Button onClick={onSignIn} leftIcon={<FcGoogle />} variant='default' color='gray'>
            Continue with Google
          </Button>
        </Stack>
      </Paper>
    </div>
  )
}

export default LoginView
