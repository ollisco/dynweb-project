import { Routes, Route, Navigate } from 'react-router-dom'
import Model from '../../Model'
import HelloWorld from '../hello-world/hello-world'
import LoginPresenter from '../login/login-presenter'
import RequireAuth from './require-auth'
import {observer} from 'mobx-react'
import FormPresenter from '../form/form-presenter'

interface NavigatorProps {
  model: Model
}

const Navigator = observer(({model}: NavigatorProps) => {
  return (
    <Routes>
      <Route index element={<Navigate to='hello' />} />
      <Route path='login' element={<LoginPresenter model={model} />} />
      <Route element={<RequireAuth />}>
        <Route path='hello' element={<HelloWorld />} />
        <Route path="form" element={<FormPresenter model={model} />}/>
      </Route>
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
})

export default Navigator
