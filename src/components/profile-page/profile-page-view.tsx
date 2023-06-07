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
  ActionIcon,
} from '@mantine/core'
import { AddressItem } from '../form/form-view'
import { MdCancel } from 'react-icons/md'
import { useDisclosure } from '@mantine/hooks'
import { Routine, Activity } from '../../model'
import RoutineDisplayComponent from './routine-display/routine-display-component'

interface ProfilePageViewProps {
  userInitials: string
  userPhotoUrl: string
  userDisplayName: string
  userEmail: string
  homeAddress: string | undefined
  addressSearch: string
  setAddressSearch: (value: string) => void
  addressData: string[]
  addressLoading: boolean
  onSaveHomeAddress: () => void
  routines: Routine[] | undefined
  onCreateRoutine: (close: () => void) => void
  onUpdateRoutine: (index: number, activities: Activity[]) => void
  onRemoveRoutine: (index: number) => void
  newRoutineName: string
  setNewRoutineName: (value: string) => void
  newRoutineError: string
  setNewRoutineError: (value: string) => void
}

const ProfilePageView = ({
  userInitials,
  userPhotoUrl,
  userDisplayName,
  userEmail,
  homeAddress,
  addressSearch,
  setAddressSearch,
  addressData,
  addressLoading,
  onSaveHomeAddress,
  routines,
  onUpdateRoutine,
  onRemoveRoutine,
  onCreateRoutine,
  newRoutineName,
  setNewRoutineName,
  newRoutineError,
  setNewRoutineError,
}: ProfilePageViewProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <Box w='100%'>
      <Container px={0} size='sm'>
        <Paper p='xl' withBorder>
          <Stack spacing='xs'>
            <Group>
              <Avatar alt={userInitials} src={userPhotoUrl}>
                {userInitials}
              </Avatar>
              <Stack spacing={0}>
                <Text>{userDisplayName}</Text>
                <Text size='sm' color='dimmed'>
                  &nbsp;{userEmail}
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
                        <ActionIcon onClick={() => setAddressSearch('')}>
                          <MdCancel size='1rem' />
                        </ActionIcon>
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
                onClick={onSaveHomeAddress}
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
                  onUpdateActivities={onUpdateRoutine}
                  onRemoveRoutine={() => onRemoveRoutine(index)}
                  name={routine.name ?? 'NO NAME'}
                  activities={routine.activities}
                />
              ))}
              <UnstyledButton onClick={open}>
                <Text
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
            <Button onClick={() => onCreateRoutine(close)} variant='light'>
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  )
}

export default ProfilePageView
