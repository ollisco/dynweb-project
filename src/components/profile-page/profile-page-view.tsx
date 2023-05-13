import React from 'react'
import {
  Box,
  Text,
  Container,
  Paper,
  Stack,
  Autocomplete,
  Loader,
  Button,
  Avatar,
  Group,
} from '@mantine/core'
import { UserCredential } from 'firebase/auth'
import { SelectItem } from '../form/form-presenter'

interface ProfilePageViewProps {
  user: UserCredential | null
  addressSearch: string
  setAddressSearch: (value: string) => void
  addressData: string[]
  addressLoading: boolean

  saveFunction: () => void
}

const ProfilePageView = ({
  user,
  addressSearch,
  setAddressSearch,
  addressData,
  addressLoading,
  saveFunction,
}: ProfilePageViewProps) => {
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
                <Text size='sm' color='dimmed'>
                  &nbsp;{email}
                </Text>
              </Stack>
            </Group>
            <Autocomplete
              value={addressSearch}
              data={addressData}
              onChange={setAddressSearch}
              rightSection={addressLoading ? <Loader size='1rem' /> : null}
              label='Home address'
              placeholder='Drottning Kristinas väg 13'
              name='address'
              filter={() => true} // API filters the data instead of this component
              itemComponent={SelectItem}
            />
            <Group position='right'>
              <Button variant='light' color='blue' size='sm' onClick={saveFunction}>
                Save
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default ProfilePageView
