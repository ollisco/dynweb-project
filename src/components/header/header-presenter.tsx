import { observer } from 'mobx-react'
import { ColorScheme } from '@mantine/core'
import HeaderView from './header-view'
import { useNavigate } from 'react-router-dom'
import Auth from '../../auth'

interface HeaderPresenterProps {
  auth: Auth
  colorScheme: ColorScheme
  toggleColorScheme: () => void
}

const HeaderPresenter = observer(
  ({ auth, colorScheme, toggleColorScheme }: HeaderPresenterProps) => {
    const navigate = useNavigate()

    if (!auth.user) return null

    const initials = auth.user?.user.displayName
      ? auth.user.user.displayName
          .split(' ')
          .map((name) => name[0])
          .join('')
          .slice(0, 2)
      : 'UU'

    const logout = () => {
      auth.signOut()
      navigate('/login')
    }

    return (
      <HeaderView
        initials={initials}
        userPhotoUrl={auth.user.user.photoURL ?? ''}
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
        logoutFunction={logout}
      />
    )
  },
)

export default HeaderPresenter
