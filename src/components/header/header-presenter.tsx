import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCredential } from '@firebase/auth'
import { observer } from 'mobx-react'
import Model from '../../Model'
import HeaderView from './header-view'

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
    <HeaderView
      initials={initials}
      userPhotoUrl={user.user.photoURL ?? ''}
      logoutFunction={logout}
    />
  )
})

export default HeaderPresenter
