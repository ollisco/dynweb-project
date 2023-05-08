import React from 'react'
import { Avatar, Group, Header, Menu, Text, UnstyledButton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { UserCredential } from '@firebase/auth'
import { observer } from 'mobx-react'
import Model from '../../Model'

interface HeaderPresenterProps {
  model: Model
}

const HeaderPresenter = observer(({ model }: HeaderPresenterProps) => {
  const navigate = useNavigate()

  const user: UserCredential | null = model.user

  if (!user) return null

  const initials = user?.user.displayName
    ? user.user.displayName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
    : 'UU'

  const logout = () => {
    navigate('/logout')
  }

  return (
    <Header height={60} px='xl' py='xs'>
      <Group position='apart' align='center' h='100%'>
        <Text weight='bold' size='xl' color='blue.6'>
          KOMITID
        </Text>
        <Menu>
          <Menu.Target>
            <Avatar alt={initials} src={user?.user.photoURL} component={UnstyledButton}>
              {initials}
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={logout}>Sign out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Header>
  )
})

export default HeaderPresenter
