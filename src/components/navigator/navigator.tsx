import { Routes, Route } from 'react-router-dom'
import HelloWorld from '../hello-world/hello-world'

function Navigator() {
  return (
    <Routes>
      <Route index element={<div>index</div>} />
      <Route path='hello'>
        <Route index element={<HelloWorld />} />
      </Route>
    </Routes>
  )
}

export default Navigator
