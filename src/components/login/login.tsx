import { useToggle, upperFirst } from '@mantine/hooks';
import GoogleButton from '../basic/googlebutton';
import {
  Text,
  Paper,
  Group,
  PaperProps,
} from '@mantine/core';



function Login(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Komitid, please {type} with Google
      </Text>
      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>
    </Paper>
  );
}

export default Login