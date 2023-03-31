import { Routes, Route } from 'react-router-dom'
import HelloWorld from '../hello-world/hello-world'
import Main from '../main/main'

function Navigator() {
  return (
    <Routes>
      <Route index element={<div>index</div>} />
      <Route path='hello'>
        <Route index element={<HelloWorld />} />
      </Route>
      <Route path='start'>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  )
}

export default Navigator
