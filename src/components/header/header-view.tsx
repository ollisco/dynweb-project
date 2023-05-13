import React from 'react'
import {
  Header,
  Group,
  Menu,
  Avatar,
  UnstyledButton,
  Text,
  ActionIcon,
  ColorScheme,
} from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface HeaderViewProps {
  initials: string
  userPhotoUrl: string
  colorScheme: ColorScheme
  toggleColorScheme: () => void
}

const HeaderView = ({
  initials,
  userPhotoUrl,
  colorScheme,
  toggleColorScheme,
}: HeaderViewProps) => {

  const navigate = useNavigate()



  return (
    <Header height={60} px='xl' py='xs'>
      <Group position='apart' align='center' h='100%'>
        <UnstyledButton onClick={() => navigate('/')}>
          <Text weight='bold' size='xl' color='blue.6'
          >
            KOMITID
          </Text>

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
              <Menu.Item onClick={() => navigate('/profile')}>
                Profile
              </Menu.Item>
              <Menu.Item onClick={() => navigate('/logout')}>Sign out</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Header>
  )
}

export default HeaderView
