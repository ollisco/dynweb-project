import { Routes, Route } from 'react-router-dom'
import HelloWorld from '../hello-world/hello-world'
import Login from '../login/login'

function Navigator() {
  return (
    <Routes>
      <Route index element={<div>index</div>} />
      <Route path='hello' element={<HelloWorld />} />
      <Route path='login' element={<Login/>}/>
    </Routes>
  )
}


export default Navigator