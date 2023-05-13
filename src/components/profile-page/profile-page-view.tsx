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
  UnstyledButton,
  Center,
} from '@mantine/core'
import { UserCredential } from 'firebase/auth'
import { SelectItem } from '../form/form-presenter'
import { IconX } from '@tabler/icons-react'
import { Item, ItemGroup, ItemGroupComp } from './profile-page-components/profile-page-item'

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

  const item1: Item = {
    name: 'brush teeth',
    description: 'brush teeth',
    duration: 5,
  }

  const item2: Item = {
    name: 'eat breakfast',
    description: 'eat breakfast',
    duration: 10,
  }

  const item3: Item = {
    name: 'get dressed',
    description: 'get dressed',
    duration: 25,
  }
  const itemGroupA: ItemGroup = {
    name: 'morning routine',
    items: [item1, item2, item3],
  }

  const item4: Item = {
    name: 'pack gym bag',
    description: 'pack gym bag',
    duration: 5,
  }

  const item5: Item = {
    name: 'make protein shake',
    description: 'make protein shake',
    duration: 15,
  }

  const itemGroupB: ItemGroup = {
    name: 'gym routine',
    items: [item4, item5],
  }

  const itemGroups: ItemGroup[] = [itemGroupA, itemGroupB]

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

            <Stack spacing={0}>
              <Text weight={500} size='sm'>
                Items
              </Text>
              <Text size='xs' color='dimmed'>
                Add items to your profile to make it easier to plan rides
              </Text>
            </Stack>
            <Stack>
              {itemGroups.map((itemGroup) => (
                <>
                  <ItemGroupComp {...itemGroup} />
                </>
              ))}
            </Stack>
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
