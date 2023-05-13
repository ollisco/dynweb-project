import {
  Box,
  Text,
  Container,
  Paper,
  Stack,
  Autocomplete,
  Loader,
  Checkbox,
  Button,
  Alert,
  Avatar,
  Group,
} from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates'
import { IconAlertCircle, IconMapPin, IconPin } from '@tabler/icons-react'
import React from 'react'
import UseCalButton from '../calendar-buttons/use-cal-button'
import { useForm } from '@mantine/form'
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
              required
              filter={() => true} // API filters the data instead of this component
              itemComponent={SelectItem}
              // error={props.originAddressError}
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
