import Navigator from './components/navigator/navigator'
import { MantineProvider } from '@mantine/core'
import { UserProvider } from './components/login/user-context'
import Model from './Model'

const model = new Model()

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserProvider>
        <Navigator model={model} />
      </UserProvider>
    </MantineProvider>
  )
}

export default App
