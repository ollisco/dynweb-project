import React from 'react'
import { Header, Group, Menu, Avatar, UnstyledButton, Text } from '@mantine/core'

interface HeaderViewProps {
  initials: string
  userPhotoUrl: string
  logoutFunction: () => void
}

const HeaderView = ({ initials, userPhotoUrl, logoutFunction }: HeaderViewProps) => {
  return (
    <Header height={60} px='xl' py='xs'>
      <Group position='apart' align='center' h='100%'>
        <Text weight='bold' size='xl' color='blue.6'>
          KOMITID
        </Text>
        <Menu>
          <Menu.Target>
            <Avatar alt={initials} src={userPhotoUrl} component={UnstyledButton}>
              {initials}
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={logoutFunction}>Sign out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Header>
  )
}

export default HeaderView
