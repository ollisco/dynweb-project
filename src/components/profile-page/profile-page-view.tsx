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
import { SelectItem } from '../form/form-presenter'
import { IconX } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { ItemGroupComp } from './profile-page-components/profile-page-item'
import { ItemGroup, Item } from '../../Model'

interface ProfilePageViewProps {
  user: UserCredential | null
  addressSearch: string
  setAddressSearch: (value: string) => void
  addressData: string[]
  addressLoading: boolean
  saveFunction: () => void
  itemGroups: ItemGroup[] | undefined
  saveGroups: (itemGroups: ItemGroup[]) => void
}

const ProfilePageView = ({
  user,
  addressSearch,
  setAddressSearch,
  addressData,
  addressLoading,
  saveFunction,
  itemGroups,
  saveGroups,
}: ProfilePageViewProps) => {
  const [opened, { open, close }] = useDisclosure(false)

  const [newGroupName, setNewGroupName] = useState<string>('')
  const [newGroupError, setNewGroupError] = useState<string>('')

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

  const onCreateGroup = () => {
    if (!newGroupName) {
      setNewGroupError('Name is required')
      return
    }
    const newGroup = {
      name: newGroupName,
      items: [],
    }
    const newGroups = itemGroups ? [...itemGroups, newGroup] : [newGroup]
    setNewGroupName('')
    setNewGroupError('')
    saveGroups(newGroups)
    close()
  }

  const onUpdate = (index: number, items: Item[]) => {
    const newGroups = itemGroups ? [...itemGroups] : []
    newGroups[index].items = items
    saveGroups(newGroups)
  }

  const onRemoveGroup = (index: number) => {
    const newGroups = itemGroups ? [...itemGroups] : []
    newGroups.splice(index, 1)
    saveGroups(newGroups)
  }

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
            <Group align='flex-end' grow>
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
                label='Home address'
                placeholder='Drottning Kristinas väg 13'
                name='address'
                filter={() => true} // API filters the data instead of this component
                itemComponent={SelectItem}
              />
              <Button variant='light' color='blue' size='sm' onClick={saveFunction}>
                Save
              </Button>
            </Group>

            <Stack spacing={0}>
              <Text weight={500} size='sm'>
                Items
              </Text>
              <Text size='xs' color='dimmed'>
                Add items to your profile to make it easier to plan rides
              </Text>
            </Stack>
            <Stack>
              {itemGroups?.map((itemGroup, index) => (
                <>
                  <ItemGroupComp
                    index={index}
                    onUpdateItems={onUpdate}
                    onRemoveGroup={onRemoveGroup}
                    name={itemGroup.name ?? 'NO NAME'}
                    items={itemGroup.items}
                  />
                </>
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
                  + Add Group
                </Text>
              </UnstyledButton>
            </Stack>
          </Stack>
        </Paper>
      </Container>
      <Modal title='Create Group' opened={opened} onClose={close}>
        <Stack>
          <TextInput
            label='Group Name'
            placeholder='Group Name'
            value={newGroupName}
            error={newGroupError}
            onChange={(event) => {
              setNewGroupName(event.currentTarget.value)
              setNewGroupError('')
            }}
          />
          <Group position='right'>
            <Button onClick={onCreateGroup} variant='light'>
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  )
}

export default ProfilePageView
