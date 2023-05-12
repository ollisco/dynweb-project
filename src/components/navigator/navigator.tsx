import { Routes, Route } from 'react-router-dom'
import Model from '../../Model'
import LoginPresenter from '../login/login-presenter'
import RequireAuth from './require-auth'
import { observer } from 'mobx-react'
import FormPresenter from '../form/form-presenter'
import InformationPresenter from '../information/information-presenter'
import Logout from '../logout/logout'

interface NavigatorProps {
  model: Model
}

const Navigator = observer(({ model }: NavigatorProps) => {
  return (
    <Routes>
      <Route path='login' element={<LoginPresenter user={model.user} signIn={model.signIn} />} />
      <Route path='logout' element={<Logout logoutFunction={model.signOut} />} />
      <Route element={<RequireAuth />}>
        <Route
          path=''
          element={
            <div>
              <FormPresenter
                homeAddress={model.homeAddress}
                saveHomeAddress={model.saveHomeAddress}
                searchInProgress={model.searchInProgress}
                doSearch={model.doSearch}
              />
              <InformationPresenter
                originAddress={model.homeAddress}
                destinationAddress={model.destinationAddress}
                destinationTime={model.arriveTime}
                searchInProgress={model.searchInProgress}
                trips={model.trips}
              />
            </div>
          }
        />
      </Route>
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
})

export default Navigator
