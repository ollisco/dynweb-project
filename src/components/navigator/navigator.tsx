import { Routes, Route } from 'react-router-dom'
import Model from '../../model'
import LoginPresenter from '../login/login-presenter'
import RequireAuth from './require-auth'
import { observer } from 'mobx-react'
import MainPagePresenter from '../main-page/main-page-presenter'
import ProfilePagePresenter from '../profile-page/profile-page-presenter'

interface NavigatorProps {
  model: Model
}

const Navigator = observer(({ model }: NavigatorProps) => {
  return (
    <Routes>
      <Route path='login' element={<LoginPresenter user={model.user} signIn={model.signIn} />} />
      <Route element={<RequireAuth user={model.user} />}>
        <Route path='' element={<MainPagePresenter model={model} />} />
        <Route path='profile' element={<ProfilePagePresenter model={model} />} />
      </Route>
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
})

export default Navigator
