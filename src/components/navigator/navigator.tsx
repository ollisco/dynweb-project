import { Routes, Route } from 'react-router-dom'
import Model from '../../model'
import LoginPresenter from '../login/login-presenter'
import RequireAuth from './require-auth'
import { observer } from 'mobx-react'
import MainPagePresenter from '../main-page/main-page-presenter'
import ProfilePagePresenter from '../profile-page/profile-page-presenter'
import Auth from '../../auth'

interface NavigatorProps {
  model: Model
  auth: Auth
}

const Navigator = observer(({ model, auth }: NavigatorProps) => {
  return (
    <Routes>
      <Route path='login' element={<LoginPresenter user={auth.user} signIn={auth.signIn} />} />
      <Route element={<RequireAuth user={auth.user} />}>
        <Route path='' element={<MainPagePresenter model={model} />} />
        <Route path='profile' element={<ProfilePagePresenter model={model} auth={auth} />} />
      </Route>
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
})

export default Navigator
