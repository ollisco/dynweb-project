


import { Box, Text, Container, Paper, Stack, Autocomplete, Loader, Checkbox, Button, Alert, Avatar, Group } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates'
import { IconAlertCircle } from '@tabler/icons-react'
import React from 'react'
import UseCalButton from '../calendar-buttons/use-cal-button'
import { useForm } from '@mantine/form'
import { UserCredential } from 'firebase/auth'

interface ProfilePageViewProps {
  user: UserCredential | null
  homeAddress: string
}

const ProfilePageView = ({ user, homeAddress }: ProfilePageViewProps) => {

  console.log(JSON.stringify(user))
  const initials = user?.user.displayName
    ? user.user.displayName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .slice(0, 2)
    : 'UU'

  const userPhotoUrl = user?.user.photoURL ?? ''
  const displayName = user?.user.displayName ?? ''
  const email = user?.user.email ?? ''

  return (
    <Box w='100vw'>
      <Container>
        <Paper m='xl' p='xl' withBorder>
          <Stack spacing='xs'>
            <Group>
              <Avatar alt={initials} src={userPhotoUrl}>
                {initials}
              </Avatar>
              <Stack spacing={0}>
                <Text>{displayName}</Text>
                <Text color='dimmed' size='sm'>{email}</Text>
              </Stack>
            </Group>

            hello
          </Stack>
        </Paper>
      </Container>
    </Box>

  )
}

export default ProfilePageView 