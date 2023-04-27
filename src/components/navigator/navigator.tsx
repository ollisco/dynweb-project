import { Routes, Route } from 'react-router-dom'
import Model from '../../Model'
import LoginPresenter from '../login/login-presenter'
import RequireAuth from './require-auth'
import { observer } from 'mobx-react'
import FormPresenter from '../form/form-presenter'
import InformationPresenter from '../information/information-presenter'

interface NavigatorProps {
  model: Model
}

const Navigator = observer(({ model }: NavigatorProps) => {
  return (
    <Routes>
      <Route path='login' element={<LoginPresenter user={model.user} signIn={model.signIn} />} />
      <Route element={<RequireAuth />}>
        <Route
          path=''
          element={
            <div>
              <FormPresenter
                homeAddress={model.homeAddress}
                setHomeAddress={model.setHomeAddress}
                saveHomeAddress={model.saveHomeAddress}
                setRoute={model.setRoute}
                setRouteLoading={model.setRouteLoading}
                setRouteTrip={model.setRouteTrip}
              />
              <InformationPresenter
                originAddress={model.homeAddress}
                originTime={model.leaveTime}
                destinationAddress={model.destinationAddress}
                destinationTime={model.arriveTime}
                loading={model.routeLoading}
                trip={model.trip}
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
