import React from 'react'
import { UserCredential } from '@firebase/auth'
import { observer } from 'mobx-react'
import Model from '../../Model'
import HeaderView from './header-view'
import { ColorScheme } from '@mantine/core'

interface HeaderPresenterProps {
  model: Model
  colorScheme: ColorScheme
  toggleColorScheme: () => void
}

const HeaderPresenter = observer(
  ({ model, colorScheme, toggleColorScheme }: HeaderPresenterProps) => {

    const user: UserCredential | null = model.user

    if (!user) return null

    const initials = user?.user.displayName
      ? user.user.displayName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
      : 'UU'

    return (
      <HeaderView
        initials={initials}
        userPhotoUrl={user.user.photoURL ?? ''}
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      />
    )
  },
)

export default HeaderPresenter
