import React from 'react'
import {
  Header,
  Group,
  Menu,
  Avatar,
  UnstyledButton,
  Image,
  ActionIcon,
  ColorScheme,
} from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import LOGO from '../../assets/logo.svg'

interface HeaderViewProps {
  initials: string
  userPhotoUrl: string
  colorScheme: ColorScheme
  toggleColorScheme: () => void
  logoutFunction: () => void
}

const HeaderView = ({
  initials,
  userPhotoUrl,
  colorScheme,
  toggleColorScheme,
  logoutFunction,
}: HeaderViewProps) => {
  const navigate = useNavigate()

  return (
    <Header height={60} px='xl' py='xs'>
      <Group position='apart' align='center' h='100%'>
        <UnstyledButton onClick={() => navigate('/')}>
          <Image src={LOGO} alt='logo' height={42} />
        </UnstyledButton>
        <Group>
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size='lg'
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            })}
          >
            {colorScheme === 'dark' ? <IconSun size='1.2rem' /> : <IconMoonStars size='1.2rem' />}
          </ActionIcon>
          <Menu>
            <Menu.Target>
              <Avatar alt={initials} src={userPhotoUrl} component={UnstyledButton}>
                {initials}
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => navigate('/profile')}>Profile</Menu.Item>
              <Menu.Item onClick={logoutFunction}>Sign out</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Header>
  )
}

export default HeaderView
