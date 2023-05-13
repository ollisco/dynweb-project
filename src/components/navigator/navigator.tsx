import { Routes, Route } from 'react-router-dom'
import Model from '../../Model'
import LoginPresenter from '../login/login-presenter'
import RequireAuth from './require-auth'
import { observer } from 'mobx-react'
import Logout from '../logout/logout'
import MainPagePresenter from '../main-page/main-page-presenter'
import ProfilePagePresenter from '../profile-page/profile-page-presenter'

interface NavigatorProps {
  model: Model
}

const Navigator = observer(({ model }: NavigatorProps) => {
  return (
    <Routes>
      <Route path='login' element={<LoginPresenter user={model.user} signIn={model.signIn} />} />
      <Route path='logout' element={<Logout logoutFunction={model.signOut} />} />
      <Route element={<RequireAuth />}>
        <Route path='' element={<MainPagePresenter model={model} />} />
        <Route path='profile' element={<ProfilePagePresenter />} />
      </Route>
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
})

export default Navigator
