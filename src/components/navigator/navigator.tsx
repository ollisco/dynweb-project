import { Routes, Route } from 'react-router-dom'
import HelloWorld from '../hello-world/hello-world'
import Login from '../login/login'
import RequireAuth from './require-auth'

function Navigator() {
  return (
    <Routes>
      <Route index element={<div>index</div>} />
      <Route path='login' element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path='hello' element={<HelloWorld />} />
      </Route>
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
}

export default Navigator
