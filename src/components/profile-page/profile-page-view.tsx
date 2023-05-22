import React, { useState } from 'react'
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
  UnstyledButton,
  Center,
  Modal,
  TextInput,
} from '@mantine/core'
import { UserCredential } from 'firebase/auth'
import { AddressItem } from '../form/form-view'
import { IconX } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import RoutineDisplayComponent from './profile-page-item'
import { Routine, Activity } from '../../model'

interface ProfilePageViewProps {
  user: UserCredential | null
  homeAddress: string | undefined
  addressSearch: string
  setAddressSearch: (value: string) => void
  addressData: string[]
  addressLoading: boolean
  saveHomeAddress: () => void
  routines: Routine[] | undefined
  saveRoutines: (routines: Routine[]) => void
}

const ProfilePageView = ({
  user,
  homeAddress,
  addressSearch,
  setAddressSearch,
  addressData,
  addressLoading,
  saveHomeAddress,
  routines,
  saveRoutines,
}: ProfilePageViewProps) => {
  const [opened, { open, close }] = useDisclosure(false)

  const [newRoutineName, setNewRoutineName] = useState<string>('')
  const [newRoutineError, setNewRoutineError] = useState<string>('')

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

  const onCreateRoutine = () => {
    if (!newRoutineName) {
      setNewRoutineError('Name is required')
      return
    }
    const newRoutine = {
      name: newRoutineName,
      activities: [],
    }
    const newRoutines = routines ? [...routines, newRoutine] : [newRoutine]
    setNewRoutineName('')
    setNewRoutineError('')
    saveRoutines(newRoutines)
    close()
  }

  const onUpdate = (index: number, activities: Activity[]) => {
    const newRoutines = routines ? [...routines] : []
    newRoutines[index].activities = activities
    saveRoutines(newRoutines)
  }

  const onRemoveRoutine = (index: number) => {
    const newRoutines = routines ? [...routines] : []
    newRoutines.splice(index, 1)
    saveRoutines(newRoutines)
  }

  return (
    <Box w='100%'>
      <Container px={0} size='sm'>
        <Paper p='xl' withBorder>
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
            <Group align='flex-end' mt='md'>
              <Stack spacing={0} sx={{ flexGrow: 1 }}>
                <Text weight={500} size='xl'>
                  Home Address
                </Text>
                <Autocomplete
                  value={addressSearch}
                  data={addressData}
                  onChange={setAddressSearch}
                  rightSection={
                    addressLoading ? (
                      <Loader size='1rem' />
                    ) : (
                      <Center sx={{ visibility: addressSearch ? 'visible' : 'hidden' }}>
                        <UnstyledButton onClick={() => setAddressSearch('')}>
                          <IconX size='1rem' />
                        </UnstyledButton>
                      </Center>
                    )
                  }
                  placeholder='Drottning Kristinas väg 13'
                  name='address'
                  filter={() => true} // API filters the data instead of this component
                  itemComponent={AddressItem}
                />
              </Stack>
              <Button
                variant='light'
                color='blue'
                size='sm'
                onClick={saveHomeAddress}
                disabled={homeAddress === addressSearch}
              >
                Save
              </Button>
            </Group>

            <Stack spacing={0} mt='md'>
              <Text weight={500} size='xl'>
                Routines
              </Text>
              <Text size='sm' color='dimmed'>
                Add routines to your profile to make it easier to plan your commute
              </Text>
            </Stack>
            <Stack>
              {routines?.map((routine, index) => (
                <RoutineDisplayComponent
                  key={index}
                  index={index}
                  onUpdateActivities={onUpdate}
                  onRemoveRoutine={onRemoveRoutine}
                  name={routine.name ?? 'NO NAME'}
                  activities={routine.activities}
                />
              ))}
              <UnstyledButton onClick={open}>
                <Text
                  // px='xl'
                  color='blue.6'
                  sx={{
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  + Add new routine
                </Text>
              </UnstyledButton>
            </Stack>
          </Stack>
        </Paper>
      </Container>
      <Modal title='Create Routine' opened={opened} onClose={close}>
        <Stack>
          <TextInput
            label='Routine'
            placeholder='Routine name'
            required
            value={newRoutineName}
            error={newRoutineError}
            onChange={(event) => {
              setNewRoutineName(event.currentTarget.value)
              setNewRoutineError('')
            }}
          />
          <Group position='right'>
            <Button onClick={onCreateRoutine} variant='light'>
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  )
}

export default ProfilePageView
