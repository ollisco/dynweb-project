import { Text, Paper, Group, Box, Button, Stack, Image } from '@mantine/core'
import GoogleIcon from '../basic/googleicon'

interface LoginViewProps {
  onSignIn: () => void
}

function LoginView({ onSignIn }: LoginViewProps) {
  return (
    <Box mih='100vh'>
      <Box pos='relative'>
        <Image
          src={'/assets/background.jpg'}
          width='100vw'
          height='100vh'
          fit='cover'
          sx={{ filter: 'blur(5px)' }}
        />
        <Paper
          top='50%'
          left='50%'
          pos='absolute'
          sx={{
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
          radius='md'
          p='xl'
          withBorder
        >
          <Stack spacing='xs' justify='space-between' h='100%'>
            <Text size='lg' weight={500} ta='center' fz='xl' fw={700}>
              Welcome to Komitid!
            </Text>
            <Group grow mb='md' mt='md'>
              <Button
                onClick={onSignIn}
                leftIcon={<GoogleIcon />}
                variant='default'
                color='gray'
                radius='xl'
              >
                Continue with Google
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default LoginView
